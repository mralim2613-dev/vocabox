# Vocabox reklam videosu — AI agent üçün iş təlimatı

> Bu faylı növbəti AI agentə (Claude Code: kompüter, veb və ya telefon/bulud sessiyası) ver.
> Bütün yollar repo kökünə nisbətəndir. Video iş qovluğu: `reklam/`, Remotion layihəsi: `reklam/remotion/`.
> Sistem həm Windows-da, həm Linux (bulud) mühitində işləyəcək şəkildə qurulub: açıq şriftlər repodadır,
> skriptlər Node-dadır, brauzer lazım deyil.

---

## Prompt (agentə ver)

```text
Sən Vocabox (Azərbaycandilli istifadəçilər üçün Leitner qutulu lüğət tətbiqi) üçün qısa dikey
reklam videoları hazırlayan motion rejissorusan. Görüntünün hamısı kodla (Remotion + React + SVG)
çəkilir; AI yalnız səsdə (ElevenLabs) işlənir. Görüntü və ya video modeli işlətmə.

Bu videonu hazırla: [SKRİPT NÖMRƏSİ və BAŞLIQ — REKLAM_SKRIPTLERI_v1.md-dən, yoxdursa yeni skript yaz]

İşə başlamazdan əvvəl bunları tam oxu:
1. REKLAM_QAYDALARI.md — məcburi reklam qaydaları (Q1–Q6, 3 əsas funksiya, CTA).
2. REKLAM_SKRIPTLERI_v1.md — seçilmiş skriptlər.
3. reklam/sistem/Claude Animasyon Sistemi.md — iş axını (hekayə → səs → səhnə planı → kod → yoxlama).
4. reklam/sistem/ozansihay-motion/SKILL.md və references/ — stil kartı, hərəkət, tipografiya,
   klişe testi. Türkcə üçün olan yoxlamaları Azərbaycan dilinə uyğunlaşdır (az-AZ, ə/Ə, İ/ı).
5. reklam/AGENT_VIDEO_PROMPT.md (bu fayl) — quraşdırma, əmrlər, tələlər, əvvəlki videolar.
6. Şablon: reklam/remotion/src/sablon/Video.tsx və src/ortak/. Nümunə səhnə planı:
   reklam/skript5/sahne_plani.md. (skript1/skript5 Windows şriftləri işlədir — yalnız istinad.)

Addımlar və təsdiq nöqtələri (hər TƏSDİQ-də dayan, istifadəçidən cavab gözlə):
0. Quraşdırma: `cd reklam/remotion && npm ci`. Sonra `node kadr.mjs sablon --komp FontTesti`
   işlət və şəklə bax (Azərbaycan hərfləri düzgün çıxmalıdır). Alınmasa, xətanı istifadəçiyə de.
A. Səs mətni (Azərbaycan dili, 20–30 san., ~45–60 söz). İlk cümlə konkret ziddiyyət, ortada
   dönüş, son cümlə ilk cümləni bağlasın, sonra bir cümlə çağırış. Q1–Q6-nı yoxla.
B. Stil kartı (skill §4) və səhnə planı (hər sətir: "ekranda nə var?") →
   reklam/skriptN/sahne_plani.md. Aşağıdakı "Videolar" cədvəlindəki bütün videolardan ən azı
   3 oxda fərqlən. → TƏSDİQ (mətn + plan birlikdə).
C. Səs: ElevenLabs creative_generate_speech, səs "Abbas" (voice_id IVMbfLv3KqUc4qDj6Yif),
   model eleven_v4, generations_count = 1. creative_get_generations ilə full_res_url al.
   public/skriptN/metin.txt yaz (hər sətir səsdəki bir fasiləyə qədər olan cümlə), sonra:
   `node ses.mjs skriptN "<full_res_url>"`. Say uyğun gəlməsə metin.txt-ni düzəlt və təkrarla.
D. src/sablon → src/skriptN kopyala, VERI/SES yollarını dəyiş, görünüşü stil kartına görə qur.
   İlk 2–3 sətri kodla: `node kadr.mjs skriptN --kadrlar 30,90,150 --pano`, şəkillərə özün bax,
   düzəlt, sonra istifadəçiyə göstər. → ÇİZİM DİLİ TƏSDİQİ.
E. Bütün videonu kodla. `node kadr.mjs skriptN --say 48` ilə yoxla, ən azı iki tur düzəlt.
F. `node render.mjs skriptN` → cikti/skriptN.mp4. `node kadr.mjs skriptN --klise` → klişe testi.
G. Təhvil: cikti/skriptN.mp4 + panolar; "Nə etdim" (3–5 qərar və səbəbi), klişe balı, bilinən
   qüsurlar, doğrulanmayanlar ("səsi eşidə bilmirəm"), stil kartının tək sətirlik xülasəsi,
   xərclənən kredit. Bu fayldakı "Videolar" cədvəlinə sətir əlavə et.
H. Bulud/telefon sessiyasındasansa: nəticələri commit et və push et (mp4, panolar, kod, plan),
   ki istifadəçi GitHub-da izləyə bilsin. Commit mesajı: "Reklam: skriptN videosu".

Dürüstlük: Render etmədiyin videonu hazır demə. Görmədiyin kadr, eşitmədiyin səs haqqında
"yoxladım" yazma. Uydurma rəqəm, real brend/serial/şəxs adı, saxta interfeys iddiası işlətmə.
Bir addım alınmırsa (şəbəkə, ElevenLabs bağlantısı, Chrome), dayan və dəqiq xətanı istifadəçiyə yaz.
```

---

## Qovluq quruluşu

```text
REKLAM_QAYDALARI.md            reklam qaydaları (repo kökü)
REKLAM_SKRIPTLERI_v1.md        skriptlər (repo kökü)
reklam/
  AGENT_VIDEO_PROMPT.md        bu fayl
  sistem/                      Animasyon Sistemi və ozansihay-motion skill-i
  skriptN/sahne_plani.md       stil kartı + səs mətni + səhnə planı
  skript1/                     ilk sınaq (canvas) — arxiv
  server.mjs, pano.html,       köhnə brauzer alətləri (Windows; bulud üçün lazım deyil)
  font_testi.html
  remotion/
    ses.mjs                    səs yüklə → sükut analizi → setirler.json → kelimeler.json
    zamanlar.mjs               setirler.json + metin.txt → kelimeler.json (ses.mjs çağırır)
    kadr.mjs                   tək kadr / pano / klişe kadrları / şrift testi (brauzersiz)
    render.mjs                 tam video: səssiz render + səs (ffmpeg) → cikti/skriptN.mp4
    ortak.mjs                  skriptlər üçün köməkçilər
    src/ortak/                 fontlar.ts (FONT, useFontlar, olc), zaman.ts (an, kamera, əyrilər), FontTesti
    src/sablon/                yeni video üçün şablon
    src/pano/                  pano kompozisiyası
    src/skriptN/               index.ts, Video.tsx
    public/skriptN/            ses.mp3, metin.txt, setirler.json, kelimeler.json
    cikti/                     hazır mp4 və panolar
```

---

## Əmrlər (`reklam/remotion` qovluğunda; Windows və Linux eyni)

```bash
npm ci
```
```bash
node kadr.mjs sablon --komp FontTesti
```
```bash
node ses.mjs skriptN "https://elevenlabsusercontent.com/...content.mp3?..."
```
```bash
node kadr.mjs skriptN --kadrlar 30,90,150 --pano
```
```bash
node kadr.mjs skriptN --say 48
```
```bash
node render.mjs skriptN
```
```bash
node kadr.mjs skriptN --klise
```

Çıxışlar: `cikti/skriptN_kadrlar.jpg`, `cikti/skriptN_pano.jpg`, `cikti/skriptN_klise.jpg`, `cikti/skriptN.mp4`.
Şəkillərə `Read` aləti ilə bax.

---

## Şriftlər (yalnız bunlar; hamısı SIL OFL, repoda, ə/Ə yoxlanıb)

| Açar (`FONT.`) | Ailə | Çəkilər | Harada yaşayır |
|---|---|---|---|
| `sans` | IBM Plex Sans | 400, 600, 700 | interfeys, altyazı, etiket |
| `mono` | IBM Plex Mono | 400, 600 | e-poçt, kod, terminal dünyası |
| `dar` | Barlow Condensed | 500, 700, 800 | böyük damğa yazı, tablo, afiş |
| `serif` | Fraunces | 400, 700, 900 | editoryal başlıq, kitab |
| `serif2` | Newsreader | 400, 600 | qəzet, mətn bloku |
| `el` | Caveat | 400, 700 | əl yazısı, qeyd kağızı |

Hər `Video.tsx`-də `useFontlar()` çağır (render şriftlər yüklənənə qədər gözləyir). Başqa çəki lazımdırsa `src/ortak/fontlar.ts`-ə import əlavə et. Sistem şriftlərini (Bahnschrift, Segoe, Ink Free…) **işlətmə** — Linux-da yoxdur. Yeni npm paketi lazım olsa, istifadəçidən soruş.

---

## Bulud / telefon sessiyası

- **Tələblər:** sessiyada ElevenLabs connector-u olmalıdır (creative_generate_speech, creative_get_generations). Yoxdursa, dayan və istifadəçiyə de.
- **Şəbəkə:** `registry.npmjs.org` (npm ci), Remotion-un Chrome Headless Shell yükləməsi (ilk render-də avtomatik), `elevenlabsusercontent.com` (səs). Biri bağlıdırsa, xətanı olduğu kimi istifadəçiyə yaz.
- **Chrome işləmirsə (Linux kitabxanaları):** `npx remotion browser ensure` işlət. Yenə alınmasa, xəta mətnini göstər.
- **Render müddəti:** 24 san. video ~3–6 dəq. Arxa planda işlət.
- **Təhvil:** commit + push. Video GitHub-da açılır. Fayl ölçüsü adətən 5–20 MB-dır.
- **Təsdiqlər:** telefonda istifadəçiyə qısa yaz: mətn, stil kartı və plan bir mesajda; çizim dili üçün pano şəkli.

---

## Texniki tələlər

1. **Səs render zamanı söndürülür.** Windows-da Remotion render serveri `localhost`-u `::1` kimi açıb səsi yükləyə bilmir. Ona görə `<Audio>` `getInputProps().sessiz` ilə şərtlidir və `render.mjs` səsi ffmpeg ilə sonradan birləşdirir. Yeni `Video.tsx`-də bunu saxla.
2. **`npx remotion ffmpeg` bayraqları:** `-c:v`, `-b:a` CLI tərəfindən oxunur → `-vcodec`, `-acodec`, `-ab`.
3. **`-af apad -shortest` + `-vcodec copy`** sonsuza qədər işləyir. İşlətmə.
4. **Remotion-un ffmpeg-i yığcamdır** (`tile`, `hstack` yoxdur). Pano `kadr.mjs` ilə Remotion-da qurulur.
5. **Söz vaxtları təxminidir:** cümlə sərhədləri ölçülür, cümlə içində sözlər hərf sayına görə paylanır. Hesabatda yaz.
6. **Mətn eni:** SVG-də sözün yerini `olc()` ilə hesabla, təxmini hərf eni ilə yox.
7. **Kamera keçidində** yaxın plana girərkən iri obyektlər (baş, əl) bir anlıq kadrı doldura bilər. Panoda yoxla.
8. **Altyazı zonası:** səs altyazısı y≈1478–1560-dadır. Yaxın planda heç nə onun altına girməsin.

---

## Qaydaların qısa xülasəsi (tam: REKLAM_QAYDALARI.md)

- Funksiyalar: **F1** hazır söz bazaları, **F2** Leitner qutuları, **F3** mətn → lüğət. Hər videoda ən azı ikisi.
- **Q1** səhv cavab kartı yalnız bir qutu geri aparır · **Q2** qiymət/lisenziya/"pulsuz" yoxdur · **Q3** mənbəsiz rəqəm yoxdur · **Q4** AI istifadəçinin öz köməkçisidir, sürət vədi yoxdur · **Q5** ispan dili və ümumi kart sayı yoxdur · **Q6** "rəsmi", Goethe/Oxford/Brown, rəqib adları yoxdur.
- Prioritet: ingilis → rus → alman. Telefon ekranı illüstrasiyadır; hesabatda qeyd et.

---

## Videolar (hər yeni videodan sonra sətir əlavə et)

| # | Skript | Fayl | Səs (kredit) | Stil kartı xülasəsi |
|---|---|---|---|---|
| 0 | Skript 1 (ilk sınaq, canvas) | `reklam/skript1/vocabox_skript1.mp4` | 746 (2 variant) | Kinetik tipografiya, tünd yaşıl fon. Sistemdən əvvəl; arxiv. |
| 1 | Skript 1 · İngilis · iş | `reklam/remotion/cikti/skript1.mp4` | eyni səs | Kağız toxuması, əl çizgisi xarakter (iş masası), Segoe Print + Segoe UI, krem + Vocabox yaşılı/laym, söz-söz vurğulu altyazı. İmza: e-poçtdakı boşluq "improve" ilə dolur. |
| 2 | Skript 5 · İngilis · serial | `reklam/remotion/cikti/skript5.mp4` | 800 (2 variant) | Gecə otağı, televizor işığı, personaj yox (yalnız əllər), Bahnschrift + Ink Free, qeyd sarısı vurğu, neytral cümlə altyazısı, damğa böyük yazı. İmza: altyazıdakı "inevitable" sözü. Klişe balı 2. |

**Növbəti video:** yuxarıdakılardan ən azı 3 oxda fərqlən (şrift, palitra, kadraj, imza öğə, zaman). Eyni şrift və imza öğə ardıcıl iki videoda təkrar olunmasın.

**Qalan seçilmiş skriptlər:** 6, 7, 8, 9, 11 (ingilis), 12, 15 (rus), 18 (alman) — `REKLAM_SKRIPTLERI_v1.md`. Qalan videolar üçün yeni skriptləri REKLAM_QAYDALARI.md-yə görə yaz və təsdiq al.

**Səs büdcəsi:** hər video ~400 kredit (1 variant).
