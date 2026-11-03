export async function writeNativeExport({Filesystem,Directory,Encoding,Share},name,text) {
  const safe=name.replace(/[^a-zA-Z0-9._-]/g,'_');
  const file=await Filesystem.writeFile({path:`vocabox-exports/${Date.now()}-${safe}`,data:text,directory:Directory.Cache,encoding:Encoding.UTF8,recursive:true});
  await Share.share({title:name,dialogTitle:'Faylı saxla və ya paylaş',files:[file.uri]});
}
