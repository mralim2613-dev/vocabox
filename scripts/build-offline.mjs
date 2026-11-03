import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=new URL('../dist/',import.meta.url);
async function files(dir,prefix='') {
  const result=[];
  for(const entry of await fs.readdir(dir,{withFileTypes:true})) {
    const name=prefix+entry.name;
    if(entry.isDirectory())result.push(...await files(new URL(entry.name+'/',dir),name+'/'));
    else if(name!=='sw.js')result.push(name);
  }
  return result;
}
const assets=await files(root);
const hash=createHash('sha256');
for(const file of assets.sort())hash.update(await fs.readFile(new URL(file,root)));
const version='vocabox-'+hash.digest('hex').slice(0,16);
const urls=assets.map(file=>'/'+file);
urls.push('/');
await fs.writeFile(new URL('sw.js',root),`
const CACHE=${JSON.stringify(version)},ASSETS=${JSON.stringify(urls)};
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);await cache.addAll(ASSETS);await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const name of await caches.keys())if(name.startsWith('vocabox-')&&name!==CACHE)await caches.delete(name);
 await self.clients.claim();
 for(const client of await self.clients.matchAll())client.postMessage({type:'vocabox-offline-ready'});
})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  // Only public build assets are precached. Dev/preview servers can attach
  // Vary: Origin, while module requests send a different Origin header.
  const cached=await (await caches.open(CACHE)).match(event.request,{ignoreVary:true});
  if(cached)return cached;
  try{return await fetch(event.request)}catch(error){
   if(event.request.mode==='navigate')return (await caches.open(CACHE)).match('/');
   throw error;
  }
 })());
});
`);
console.log(`Offline cache: ${assets.length} files (${version})`);
