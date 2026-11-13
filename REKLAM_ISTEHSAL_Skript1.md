# Skript 1 — İstehsal planı (ElevenLabs + Higgsfield)

> **Reklam:** "İngiliscə bilirsən, amma 'tam bilmirəm' hissi səni dayandırır? Gəl sözlərdən başlayaq."
> **Auditoriya:** İngilis dili · A qrupu (iş və karyera) · **Funksiyalar:** F1, F2
> **Format:** 9:16, ~24 saniyə, Reels / TikTok / Shorts
> **Qaydalar:** [REKLAM_QAYDALARI.md](REKLAM_QAYDALARI.md)

---

## 1. Səs (ElevenLabs) — yaradıldı

- **Səs:** Abbas (peşəkar Azərbaycan kişi səsi), model `eleven_v4`, 2 variant.
- **Flow:** https://elevenlabs.io/app/flows/SRY6gSQUf8H913WaiAJ3
- **Mətn:**

> İngiliscə bilirsən. Amma yazmaq lazım olanda... "tam bilmirəm" deyirsən.
> Çox vaxt problem qrammatika yox, lazım olan sözün yadına düşməməsidir.
> Vocabox-da ingilis dili üçün hazır söz dəsti var. Bildiyin söz irəli gedir, çətin söz yenə qarşına çıxır.
> Gəl sözlərdən başlayaq. Link bio-dadır.

Səs yaxşı alınmasa, flow-da səsi dəyişmək və ya mətni redaktə edib yenidən yaratmaq olar. Tələffüzü (xüsusilə "Vocabox" sözünü) mütləq qulaqla yoxlayın.

---

## 2. Video kadrları (Higgsfield)

**Vacib qayda:** AI yalnız **aparıcı olan canlı kadrları** yaradır. Tətbiq ekranı (9–19 san.) **real tətbiqdən ekran yazısı** olmalıdır, AI ilə yaradılmamalıdır. Səbəb: AI uydurma interfeys çəkər və bu, qaydalar sənədinin Bölmə 6-sı ilə ziddiyyət təşkil edir.

Bütün kadrlarda telefon və ya noutbuk ekranı **kameraya görünməməlidir** (və ya bulanıq olmalıdır), ki AI saxta interfeys çəkməsin.

**Model tövsiyəsi:** Kling 3 Pro / Kling 4 (xarakter ardıcıllığı yaxşıdır) və ya Veo 3.1. Hər kadr üçün eyni aparıcı təsvirini istifadə edin. Mümkünsə, əvvəl aparıcının bir şəklini yaradın və bütün kadrlarda onu istinad şəkli kimi (image-to-video) verin.

**Aparıcı təsviri (hər promptda eyni qalsın):**
`a 28-year-old Azerbaijani woman, dark shoulder-length hair, light makeup, wearing a beige blazer over a white t-shirt`

### Kadr A · 0–3 san. · Hook
```
Vertical 9:16, cinematic, natural daylight. A 28-year-old Azerbaijani woman, dark shoulder-length hair, light makeup, wearing a beige blazer over a white t-shirt, sits at a desk in a modern bright office. She types on a laptop (screen facing away from camera, not visible), then stops mid-sentence, hesitates, and slightly frowns, searching for a word. Medium close-up, slow push-in, shallow depth of field. Realistic, no text, no logos.
```
**Montajda yazı:** "Bilirəm... amma tam yox."

### Kadr B · 3–9 san. · Problem
```
Vertical 9:16, cinematic, natural daylight. Same woman (28-year-old Azerbaijani, dark shoulder-length hair, beige blazer over white t-shirt) at the same office desk. She presses delete a few times on the laptop keyboard with a small sigh, leans back, then picks up her smartphone and looks at it thoughtfully. The phone screen faces away from camera and is not visible. Medium shot, handheld feel, subtle movement. Realistic, no text, no logos.
```

### Kadr C · 9–19 san. · Həll — **AI ilə deyil, ekran yazısı**
Real tətbiqdən telefonda ekran yazısı (şaquli):
1. Dil seçimi → **İngilis dili** → dəst seçimi.
2. Məşq ekranında bir kartın açılması.
3. **Yaddaş qutuları** paneli (1–6).

Ekran yazısını telefon çərçivəsinə (mockup) yerləşdirmək olar.

### Kadr D · 19–24 san. · CTA
```
Vertical 9:16, cinematic, warm natural light. Same woman (28-year-old Azerbaijani, dark shoulder-length hair, beige blazer over white t-shirt) stands in the office, holds her smartphone up near her face with the screen facing away from camera, looks into the camera and gives a confident, friendly smile and a small nod. Medium close-up, static camera, soft background bokeh. Realistic, no text, no logos.
```
**Montajda yazı:** "Gəl sözlərdən başlayaq · [LINK]" + Vocabox loqosu (`public/favicon.svg`).

---

## 3. Montaj (CapCut və ya istənilən redaktor)

| Vaxt | Video | Səs | Ekran yazısı |
|---|---|---|---|
| 0–3 | Kadr A | Səs: 1-ci cümlə | "Bilirəm... amma tam yox." |
| 3–9 | Kadr B | Səs: 2-ci cümlə | — |
| 9–19 | Kadr C (ekran yazısı) | Səs: 3-cü cümlə | "Hazır söz dəsti" → "Bildiyin söz irəli, çətin söz yenə qarşında" |
| 19–24 | Kadr D | Səs: 4-cü cümlə | "Gəl sözlərdən başlayaq · [LINK]" + loqo |

- Fon musiqisi: yüngül, sakit, səsdən aşağı (−18…−20 dB). Lisenziyası olan musiqi istifadə edin.
- Subtitr: səs mətnini Azərbaycan dilində subtitr kimi əlavə edin (səssiz izləyənlər üçün).
- Kadrların uzunluğunu səsin real uzunluğuna görə tənzimləyin.

---

## 4. Yayımdan əvvəl yoxlama

- [ ] Səsdə "Vocabox" sözü düzgün tələffüz olunur.
- [ ] AI kadrlarında heç bir ekran, saxta interfeys, mətn və ya loqo görünmür.
- [ ] Kadr C real tətbiqdən çəkilib.
- [ ] Qaydalar sənədinin Bölmə 8 yoxlama siyahısı keçilib.
- [ ] Caption: "İngiliscəni 'tam bilmirəm' deyə tələsmə. Sözlərdən başla. 📦 #ingilisdili #dilöyrən #vocabox"
