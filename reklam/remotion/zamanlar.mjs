// Səs faylının cümlə sərhədlərindən (sükut analizi ilə ölçülüb) söz vaxtları çıxarır.
// ElevenLabs timestamp API-si olmadığı üçün söz vaxtları cümlə daxilində hərf sayına görə paylanır.
// İstifadə: node zamanlar.mjs public/skript1
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

const dir = process.argv[2];
// [başlanğıc, son] — hər sətir üçün, ses.mp3 üzərində ölçülüb.
// Qovluqda setirler.json varsa ondan oxunur, yoxsa Skript 1-in vaxtları işlənir.
const SETIRLER = existsSync(`${dir}/setirler.json`) ? JSON.parse(readFileSync(`${dir}/setirler.json`, 'utf8')) : [
  [0.10, 1.04], [1.56, 3.24], [3.76, 4.90], [5.44, 7.18], [7.48, 9.48],
  [9.92, 12.64], [13.14, 14.42], [14.66, 16.22], [16.70, 17.72], [18.08, 18.98],
];
const lines = readFileSync(`${dir}/metin.txt`, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
if (lines.length !== SETIRLER.length) throw new Error(`metin.txt ${lines.length} sətir, vaxt ${SETIRLER.length}`);

const out = [];
lines.forEach((line, c) => {
  const words = line.split(/\s+/);
  const [s, e] = SETIRLER[c];
  const weight = words.map(w => w.replace(/[^\p{L}\p{N}]/gu, '').length + 1.5);
  const total = weight.reduce((a, b) => a + b, 0);
  let t = s;
  words.forEach((w, i) => {
    const d = (e - s) * weight[i] / total;
    out.push({w, s: +t.toFixed(3), e: +(t + d).toFixed(3), c});
    t += d;
  });
});
writeFileSync(`${dir}/kelimeler.json`, JSON.stringify(out, null, 1));
console.log('söz:', out.length, 'son:', out.at(-1).e, 'san.');
