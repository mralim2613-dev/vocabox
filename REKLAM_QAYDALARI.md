# Vocabox — Reklam Qaydaları (AI agentlər üçün məcburi sənəd)

> **Kim üçün:** Vocabox üçün reklam skripti, post, story, video ssenarisi, başlıq və ya kopiraytinq yazan hər AI agent.
> **Qayda:** Yazmağa başlamazdan əvvəl bu sənədi tam oxu. Bu sənəd `reklam_beledcisi.html` və PDF bələdçisi ilə ziddiyyət təşkil edərsə, **bu sənəd üstündür**.
> **Mənbə:** Tətbiqin real kodu və məzmunu (2026-11-13 vəziyyəti). Burada olmayan funksiyanı reklamda vəd etmə.

---

## 1. Məhsul nədir (bir cümlə)

Vocabox — Azərbaycandilli istifadəçilər üçün Leitner qutuları ilə təkrar edən, hazır söz bazaları olan və öz mətnindən lüğət düzəltməyə imkan verən xarici dil lüğəti tətbiqidir.

## 2. Reklamın əsas strukturu: yalnız 3 funksiya

Hər reklamın əsası aşağıdakı **3 funksiyadan** qurulur. Başqa funksiya əsas mesaj ola bilməz.

| # | Funksiya | Əsas mesaj | Reklamda göstərilə bilən ekran |
|---|---|---|---|
| **1** | **Hazır, səviyyəli söz bazaları** | Sıfırdan söz yığmırsan, hazır kartlar var. | Dil seçimi, dəst seçimi, CEFR (A1–C2) filtri, kart |
| **2** | **Leitner qutuları ilə təkrar** | Bildiyin söz irəli gedir, çətin söz tez-tez qayıdır. | "Yaddaş qutuları" paneli (1–6), məşq ekranı |
| **3** | **Mətn → lüğət** | Oxuduğun mətndən öz kartlarını düzəlt. | "Mətn → lüğət" bölməsi: prompt, JSON, önbaxış |

**Paylanma qaydası:**
- Hər reklam **1-ci və ya 3-cü** funksiyadan başlayan hook ilə açılır (auditoriyaya görə), **2-ci funksiya** isə izah və etibar hissəsidir.
- Hər reklamda 3 funksiyadan **ən azı ikisi** keçməlidir. Qısa story-lərdə (≤ 15 san.) yalnız biri ola bilər.
- Köməkçi mesaj kimi (yalnız bir cümlə, əsas yer tutmadan) bunlar işlədilə bilər: reklamsız və izləməsiz olması, kamera/mikrofon/GPS istəməməsi, oflayn işləməsi, öz dəstini yaratmaq imkanı.

### 2.1 Funksiyalar üzrə dəqiq izah

**Funksiya 1 — Söz bazaları**
- Reklamda yalnız **ingilis, rus və alman** dilləri üçün hazır dəstlər təqdim edilir (ispan dili reklam edilmir, bax: Q5).
- Alman və ispan dəstləri A1–B1 səviyyələri ilə bölünüb. Rus dəsti tezlik sırası ilə düzülüb (1–1 000, 1 001–2 000 və s.).
- Kartlarda tərcümə, hədəf dildə izah var. Nümunə cümlə **yalnız bəzi kartlarda** var, hamısında deyil.
- Rəqəm qaydası: **yuvarlaq və təhlükəsiz rəqəm işlət** ("5 000+ rus sözü", "3 000+ alman sözü", "2 500+ ingilis sözü"). Dəqiq rəqəm tələb olunarsa, əvvəl `src/data/summary.json` və tətbiqin Ayarlar bölməsi uyğunlaşdırılmalıdır (bax: Bölmə 7).

**Funksiya 2 — Leitner qutuları**
- 6 qutu var. Yeni kart **3-cü qutudan** başlayır.
- Düz cavab: **bir qutu irəli (+1)**. Səhv cavab: **bir qutu geri (−1)**.
- İstifadəçi "Zəiflər (1–2)", "Yeni kartlar", "Mənimsənilmiş (6)" kimi qutulara görə məşq seçə bilir.
- Üç məşq rejimi: fləşkart, yazaraq xatırla, variant seç.

**Funksiya 3 — Mətn → lüğət**
- Tətbiq **hazır prompt** verir. İstifadəçi promptu və mətnini **öz seçdiyi AI xidmətinə** göndərir, aldığı JSON-u tətbiqə yapışdırır, önbaxışa baxır və dəstə əlavə edir.
- JSON, CSV və TSV faylı da qəbul olunur.
- **Tətbiqin özündə AI yoxdur.** Hər zaman "AI ilə birlikdə", "AI köməkçinlə" tipli ifadələr işlət.

---

## 3. QADAĞAN OLUNMUŞ İDDİALAR (heç bir halda yazma)

Aşağıdakı 6 iddia və onların bütün formaları, sinonimləri, tərcümələri və eyni mənanı verən başqa cümlələr **qadağandır**. Hook, başlıq, caption, voice-over, ekran yazısı, hashtag, CTA və şərh cavabı — hamısına aiddir.

### Q1. "Səhv cavab kartı dərhal 1-ci qutuya qaytarır"
- **Niyə:** Yalandır. Real qayda: səhv cavab kartı yalnız **bir qutu geri** salır.
- ❌ "Səhv etdin? Kart dərhal 1-ci qutuya qayıdır."
- ✅ "Düz bildin: kart irəli gedir. Səhv etdin: kart bir qutu geri qayıdır və tezliklə yenə qarşına çıxır."

### Q2. "Birdəfəlik lisenziya / ömürlük istifadə / lisenziya nömrəsi (VB-XXXXXX)"
- **Niyə:** Tətbiqdə satış və lisenziya modeli yoxdur. Hesabları administrator verir, giriş istifadəçi nömrəsi və açarla olur. Ödəniş tətbiqdən kənardadır və hələ təsdiqlənməyib.
- Qadağandır: "birdəfəlik ödəniş", "ömürlük", "bir dəfə al, həmişə işlət", "lisenziya al", "VB-" nömrəsi, "abunəliksiz" kimi qiymətlə bağlı **hər cür vəd**.
- ❌ "Bir dəfə lisenziya al, ömürlük işlət."
- ✅ Qiymət, ödəniş və lisenziya haqqında **heç nə yazma.** CTA yalnız təsdiqlənmiş linkə yönəldir (Bölmə 5).

### Q3. Statistik və rəqəmsal iddialar (mənbəsiz)
- **Niyə:** Mənbəsizdir və yoxlanmayıb. Tətbiq istifadəçi öyrənmə nəticəsi, öyrənmə sürəti və ya qiymət müqayisəsi göstərmir.
- Qadağandır:
  - "48 saatda 80% unudursan" və Ebbinghaus-a istinadla hər cür faiz,
  - "ayda 300+ söz öyrən", "gündə 15 dəqiqə ilə X nəticə",
  - "90% insan eyni problemlə qarşılaşır",
  - "hər ay 20 AZN / 10–15 dollar verirsən" və rəqiblərin qiymətinə dair hər cür rəqəm,
  - "zəmanətli mənimsə", "tez", "2 dəfə sürətli" kimi nəticə vədləri.
- ✅ Yalnız tətbiqin özündən doğrulanan rəqəmlər: dəst ölçüləri (yuxarıdakı yuvarlaq rəqəmlər), 6 qutu, 3 məşq rejimi, A1–C2 səviyyələri.

### Q4. "AI ilə saniyələr içində / tətbiq AI ilə lüğət yaradır"
- **Niyə:** Tətbiqin içində AI yoxdur. İstifadəçi prompt və mətni özü AI xidmətinə göndərir.
- ❌ "Tətbiq mətni 10 saniyədə AI ilə kartlara çevirir."
- ❌ "Süni intellektli lüğət tətbiqi."
- ✅ "Mətnini AI köməkçinə göndər, cavabı Vocabox-a yapışdır, öz kartların hazırdır."
- Sürət vədi (saniyə, dəqiqə) yazma.

### Q5. İspan dili və ümumi kart rəqəmi ("11 170+ kart")
- **Niyə:** İspan dəsti hələ reklama hazır deyil. Ümumi cəm rəqəmi isə dəqiq deyil.
- Qadağandır: "11 170 kart", "11 000+ kart" kimi ümumi cəm rəqəmi.
- **İspan dili reklamlarda ümumiyyətlə yer almır:** nə başlıqda, nə mətndə, nə də dil siyahısında. Dilləri sadalayanda yalnız **ingilis, rus və alman** yazılır. (İspan dili tətbiqdə mövcuddur, amma reklam edilmir. Bu qadağa ispan dəsti hazır elan olunana qədər qüvvədədir.)
- Bir dil üçün hədəflənmiş reklamda yalnız həmin dil göstərilə bilər.

### Q6. "Rəsmi baza" və üçüncü tərəf brend adları
- **Niyə:** Tətbiqin öz istifadə şərtlərinə görə Vocabox müstəqildir və heç bir kənar qurumla rəsmi əlaqəsi yoxdur. "Rəsmi" demək yalan əlaqə təsəvvürü yaradır və hüquqi risk daşıyır.
- Qadağandır:
  - "Goethe-Institut rəsmi imtahan bazası", "rəsmi Goethe sözləri", "imtahan sözləri zəmanətlidir",
  - "Oxford 3000", "Brown lüğəti" və buna bənzər brend və müəllif adları,
  - rəqib adları (Duolingo, Quizlet və s.) ilə müqayisə.
- ✅ İcazə verilən formalar: "Alman dili, A1–B1 səviyyələrinə uyğun hazır dəstlər", "ən çox işlənən rus sözləri (tezlik sırası ilə)", "CEFR səviyyələri ilə".
- "Goethe" sözü **yalnız səviyyə istinadı kimi və "uyğun" ifadəsi ilə**, rəsmi əlaqə təəssüratı yaratmadan işlənə bilər: "Goethe A1–B1 səviyyələrinə uyğun". "İmtahan sözləri", "imtahana hazırlıq üçün rəsmi" yazılmaz.

---

## 4. Əlavə qadağalar (təhlükəsizlik və dürüstlük)

- Tətbiqdə olmayan funksiyanı vəd etmə (səs tələffüzü, oyunlaşdırma, streak, liderbord, mətn skaneri, kamera tərcüməsi, sosial funksiyalar və s.).
- "Bütün kartlarda nümunə cümlə var" yazma. Yalnız bəzilərində var.
- CEFR səviyyələrini dəqiq imtahan səviyyəsi kimi təqdim etmə. Bəzi dəstlərdə A1/A2 təxminidir.
- Sağlamlıq, beyin elmi və psixologiya mövzusunda mənbəsiz iddia (məsələn "beynin sözləri 48 saata silir") yazma. "Fasiləli təkrar" metodunu **izah** etmək olar, **faiz və müddət vəd etmək** olmaz.
- "Zibilə at, dəftəri at" kimi başqa üsulları alçaldan aqressiv ifadələr yazma. Fərq göstərmək olar, təhqir etmək olmaz.
- İstifadəçinin məlumatları haqqında yalnız doğru iddia: lokal yaddaş, ixtiyari bulud sinxronizasiyası, reklam şəbəkəsi və izləmə yoxdur, hesab silinə bilər. "Tam anonim", "heç nə toplanmır" yazma (buludda hesab məlumatı saxlanır).

---

## 5. CTA (çağırış) qaydaları

- CTA yalnız **sınamağa və ya ətraflı məlumata** yönəlməlidir: "Tətbiqə bax", "Linkə keç", "Əlaqə saxla".
- Qiymət, endirim, lisenziya, "pulsuz" və "pulsuz sınaq" sözlərini **yalnız təsdiqlənmiş kommersiya modeli** olduqda işlət. Hazırda təsdiqlənməyib, ona görə yazma.
- Link yazılacaqsa, `[LINK]` yer tutucusu işlət. Özün link uydurma.
- Əlaqə ünvanı: `musabayramov@zehniapp.com` (yalnız dəstək və əlaqə üçün).

---

## 6. Ton və format

- Dil: Azərbaycan dili. Sadə, qısa, birbaşa.
- Hədəf kitlə və prioritet: **1) ingilis dili (ən böyük kütlə, reklam büdcəsinin və variantların çoxu buraya), 2) rus dili, 3) alman dili.** İspan dili reklam edilmir.
- Barnum tipli hook-larda yalnız geniş yayılmış, zərərsiz öyrənmə hisslərindən (təkrar başlamaq, unutmaq, yarımçıq qalmaq) istifadə et. Elmi və ya psixoloji iddia, faiz və "sənin beynin belədir" tipli ifadə yazma.
- Hook ilk 2 saniyədə problem və ya fayda göstərməlidir. Problem real olmalıdır (söz unutmaq, söz siyahısı yığmağın çətinliyi), uydurma rəqəmlə dəstəklənməməlidir.
- Hər reklam variantı üçün qısa qeyd əlavə et: **hansı funksiyalara əsaslanır** (1/2/3).
- Video ssenarisində göstərilən ekranlar **real tətbiq ekranları** olmalıdır (Bölmə 2-dəki cədvəl).

---

## 7. Açıq məsələlər (agent bunları düzəltməməlidir, yalnız bilməlidir)

1. **Alman və ispan kart sayı uyğunsuzluğu:** `summary.json` alman dili üçün 3 200 göstərir, Ayarlar mətni isə 3 064 (alman) və 2 672 (ispan) yazır. Dəqiq rəqəm təsdiqlənənə qədər yalnız yuvarlaq rəqəm (Funksiya 1) işlət.
2. **Qiymət və lisenziya modeli təsdiqlənməyib.** Təsdiqlənənə qədər Q2 qüvvədədir.
3. **Texniki sabitlik:** `qa/BROWSER_AUDIT_AZ.md` ilkin açılış və məşq xətalarını qeyd etmişdi. Düzəlişlər son build-də yoxlanmayıb. Bu, trafik başlamazdan əvvəl insan tərəfindən yoxlanmalıdır.

---

## 8. Təhvil verməzdən əvvəl yoxlama siyahısı (agent özü yoxlayır)

Hər reklam mətnindən sonra bu siyahını keç. Bir "Xeyr" varsa, mətni düzəlt.

- [ ] Əsas mesaj 3 funksiyadan (söz bazaları, Leitner, mətn → lüğət) ibarətdir?
- [ ] Q1–Q6-dan heç birinə uyğun cümlə yoxdur?
- [ ] Səhv cavab üçün "bir qutu geri" deyilir (və ya heç nə deyilmir)?
- [ ] Qiymət, lisenziya, "ömürlük", "abunəliksiz" sözləri yoxdur?
- [ ] Faiz, müddət, "ayda X söz" kimi mənbəsiz rəqəm yoxdur?
- [ ] "AI" yalnız istifadəçinin öz AI xidməti kimi təqdim olunur, sürət vədi yoxdur?
- [ ] Ümumi cəm kart rəqəmi yoxdur və ispan dili heç yerdə keçmir?
- [ ] "Rəsmi" sözü, Goethe, Oxford, Brown və rəqib adları qaydalara uyğun işlənib?
- [ ] Tətbiqdə olmayan funksiya vəd edilməyib?
- [ ] CTA yalnız təsdiqlənmiş yönləndirmədir, link yer tutucudur?
- [ ] Hər variantın yanında hansı funksiyalara əsaslandığı qeyd olunub?

---

## 9. Nümunə: icazə verilən qısa reklam mətni

**Əsaslandığı funksiyalar:** 1, 2

> Söz dəftərini bağla.
> Vocabox-da alman, rus, ingilis və ispan dilləri üçün hazır dəstlər var, səviyyələrə görə seçirsən.
> Bildiyin söz qutuda irəli gedir, çətin söz geri qayıdıb yenə qarşına çıxır.
> Tətbiqə bax: [LINK]

**Əsaslandığı funksiyalar:** 3, 2

> Oxuduğun mətndən öz lüğətini düzəlt.
> Vocabox hazır prompt verir. Mətnini AI köməkçinə göndərirsən, cavabı tətbiqə yapışdırırsan, öz kartların hazırdır.
> Sonra Leitner qutuları ilə təkrar et.
> Linkə keç: [LINK]
