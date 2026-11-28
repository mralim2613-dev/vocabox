import json,base64,re,sys
d=sys.argv[1]
src=open(d+'/work/reel.src.html',encoding='utf-8').read()
b64=lambda p,m:'data:%s;base64,%s'%(m,base64.b64encode(open(p,'rb').read()).decode())
logo=open(d+'/img/logo.svg',encoding='utf-8').read()
logo=re.sub(r'<svg ','<svg width="100%" height="100%" ',logo,count=1)
def uniq(s,suf):
    for i in set(re.findall(r'id="([^"]+)"',s)): s=s.replace('id="%s"'%i,'id="%s%s"'%(i,suf)).replace('url(#%s)'%i,'url(#%s%s)'%(i,suf))
    return s
L='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
X='U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
ff=''
for fam,base,w in [('Fraunces','fraunces',900),('Plex Mono','ibm-plex-mono',400),('Plex Sans','ibm-plex-sans',600)]:
    for sub,rng in [('latin',L),('latin-ext',X)]:
        ff+="@font-face{font-family:'%s';font-weight:%d;src:url(%s) format('woff2');unicode-range:%s}\n"%(fam,w,b64('%s/fonts/%s-%s-%d-normal.woff2'%(d,base,sub,w),'font/woff2'),rng)
words=json.load(open(d+'/soz-vaxtlari.json',encoding='utf-8'))
out=(src.replace('/*__FONTS__*/',ff).replace('__WORDS__',json.dumps(words,ensure_ascii=False)).replace('__LOGO__',uniq(logo,'_a'))
     .replace('__BOXES__',b64(d+'/img/boxes.png','image/png')))
open(d+'/work/reel.html','w',encoding='utf-8').write(out);print('ok',len(out))
