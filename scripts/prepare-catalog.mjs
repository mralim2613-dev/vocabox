import fs from 'node:fs/promises';
const seed = JSON.parse(await fs.readFile(new URL('../src/data/seed.json', import.meta.url), 'utf8'));
const dir = new URL('../public/catalog/', import.meta.url);
await fs.mkdir(dir, {recursive:true});
const {items, ...meta} = seed;
await fs.writeFile(new URL('meta.json', dir), JSON.stringify(meta));
await fs.writeFile(new URL('../src/data/catalog-meta.json', import.meta.url), JSON.stringify(meta));
for (const language of new Set(items.map(i => i.language))) {
  await fs.writeFile(new URL(`${language}.json`, dir), JSON.stringify(items.filter(i => i.language === language)));
}
