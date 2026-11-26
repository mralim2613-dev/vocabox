
const CACHE="vocabox-leitner-1",ASSETS=["/assets/practice-features.css","/assets/mobile-navigation.js","/assets/language-picker.css","/assets/language-picker.js","/manifest.webmanifest","/icons/vocabox-180.png","/icons/vocabox-192.png","/icons/vocabox-512.png","/assets/install-vocabox.js","/assets/vocabox-account.js","/assets/vocabox-account.css","/assets/index-BLhpsdAO.js","/assets/index-CpLzPiXy.css","/assets/index-DRiVQKR0.js","/assets/index-DeKd95xU.js","/assets/web-B5ruZqYW.js","/assets/web-CDy8fqWE.js","/catalog/de.json","/catalog/en.json","/catalog/es.json","/catalog/meta.json","/catalog/ru.json","/delete-account.html","/favicon.svg","/index.html","/privacy.html","/support.html","/terms.html","/"];
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
