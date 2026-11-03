import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {repairBundledDuplicates,normalizeTerm} from '../src/lib/state-migrations.js';
import {stampChanges,mergeCloudState} from '../src/lib/cloud-state.js';

const seed=JSON.parse(fs.readFileSync(new URL('../src/data/seed.json',import.meta.url)));
const source=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const declarations=source.slice(source.indexOf('function validateItem('),source.indexOf('try{loadedRaw='));
const codec=source.slice(source.indexOf('function encodeLocal('),source.indexOf('function canChange('));
const bootstrap=`const CEFR=['A1','A2','B1','B2','C1','C2'],LANGS={en:1,ru:1,de:1,es:1,fr:1,it:1};
const uid=()=>crypto.randomUUID(),norm=normalizeTerm,clone=x=>structuredClone(x);
const loadedLanguages=new Set(['en','ru','de','es']);
const INITIAL=structuredClone(seed); INITIAL.items=INITIAL.items.map(i=>validateItem(i,i.deckId,i.language));
const SEED_SIGNATURES=new Map(INITIAL.items.map(i=>[i.id,JSON.stringify(i)]));`;
const api=new Function('seed','repairBundledDuplicates','normalizeTerm',bootstrap+declarations+codec+'return {validateState,encodeLocal,decodeLocal};')(seed,repairBundledDuplicates,normalizeTerm);

test('account deletion skips saving removed account; normal switching protects unsaved data',async()=>{
  const switchSource=source.slice(source.indexOf('async function switchAccount('),source.indexOf('async function checkCloudAuth('));
  const createHarness=new Function(`
    let session=null,syncPromise=null,syncDebounceTimer,blocked=false,accountGeneration=0;
    let KEY='deleted-account',loadedRaw='removed',state={},activeUserNumber='QA',activeUserLanguage='en',page=0,calls=[];
    const INITIAL={},localStorage={getItem:()=>null},accountKey=()=> 'guest';
    const clone=x=>structuredClone(x),validateState=x=>x,decodeLocal=x=>x;
    const save=()=>{calls.push(KEY);return KEY!=='deleted-account'};
    const saveActiveUser=()=>{},ensureLanguage=async()=>{},clearImport=()=>{},$=()=>({value:''});
    const render=()=>{},renderLicenses=()=>{},updateCloudUI=()=>{};
    ${switchSource}
    return {switchAccount,calls,getKey:()=>KEY};
  `);
  const deleted=createHarness();
  await deleted.switchAccount(null,null,{savePrevious:false});
  assert.deepEqual(deleted.calls,['guest']);
  assert.equal(deleted.getKey(),'guest');
  const normal=createHarness();
  await assert.rejects(normal.switchAccount(null,null),/Lokal məlumat saxlanmadı/);
  assert.equal(normal.getKey(),'deleted-account');
});

test('bundled duplicates merge content, levels and progress; custom collisions are rejected',()=>{
  const original=seed.items.filter(i=>normalizeTerm(i.term)==='abfahren');
  const input=structuredClone(seed);
  input.progress={[original[1].id]:{level:5,reviews:8,correct:7,last:100}};
  const repaired=api.validateState(input);
  assert.equal(repaired.items.length,13706);
  const card=repaired.items.find(i=>i.id===original[0].id);
  for(const old of original) {
    assert.ok(card.translation.includes(old.translation));
    for(const level of old.cefrLevels)assert.ok(card.cefrLevels.includes(level));
  }
  assert.equal(repaired.progress[card.id].level,5);
  assert.equal(repaired.progress[card.id].reviews,8);
  assert.equal(repaired.progress[original[1].id],undefined);
  assert.deepEqual(api.validateState(repaired),repaired);
  repaired.items.push({...card,id:'user-duplicate'});
  assert.throws(()=>api.validateState(repaired),/Təkrar kart/);
});

test('old full backups and patch storage repair without losing edits or deleted seed cards',()=>{
  const state=api.validateState(seed);
  state.items[0].translation='Yoxlanılmış fərdi tərcümə';
  const removed=state.items[1].id;
  state.items=state.items.filter(i=>i.id!==removed);
  const raw=JSON.parse(api.encodeLocal(state));
  const restored=api.decodeLocal(raw);
  assert.equal(restored.items.find(i=>i.id===state.items[0].id).translation,'Yoxlanılmış fərdi tərcümə');
  assert.equal(restored.items.some(i=>i.id===removed),false);
  assert.deepEqual(api.decodeLocal(JSON.parse(api.encodeLocal(restored))),restored);
  const legacyPatch={...structuredClone(seed),storageSchema:'vocabox-patch-v1',omitted:[],items:[]};
  assert.equal(api.decodeLocal(legacyPatch).items.length,13706);
});

test('invalid backup structure and progress are rejected',()=>{
  assert.throws(()=>api.validateState(null));
  const input=structuredClone(seed);
  input.progress={unknown:{level:8,reviews:0,correct:1,last:0}};
  assert.throws(()=>api.validateState(input),/İrəliləyiş/);
});

const base=()=>({decks:[{id:'custom',language:'en',name:'My words',kind:'custom'}],items:[{id:'card',deckId:'custom',term:'hello'}],progress:{},licenses:[],modified:{},deleted:{}});
test('cloud merge preserves both devices, recent progress and deletions without resurrection',()=>{
  const a=base(),b=base();
  a.progress.card={level:4,reviews:2,correct:1,last:20};
  b.progress.card={level:5,reviews:3,correct:2,last:30};
  b.items.push({id:'remote',deckId:'custom',term:'remote'});
  const combined=mergeCloudState(a,b);
  assert.equal(combined.progress.card.last,30);
  assert.equal(combined.items.length,2);
  const deleted=stampChanges(a,{...structuredClone(a),items:[],progress:{}},100);
  assert.equal(mergeCloudState(deleted,b).items.some(i=>i.id==='card'),false);
  const removedDeck=stampChanges(a,{...structuredClone(a),decks:[],items:[],progress:{}},200);
  assert.equal(mergeCloudState(removedDeck,b).items.length,0);
});

test('cloud edit timestamps select the latest text and do not mutate inputs',()=>{
  const a=base(),b=base();
  const edited=stampChanges(a,{...structuredClone(a),items:[{...a.items[0],term:'new term'}]},100);
  const before=JSON.stringify(b);
  assert.equal(mergeCloudState(b,edited).items[0].term,'new term');
  assert.equal(JSON.stringify(b),before);
});
