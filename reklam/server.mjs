// Reklam animasiyaları üçün lokal server: statik faylları verir və brauzerdə yazılan videonu diskə saxlayır.
// İstifadə: node reklam/server.mjs  →  http://127.0.0.1:5180/skript1/
import http from 'node:http';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5180);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.mp3':'audio/mpeg','.png':'image/png','.json':'application/json','.mp4':'video/mp4','.webm':'video/webm'};

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (req.method === 'POST' && url.pathname === '/save') {
      const dir = path.resolve(root, url.searchParams.get('dir') || '');
      const name = path.basename(url.searchParams.get('name') || '');
      if (!dir.startsWith(root) || !/^[\w.-]+\.(webm|mp4|json|png|jpg)$/.test(name)) { res.writeHead(400); return res.end('bad name'); }
      const chunks = []; for await (const c of req) chunks.push(c);
      await writeFile(path.join(dir, name), Buffer.concat(chunks));
      res.writeHead(200); return res.end('saved ' + name);
    }
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
    res.end(data);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(port, '127.0.0.1', () => console.log('Reklam server: http://127.0.0.1:' + port + '/skript1/'));
