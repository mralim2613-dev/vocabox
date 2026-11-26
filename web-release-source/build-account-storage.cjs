const fs = require('node:fs');

function replaceOnce(text, before, after) {
  const start = text.indexOf(before);
  if (start < 0 || text.indexOf(before, start + before.length) >= 0) {
    throw new Error('Expected one matching build hook: ' + before);
  }
  return text.slice(0, start) + after + text.slice(start + before.length);
}

const main = 'dist/assets/index-BLhpsdAO.js';
let source = fs.readFileSync(main, 'utf8');
if (!source.includes('const accountStorage=window.vocaboxAccountStorage')) {
  source = replaceOnce(source, 'async function Nl(){',
    'async function Nl(){const accountStorage=window.vocaboxAccountStorage,accountId=await accountStorage?.ready;');
  source = replaceOnce(source, 'a=n(ct()),o=null',
    'a=accountId?t+".auth."+accountId:n(ct()),o=null');
  source = replaceOnce(source, 'if(ct()&&!localStorage.getItem(a)',
    'if(!accountId&&ct()&&!localStorage.getItem(a)');
  source = replaceOnce(source, 'localStorage.getItem(a)||!ct()&&localStorage.getItem(s)',
    'localStorage.getItem(a)||!accountId&&!ct()&&localStorage.getItem(s)');
  source = replaceOnce(source, 'catch{}const P=new Set(R?',
    'catch{}if(accountId){R=await accountStorage.load(accountId,R);if(R)try{const raw=JSON.stringify(R);localStorage.setItem(a,raw);accountStorage.markLoaded(raw)}catch{}}const P=new Set(R?');
  source = replaceOnce(source, 'localStorage.setItem(a,c),$=c,q=!0,Le(),!0',
    'localStorage.setItem(a,c),$=c,q=!0,Le(),accountStorage?.save(accountId,c),!0');
  source = replaceOnce(source, 'u("connectionSettings").hidden=!0,zn(),u("bootStatus")',
    'u("connectionSettings").hidden=!0,accountId?(u("cloudAuthForm").hidden=!0,u("cloudUserSection").hidden=!0,u("cloudStatusBadge").hidden=!0):zn(),u("bootStatus")');
  source = replaceOnce(source, 'aktivdir.",await ss()}',
    'aktivdir.",accountId?(R&&accountStorage.save(accountId,JSON.stringify(R))):await ss()}');
  fs.writeFileSync(main, source);
}

const htmlPath = 'dist/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('id="accountStorageStatus"')) {
  const account = '  <script type="module" src="/assets/vocabox-account.js"></script>';
  html = replaceOnce(html, account, '');
  html = replaceOnce(html, '  <script type="module" crossorigin src="/assets/index-BLhpsdAO.js"></script>',
    account + '\n  <script type="module" crossorigin src="/assets/index-BLhpsdAO.js"></script>');
  html = replaceOnce(html, '<p id="offlineStatus" class="helper" aria-live="polite"></p>',
    '<p id="offlineStatus" class="helper" aria-live="polite"></p><p id="accountStorageStatus" class="helper" aria-live="polite"></p>');
  fs.writeFileSync(htmlPath, html);
}

const sw = 'dist/sw.js';
fs.writeFileSync(sw, fs.readFileSync(sw, 'utf8').replace('vocabox-account-5', 'vocabox-account-6'));
