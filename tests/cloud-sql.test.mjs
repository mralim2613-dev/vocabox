import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';

test('empty legacy user_id schema migrates safely; populated legacy schema refuses guessed ownership',async()=>{
  const db=new PGlite({extensions:{pgcrypto}});
  try {
    await db.exec(`create role anon;create role authenticated;create role service_role;
      create table public.licenses(user_number text primary key,language text,is_active boolean,activated_at timestamptz);
      create table public.user_progress(id uuid primary key default gen_random_uuid(),user_id uuid not null,item_id text,level int,reviews int,correct int,last bigint,unique(user_id,item_id));
      create table public.custom_decks(id text,user_id uuid,name text,language text,primary key(user_id,id));
      create table public.custom_items(id text primary key,user_id uuid not null,deck_id text,language text,type text,term text,translation text,definition text,example text,cefr_levels text[]);
      insert into licenses values('EXISTING','en',true,null);
      insert into user_progress(user_id,item_id) values(gen_random_uuid(),'legacy');`);
    const sql=await fs.readFile(new URL('../supabase/secure_cloud.sql',import.meta.url),'utf8');
    await assert.rejects(db.exec(sql),/explicit user mapping/);
    await db.exec('rollback; delete from user_progress;');
    await db.exec(sql);
    await db.exec(sql);
    await db.exec("insert into user_progress(user_number,item_id) values('EXISTING','x');insert into custom_decks(user_number,id,name,language) values('EXISTING','d','Words','en');insert into custom_items(user_number,id,deck_id,language,type,term,translation) values('EXISTING','x','d','en','word','hi','salam');");
    assert.equal((await db.query('select count(*)::int n from licenses')).rows[0].n,1);
  } finally {await db.close();}
});

test('secure cloud SQL: roles, credentials, account isolation, CAS, deletion and revoked sessions',async()=>{
  const db=new PGlite({extensions:{pgcrypto}});
  try {
    await db.exec('create role anon;create role authenticated;create role service_role;');
    await db.exec(await fs.readFile(new URL('../supabase_schema.sql',import.meta.url),'utf8'));
    await db.exec(`grant all on public.licenses,public.user_progress,public.custom_decks,public.custom_items to anon;
      create policy legacy_open on public.user_progress for all using(true) with check(true);
      create function public.create_licenses(int,text,text) returns int language sql security definer as 'select 1';
      create function public.delete_user_account(text) returns boolean language sql security definer as 'select true';`);
    // A deployed project may re-run the migration safely.
    await db.exec(await fs.readFile(new URL('../supabase/secure_cloud.sql',import.meta.url),'utf8'));
    await db.exec("insert into public.licenses(user_number,language) values('TEST-A','en'),('TEST-B','de');");
    const one=async(sql,args=[]) => (await db.query(sql,args)).rows[0].result;
    const keyA=await one("select public.vocabox_provision_access_key('TEST-A') result");
    const keyB=await one("select public.vocabox_provision_access_key('TEST-B') result");
    await db.exec('set role anon');
    for(const table of ['licenses','user_progress','custom_decks','custom_items']) {
      await assert.rejects(db.query(`select * from public.${table}`),/permission denied/);
      await assert.rejects(db.query(`delete from public.${table}`),/permission denied/);
    }
    await assert.rejects(db.query("select public.vocabox_provision_access_key('TEST-A')"),/permission denied/);
    await assert.rejects(db.query("select public.create_licenses(1,'X','en')"),/permission denied/);
    await assert.rejects(db.query("select public.delete_user_account('TEST-A')"),/permission denied/);
    await assert.rejects(one('select public.vocabox_login($1,$2) result',['TEST-A',keyB]),/düzgün deyil/);
    await assert.rejects(one('select public.vocabox_login($1,null) result',['TEST-A']),/düzgün deyil/);
    await assert.rejects(one('select public.vocabox_pull($1) result',['invalid-token']),/Sessiya bitib/);
    const a=await one('select public.vocabox_login($1,$2) result',['TEST-A',keyA]);
    const b=await one('select public.vocabox_login($1,$2) result',['TEST-B',keyB]);
    assert.equal(a.language,'en');assert.equal(b.language,'de');
    const snapshot={storageSchema:'vocabox-patch-v1',items:[],privateMarker:'only-A'};
    assert.equal((await one('select public.vocabox_push($1,$2,0) result',[a.token,snapshot])).revision,1);
    assert.equal((await one('select public.vocabox_push($1,$2,0) result',[a.token,snapshot])).conflict,true);
    assert.equal((await one('select public.vocabox_pull($1) result',[a.token])).snapshot.privateMarker,'only-A');
    assert.equal((await one('select public.vocabox_pull($1) result',[b.token])).snapshot,null);
    await assert.rejects(one('select public.vocabox_push($1,$2,1) result',[a.token,{}]),/düzgün deyil/);
    await assert.rejects(one('select public.vocabox_push($1,$2,null) result',[a.token,snapshot]),/Versiya/);
    // Deletion is atomic: all legacy records, credentials, snapshots and sessions.
    await db.exec('reset role');
    await db.exec("insert into public.user_progress(user_number,item_id) values('TEST-A','x');insert into public.custom_decks(id,user_number,name,language) values('d','TEST-A','Words','en');insert into public.custom_items(id,user_number,deck_id,language,type,term,translation) values('x','TEST-A','d','en','phrase','hi','salam');");
    await db.exec("create function public.qa_reject_delete() returns trigger language plpgsql as $$begin raise exception 'QA delete failure';end$$;create trigger qa_reject_delete before delete on public.custom_items for each row execute function public.qa_reject_delete();");
    await db.exec('set role anon');
    await assert.rejects(one('select public.vocabox_delete_account($1) result',[a.token]),/QA delete failure/);
    await db.exec('reset role');
    assert.equal((await db.query("select count(*)::int n from public.user_progress where user_number='TEST-A'")).rows[0].n,1);
    await db.exec('drop trigger qa_reject_delete on public.custom_items;drop function public.qa_reject_delete();');
    await db.exec('set role anon');
    assert.equal(await one('select public.vocabox_delete_account($1) result',[a.token]),true);
    await assert.rejects(one('select public.vocabox_pull($1) result',[a.token]),/Sessiya bitib/);
    await assert.rejects(one('select public.vocabox_login($1,$2) result',['TEST-A',keyA]),/düzgün deyil/);
    assert.equal((await one('select public.vocabox_session($1) result',[b.token])).user_number,'TEST-B');
    await one('select public.vocabox_logout($1) result',[b.token]);
    await assert.rejects(one('select public.vocabox_session($1) result',[b.token]),/Sessiya bitib/);
    await db.exec('reset role');
    for(const table of ['licenses','user_progress','custom_decks','custom_items'])assert.equal((await db.query(`select count(*)::int n from public.${table} where user_number='TEST-A'`)).rows[0].n,0);
  }finally{await db.close();}
});
