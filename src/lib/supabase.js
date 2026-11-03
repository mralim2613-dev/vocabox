import {createClient} from '@supabase/supabase-js';

const PREFIX = 'vocabox.';
let clientInstance;
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
export function getSupabaseConfig() {
  return {
    url: (import.meta.env.DEV && read(PREFIX+'supabase.url')) || import.meta.env.VITE_SUPABASE_URL || '',
    key: (import.meta.env.DEV && read(PREFIX+'supabase.key')) || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
}
export function saveSupabaseConfig(url, key) {
  if(url) {
    let parsed;try{parsed=new URL(url.trim())}catch{throw new Error('Etibarlı layihə ünvanı daxil edin.');}
    const local=['127.0.0.1','localhost','[::1]'].includes(parsed.hostname);
    if((parsed.protocol!=='https:'&&!(local&&parsed.protocol==='http:'))||parsed.username||parsed.password||parsed.search||parsed.hash||parsed.pathname!=='/')throw new Error('Etibarlı HTTPS layihə ünvanı daxil edin.');
  }
  for (const [name, value] of [['url',url], ['key',key]]) {
    if(value.trim()) localStorage.setItem(PREFIX+'supabase.'+name,value.trim());
    else localStorage.removeItem(PREFIX+'supabase.'+name);
    localStorage.removeItem('soz-qutusu.supabase.'+name);
  }
  clientInstance=undefined;
}
export const getActiveUserNumber = () => read(PREFIX+'user_number') || read('soz-qutusu.user_number');
export const getActiveUserLanguage = () => read(PREFIX+'user_language') || read('soz-qutusu.user_language');
export function saveActiveUser(number, language) {
  for(const prefix of [PREFIX,'soz-qutusu.']) {
    if(number) {
      localStorage.setItem(prefix+'user_number',number.trim().toUpperCase());
      if(language)localStorage.setItem(prefix+'user_language',language);
    } else {
      localStorage.removeItem(prefix+'user_number');
      localStorage.removeItem(prefix+'user_language');
    }
  }
}
const tokenKey = number => PREFIX+'session.'+encodeURIComponent(getSupabaseConfig().url)+'.'+number.trim().toUpperCase();
export const clearCloudSession = number => { if(number)localStorage.removeItem(tokenKey(number)); };
export function getSupabase() {
  if(clientInstance)return clientInstance;
  const {url,key}=getSupabaseConfig();
  if(!url||!key)return null;
  clientInstance=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
  return clientInstance;
}
async function rpc(name, args) {
  const client=getSupabase();
  if(!client)throw new Error('Bulud bağlantısı ayarlanmayıb.');
  const {data,error}=await client.rpc(name,args);
  if(error) {
    if(error.code==='PGRST202')throw new Error('Bulud yeniləməsi tələb olunur. Təhlükəsiz SQL miqrasiyası layihəyə tətbiq edilməlidir.');
    throw new Error(error.message || 'Bulud sorğusu alınmadı.');
  }
  return data;
}
function sessionArgs(number) {
  const token=read(tokenKey(number));
  if(!token)throw new Error('Giriş açarınızla yenidən daxil olun.');
  return {session_token:token};
}
export async function verifyUserNumber(rawNumber, accessKey) {
  const number=String(rawNumber||'').trim().toUpperCase();
  if(!number)throw new Error('İstifadəçi nömrəsini daxil edin.');
  if(accessKey) {
    const result=await rpc('vocabox_login',{number,access_key:accessKey.trim()});
    localStorage.setItem(tokenKey(number),result.token);
    return {success:true,userNumber:result.user_number,language:result.language};
  }
  const result=await rpc('vocabox_session',sessionArgs(number));
  return {success:true,userNumber:result.user_number,language:result.language};
}
export async function pullCloudState(number) { return rpc('vocabox_pull',sessionArgs(number)); }
export async function pushCloudState(number, snapshot, revision) {
  return rpc('vocabox_push',{...sessionArgs(number),snapshot,expected_revision:revision});
}
export async function deleteUserAccountAndData(number) {
  const result=await rpc('vocabox_delete_account',sessionArgs(number));
  if(result!==true)throw new Error('Hesab silinmədi.');
  clearCloudSession(number);
}
export async function signOutCloud(number) {
  if(read(tokenKey(number)))await rpc('vocabox_logout',sessionArgs(number));
  clearCloudSession(number);
}
