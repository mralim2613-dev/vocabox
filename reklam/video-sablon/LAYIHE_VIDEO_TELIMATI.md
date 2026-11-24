---
name: layihe-video
description: İstənilən layihə üçün hazır skriptdən Reels, Shorts, TikTok və tanıtım/lansman videoları hazırla — brend rəngləri, loqo, şrift və məhsul görüntüləri aktiv layihənin fayllarından avtomatik götürülür; ElevenLabs səsləndirmə, Epidemic Sound musiqi və effektləri, sözə bağlı yaşıl altyazı, irəliləyiş xətti, 30 FPS kadr-kadr render. İstifadəçi “reels düzəlt”, “video hazırla”, “tanıtım animasiyası”, “bu skripti videoya çevir”, “promo”, “lansman videosu”, “sosial media üçün video” deyəndə və ya skript/hook şəkli göndərəndə, hətta “video” sözünü işlətməsə belə animasiyalı sosial paylaşım istəyəndə bu təlimatı tətbiq et.
---

# Layihə videosu (universal)

Məqsəd: hər layihədə **eyni texnika və keyfiyyət**, amma **həmin layihənin öz brendi** ilə video. Brendi (loqo, rənglər, şrift, ad, məhsul görüntüsü) aktiv layihənin fayllarından tap; heç vaxt başqa layihənin brendini işlətmə.

İstifadəçi developer olmaya bilər: hər addımdan sonra sadə dildə nəyin dəyişdiyini və necə yoxlayacağını qısa izah et. İstifadəçi başqa dildə yazırsa, həmin dildə cavab ver.

---

## 1. Dəyişməz qaydalar

Bu qaydalar layihədən asılı deyil. Yalnız istifadəçi açıq şəkildə istəsə dəyiş.

**Skript.** İstifadəçinin verdiyi skriptlə işlə: sözləri, sırasını və mənasını dəyişmə, yeni skript yazma. Skript yoxdursa, istifadəçidən istə.

**Səs.**
- Səsləndirməni ElevenLabs MCP ilə, `eleven_v4` modelində et.
- Xüsusi göstəriş yoxdursa, səs **“Abbas - Engaging Delivery”**dir (`creative_list_voices(search="Abbas")`). Skript başqa dildədirsə, həmin dildə danışan səs seç və bunu istifadəçiyə de.
- Fon musiqisini və səs effektlərini Epidemic Sound MCP ilə seç və yüklə. Bağlantı yoxdursa, hansı səs işinin gözlədiyini de və səhnələr üzərində davam et. Başqa xidmətə keçmə, səsin hazır olduğunu iddia etmə.
- Musiqinin və hər effektin montaj üçün seçilmiş səviyyəsini bir dəfə **×1,5** et (təxminən +3,5 dB). ElevenLabs səsinə bu artımı tətbiq etmə.

**Format.**
- Kadr tezliyi 30 FPS-dir. Reels/Shorts/TikTok üçün ölçü 1080×1920-dir. Tanıtım videosunda format deyilməyibsə, yenə şaquli et.
- Bütün video boyu aşağıda tək, kənardan kənara bir irəliləyiş xətti olsun. Qalınlığı 10 px-dir, səhnə keçidlərində sıfırlanmır.
- Xəttin doluluq düsturu: `u = clamp(t/T,0,1)`, `fill = (1 − 4^(−u)) / (1 − 1/4)`. Başlanğıc sürəti son sürətdən 4 dəfə yüksəkdir.

**Altyazı.**
- Ekranda eyni anda 1–3 sözlük bir sətir göstər, ən çox 24 simvol. Sətir durğu işarəsində bitsin.
- Deyilən sözün arxasında **yaşıl** fon (#16A34A, ağ mətn) olsun, yalnız həmin sözün səsdəki intervalında.
- Böyük altyazı paneli olmasın, sözlər yerində oynamasın.

**Vaxtlama.**
- Hər səhnə hadisəsini skriptin sözünə bağla. Söz vaxtları ayrıca `soz-vaxtlari.json` faylında saxlanır.
- Hərəkət sözdən 0–3 kadr qabaq başlaya bilər (ən çox 0,10 s). Altyazının yaşıl vurğusu isə sözün öz intervalındadır.
- Kamera hərəkəti ən azı 0,7 s çəksin, yumşaq başlayıb yumşaq dayansın.
- İlk kadr qısa müddət sabit qalsın. Tam donuq kadr 3 s-dən çox çəkməsin.

**Təhlükəsiz zona.** Oxunan hər şey y 250–1536 arasında olsun. Aşağı yarıda sağdakı 140 px-i boş saxla, orada platformanın düymələri olur.

**Vurğu.** Skriptin dilində hər sözün vurğulu hecasını ayrıca yoxlama qeydində göstər. Azərbaycan dili üçün orfoepiya normalarının 6-cı bölməsinə əsaslan. ElevenLabs-ə gedən mətndə vurğu üçün apostrof, kəskin vurğu və ya əlavə simvol işlətmə, mətni adi orfoqrafiyada saxla. Hər cümlənin əsas fikir sözünü və tonun istiqamətini qeyd et.

**Dürüstlük.** Yalnız yoxladığın render və səs barədə nəticə bildir. Yoxlaya bilmədiyini (məs. tələffüzü qulaqla) açıq de. Sxematik məlumatı ("Sol 3 / Sağ 7" kimi) sxematik kimi qeyd et. Uydurma rəqəm, rəy və ya iddia əlavə etmə.

---

## 2. Brendi layihədən çıxar (ən vacib yeni addım)

Hər şeydən əvvəl aktiv layihəni oxu və `brend.md` faylına yaz. Aşağıdakı yerlərə ardıcıl bax; birinci tapılan etibarlı mənbəni götür və mənbəni qeyd et.

| Nə | Harada axtar |
|---|---|
| **Ad, şüar** | `app.json`/`app.config.*` (`name`), `package.json` (`name`, `description`), `README*`, `<title>` və `<meta name="description">`, `manifest.json`, landing səhifənin hero mətni |
| **Loqo** | Adında `logo`/`brand`/`icon` olan SVG/React komponentləri (`components/*Logo*`, `BrandFullLogo`, `LogoIcon`), `assets/`, `public/`, `static/`, `src/assets/` qovluqlarındakı `logo.svg/png`, `favicon.svg`, `app.json` → `icon`, `adaptive-icon`, `apple-touch-icon` |
| **Rənglər** | Tema faylları: `theme.ts/js`, `colors.ts`, `tailwind.config.*` (`theme.extend.colors`), CSS `:root{--...}` dəyişənləri, `styles/variables.scss`, MUI/Chakra tema obyektləri, `app.json` → `splash.backgroundColor`/`primaryColor` |
| **Şrift** | `@font-face`, Google Fonts linkləri, `expo-font`/`useFonts`, `tailwind fontFamily`, `next/font`, `package.json`-dakı `@fontsource/*`, `assets/fonts/` |
| **Məhsul görüntüsü** | Əsas ekranlar (`app/`, `pages/`, `src/screens/`), mövcud ekran şəkilləri (`screenshots/`, `playstore_assets/`, `docs/`), demo videolar, layihənin veb versiyası (lokal işə sal və Playwright ilə çək) |

**React/TSX loqosu:** `<Path d="...">` və `fill` dəyərlərini çıxarıb adi inline SVG-yə çevir. `fill={colors.primary}` kimi istinadları tema faylından həll et.

**Tema faylı yoxdursa, rəngləri loqodan çıxar:**
```bash
python3 - <<'PY'
from PIL import Image
im=Image.open('logo.png').convert('RGBA');im.thumbnail((256,256))
px=[p[:3] for p in im.getdata() if p[3]>200 and not (p[0]>240 and p[1]>240 and p[2]>240)]
q=Image.new('RGB',(len(px),1));q.putdata(px);q=q.quantize(5)
pal=q.getpalette()[:15];cnt=sorted(q.getcolors(),reverse=True)
print(['#%02x%02x%02x'%tuple(pal[i*3:i*3+3]) for _,i in cnt])
PY
```
(SVG-dirsə `fill`/`stroke` dəyərlərini sayıb ən çox işlənəni götür.)

**Rolları təyin et** (`brend.md`-də cədvəl):
- `--p`: əsas rəng, ən doymuş brend rəngi.
- `--pd`: əsas rəngin tünd variantı, kölgə və basılmış düymə üçün.
- `--pl`: əsas rəngin ~92% açıq variantı, açıq fon üçün.
- `--y`: vurğu rəngi, ikinci brend rəngi. Yoxdursa, əsas rəngə uyğun isti tamamlayıcı rəng seç və bunu qeyd et.
- `--yd`: vurğunun tünd variantı.
- `--tx`: mətn rəngi, əsas rəngin çox tünd variantı (məs. L≈12%).
- `--mu`: ikinci dərəcəli mətn rəngi.

Kontrast yoxla: mətn ağ fonda ≥ 4.5:1, ağ mətn `--p` üstündə ≥ 4.5:1 olmalıdır. Çatmırsa, tonu tündləşdir və qeyd et.

**Dayan və soruş**, əgər:
- loqo tapılmırsa;
- bir neçə loqo var və hansının əsas olduğu aydın deyilsə;
- tapılan rənglər bir-birinə zidd gəlirsə (məs. tema ilə loqo fərqlidirsə).

Bu halda bir mesajda tapdıqlarını göstər və istifadəçidən seçmək istə.

`brend.md` nümunəsi:
```
Ad: X · Şüar: "..." (mənbə: README.md:3)
Loqo: components/BrandLogo.tsx → assets/logo.svg (inline SVG-yə çevrildi)
Rənglər: --p #1E6FFF (theme.ts:12) · --pd #0B47B8 · --pl #EAF1FF · --y #FFB020 (theme.ts:20) · --tx #0C1A33 · --mu #5B6B85
Şrift: Poppins (app/_layout.tsx useFonts) — yoxdursa Inter
Məhsul görüntüləri: playstore_assets/screenshots/*.jpg, lokal veb: npm run web → http://localhost:8081
```

---

## 3. Vizual üslub (sabit qalır, rənglər brenddən gəlir)

Üslub təmiz və qatlı olsun: yumşaq kölgələr, yuvarlaq kartlar. Kağız teksturası və neon qradiyent işlətmə.
- **Fon:** `#fff`, üstündə `radial-gradient(ellipse 950px 760px at 50% 42%, var(--pl), #fff 72%)`. Brendin fonu tünddürsə, eyni quruluşu tünd tonlarla qur.
- **Kart:** ağ fon, radius 36 px, kölgə `0 18px 50px rgba(<--p RGB>,.13), 0 0 0 2px <--pl>`.
- **Pill (nəticə nişanı):** radius 999, 48 px 800 qalınlıq. Fonu `--p` və ya `--y` olur, "back" easing ilə açılır.
- **Çip:** ağ fon, 2 px açıq haşiyə. Aktiv halda `--p`, seçilmiş halda `--y`.
- **Toxunma göstəricisi:** ağ dairə və `--p` rəngli halqa. Basanda 0,82 ölçüyə enir, `--y` rəngli dalğa yayılır.
- **Telefon çərçivəsi:** rəng `--tx`-ə yaxın tünd ton, radius 60, ekran radiusu 46.
- **Qatlar:** fon işığı → orta plan (kartlar, səhnə) → ön plan (izlənən obyekt, kölgə, toxunma).
- **Şrift:** brend şrifti. Tapılmasa və ya lazımi hərfləri (məs. Ə ğ ı İ ö ş ü ç) dəstəkləməsə, Inter işlət. Ölçülər: başlıq 54–76 px 800 qalınlıq, altyazı 66 px 800.
- **Hərəkət:**
  - giriş 0,35–0,45 s (ease-out), çıxış 0,25–0,35 s;
  - sıçrayış parabolası `−4·h·u·(1−u)`, üstəlik kiçik ikinci sıçrayış;
  - ardıcıl elementlər arasında 0,1–0,2 s fasilə.
- **İzlənən obyekt:** hər video üçün bir əsas obyekt seç (top, kart, sənəd, məhsul) və səhnələri onunla bağla. Hook-dakı obyekt sonda geri qayıda bilər.
- **Real məhsul:** ən azı bir səhnədə layihənin real UI-ı, sayt və ya məhsul görüntüsü görünsün. İctimai videoda şəxsi məlumatı uydurma nümunə ilə əvəz et.

---

## 4. İş axını

1. **Brend** — 2-ci bölmə → `brend.md`.
2. **Material** — skript (`skript.txt`), hook/CTA şəkilləri, yayım yeri, çağırış. Çatışmayanları bir mesajda soruş; əldə olanı təkrar istəmə.
3. **Vurğu qeydi** — `vurgu-yoxlama.md`.
4. **Səsləndirmə** — `creative_generate_speech(model_id="eleven_v4", voice_id=<Abbas>)`.
   - Mətnin başına bir ümumi oxunuş teqi qoy (məs. `[curious] [engaging]`).
   - Əlavə teq yalnız vacib məna keçidlərinə: tanıtım hissəsinə `[excited]`, CTA-ya `[warmly]`.
   - Standart olaraq 2 variant gəlir. Təkrar çağırma, çünki hər çağırış kredit xərcləyir.
5. **Söz vaxtları:**
   - `creative_add_flow_asset_node(modality="audio", generation_id=…)` ilə node yarat.
   - Sonra `creative_transcribe_audio(model_id="eleven_scribe_v1", connect_from=[node])` çağır.
   - Nəticəni `creative_get_flow_run_status` ilə gözlə və `words` siyahısını götür.
   - Fasilələri ölç: `ffmpeg -i vo.mp3 -af silencedetect=noise=-38dB:d=0.18 -f null -`. Fikirlər arası fasiləsi 0,2–0,45 s olan variantı seç.
   - Diqqət: transkripsiya skriptin mətnini olduğu kimi qaytarır. Bu, səsin skriptə uyğunlaşdırılmasıdır, tələffüzün yoxlanması deyil. Tələffüzü istifadəçinin dinləməsini xahiş et.
6. **Musiqi və effektlər** — `SearchRecordings` (vokalsız, mövzuya uyğun ovqat), `SearchSoundEffects` (yalnız ekranda görünən hərəkətlər üçün), sonra `DownloadRecording`/`DownloadSoundEffect`. Linklər ~15 dəqiqəyə köhnəlir: dərhal yüklə, köhnəlibsə yükləmə linkini yenidən al.
7. **Stil kartı** — `stil-karti.md`:
   1. əsas fikir və onu göstərən vizual üsul;
   2. material, səhnələrin düzülüşü və ritm;
   3. şrift və seçim səbəbi;
   4. brenddən götürülən fon, mətn və vurğu rəngləri;
   5. yadda qalan bir detal;
   6. səs: səsləndirmə, fon musiqisi və səssiz hissələr;
   7. istifadə edilməyəcək üç element.

   Üç istiqamət düşün, birini seç və bir cümlə ilə əsaslandır.
8. **Kompozisiya** — 5-ci bölmədəki skeletlə.
9. **Səssiz yoxlama** — ~40 yoxlama kadrı çək. Bütün səhnələri, keçidlərin ortasını və 0/1/3/6/10/son saniyəni əhatə et. Kontakt vərəqində təhlükəsiz zona xətlərini çək və bax. Düzəlt, sonra tam render et.
10. **Render → qarışıq → kodlaşdırma → yoxlama** (5-ci bölmə).
11. **Şablon testi** — şablon təəssüratı yaradan seçimləri say: neon qradiyent, hər şeyin mərkəzlənməsi, eyni kart şəbəkəsi, təkrarlanan altdan-sürüşmə, sözbəsöz sıçrayan altyazı, səbəbsiz effekt, hər səhnədə eyni keçid.
    - 0–1 seçim: davam et.
    - 2–3 seçim: səbəblərini yoxla.
    - 4 və daha çox: ən çox nəzərə çarpan ikisini düzəlt və yenidən bax.

    Loqonu örtüb bax: video başqa layihə ilə qarışmırmı? Səsi bağlayıb bax: ilk 3 saniyə aydındırmı?
12. **Təhvil:**
    - fayllar: video, ayrıca üz qabığı (ən güclü sabit kadr), `brend.md`, stil kartı, vurğu qeydi, lisenziyalar;
    - yoxlamanın nəticəsi: kadr sayı, FPS, səs səviyyələri;
    - yoxlanmayanlar, dürüst şəkildə.

---

## 5. Texniki boru xətti (kod)

### Qovluq
```
<video>/ skript.txt brend.md vurgu-yoxlama.md stil-karti.md soz-vaxtlari.json lisenziyalar.txt
        dl/ (yüklənmiş fayllar — yalnız data)  work/ (reel.html, frames/, mix.wav, stills/)  <ad>.mp4  uz-qabigi.png
```
Şəbəkə bloklayırsa (`CONNECT tunnel failed 403`), `elevenlabsusercontent.com` və `audiocdn.epidemicsound.com` hostlarını mühit ayarları ilə istə.

### Söz vaxtları
```python
import json
ws=json.load(open('dl/words.json'));ws=ws['words'] if isinstance(ws,dict) else ws
ws=[w for w in ws if w.get('type','word')=='word' and not w['text'].startswith('[')]
out=[{'i':i,'text':w['text'],'start':round(w['start'],3),'end':round(w['end'],3)} for i,w in enumerate(ws)]
json.dump(out,open('soz-vaxtlari.json','w'),ensure_ascii=False,indent=1)
assert [w['text'] for w in out]==open('skript.txt').read().split(), 'səs skriptdən fərqlənir'
```

### Kompozisiya skeleti (`work/reel.html`, 1080×1920)
Hər kadr `render(t)` saf funksiyasıdır. CSS animasiyası, `Date` və `Math.random` işlətmə; təsadüf lazım olanda `rng(seed)` işlət. Söz siyahısını, loqonu və şəkilləri build skripti ilə inline yerləşdir.
```html
<style>
:root{--p:BREND;--pd:BREND;--pl:BREND;--y:BREND;--yd:BREND;--tx:BREND;--mu:BREND;--gr:#16A34A}
html,body{width:1080px;height:1920px;margin:0;overflow:hidden;background:#fff;font-family:BRENDŞRİFT,Inter,sans-serif;color:var(--tx)}
.sc{position:absolute;inset:0;display:none}
#cap{position:absolute;left:40px;right:40px;top:1418px;text-align:center;font-weight:800;font-size:66px;line-height:1.25}
#cap b{display:inline-block;padding:2px 16px;margin:0 2px;border-radius:16px;text-shadow:0 0 12px #fff,0 2px 0 #fff}
#cap b.on{background:var(--gr);color:#fff;text-shadow:none}
#prog{position:absolute;left:0;bottom:0;height:10px;background:var(--p)}
</style>
<script>
const WORDS=/*soz-vaxtlari.json*/[],OFF=0.4,LEAD=2/30;              // OFF: səsin videoda başladığı an
const TT=Math.ceil((WORDS.at(-1).end+OFF+2)*30)/30;
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a)),lerp=(a,b,x)=>a+(b-a)*x;
const eo=x=>1-(1-x)**3,eio=x=>x<.5?4*x**3:1-(-2*x+2)**3/2,back=x=>1+2.70158*(x-1)**3+1.70158*(x-1)**2;
const rng=s=>()=>(s=s*16807%2147483647)/2147483647;
const norm=s=>s.toLowerCase().replace(/[.,?!:;“”"«»]/g,'');
function Wd(w,n=1){let c=0;for(const x of WORDS)if(norm(x.text)===w&&++c===n)return x;throw Error('söz yoxdur: '+w)}
const W=(w,n)=>Wd(w,n).start+OFF, WE=(w,n)=>Wd(w,n).end+OFF;
const E={/* hadisələr yalnız sözlərdən: kick:W('penalti')-LEAD, cta:W('şərhə') ... */};
// altyazı: 1–3 söz, ≤24 simvol, durğuda bitir
const CH=[];{let c=[];const L=a=>a.reduce((s,i)=>s+WORDS[i].text.length+1,0);
 WORDS.forEach((w,i)=>{if(c.length&&L(c)+w.text.length>24){CH.push(c);c=[]}c.push(i);if(c.length===3||/[.,?!]$/.test(w.text)||i===WORDS.length-1){CH.push(c);c=[]}})}
function caption(t){const el=document.getElementById('cap');let k=-1;CH.forEach((c,j)=>{if(t>=WORDS[c[0]].start+OFF-.02)k=j});
 if(k<0)return el.innerHTML='';const last=WORDS[CH[k].at(-1)],nx=CH[k+1];
 if(t>last.end+OFF+.6&&(!nx||t<WORDS[nx[0]].start+OFF-.02))return el.innerHTML='';
 const h=CH[k].map(i=>{const w=WORDS[i];return `<b${t>=w.start+OFF&&t<w.end+OFF?' class="on"':''}>${w.text}</b>`}).join('');if(el.innerHTML!==h)el.innerHTML=h}
function show(id,t,a,b){const el=document.getElementById(id);if(t<a||t>=b){el.style.display='none';return 0}
 el.style.display='block';el.style.opacity=Math.min(eo(seg(t,a,a+.4)),1-seg(t,b-.35,b));return 1}
function render(t){caption(t);document.getElementById('prog').style.width=(1080*(1-4**-cl(t/TT))/(1-1/4))+'px';
 /* if(show('HOOK',t,-1,E.x+.4)){...}  — kamera: scale/translate, eio, ≥0.7 s */}
window.render=render;window.E=E;window.TT=TT;
</script>
```
İzlənən obyektin dünya koordinatını kamera transformu ilə ekran koordinatına çevir: `x'=(x−cx)·s+cx`.

### Yoxlama kadrları və tam render (Playwright)
```js
// node frames.js reel.html out <başla_s> <bitir_s>     — 3 prosesi paralel işə sal
const {chromium}=require('playwright');const [,,html,out,a,b]=process.argv;
(async()=>{const br=await chromium.launch(),p=await br.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+require('path').resolve(html));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
 for(let f=Math.round(a*30);f<Math.round(b*30);f++){await p.evaluate(t=>render(t),f/30);
  await p.screenshot({path:`${out}/f${String(f).padStart(4,'0')}.png`})}await br.close()})();
```
Yoxlama kadrları üçün eyni kodu seçilmiş anlarla işlət. Kontakt vərəqinə qırmızı xətt çək: y=250, y=1536 və düzbucaqlı [940,960,1080,1920].

### Səs qarışığı (ffmpeg)
```python
# S=[(vaxt_s,'dl/kick.wav',seçilmiş_səviyyə,'fade'?)...]; MUS=0.06 (başlanğıc); BOOST=1.5; T=müddət; OFF=0.4
fl=[f'[0:a]aresample=48000,aformat=channel_layouts=stereo,adelay={int(OFF*1000)}|{int(OFF*1000)},apad,atrim=0:{T}[v]',
    f'[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{T},asetpts=PTS-STARTPTS,volume={MUS*BOOST},afade=t=in:d=0.6,afade=t=out:st={T-2.2}:d=2.2[m]']
for i,(t,f,v,*o) in enumerate(S,2):
    fd=',afade=t=out:st=1.6:d=0.9' if o else ''
    fl.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo{fd},volume={v*BOOST},adelay={int(t*1000)}|{int(t*1000)}[s{i}]')
fl+=['[m]'+''.join(f'[s{i}]' for i in range(2,len(S)+2))+f'amix=inputs={len(S)+1}:normalize=0:duration=first[bed]',
     '[v][bed]amix=inputs=2:normalize=0:duration=first[a]']
# ffmpeg -i vo.mp3 -t T -i music.mp3 -i sfx1 ... -filter_complex ';'.join(fl) -map [a] -c:a pcm_s16le mix.wav
```
Yoxla:
- `ffmpeg -i X -af ebur128=peak=true -f null -`;
- musiqi danışıqdan ≥ 10 dB aşağı olsun (başlanğıc kimi 0,06 seçimi ~11 dB verdi);
- ən yüksək nöqtə ≤ −1 dBFS olsun. Keçirsə, zərbə kimi kəskin effektləri ~0,45-ə endir.

Ümumi səviyyə ~−24 LUFS çıxır. Daha yüksək versiya istənsə, bunun səsləndirməni də qaldıracağını istifadəçiyə de.

### Kodlaşdırma və son yoxlama
```bash
ffmpeg -y -framerate 30 -i work/frames/f%04d.png -i work/mix.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 18 \
  -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -t $T -movflags +faststart video.mp4     # -shortest İŞLƏTMƏ (kadr kəsir)
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames,r_frame_rate -show_entries format=duration -of compact video.mp4
```
Kadr sayı `T×30`, `r_frame_rate` isə `30/1` olmalıdır. Sonra 0/1/3/6/10/son saniyələrdən kadr çıxarıb bax.

### Bilinən tələlər
- **SVG id toqquşması.** Eyni SVG səhifədə bir neçə dəfə olanda və ya `<defs>` `display:none` səhnədə qalanda, `url(#id)` boş çıxır və element solğun görünür. Hər nüsxəyə unikal id ver, hər səhnəyə öz `<defs>` qoy.
- **Kamera yaxınlaşanda izlənən obyekt altyazı zonasına düşə bilər.** Həmin müddətdə onu gizlət.
- **Kiçik şəkil.** Hook şəkli 600 px-dən kiçikdirsə, Lanczos ilə ×3 böyüt və yüngül unsharp ver. İstifadəçidən böyük versiya istə.
- **Gizli səhnə.** Görünməyən səhnəni `display:none` et, `visibility:hidden` yox.
- **Uzun render.** ~2000 kadr təxminən 10 dəqiqə çəkir. Fonda işlət və bitməsini gözlə.
- **Yeniləmə.** Səs yenilənəndə söz vaxtlarını yenidən çıxar. Hadisələr `W()` ilə bağlı olduğu üçün avtomatik köçür.

---

## 6. Lisenziyalar
`lisenziyalar.txt`-yə aşağıdakıları yaz:
- səsləndirmə: ElevenLabs, model və səs adı;
- Epidemic Sound treklərinin adları və müəllifləri;
- effektlər;
- istifadə olunan açıq lisenziyalı şəkillər və onların lisenziyası;
- istifadəçinin verdiyi materiallar.

İstifadəçiyə xatırlat: Epidemic Sound materialları onun hesabının lisenziyası ilə işlənir, paylaşmadan əvvəl kanalının hesaba bağlı olduğunu yoxlasın.
