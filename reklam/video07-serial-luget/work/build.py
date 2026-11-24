import json,base64,re,sys
d=sys.argv[1]
src=open(d+'/work/reel.src.html',encoding='utf-8').read()
b64=lambda p,m:'data:%s;base64,%s'%(m,base64.b64encode(open(p,'rb').read()).decode())
logo=open(d+'/img/logo.svg',encoding='utf-8').read()
logo=re.sub(r'<svg ','<svg width="100%" height="100%" ',logo,count=1)
def uniq(s,suf):
    for i in set(re.findall(r'id="([^"]+)"',s)): s=s.replace('id="%s"'%i,'id="%s%s"'%(i,suf)).replace('url(#%s)'%i,'url(#%s%s)'%(i,suf))
    return s
words=json.load(open(d+'/soz-vaxtlari.json',encoding='utf-8'))
out=(src.replace('__WORDS__',json.dumps(words,ensure_ascii=False)).replace('__LOGO__',uniq(logo,'_a'))
     .replace('__FP1__',b64(d+'/img/fp1.jpg','image/jpeg')).replace('__FP2__',b64(d+'/img/fp2.jpg','image/jpeg')).replace('__FP3__',b64(d+'/img/fp3.jpg','image/jpeg'))
     .replace('__BOXES__',b64(d+'/img/boxes.png','image/png')).replace('__T1__',b64(d+'/img/toast1.png','image/png')).replace('__T2__',b64(d+'/img/toast2.png','image/png')))
open(d+'/work/reel.html','w',encoding='utf-8').write(out);print('ok',len(out))
