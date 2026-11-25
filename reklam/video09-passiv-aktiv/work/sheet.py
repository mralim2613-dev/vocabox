import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob(sys.argv[1]+'/f*.png'));cols=int(sys.argv[3]) if len(sys.argv)>3 else 7
w,h=270,480;rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(cols*w,rows*(h+24)),'white');d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB');dd=ImageDraw.Draw(im)
    dd.line([(0,250),(1080,250)],fill='red',width=4);dd.line([(0,1536),(1080,1536)],fill='red',width=4);dd.rectangle([940,960,1080,1920],outline='red',width=4)
    im=im.resize((w,h));x,y=(i%cols)*w,(i//cols)*(h+24);S.paste(im,(x,y+24))
    fr=int(f.split('f')[-1][:4]);d.text((x+6,y+4),'%.2fs'%(fr/30),fill='black')
S.save(sys.argv[2])
