# Vocabox — Dəyər məzmunu seriyası: "Söz öyrənmə üsulu" (26 gün, 26 video)

> **AI agent üçün təhvil sənədi.** Vocabox üçün **növbəti istehsal ediləcək videolar** bu seriyadır. MEZMUN_PLANI.md-dəki köhnə 26 günlük planın hazır olmayan günlərini əvəz edir.
>
> **İstifadəçi qərarları (2026-11-28) — bu sənədin digər yerlərindən üstündür:**
> - **Məzmun və skript** bu sənəddən, **texniki və vizual istehsal** isə CLAUDE.md və `reklam/video-sablon/LAYIHE_VIDEO_TELIMATI.md`-dən götürülür (HTML şablonu, Remotion yox; Epidemic musiqi + effektlər; tətbiq ekranı real).
> - **CTA (bütün seriya):** "Ətraflı məlumat üçün rəyə "Vocabox" yazın." — "Link bio-dadır" və DM əvəzinə. REKLAM_QAYDALARI §5-in DM qaydasına bu seriya üçün istisnadır.
> - **§2.3 istisnası təsdiqlənib:** məhsul hissəsində bir funksiya kifayətdir.
> - **Səs:** CLAUDE.md-dəki axınla (Abbas, eleven_v4, tək take). Musiqi danışıqdan ≥10 dB aşağı.

> **(Orijinal qeyd)** Bu sənəd başqa bir söhbətdə hazırlanıb.
> **Necə istifadə etməli:**
> 1. Bu faylı repoya köçür, məsələn kökə `DEYER_SERIYASI.md` adı ilə.
> 2. `CLAUDE.md`-yə (yoxdursa yarat) bu sətri əlavə et: "Növbəti iş: DEYER_SERIYASI.md-dəki 26 videoluq seriya. Statusu 'hazırdır' olmayan ilk gündən davam et."
> 3. Repoda reklam qaydaları sənədi (`REKLAM_QAYDALARI.md`) və video istehsal təlimatı (`reklam/AGENT_VIDEO_PROMPT.md`) varsa, onları da oxu. Qaydalar sənədi bu sənəddən üstündür, yalnız §2.3-dəki istisna seriyaya aiddir.

---

## 0. Məhsul və məcburi qaydaların xülasəsi

**Vocabox** azərbaycandilli istifadəçilər üçün xarici dil lüğəti tətbiqidir. Sözləri Leitner qutuları ilə təkrar etdirir, hazır söz bazaları var və istifadəçiyə öz mətnindən lüğət düzəltməyə imkan verir.

**3 funksiya:**
- **F1** — hazır, səviyyəli söz bazaları (ingilis, rus, alman; CEFR A1–C2 filtri; rus dili tezlik sırası ilə).
- **F2** — Leitner qutuları (6 qutu, yeni kart 3-cü qutudan başlayır, düz cavab +1, səhv cavab −1; 3 rejim: fləşkart, yazaraq xatırla, variant seç).
- **F3** — mətn → lüğət (tətbiq hazır prompt verir; istifadəçi onu öz AI köməkçisinə göndərir və cavab olaraq gələn JSON-u tətbiqə yapışdırır; tətbiqin özündə AI yoxdur).

**Qadağan iddialar:**
- **Q1** — "səhv cavab kartı 1-ci qutuya qaytarır" yazma. Kart yalnız **bir qutu geri** gedir.
- **Q2** — qiymət, lisenziya, "ömürlük", "abunəliksiz", "pulsuz" sözlərini işlətmə.
- **Q3** — mənbəsiz rəqəm vermə: faiz, "48 saatda unudursan", "ayda X söz", sürət və nəticə vədi.
- **Q4** — "tətbiq AI ilə lüğət yaradır" və ya sürət vədi yazma. AI həmişə istifadəçinin **öz** köməkçisidir.
- **Q5** — ispan dilini reklam etmə. Ümumi kart sayı ("11 000+") yazma.
- **Q6** — "rəsmi", Goethe/Oxford/Brown kimi brend adları və rəqib adları (Duolingo, Quizlet və s.) yazma.

**Əlavə qaydalar:**
- Tətbiqdə olmayan funksiyanı vəd etmə: səs tələffüzü, streak, liderbord, bildiriş.
- CTA: "Ətraflı məlumat üçün rəyə "Vocabox" yazın." (istifadəçi qərarı, 2026-11-28). Link lazım olsa `[LINK]` yer tutucusu yaz.
- Dil prioriteti: ingilis → rus → alman.

---
## 1. Seriya nədir

Hər gün bir video. Hər video **dil öyrənmə üsulu haqqında bir faydalı fikir** verir. Məhsul (Vocabox) yalnız fikrin içində, **5–10 saniyə** görünür.

- Format: 9:16, 30–40 saniyə, Reels / TikTok / Shorts.
- Səs: ElevenLabs "Abbas" (voice_id `IVMbfLv3KqUc4qDj6Yif`), `eleven_v4`, 1 variant.
- Görüntü: Remotion + SVG, kodla çəkilir (AI görüntü və ya video modeli yoxdur).
- Fayl adları: `gunNN` (iki rəqəmli): `reklam/gun01/sahne_plani.md`, `reklam/remotion/src/gun01/`, `reklam/remotion/public/gun01/`, `reklam/remotion/cikti/gun01.mp4`.

---

## 2. Dəyər məzmununun prinsipləri (hər skript bunlara uyğun yazılır)

### 2.1 Əsas qayda: əvvəl dəyər, sonra məhsul
1. **Tətbiqi heç vaxt yükləməyəcək izləyici də videodan bir işə yarayan fikir götürməlidir.** Bunu yoxlamaq üçün məhsul hissəsini (5–10 san.) zehnən sil: qalan video yenə tam və faydalıdır? Deyilsə, yenidən yaz.
2. **Bir video, bir fikir.** Siyahı, "5 məsləhət" və ya ikinci mövzu olmasın.
3. **Fikir konkret olsun:** izləyici bu gün nə edəcəyini bilməlidir ("çətin sözü tez-tez, bildiyini seyrək təkrarla"), ümumi motivasiya yox ("heç vaxt təslim olma").

### 2.2 Quruluş və vaxt (30–40 san., ~60–80 söz)
| Hissə | Vaxt | Nə edir |
|---|---|---|
| **Hook** | 0–3 san. | Hamının tanıdığı konkret ziddiyyət və ya vəziyyət. İzah yox. |
| **Dəyər** | ~3–25 san. | Niyə belə olur + nə etmək lazımdır. Ortada dönüş ("Problem səndə deyil."). Videonun ən böyük hissəsi. |
| **Məhsul** | **5–10 san.** | Fikrin təbii davamı: "Bunu Vocabox-da ... edir." Yalnız bu fikrə aid **bir** real funksiya göstərilir. |
| **Bağlanış** | 2–4 san. | Son cümlə ilk cümləni bağlayır. Sonra ən çox bir cümlə çağırış ("Link bio-dadır."). |

- Məhsul hissəsi **fikirdən sonra** gəlir, ondan əvvəl yox. Video Vocabox adı ilə açılmır.
- Məhsul cümləsi fikri "avtomatlaşdıran alət" kimi təqdim edir, yeni vəd əlavə etmir.
- Ekranda kiçik seriya nişanı: **"Gün N / 26"** (yalnız yazı, səsdə deyil). Sonluqda kiçik yazı ilə sabahın mövzusu ("Sabah: ...").

### 2.3 Seriya üçün istisna (✅ istifadəçi təsdiqləyib, 2026-11-28)
REKLAM_QAYDALARI.md Bölmə 2 hər reklamda ən azı iki funksiya tələb edir. Bu seriyada məhsul hissəsi 5–10 saniyə olduğu üçün **bir funksiya kifayətdir** (qısa story istisnası kimi). Qalan bütün qaydalar (Q1–Q6, Bölmə 4, 5, 8) olduğu kimi qüvvədədir.

### 2.4 Üsul haqqında dürüstlük (bu seriyaya xas tələlər)
- **Tətbiq təkrar vaxtını planlamır.** Tətbiqdə "Təkrar üçün vaxt məhdudiyyəti yoxdur". Qutular kartın nə qədər bildiyini göstərir, istifadəçi hansı qutunu məşq edəcəyini özü seçir. Ona görə "Vocabox sənə sözü vaxtında xatırladır", "bildiriş göndərir", "nə vaxt təkrar edəcəyini özü hesablayır" **yazma**. Vaxt aralıqları (sabah, bir neçə gün sonra) yalnız **ümumi məsləhət** kimi deyilə bilər.
- Qutu qaydası: yeni kart 3-cü qutudan başlayır, düz cavab +1, səhv cavab −1 (Q1). Qutu adları: 1 Yenidən öyrən, 2 Möhkəmləndir, 3 Neytral, 4 Yadda qalır, 5 Yaxşı bilirəm, 6 Mənimsənilmiş.
- Məşq rejimləri: fləşkart, yazaraq xatırla, variant seç. Məşq seçimi: "Zəiflər (1–2)", "Yeni kartlar", "Mənimsənilmiş (6)" və qutuya görə.
- Elm və psixologiya: üsulu **izah et**, faiz, müddət və "beynin belədir" iddiası yazma (Q3, Bölmə 4). "Unutma əyrisi", "48 saat", "X% yadda qalır", tədqiqat adları və alim adları yoxdur.
- Nümunə rəqəmlər ("on söz əzbərləyirsən") statistika deyil, vəziyyət təsviridir, icazəlidir. Nəticə vədi ("bir ayda danışacaqsan") isə qadağandır.
- Sözü nümunə kimi işlədəndə real ingilis/rus/alman sözü götür, tərcüməsi düzgün olsun.

### 2.5 Görüntü (ozansihay-motion skill-i)
- Hər video **öz dünyasını** fikrin özündən götürür (təqvim, cib, qutu, yol...). Ardıcıl iki video eyni şrifti və eyni imza öğəni təkrar etməsin, hər video əvvəlkilərdən ən azı 3 oxda fərqlənsin.
- Seriya boyunca sabit qalanlar yalnız bunlardır: "Gün N / 26" nişanı, sonluqdakı Vocabox loqosu, Abbas səsi.
- Vocabox ekranı sadələşdirilmiş illüstrasiyadır (real tətbiqin rəngləri, qutu adları və quruluşu ilə). Hesabatda belə qeyd olunur.

### 2.6 Hər skriptdən sonra yoxlama
REKLAM_QAYDALARI.md Bölmə 8 + bunlar:
- [ ] Məhsul hissəsini silsən, video yenə faydalıdır?
- [ ] Məhsul hissəsi 5–10 saniyədir və fikirdən sonra gəlir?
- [ ] Tək fikir var, izləyici bu gün nə edəcəyini bilir?
- [ ] Tətbiqin vaxt planlaması, bildiriş, xatırlatma etdiyi deyilmir?
- [ ] Faiz, müddət vədi, elmi iddia yoxdur?
- [ ] Son cümlə ilk cümləni bağlayır?

---

## 3. 26 mövzu və status

F1 = hazır söz bazaları, F2 = Leitner qutuları, F3 = mətn → lüğət. "Məhsul" sütunu 5–10 saniyəlik hissədə nə göstəriləcəyini deyir.

| Gün | Mövzu (başlıq) | Fikir (bir cümlə) | Məhsul | Status |
|---|---|---|---|---|
| 01 | Söz əzbərləyirsən, bir həftə sonra unudursan? | Sözlə bir dəfə görüşmək azdır, ona aralarla qayıtmaq lazımdır. | F2 | **mətn təsdiqlənib, istehsalda** |
| 02 | Leitner qutuları nədir? Bir dəqiqəlik izah | Kartları qutulara böl: bildiyin irəli, bilmədiyin geri. | F2 | — |
| 03 | Bir gündə 100 söz niyə işləmir | Az, amma aralarla təkrar, bir dəfəlik böyük yükdən yaxşıdır. | F2 | — |
| 04 | Tanımaq və xatırlamaq fərqlidir | Sözü görəndə tanımaq hələ onu deyə bilmək deyil, özünü yazaraq yoxla. | F2 (yazaraq xatırla) | — |
| 05 | "Bilirəm" hissi aldada bilər | Cavaba baxmadan əvvəl özün de, sonra yoxla. | F2 (fləşkart) | — |
| 06 | Bildiyin sözü təkrarlamaq vaxt itkisidir | Vaxtını bildiklərinə yox, çətinlərə ver. | F2 (Mənimsənilmiş 6) | — |
| 07 | Çətin sözlərə daha çox vaxt ayır | Zəif sözləri ayrıca məşq et. | F2 (Zəiflər 1–2) | — |
| 08 | Səhv etmək niyə faydalıdır | Səhv, sözü yenidən qarşına gətirən siqnaldır. | F2 (bir qutu geri) | — |
| 09 | Söz dəftəri niyə yarımçıq qalır | Siyahı yığmaq öyrənmək deyil, təkrar sistemi lazımdır. | F1 | — |
| 10 | Söz siyahısı yığmağa vaxt itirmə | Ən çox işlənən sözlərdən başla. | F1 (tezlik sırası) | — |
| 11 | A1–C2 nə deməkdir? | Öz səviyyəndəki sözlərlə başla. | F1 (CEFR filtri) | — |
| 12 | Sözü tək yox, cümlə içində öyrən | Söz cümlədə daha aydın olur, öz cümləni qur. | F1 (nümunə cümləli kart) | — |
| 13 | Kartın ön tərəfinə nə, arxasına nə yazmalı | Önə söz, arxaya məna + izah. | F1 (kart) | — |
| 14 | "Gündə neçə söz?" sualı səhvdir | Ölç: neçə yeni yox, neçə təkrar. | F2 (Bu gün məşq edilən) | — |
| 15 | Variant seçmək, yoxsa yazmaq? | Yeni sözdə variant, tanış sözdə yazmaq. | F2 (3 rejim) | — |
| 16 | Oxuduğun məqalədən lüğət düzəlt | Bilmədiyin sözlər öz mətnindən gəlsə, yadda qalmağa səbəbi olur. | F3 | — |
| 17 | AI köməkçindən lüğəti necə istəmək lazımdır | Dəqiq istə: söz, məna, izah, format. | F3 (hazır prompt) | — |
| 18 | Hobbin üçün lüğət düzəlt | Sevdiyin mövzunun sözləri daha tez lazım olur. | F3 | — |
| 19 | Sahənə aid lüğət: IT, tibb, hüquq | Ümumi siyahı yox, işində işlədəcəyin sözlər. | F3 | — |
| 20 | Tələbələr üçün: dərslikdəki mətn kartlara | Dərsin mətnini əvvəlcədən karta çevir. | F3 | — |
| 21 | Metroda 5 dəqiqə | Qısa boşluqlar təkrar üçün kifayətdir. | F2 (oflayn) | — |
| 22 | Yatmazdan əvvəl 5 dəqiqəlik rutin | Günü bir qısa təkrarla bağla. | F2 | — |
| 23 | Motivasiyanı itirməmək üçün 3 kiçik vərdiş | Kiçik və hər gün, böyük və bəzən olandan yaxşıdır. | F2 | — |
| 24 | Valideynlər üçün: sözləri birlikdə təkrarlayın | Uşaqla 5 dəqiqə kart oyunu. | F1 | — |
| 25 | Müəllimlər üçün: dərs mətnindən söz dəsti | Dərsin sözlərini bir dəfə hazırla, şagird təkrar etsin. | F3 | — |
| 26 | Dil öyrənməyə 5-ci dəfə başlayırsan? | Bu dəfə başqa cür et: hazır söz + qutularla təkrar. (seriyanın xülasəsi) | F1 + F2 | — |

**Statusu yenilə:** hər addımdan sonra bu cədvəldə statusu dəyiş (`plan təsdiqə gözləyir` → `səs hazırdır` → `çizim dili təsdiqlənib` → `hazırdır (cikti/gunNN.mp4)`). Hazır videonu `reklam/AGENT_VIDEO_PROMPT.md`-dəki "Videolar" cədvəlinə də yaz (stil kartı xülasəsi ilə, ki növbəti video ondan fərqlənsin).

---

## 4. Başqa agentlə davam etmək üçün

1. `CLAUDE.md`-ni, sonra bu sənədi oxu.
2. Cədvəldə statusu "hazırdır" olmayan ilk günü tap.
3. `reklam/gunNN/sahne_plani.md` varsa oradan davam et, yoxdursa yeni skript yaz (bu sənədin 2-ci bölməsi + REKLAM_QAYDALARI.md).
4. İstehsal addımları və təsdiq nöqtələri: `reklam/AGENT_VIDEO_PROMPT.md` (A–H).

---

# Əlavə: Gün 01 — hazır mətn, stil kartı və səhnə planı


> **Seriya:** Söz öyrənmə üsulu, Gün 1 / 26 
> **Fikir:** Sözlə bir dəfə görüşmək azdır. Ona aralarla qayıtmaq lazımdır, çətin sözə isə daha tez-tez.
> **Məhsul (5–10 san.):** F2: Leitner qutuları. Bildiyin söz irəli gedir, çətin söz geri qayıdıb yenə qarşına çıxır.
> **Auditoriya:** ümumi, ingilis dili nümunəsi ilə.
> **Status:** mətn təsdiqlənib (CTA dəyişdirilib) → istehsalda

---

### 1. Səs mətni (~72 söz, təxminən 34–38 san.)

```text
[warm, conversational, unhurried] Bazar ertəsi on söz əzbərləyirsən.
Bazar günü... birini də xatırlamırsan.
[pause] Problem səndə deyil.
Sən o sözlərlə cəmi bir dəfə görüşmüsən.
Söz yadda qalsın deyə, ona qayıtmaq lazımdır:
sabah, bir neçə gün sonra, bir həftə sonra.
Hər dəfə xatırlayanda, növbəti görüşü bir az uzat.
Çətin sözə isə daha tez-tez qayıt.
[confident] Vocabox-da hər sözün öz qutusu var:
bildiyin söz irəli gedir, çətin söz geri qayıdıb yenə qarşına çıxır.
[warm] Bazar ertəsi on söz. Bazar günü... hələ də yadındadır.
[friendly] Ətraflı məlumat üçün rəyə "Vocabox" yazın.
```

**Vaxt bölgüsü:** hook 0–4 san. · dəyər ~4–26 san. · **məhsul ~26–33 san. (≈7 san.)** · bağlanış və çağırış ~33–37 san.

**Yoxlama (REKLAM_QAYDALARI §8 + DEYER_SERIYASI §2.6):**
- Məhsul hissəsini silsən, video yenə də işlək məsləhət verir: "aralarla qayıt, çətin sözə tez-tez". ✔
- Q1: "geri qayıdır" deyilir, "1-ci qutuya" deyilmir. ✔ · Q2: qiymət yoxdur. ✔ · Q3: faiz, müddət vədi, elmi iddia yoxdur. "On söz" vəziyyət təsviridir. ✔ · Q4: AI yoxdur. ✔ · Q5/Q6: ispan dili, brend adı yoxdur. ✔
- Tətbiqin vaxt planladığı deyilmir. "Sabah, bir neçə gün sonra" ümumi məsləhətdir, məhsul cümləsi yalnız qutuları təsvir edir. ✔
- Son cümlə ilk cümləni bağlayır (bazar ertəsi → bazar günü). Ondan sonra bir cümlə çağırış gəlir. ✔
- Bir funksiya (F2) var, seriya istisnası §2.3-ə görə. ✔

---

### 2. Stil kartı

```
STİL KARTI
Tez:          Sözlə bir dəfə görüşmək azdır; ona aralarla qayıtmaq lazımdır.
Üsul:         Mekanizmanı çiz + sözü hadisəyə çevir. Bir həftəlik divar təqvimi; sözün
              "görüşləri" təqvimin üstündə mürəkkəb qövslər kimi çəkilir.
Material:     Sırf tipografiya + çap olunmuş divar təqvimi (uydurma, brendsiz), kiçik söz
              kartları, mürəkkəb qövslər. Sonda sadələşdirilmiş Vocabox qutular paneli.
Kadraj:       Sabit iş sahəsi: kadrın ortasında 7 sütunlu həftə zolağı. Kamera yalnız iki dəfə
              hərəkət edir: ikinci həftəyə sağa sürüşür, sonra qutular panelinə dönür.
Zaman:        30 fps. Günlər damğa kimi dəyişir (easing yox, sərt). Qövslər qələm əyrisi ilə
              çəkilir (sin in-out). Kartlar düşəndə TERK (0.7,0,0.84,0), kamera DOLLY
              (0.55,0,0.1,1). "Problem səndə deyil" anında ~1.2 san. tam durğunluq. İkili çəkiliş yox.
Şrift:        Fraunces 900 (təqvimin böyük gün rəqəmləri və iki böyük yazı) + IBM Plex Mono 400
              (kartdakı ingilis sözləri, təqvim kiçik yazıları). Səs altyazısı Plex Sans 600.
              Hamısı ə/Ə, İ/ı ilə yoxlanıb .
Palitra:      Divar təqvimi kağızı (soyuq ağ, #ecebe5), çap mürəkkəbi (#1e2124), təqvimin bazar
              günü qırmızısı (#c23a2e, yalnız bazar günü və "unudulmuş" an üçün), mürəkkəb
              qövsləri qrafit (#3a4046). Vocabox yaşılı (#204e40 / laym #d8ed9b) yalnız qutular
              panelində və sonluqda.
Toxuma:       Kağız lifləri (kadr nömrəsi ilə seed-lənən incə grain), çap mürəkkəbinin kənarında
              cüzi yayılma. Vinyet yox.
İmza öğə:     "borrow" kartının həftə boyunca böyüyən qövslərlə tullanması (B.E. → Ç.A. → C. → növbəti B.E.).
Səs:          Abbas səsi + sakit Epidemic treki (≥10 dB aşağı) + yumşaq effektlər (damğa, qələm,
              kağız). "Problem səndə deyil."-də musiqi bir anlıq susur.
İşlənməyənlər: personaj və əllər (skript1/5-də var idi), gecə otağı/TV, krem kağız + əl çizgisi,
              qeyd sarısı, söz-söz pop altyazı, mərkəzə düzülmüş başlıq, crossfade, aşağıdan
              fade-slide, bounce, telefon mockup-u.
```

**Əvvəlki videolardan fərqlənən oxlar:** şrift (Fraunces + Plex Mono, əvvəl Segoe/Bahnschrift), palitra (soyuq ağ + təqvim qırmızısı), kadraj (personaj yox, sabit təqvim zolağı), üsul (mekanizm diaqramı), imza öğə (qövslər). Cəmi 5 ox.

---

### 3. Səhnə planı (hər sətir: "bu cümlə deyiləndə ekranda nə var?")

**Tək dünya:** divar təqvimindən bir həftə zolağı (B.E. · Ç.A. · Ç. · C.A. · C. · Ş. · B.). Bazar günü sütunu qırmızı çapdadır.
**Bağlayıcı obyekt:** "borrow" kartı. Video bu kartla başlayır və bitir.
**Sabit:** sol yuxarıda kiçik nişan **"Gün 1 / 26"** (Plex Mono).

| # | Sətir (səs) | Ekranda nə var |
|---|---|---|
| 0 | "Bazar ertəsi on söz əzbərləyirsən." | Həftə zolağı. B.E. sütununa 10 kiçik söz kartı bir-bir damğa ilə düşür (borrow, although, enough, require, appear, …). Böyük rəqəm "10" Fraunces ilə B.E. üzərində. |
| 1 | "Bazar günü... birini də xatırlamırsan." | Günlər sərt kəsilmə ilə bir-bir işıqlanır (Ç.A.→B.). Hər gün bir-iki kart solub zolaqdan aşağı düşür (TERK). Qırmızı B. sütununa çatanda boşdur. Böyük yazı: **"Bazar günü: 0"**. |
| 2 | "Problem səndə deyil." | Tam durğunluq ~1.2 san. Böyük yazı sökülür. Yalnız təqvim qalır. Altyazı: cümlə. |
| 3 | "Sən o sözlərlə cəmi bir dəfə görüşmüsən." | B.E. sütununda bircə qrafit nöqtə qalır: "1 görüş". Həftənin qalan hissəsi boşdur. |
| 4 | "Söz yadda qalsın deyə, ona qayıtmaq lazımdır:" | "borrow" kartı B.E.-yə qayıdır. Nöqtədən qələmlə kiçik qövs başlayır. |
| 5 | "sabah, bir neçə gün sonra, bir həftə sonra." | Hər sözdə bir qövs: B.E.→Ç.A. (qısa), Ç.A.→C. (orta), C.→növbəti B.E. (uzun). Kamera sağa sürüşür, ikinci həftə görünür. Kart hər qövsün sonunda yerə enir. |
| 6 | "Hər dəfə xatırlayanda, növbəti görüşü bir az uzat." | Qövslərin üstündə kiçik ✓ işarələri; qövslərin hündürlüyü böyüdükcə vurğulanır. Bir an heç nə tərpənmir. |
| 7 | "Çətin sözə isə daha tez-tez qayıt." | İkinci kart "although" qırmızı-qrafitlə: hər gün qısa, sıx tullanmalar (B.E.→Ç.A.→Ç.→C.A.). |
| 8 | "Vocabox-da hər sözün öz qutusu var:" | **Məhsul başlanır (~7 san.).** Kamera dönür: həftə zolağı şaquli 6 qutuya çevrilir (sütunlar qutulara "qatlanır"). Qutu adları: 1 Yenidən öyrən … 6 Mənimsənilmiş. Vocabox yaşılı və laym burada görünür. "borrow" və "although" 3-cü qutuda (Neytral). |
| 9 | "bildiyin söz irəli gedir, çətin söz geri qayıdıb yenə qarşına çıxır." | "borrow" ✓ ilə 3→4 qalxır (+1). "although" ✗ ilə 3→2 enir (−1), sonra 2-ci qutudan yenidən kart kimi önə çıxır (yenə qarşına). |
| 10 | "Bazar ertəsi on söz. Bazar günü... hələ də yadındadır." | Qutular yenidən həftə zolağına açılır (ilk kadra qayıdış). Qırmızı B. sütununda bu dəfə kartlar dayanır. Böyük yazı: **"Bazar günü: yadındadır."** |
| 11 | "Ətraflı məlumat üçün rəyə "Vocabox" yazın." | Vocabox loqosu, rəy balonu içində "Vocabox" sözü. Kiçik yazı: **"Sabah: Leitner qutuları nədir?"** |

**Qeydlər:**
- Kartdakı sözlər real ingilis sözləridir. Tərcümə ekranda yoxdur, ona görə tərcümə xətası riski də yoxdur.
- Qutular paneli real tətbiqin quruluşunu (1–6, qutu adları, yaşıl rənglər) sadələşdirilmiş illüstrasiya kimi göstərir, real ekran yazısı deyil.
- Altyazı: neytral cümlə bloku, aşağıda (y≈1478–1560), sola yaslı. Böyük yazı eyni cümləni deyəndə altyazı gizlənir.
- Səs: Abbas, `eleven_v4`, 1 variant. Təxminən 480 simvol, ~400 kredit.


---

# Əlavə: texniki qeydlər (əvvəlki sessiyadan)

- **İstehsal üsulu:** görüntü kodla (Remotion + React + SVG) hazırlanır, səs ElevenLabs ilə yaradılır: "Abbas" (voice_id `IVMbfLv3KqUc4qDj6Yif`), `eleven_v4`, generations_count = 1. Görüntü və video modeli işlədilmir.
- **Təsdiq nöqtələri:** (1) mətn + plan, (2) ilk 2–3 kadrdan ibarət pano (çizim dili). Mətn təsdiqlənməmiş səs yaratma, çünki səs kredit xərcləyir.
- **Şriftlər:** yalnız açıq lisenziyalı və Azərbaycan hərflərini dəstəkləyən şriftlər: IBM Plex Sans/Mono, Barlow Condensed, Fraunces, Newsreader, Caveat. Sistem şriftləri (Segoe, Bahnschrift) bulud mühitində (Linux) yoxdur.
- **Bulud mühiti:** Remotion öz Chrome-unu `remotion.media`-dan yükləyə bilməyəndə hazır Chromium işlət: `renderStill/selectComposition`-a `browserExecutable`, CLI-yə isə `--browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell` ver.
- **Əvvəlki videolar** (yeni video onlardan ən azı 3 oxda fərqlənməlidir):
  - **Skript 1:** krem kağız, əl çizgisi ilə çəkilmiş xarakter, Segoe şriftləri, söz-söz altyazı.
  - **Skript 5:** gecə otağı, televizor, Bahnschrift + Ink Free, qeyd sarısı, imza öğə "inevitable" sözü.
- **Gün 01-in statusu:** mətn təsdiqlənib (2026-11-28), istehsal `reklam/gun01/`-də.
