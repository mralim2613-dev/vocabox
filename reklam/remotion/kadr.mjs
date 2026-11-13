// Kadr render və pano (brauzer lazım deyil, Linux/bulud üçün).
// İstifadə:
//   node kadr.mjs skriptN --kadrlar 30,60,90        tək kadrlar → cikti/skriptN_kadr/
//   node kadr.mjs skriptN --kadrlar 30,60,90 --pano  + pano → cikti/skriptN_kadrlar.jpg
//   node kadr.mjs skriptN --say 48                   bərabər aralıqla 48 kadr + pano → cikti/skriptN_pano.jpg
//   node kadr.mjs skriptN --klise                    klişe testi: 0, 1, 3, 6, 10 san. və son kadr → cikti/skriptN_klise.jpg
//   node kadr.mjs sablon --komp FontTesti            şrift testi → cikti/sablon_FontTesti.png
// Seçimlər: --olcu 0.5 (kadr miqyası), --sutun 8 (pano sütunu)
import {cpSync, mkdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {KOK, bayraqlar} from './ortak.mjs';

const o = bayraqlar(process.argv.slice(2));
const skript = o._[0];
if (!skript) { console.error('İstifadə: node kadr.mjs skriptN [--kadrlar 1,2] [--say 48] [--klise] [--pano] [--komp X]'); process.exit(1); }
const komp = o.komp || 'Video';
const inputProps = {sessiz: true};
const cikti = path.join(KOK, 'cikti');
mkdirSync(cikti, {recursive: true});

console.log('Bundle…');
const serveUrl = await bundle({entryPoint: path.join(KOK, 'src', skript, 'index.ts'), publicDir: path.join(KOK, 'public')});
const comp = await selectComposition({serveUrl, id: komp, inputProps});

if (komp !== 'Video') {
  const out = path.join(cikti, `${skript}_${komp}.png`);
  await renderStill({composition: comp, serveUrl, output: out, frame: 0, inputProps, imageFormat: 'png'});
  console.log('Hazırdır:', path.relative(KOK, out));
  process.exit(0);
}

const N = comp.durationInFrames, fps = comp.fps;
let kadrlar, ad;
if (o.klise) { kadrlar = [0, 1, 3, 6, 10].map((s) => Math.min(N - 1, s * fps)).concat(N - 1); ad = 'klise'; }
else if (o.say) { const n = +o.say; kadrlar = Array.from({length: n}, (_, i) => Math.min(N - 1, Math.round((i + 0.5) * N / n))); ad = 'pano'; }
else if (o.kadrlar) { kadrlar = String(o.kadrlar).split(',').map(Number); ad = 'kadrlar'; }
else { console.error('--kadrlar, --say və ya --klise ver.'); process.exit(1); }
kadrlar = [...new Set(kadrlar)];

const olcu = +(o.olcu ?? (o.say || o.klise ? 0.25 : 0.5));
const kadrDir = path.join(cikti, `${skript}_kadr`);
mkdirSync(kadrDir, {recursive: true});
const fayllar = [];
for (const f of kadrlar) {
  const out = path.join(kadrDir, `k_${String(f).padStart(4, '0')}.jpg`);
  await renderStill({composition: comp, serveUrl, output: out, frame: f, scale: olcu, inputProps, imageFormat: 'jpeg', jpegQuality: 85});
  fayllar.push(out);
  process.stdout.write(`  kadr ${f} (${(f / fps).toFixed(1)} san.)\n`);
}

if (o.pano || o.say || o.klise) {
  // Kadrları public/_pano-ya köçür, Pano kompozisiyası ilə şəbəkə qur
  const pDir = path.join(KOK, 'public', '_pano');
  rmSync(pDir, {recursive: true, force: true});
  mkdirSync(pDir, {recursive: true});
  const resimler = fayllar.map((f) => { const n = path.basename(f); cpSync(f, path.join(pDir, n)); return `_pano/${n}`; });
  const sutun = +(o.sutun ?? (o.klise ? 6 : 8));
  const en = 240, hund = Math.round(en * comp.height / comp.width);
  const pUrl = await bundle({entryPoint: path.join(KOK, 'src', 'pano', 'index.tsx'), publicDir: path.join(KOK, 'public')});
  const props = {resimler, etiketler: kadrlar.map((f) => `${(f / fps).toFixed(1)}s`), sutun, en, hund};
  const pComp = await selectComposition({serveUrl: pUrl, id: 'Pano', inputProps: props});
  const out = path.join(cikti, `${skript}_${ad}.jpg`);
  await renderStill({composition: pComp, serveUrl: pUrl, output: out, frame: 0, inputProps: props, imageFormat: 'jpeg', jpegQuality: 88});
  rmSync(pDir, {recursive: true, force: true});
  console.log('Pano:', path.relative(KOK, out));
} else console.log('Kadrlar:', path.relative(KOK, kadrDir));
