// node frames.cjs reel.html outdir start_s end_s   | node frames.cjs reel.html outdir --at 0,1,3
const {chromium}=require('playwright');const path=require('path');const [,,html,out,a,b]=process.argv;
(async()=>{const br=await chromium.launch(),p=await br.newPage({viewport:{width:1080,height:1920}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
 const list=a==='--at'?b.split(',').map(Number).map(s=>Math.round(s*30)):[...Array(Math.round(b*30)-Math.round(a*30)).keys()].map(i=>i+Math.round(a*30));
 for(const f of list){await p.evaluate(t=>render(t),f/30);await p.screenshot({path:`${out}/f${String(f).padStart(4,'0')}.png`})}
 console.log('TT',await p.evaluate(()=>TT),JSON.stringify(await p.evaluate(()=>E)));await br.close()})();
