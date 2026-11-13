// Tam video: əvvəl səssiz render, sonra public/skriptN/ses.mp3 ffmpeg ilə birləşdirilir → cikti/skriptN.mp4
// (Windows-da Remotion render serveri localhost-u ::1 kimi açıb səsi yükləyə bilmir; bu yol hər yerdə işləyir.)
// İstifadə: node render.mjs skriptN [--concurrency 2]
import {existsSync, mkdirSync, rmSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {KOK, bayraqlar, ffmpeg, npx} from './ortak.mjs';

const o = bayraqlar(process.argv.slice(2));
const skript = o._[0];
if (!skript) { console.error('İstifadə: node render.mjs skriptN'); process.exit(1); }
if (!existsSync(path.join(KOK, 'public', skript, 'ses.mp3'))) throw new Error(`public/${skript}/ses.mp3 yoxdur`);
mkdirSync(path.join(KOK, 'cikti'), {recursive: true});

const props = `cikti/${skript}_props.json`, sessiz = `cikti/${skript}_sessiz.mp4`, son = `cikti/${skript}.mp4`;
writeFileSync(path.join(KOK, props), JSON.stringify({sessiz: true}));
npx(['remotion', 'render', `src/${skript}/index.ts`, 'Video', sessiz, `--concurrency=${o.concurrency ?? 2}`, '--overwrite', '--muted', `--props=${props}`]);
rmSync(path.join(KOK, son), {force: true});
// Diqqət: -af apad -shortest + -vcodec copy sonsuza qədər işləyir — işlətmə.
ffmpeg(['-y', '-loglevel', 'error', '-i', sessiz, '-i', `public/${skript}/ses.mp3`, '-map', '0:v', '-map', '1:a', '-vcodec', 'copy', '-acodec', 'aac', '-ab', '192k', son]);
if (!existsSync(path.join(KOK, son))) throw new Error('Səs birləşdirilmədi');
rmSync(path.join(KOK, sessiz), {force: true});
rmSync(path.join(KOK, props), {force: true});
console.log(`Hazırdır: ${son} (${(statSync(path.join(KOK, son)).size / 1e6).toFixed(1)} MB)`);
