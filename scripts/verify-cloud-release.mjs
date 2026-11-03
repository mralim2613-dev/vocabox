import {loadEnv} from 'vite';
const env={...loadEnv('production',process.cwd(),''),...process.env};
const url=env.VITE_SUPABASE_URL,key=env.VITE_SUPABASE_ANON_KEY;
if(!url||!key)throw Error('EAS production environment-də VITE_SUPABASE_URL və VITE_SUPABASE_ANON_KEY təyin edilməlidir.');
if(!url.startsWith('https://'))throw Error('Production bulud ünvanı HTTPS olmalıdır.');
let role;try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url')).role}catch{}
if(key.startsWith('sb_secret_')||role==='service_role')throw Error('Server məxfi açarı frontend build-də istifadə edilə bilməz. Publishable/anon açarı seçin.');
const response=await fetch(new URL('/rest/v1/rpc/vocabox_session',url),{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({session_token:'vocabox-release-check-invalid-token'}),signal:AbortSignal.timeout(15000)});
const result=await response.json();
if(result.code!=='28000')throw Error(`Təhlükəsiz bulud RPC yoxlaması keçmədi (${result.code||response.status}). secure_cloud.sql miqrasiyasını və API konfiqurasiyasını yoxlayın.`);
console.log('Production cloud RPC exists and rejects an invalid session. A real account end-to-end test is still required.');
