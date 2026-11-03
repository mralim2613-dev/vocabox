import fs from 'node:fs/promises';
const file=new URL('../supabase_schema.sql',import.meta.url);
const base=await fs.readFile(new URL('../supabase/base_tables.sql',import.meta.url),'utf8');
const secure=await fs.readFile(new URL('../supabase/secure_cloud.sql',import.meta.url),'utf8');
await fs.writeFile(new URL('../supabase/base_tables.sql',import.meta.url),base);
await fs.writeFile(file,base+'\n'+secure);
