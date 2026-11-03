import {Capacitor} from '@capacitor/core';
import {writeNativeExport} from './native-export-core.js';

export async function exportTextFile(name, text, mime='application/json') {
  if(Capacitor.isNativePlatform()) {
    const [{Filesystem,Directory,Encoding},{Share}]=await Promise.all([import('@capacitor/filesystem'),import('@capacitor/share')]);
    await writeNativeExport({Filesystem,Directory,Encoding,Share},name,text);
    return;
  }
  const blob=new Blob([text],{type:mime+';charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=name;document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}

export async function clearTemporaryExports() {
  if(!Capacitor.isNativePlatform())return true;
  const {Filesystem,Directory}=await import('@capacitor/filesystem');
  try{await Filesystem.rmdir({path:'vocabox-exports',directory:Directory.Cache,recursive:true});return true;}
  catch(error){if(/not exist|does not exist|not found|ENOENT/i.test(error.message||''))return true;console.warn('Temporary export cleanup failed:',error.message);return false;}
}
