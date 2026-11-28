"""Səs qarışığı + kodlaşdırma (bütün videolarda eyni).
İstifadə (video qovluğunda): python3 -I ../video-sablon/mix.py N MUS sfx.json cixis.mp4
  N    = kadr sayı (work/frames içində), T = N/30
  MUS  = musiqi əmsalı (×1.5 BOOST avtomatik). Hədəf: musiqi danışıqdan ≥10 dB aşağı (~ -36 LUFS).
         Başlanğıc: MUS = 0.06 * 10**((-17 - musiqi_LUFS)/20) təxmini; sonra work/mus.wav ölçülür.
  sfx.json = [[saniyə, "dl/pop.wav", səviyyə], ...]  (səviyyə 0.22–0.45)
Fayllar: dl/vo.mp3 (və ya dl/vo.wav), dl/music.mp3, work/frames/f%04d.png
"""
import subprocess,sys,json,os
N=int(sys.argv[1]);MUS=float(sys.argv[2]);S=json.load(open(sys.argv[3]));OUT=sys.argv[4]
T=N/30;OFF=0.4;BOOST=1.5;VO='dl/vo.wav' if os.path.exists('dl/vo.wav') else 'dl/vo.mp3'
fl=[f'[0:a]aresample=48000,aformat=channel_layouts=stereo,adelay={int(OFF*1000)}|{int(OFF*1000)},apad,atrim=0:{T}[v]',
    f'[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{T},asetpts=PTS-STARTPTS,volume={MUS*BOOST},afade=t=in:d=0.6,volume=\'if(between(t,6.0,7.3),0.3,1)\':eval=frame,afade=t=out:st={T-2.2}:d=2.2[m]']
for i,(t,f,v) in enumerate(S,2):
    d=max(1,int(t*1000));fl.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,volume={v*BOOST},adelay={d}|{d}[s{i}]')
fl+=['[m]'+''.join(f'[s{i}]' for i in range(2,len(S)+2))+f'amix=inputs={len(S)+1}:normalize=0:duration=first[bed]','[v][bed]amix=inputs=2:normalize=0:duration=first[a]']
cmd=['ffmpeg','-y','-hide_banner','-loglevel','error','-i',VO,'-t',str(T+1),'-i','dl/music.mp3']
for _,f,_ in S: cmd+=['-i',f]
subprocess.run(cmd+['-filter_complex',';'.join(fl),'-map','[a]','-c:a','pcm_s16le','work/mix.wav'],check=True)
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-t',str(T),'-i','dl/music.mp3','-af',f'volume={MUS*BOOST}','work/mus.wav'],check=True)
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-framerate','30','-i','work/frames/f%04d.png','-i','work/mix.wav','-map','0:v','-map','1:a','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-t','%.4f'%T,'-movflags','+faststart',OUT],check=True)
for f in ['work/mix.wav','work/mus.wav']:
    r=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    print(f,[l.strip() for l in r.splitlines() if l.strip().startswith(('I:','Peak:'))][-2:])
