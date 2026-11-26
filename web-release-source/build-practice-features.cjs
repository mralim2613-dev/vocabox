const fs = require('node:fs');

function edit(path, transform) {
  const before = fs.readFileSync(path, 'utf8');
  fs.writeFileSync(path, transform(before));
}

function replace(source, before, after) {
  if (!source.includes(before)) throw new Error('Missing build hook: ' + before);
  return source.replace(before, () => after);
}

function savedCards({ getState, save, repaint, getSession, confirm, advance, notify }) {
  const list = document.getElementById('savedCards');
  const card = document.getElementById('card');
  const library = document.getElementById('vocab');
  const make = (tag, text) => Object.assign(document.createElement(tag), { textContent: text });
  const deckNames = () => new Map(getState().decks.map(deck => [deck.id, deck.name]));

  function button(text, label, action) {
    const control = make('button', text);
    control.type = 'button';
    control.className = 'small';
    control.setAttribute('aria-label', label);
    control.title = label;
    control.addEventListener('click', action);
    return control;
  }

  function toggle(id) {
    const state = structuredClone(getState());
    const saved = state.savedCards[id] > 0;
    state.savedCards[id] = (saved ? -1 : 1) * Date.now();
    if (save(state)) {
      render();
      notify(saved ? 'Siyahıdan çıxarıldı.' : 'Kart yadda saxlanıldı.');
    }
  }

  function bookmark(id) {
    const saved = getState().savedCards[id] > 0;
    const control = button(saved ? '★' : '☆', saved ? 'Siyahıdan çıxar' : 'Yadda saxla', () => toggle(id));
    control.setAttribute('aria-pressed', String(saved));
    return control;
  }

  async function removeCurrent(session, itemId) {
    if (!await confirm('“' + session.item.term + '” kartı və irəliləyişi silinsin?') ||
        getSession() !== session || session.item.id !== itemId) return;
    const state = structuredClone(getState());
    state.items = state.items.filter(item => item.id !== session.item.id);
    delete state.progress[session.item.id];
    if (state.savedCards[session.item.id] > 0) state.savedCards[session.item.id] = -Date.now();
    if (save(state)) {
      repaint();
      advance();
      notify('Kart silindi.');
    }
  }

  async function copy(item) {
    try {
      await navigator.clipboard.writeText(item.term + ' sözünü və ya ifadəsini ' +
        'gündəlik danışıqda necə işlətməyi üç nümunə cümlə ilə izah et.');
      notify('Mətn kopyalandı.');
    } catch {
      notify('Mətni kopyalamaq mümkün olmadı.');
    }
  }

  function render() {
    card.querySelector('.practice-card-tools')?.remove();
    const session = getSession();
    if (session?.item) {
      const tools = make('div', '');
      tools.className = 'practice-card-tools';
      const itemId = session.item.id;
      tools.append(bookmark(itemId), button('✕', 'Kartı sil', () => removeCurrent(session, itemId)));
      card.prepend(tools);
    }
    for (const row of library.querySelectorAll('article.vocab')) {
      row.querySelector('.library-bookmark')?.remove();
      const edit = row.querySelector('[data-edit]');
      if (!edit) continue;
      const control = bookmark(edit.dataset.edit);
      control.classList.add('library-bookmark');
      edit.before(control);
    }
    const state = getState();
    const names = deckNames();
    const bookmarked = state.items.filter(item => state.savedCards[item.id] > 0)
      .sort((a, b) => state.savedCards[b.id] - state.savedCards[a.id]);
    list.replaceChildren();
    if (!bookmarked.length) {
      list.append(make('p', 'Hələ yadda saxlanılan kart yoxdur.'));
      return;
    }
    for (const item of bookmarked) {
      const row = make('article', '');
      row.className = 'vocab';
      const description = make('div', '');
      const term = make('strong', item.term);
      term.lang = item.language;
      description.append(term, make('div', item.translation + ' · ' + names.get(item.deckId)));
      const actions = make('div', '');
      actions.className = 'row';
      actions.append(button('Mətni kopyala', 'Mətni kopyala', () => copy(item)),
        button('Siyahıdan çıxar', 'Siyahıdan çıxar', () => toggle(item.id)));
      row.append(description, actions);
      list.append(row);
    }
  }

  return render;
}

const bundle = 'dist/assets/index-BLhpsdAO.js';
edit(bundle, (original) => {
  if (original.includes('renderSavedCards')) return original;
  let js = original;
  js = replace(js, 'return{schema:c.schema,version:1,decks:_,items:k,progress:E,',
    'return{schema:c.schema,version:1,decks:_,items:k,progress:E,savedCards:Object.fromEntries(Object.entries(He(c.savedCards)).filter(([id,time])=>/^[a-zA-Z0-9_-]{1,100}$/.test(id)&&Number.isSafeInteger(time)&&time!==0).slice(0,50000)),');
  js = replace(js, 't.progress={};for(const i of n)',
    't.savedCards={...He(r.savedCards)};for(const [id,time] of Object.entries(He(e.savedCards)))if(Math.abs(time)>Math.abs(t.savedCards[id]||0))t.savedCards[id]=time;t.progress={};for(const i of n)');
  js = replace(js, 'return h==="all"||h==="weak"',
    'return h==="all"||h==="active"&&_.level<6||h==="weak"');
  js = replace(js, 'function ie(){$e(),nt(),it(),Ln(),Le()}',
    'let renderSavedCards=()=>{};function ie(){$e(),nt(),it(),Ln(),Le(),renderSavedCards()}');
  js = replace(js, 'u("deck").disabled=!0,Mr())}',
    'u("deck").disabled=!0,document.body.classList.add("in-practice"),Mr())}');
  js = replace(js, 'O=null,u("session").hidden=!0',
    'O=null,document.body.classList.remove("in-practice"),u("session").hidden=!0');
  js = replace(js, 'h.mode==="type"&&u("card").insertAdjacentHTML',
    'renderSavedCards(),h.mode==="type"&&u("card").insertAdjacentHTML');
  js = replace(js, 'u("connectionSettings").hidden=!0,accountId?',
    'renderSavedCards=(' + savedCards.toString() + ')({getState:()=>S,save:ye,repaint:ie,getSession:()=>O,confirm:De,advance:()=>{O.index++;Mr()},notify:B}),new MutationObserver(()=>renderSavedCards()).observe(u("vocab"),{childList:true}),renderSavedCards(),u("connectionSettings").hidden=!0,accountId?');
  return js;
});

edit('dist/index.html', (original) => {
  if (original.includes('id="savedCards"')) return original;
  let html = original;
  html = replace(html, '</head>', '  <link rel="stylesheet" href="/assets/practice-features.css">\n  <script defer src="/assets/mobile-navigation.js"></script>\n</head>');
  html = replace(html, '<nav aria-label="Əsas menyu">', '<button type="button" id="mobileNavButton" class="small" aria-label="Menyunu aç">☰</button><nav aria-label="Əsas menyu">');
  html = replace(html, '<button data-tab="decks">Dəstlərim</button>', '<button data-tab="decks">Dəstlərim</button><button data-tab="saved">Yadda saxlananlar</button>');
  html = replace(html, '<section id="tab-decks"', '<section id="tab-saved" hidden><div class="topline"><h1>Yadda saxlananlar</h1></div><div class="panel list" id="savedCards"></div></section>\n<section id="tab-decks"');
  html = replace(html, '<option value="weak">Zəiflər', '<option value="active">Aktiv təkrar · 1–5</option><option value="weak">Zəiflər');
  html = replace(html, '<div class="session-bar"><span id="sessionCount" class="small muted"></span><button id="endSession" class="small quiet">Bitir</button></div>', '<div class="session-bar"><h2>Məşq masası</h2><button id="endSession" class="small quiet">Bitir</button></div><p id="sessionCount" class="small muted"></p>');
  return html;
});
edit('dist/sw.js', (sw) => sw.includes('practice-features.css') ? sw :
  sw.replace(/CACHE="[^"]+"/, 'CACHE="vocabox-practice-1"')
    .replace('ASSETS=[', 'ASSETS=["/assets/practice-features.css","/assets/mobile-navigation.js",'));
