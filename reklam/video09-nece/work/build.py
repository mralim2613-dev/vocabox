import json,base64,re,sys
d=sys.argv[1]
src=open(d+'/work/reel.src.html',encoding='utf-8').read()
b64=lambda p:'data:image/png;base64,'+base64.b64encode(open(p,'rb').read()).decode()
logo=open(d+'/img/logo.svg',encoding='utf-8').read()
logo=re.sub(r'<svg ','<svg width="100%" height="100%" ',logo,count=1)
def uniq(s,suf):
    for i in set(re.findall(r'id="([^"]+)"',s)): s=s.replace('id="%s"'%i,'id="%s%s"'%(i,suf)).replace('url(#%s)'%i,'url(#%s%s)'%(i,suf))
    return s
MAP={'RUBAR':'ru_bar','FBR':'fb_right','FBW':'fb_wrong','MFLIP':'mode_flip','MTYPE':'mode_type','MCHOICE':'mode_choice'}
out=src.replace('__WORDS__',json.dumps(json.load(open(d+'/soz-vaxtlari.json',encoding='utf-8')),ensure_ascii=False))
for k in sorted(set(re.findall(r'__([A-Z0-9]+)__',out))):
    if k.startswith('LOGO'): out=out.replace('__%s__'%k,uniq(logo,'_'+k.lower()))
    else: out=out.replace('__%s__'%k,b64(d+'/img/%s.png'%MAP.get(k,k.lower())))
assert not re.findall(r'__([A-Z0-9]+)__',out)
open(d+'/work/reel.html','w',encoding='utf-8').write(out);print('ok',len(out))
