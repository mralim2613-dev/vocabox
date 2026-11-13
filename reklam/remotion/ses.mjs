// Səsi hazırlayır: yükləyir → cümlə sərhədlərini ölçür → setirler.json → kelimeler.json.
// İstifadə:
//   node ses.mjs skriptN <ElevenLabs full_res_url | yerli .mp3 yolu> [--esik -38] [--min 0.22]
// Ön şərt: public/skriptN/metin.txt (hər sətir bir cümlə, səsdəki fasilələrə uyğun).
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {KOK, bayraqlar, ffmpeg} from './ortak.mjs';
import {spawnSync} from 'node:child_process';

const o = bayraqlar(process.argv.slice(2));
const [skript, menbe] = o._;
if (!skript || !menbe) { console.error('İstifadə: node ses.mjs skriptN <url|yol> [--esik -38] [--min 0.22]'); process.exit(1); }
const dir = path.join(KOK, 'public', skript);
mkdirSync(dir, {recursive: true});
const hedef = path.join(dir, 'ses.mp3');

// 1. Yüklə / kopyala
if (/^https?:\/\//.test(menbe)) {
  const r = await fetch(menbe);
  if (!r.ok) throw new Error(`Yükləmə alınmadı: HTTP ${r.status}. Şəbəkə icazəsini yoxla.`);
  writeFileSync(hedef, Buffer.from(await r.arrayBuffer()));
} else copyFileSync(menbe, hedef);
console.log('Səs:', path.relative(KOK, hedef));

// 2. Sükut analizi
const esik = o.esik ?? '-38', min = o.min ?? '0.22';
const r = ffmpeg(['-i', `public/${skript}/ses.mp3`, '-af', `silencedetect=noise=${esik}dB:d=${min}`, '-f', 'null', '-'], {tut: true});
const log = (r.stderr || '') + (r.stdout || '');
const dm = log.match(/Duration: (\d+):(\d+):([\d.]+)/);
const muddet = dm ? +dm[1] * 3600 + +dm[2] * 60 + +dm[3] : null;
const sukut = [];
for (const m of log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)) sukut.push([+m[1], +m[2]]);

// 3. Danışıq aralıqları = sükutların arası
const setirler = [];
let bas = sukut.length && sukut[0][0] < 0.05 ? sukut.shift()[1] : 0.05;
for (const [s, e] of sukut) { if (s - bas > 0.15) setirler.push([+bas.toFixed(2), +s.toFixed(2)]); bas = e; }
if (muddet && muddet - bas > 0.15) setirler.push([+bas.toFixed(2), +(muddet - 0.08).toFixed(2)]);

const metinYol = path.join(dir, 'metin.txt');
const satirlar = existsSync(metinYol) ? readFileSync(metinYol, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean) : [];
console.log(`Müddət: ${muddet?.toFixed(2)} san. · danışıq parçası: ${setirler.length} · metin.txt sətri: ${satirlar.length}`);
setirler.forEach(([a, b], i) => console.log(`  ${String(i).padStart(2)}  ${a.toFixed(2)}–${b.toFixed(2)}  ${satirlar[i] ?? '(metin.txt-də sətir yoxdur)'}`));
writeFileSync(path.join(dir, 'setirler.json'), JSON.stringify(setirler));

if (setirler.length !== satirlar.length) {
  console.log('\n⚠ Say uyğun gəlmir. metin.txt sətirlərini səsdəki fasilələrə görə birləşdir/böl,');
  console.log('  və ya --esik / --min dəyərini dəyiş, sonra yenidən işlət. kelimeler.json yaradılmadı.');
  process.exit(2);
}
// 4. Söz vaxtları
const z = spawnSync(process.execPath, ['zamanlar.mjs', `public/${skript}`], {cwd: KOK, stdio: 'inherit'});
process.exit(z.status ?? 0);
