import json,base64,re,sys
d=sys.argv[1]
src=open(d+'/work/reel.src.html',encoding='utf-8').read()
b64=lambda p,m='image/png':'data:%s;base64,%s'%(m,base64.b64encode(open(p,'rb').read()).decode())
logo=open(d+'/img/logo.svg',encoding='utf-8').read()
logo=re.sub(r'<svg ','<svg width="100%" height="100%" ',logo,count=1)
def uniq(s,suf):
    for i in set(re.findall(r'id="([^"]+)"',s)): s=s.replace('id="%s"'%i,'id="%s%s"'%(i,suf)).replace('url(#%s)'%i,'url(#%s%s)'%(i,suf))
    return s
words=json.load(open(d+'/soz-vaxtlari.json',encoding='utf-8'))
out=src.replace('__WORDS__',json.dumps(words,ensure_ascii=False))
for k,suf in [('__LOGO1__','_a'),('__LOGO2__','_b'),('__LOGO3__','_c')]: out=out.replace(k,uniq(logo,suf))
for k,f in [('__FBR__','fb_right'),('__FBW__','fb_wrong'),('__TOP__','top'),('__PROMPT__','prompt'),('__PREVIEW__','preview'),('__BOXES__','boxes')]:
    out=out.replace(k,b64(d+'/img/%s.png'%f))
assert '__' not in re.sub(r'__proto__','',out.split('<script>')[0]), 'yer tutucu qalıb'
open(d+'/work/reel.html','w',encoding='utf-8').write(out);print('ok',len(out))
