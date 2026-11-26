const fs = require('node:fs');

function change(source, before, after) {
  if (!source.includes(before)) throw new Error('Missing application hook: ' + before);
  return source.replace(before, () => after);
}

function reviewedOnLocalDay(last, now = Date.now()) {
  if (!(last > 0)) return false;
  const review = new Date(last);
  const today = new Date(now);
  return review.getFullYear() === today.getFullYear() &&
    review.getMonth() === today.getMonth() && review.getDate() === today.getDate();
}

function chooseCardFront(item, level, random = Math.random) {
  const choices = ['term', 'translation'];
  if (item.type === 'word' && level >= 4 && item.definition) choices.push('definition');
  return choices[Math.floor(random() * choices.length)];
}

const bundle = 'dist/assets/index-BLhpsdAO.js';
let js = fs.readFileSync(bundle, 'utf8');
if (!js.includes('function reviewedOnLocalDay')) {
  const swap = (before, after) => { js = change(js, before, after); };
  swap('function xn(c,h)', reviewedOnLocalDay.toString() + '\n' + chooseCardFront.toString() +
    '\nfunction allowsPractice(card,box){const progress=he(card.id);return !reviewedOnLocalDay(progress.last)&&(progress.level<6||box==="6")}function cefrAvailable(){return ir()?.kind==="core"&&S.selectedDeck!=="ru-core"}function neutralBadge(progress){return progress.level!==3?"":progress.reviews?" · Yenidən neytral":" · Toxunulmamış"}function xn(c,h)');
  swap('h==="new"&&!_.reviews', 'h==="new"&&_.level===3&&!_.reviews');
  swap('Ee().filter(c=>jn(c,u("wordBand").value)&&qr(c,u("cefr").value)&&xn(c,u("box").value)',
    'Ee().filter(c=>allowsPractice(c,u("box").value)&&jn(c,u("wordBand").value)&&(!cefrAvailable()||qr(c,u("cefr").value))&&xn(c,u("box").value)');
  swap('direction:u("direction").value,shown', 'box:u("box").value,shown');
  swap('const c=lr(zr()).slice(0,Number(u("size").value));',
    'const c=lr(lr(zr()).slice(0,Number(u("size").value)));if(!c.length){ar();return B("Bu seçimlə bu gün məşq edilə bilən kart yoxdur.")}');
  swap('if(!O||O.index>=O.queue.length)return Vr();const c=S.items.find(v=>v.id===O.queue[O.index]),h=O;let _=h.direction==="random"?Math.random()<.5?"term":"translation":h.direction;',
    'if(!O)return;let c;while(O.index<O.queue.length){c=S.items.find(v=>v.id===O.queue[O.index]);if(c&&allowsPractice(c,O.box))break;O.index++}if(O.index>=O.queue.length)return Vr();const h=O,_=chooseCardFront(c,he(c.id).level);');
  swap('u("sessionCount").textContent=h.index+1+" / "+h.queue.length',
    'u("sessionCount").textContent=h.index+1+" / "+h.queue.length+" · "+(c.type==="word"?"Söz":"İfadə")');
  swap('he(c.id).level+(c.cefrLevels.length&&S.selectedDeck!=="ru-core"?" · "+p(Br(c)):"")',
    'he(c.id).level+neutralBadge(he(c.id))+(cefrAvailable()?" · "+p(Br(c)||"CEFR qeyd edilməyib"):"")');
  swap('(_==="term"?r[c.language]:"Azərbaycan dili")',
    '(_==="definition"?r[c.language]+" · izah":_==="term"?r[c.language]:"Azərbaycan dili")');
  swap('(_==="term"?c.language:"az")', '(_==="translation"?"az":c.language)');
  const answerStart = js.indexOf('function Fr(){');
  const answerEnd = js.indexOf('function Hr(){', answerStart);
  if (answerStart < 0 || answerEnd < 0) throw new Error('Missing answer renderer');
  js = js.slice(0, answerStart) + `function Fr(){
    const current=O,item=current.item;
    const labels={term:r[item.language],translation:"Azərbaycan dili",definition:r[item.language]+" · izah"};
    return ["term","translation","definition"].filter(field=>field!==current.front&&item[field])
      .map(field=>'<div class="set-answer"><div class="small muted">'+p(labels[field])+'</div><div class="answer" lang="'+(field==="translation"?"az":item.language)+'">'+p(item[field])+'</div></div>').join("")
      +(item.example?'<p class="example" lang="'+item.language+'">'+p(item.example)+'</p>':"");
  }` + js.slice(answerEnd);
  swap('c&&(c.disabled=!0,m(c.value)===m(O.answer)&&(u("feedback").textContent="Yazdığın cavab uyğun gəlir. Özünü qiymətləndir."))',
    'c&&(c.disabled=!0)');
  swap('const h=he(O.item.id),_=Math.max', 'const h=he(O.item.id);if(reviewedOnLocalDay(h.last)){B("Bu kart bu gün artıq qiymətləndirilib."),O.index++,Mr();return}const _=Math.max');
  swap('y=>he(y.id).last&&new Date(he(y.id).last).toDateString()===h', 'y=>reviewedOnLocalDay(he(y.id).last)');
  swap('u("cefrField").hidden=k,u("wordBandField").hidden=!k,u("listCefr").hidden=k,u("levelNote").hidden=k||',
    'u("cefrField").hidden=!cefrAvailable(),u("wordBandField").hidden=!k,u("listCefr").hidden=!cefrAvailable(),u("levelNote").hidden=!cefrAvailable()||');
  swap('&&qr(v,u("listCefr").value)),_=Math.max',
    '&&(!cefrAvailable()||qr(v,u("listCefr").value))&&xn(v,u("listLevel").value)&&(u("listKind").value==="all"||v.type===u("listKind").value)),_=Math.max');
  swap('u("listCefr").onchange=()=>{M=1,it()},', 'u("listCefr").onchange=u("listKind").onchange=u("listLevel").onchange=()=>{M=1,it()},');
  swap('u("box").value="all",u("listCefr").value="all"', 'u("box").value="all",u("listCefr").value="all",u("listKind").value="all",u("listLevel").value="all"');
  swap('u("box").value=h.dataset.box,nt(),Ne("study")',
    'u("box").value=h.dataset.box,h.dataset.boxCefr&&(u("cefr").value=h.dataset.boxCefr,u("kind").value="all"),nt(),Ne("study")');
  swap('}).join(""),ar()}function it()', `}).join(""),cefrAvailable()&&u("boxes").querySelectorAll("button[data-box]").forEach(control=>{
      const counts=document.createElement("div");counts.className="box-cefr";
      const cards=c.filter(item=>he(item.id).level===Number(control.dataset.box));
      for(const level of [...e,"unknown"]){
        const count=cards.filter(item=>qr(item,level)).length;
        const button=document.createElement("button");button.type="button";
        button.dataset.box=control.dataset.box;button.dataset.boxCefr=level;
        button.textContent=(level==="unknown"?"Qeyd edilməyib":level)+" · "+count;
        button.disabled=count===0;counts.append(button);
      }
      control.after(counts);
    }),ar()}function it()`);
  swap('h.length<=120&&/^(items|decks):/.test(h)',
    '(h.length<=120&&/^(items|decks):/.test(h)||h.length<=1700&&h.startsWith("term:"))');
  swap('for(const a of n.keys())i.has(a)||(e.deleted[`${s}:${a}`]=t)',
    'for(const [a,item] of n)if(!i.has(a)){e.deleted[`${s}:${a}`]=t;if(s==="items")e.deleted["term:"+ds(item)]=t}if(s==="items")for(const [a,item] of i)if(!n.has(a))delete e.deleted["term:"+ds(item)]');
  swap('const E=[...y.values()],x=E.filter', 'const E=[...y.values()].filter(item=>!S.deleted["term:"+ds(item)]),removed=y.size-E.length,x=E.filter');
  swap('x+" yeni kart · "+k+" təkrar · "+c.name', 'x+" yeni kart · "+k+" təkrar · "+removed+" əvvəl silinmiş kart ötürüldü · "+c.name');
  swap('for(const y of V.items){const k=h.get', 'for(const y of V.items){if(c.deleted["term:"+ds(y)])continue;const k=h.get');
  fs.writeFileSync(bundle, js);
}

const htmlPath = 'dist/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('id="listLevel"')) {
  html = html.replace(/<div class="field"><label for="direction">.*?<\/select><\/div>/, '');
  html = change(html, '<option value="all">Hamısı</option><option value="active">Aktiv təkrar · 1–5</option>', '<option value="all">Bütün aktiv qutular · 1–5</option>');
  html = change(html, '<option value="new">Yeni kartlar</option>', '<option value="new">3 · Toxunulmamış</option>');
  html = change(html, '<select id="listCefr"', '<select id="listKind" aria-label="Kart növü"><option value="all">Söz və ifadələr</option><option value="word">Sözlər</option><option value="phrase">İfadələr</option></select><select id="listLevel" aria-label="Yaddaş səviyyəsi"><option value="all">Bütün qutular</option><option value="weak">Zəiflər · 1–2</option><option value="new">3 · Toxunulmamış</option><option value="neutral">3 · Yenidən neytral</option>' + [1,2,3,4,5,6].map(level => '<option value="'+level+'">'+level+'-ci qutu</option>').join('') + '</select><select id="listCefr"');
  html = change(html, 'Təkrar üçün vaxt məhdudiyyəti yoxdur.', 'Kart qiymətləndiriləndən sonra həmin gün yenidən çıxmır. Yerli vaxtla gecə yarısından sonra təkrar açıla bilər. Ümumi məşq 1–5-ci qutuları əhatə edir. 6-cı qutunu ayrıca seç.');
  fs.writeFileSync(htmlPath, html);
}

const style = 'dist/assets/practice-features.css';
const css = fs.readFileSync(style, 'utf8');
if (!css.includes('.box-cefr')) fs.appendFileSync(style, '\n.box-cefr { display: flex; flex-wrap: wrap; gap: 4px; margin: -4px 0 6px; }\n.box-cefr button { padding: 3px 6px; font-size: .7rem; }\n#tab-library .toolbar { display: flex; flex-wrap: wrap; }\n#tab-library .toolbar select { width: auto; max-width: 100%; }\n');
const sw = 'dist/sw.js';
fs.writeFileSync(sw, fs.readFileSync(sw, 'utf8').replace(/CACHE="[^"]+"/, 'CACHE="vocabox-leitner-1"'));
