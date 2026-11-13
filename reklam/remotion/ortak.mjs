// Skriptlər üçün ortaq köməkçilər (Windows və Linux).
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const KOK = path.dirname(fileURLToPath(import.meta.url));
const WIN = process.platform === 'win32';

// npx əmri: Windows-da shell lazımdır. Arqumentlərdə boşluq olmasın (fayl adları sadə saxlanılır).
export function npx(args, {tut = false} = {}) {
  const r = spawnSync('npx', args, {cwd: KOK, shell: WIN, encoding: 'utf8', stdio: tut ? 'pipe' : 'inherit', maxBuffer: 64 * 1024 * 1024});
  if (r.status !== 0 && !tut) throw new Error(`npx ${args.slice(0, 3).join(' ')} … uğursuz oldu (kod ${r.status})`);
  return r;
}

// Remotion-un daxili ffmpeg-i. Qeyd: -c:v / -b:a Remotion CLI tərəfindən oxunur → -vcodec / -acodec / -ab işlət.
export const ffmpeg = (args, opt) => npx(['remotion', 'ffmpeg', '-hide_banner', ...args], opt);

export function bayraqlar(argv) {
  const o = {_: []};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; o[k] = v; }
    else o._.push(a);
  }
  return o;
}
