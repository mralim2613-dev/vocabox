// Disposable local integration fixture. It never connects to a hosted database.
import http from 'node:http';
import fs from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';
const db=new PGlite({extensions:{pgcrypto}});
await db.exec('create role anon;create role authenticated;create role service_role;');
await db.exec(await fs.readFile(new URL('../supabase_schema.sql',import.meta.url),'utf8'));
await db.exec("insert into public.licenses(user_number,language) values('QA-A','en'),('QA-B','de');");
const fixtures={};
for(const account of ['QA-A','QA-B'])fixtures[account]=(await db.query('select public.vocabox_provision_access_key($1) value',[account])).rows[0].value;
await fs.writeFile(new URL('cloud-fixtures.json',import.meta.url),JSON.stringify(fixtures));
await db.exec('set role anon');
const methods={vocabox_login:['number','access_key'],vocabox_session:['session_token'],vocabox_pull:['session_token'],vocabox_push:['session_token','snapshot','expected_revision'],vocabox_logout:['session_token'],vocabox_delete_account:['session_token']};
const server=http.createServer(async(req,res)=>{
  const origin=req.headers.origin;
  if(origin&&/^http:\/\/127\.0\.0\.1:(3001|3002)$/.test(origin))res.setHeader('Access-Control-Allow-Origin',origin);
  res.setHeader('Access-Control-Allow-Headers','apikey,authorization,content-type,x-client-info,prefer,accept-profile,content-profile');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS,GET');
  res.setHeader('Content-Type','application/json');
  if(req.method==='OPTIONS'){res.end();return;}
  if(req.url==='/health'){res.end('{"localTest":true}');return;}
  const name=req.url?.split('/').pop(),keys=methods[name];
  if(req.method!=='POST'||!keys){res.writeHead(404);res.end('{}');return;}
  try {
    let control={};try{control=JSON.parse(await fs.readFile(new URL('cloud-test-control.json',import.meta.url),'utf8'))}catch{}
    if((name==='vocabox_pull'&&control.failPull)||(name==='vocabox_push'&&control.failPush))throw new Error('QA: şəbəkə xətası sınağı');
    let body='';for await(const chunk of req)body+=chunk;
    const args=JSON.parse(body);
    const sql=`select public.${name}(${keys.map((key,i)=>`${key}=>$${i+1}`).join(',')}) value`;
    const result=(await db.query(sql,keys.map(key=>args[key]))).rows[0].value;
    res.end(JSON.stringify(result));
  }catch(error){res.writeHead(400);res.end(JSON.stringify({message:error.message,code:error.code||'QA_ERROR'}));}
});
server.listen(54329,'127.0.0.1',()=>console.log('Disposable local cloud fixture: http://127.0.0.1:54329'));
