# Skript 5 — Mətn və səhnə planı (Claude Animasyon Sistemi + ozansihay-motion skill-i)

## Stil kartı (ozansihay-motion, Azərbaycan dilinə uyğunlaşdırılıb)

```
STİL KARTI
Tez:          Serialda eşitdiyin söz karta çevrilsə, növbəti seriyada tanış gəlir.
Üsul:         "Sözü hadisəyə çevir" — inevitable sözü altyazıdan qopur, qeydə düşür, itir,
              karta çevrilir və altyazıya tanış söz kimi qayıdır.
Material:     Sırf tipografiya + sxematik (uydurma) serial kadrı, qeyd kağızı, telefon.
Kadraj:       Sabit iş sahəsi: yuxarıda televizor, aşağıda masa. Kamera cəmi iki dəfə hərəkət edir
              (telefona enir, televizora qayıdır).
Zaman:        30 fps. Əyrilər: ağır dolly (0.55,0,0.1,1) kamera üçün, sürətlənərək tərk (0.7,0,0.84,0)
              itən qeyd üçün, qələm (sin in-out), damğa (easing yox) böyük yazı və pauza üçün.
              İkili çəkiliş yoxdur.
Şrift:        Bahnschrift (televizor altyazısı və tablo dünyası) + Bahnschrift Condensed (böyük yazı)
              + Ink Free (qeyd kağızındakı əl yazısı). Hamısı ə/Ə, İ/ı, pangramla yoxlanıb.
Palitra:      Gecə otağı (#151c26/#1d2633), televizor işığı (~6500K, #9fb9cc), mətn #e6e1d3,
              vurğu: real yapışqan qeyd sarısı #f1d96a. Vocabox yaşılı yalnız tətbiqdə və sonluqda.
              2-ci seriya isti gündüz tonuna (#b89a72) sərt kəsilir.
Toxuma:       Kadr nömrəsi ilə seed-lənən grain, televizorun divara halation-u, vinyet.
İmza öğə:     Altyazıdakı "inevitable" sözü.
Səs:          Yalnız ElevenLabs səsi (Abbas, eleven_v4). Effekt səsi yoxdur. "Söz də."-dən sonra
              tam sükut anı var.
İşlənməyənlər: söz-söz pop altyazı və sarı aktiv söz (1-ci videoda var idi), krem kağız + əl
              çizgisi xarakter, mərkəzə düzülmüş başlıq, crossfade keçidlər, aşağıdan fade-slide,
              back.out / bounce, whoosh səsləri.
```

**Azərbaycan dilinə uyğunlaşdırma (skill-də Türkcə üçün olan yoxlamalar):** `lang="az"`, `toLocaleUpperCase('az-AZ')`, pangram "Zəfər, jaketini də papağını da götür, bu axşam hava çox soyuq olacaq." və `Ə ə İ ı` hərfləri hər şriftdə yoxlanıb. Səs altyazısı neytraldır: cümlə bloku, sola yaslı, 2 sətirdən çox deyil. Böyük yazı eyni cümləni deyəndə altyazı gizlənir.

**1-ci videodan fərqlənən oxlar:** şrift, palitra, kadraj (personaj yox, yalnız əllər), imza öğə, altyazı üsulu.

---

> **Reklam başlığı:** "Serialda başa düşmədiyin hər sözü öz kartına çevir."
> **Auditoriya:** İngilis dili · B qrupu (serial və məzmun izləyənlər)
> **Funksiyalar:** F3 (mətn → lüğət) əsas, F2 (Leitner qutuları) ikinci. Qaydaya görə ən azı iki funksiya var.
> **Kalıp:** "Gerçek olay" tipli tuhaf nəticə ilə açılış → dönüş → ilk kadra qayıdış.

## 1. Səs mətni (~50 söz, ~22–25 san.)

```text
[warm, conversational, unhurried] Serialda eyni sözü üçüncü dəfə eşidirsən. Yenə bilmirsən.
Dayandırırsan, qeydə yazırsan...
[short pause] Sonra qeyd itir. Söz də.
[confident] Vocabox hazır prompt verir: altyazını öz AI köməkçinə göndər, cavabı tətbiqə yapışdır.
Sözlər karta çevrilir, qutularda təkrar olunur.
[warm] Növbəti seriyada o sözü eşidirsən... və bilirsən.
[friendly] Link bio-dadır.
```

**Qaydalar üzrə yoxlama:**
- **Q4:** AI istifadəçinin öz köməkçisi kimi təqdim olunur, sürət vədi yoxdur. ✔
- **Q1, Q2, Q3, Q5, Q6:** qutu iddiası, qiymət, rəqəm, ispan dili, rəsmi brend adı yoxdur. ✔
- **Sistem:** ilk cümlə konkret ziddiyyətdir ("üçüncü dəfə eşidirsən, yenə bilmirsən"). Dönüş: "Sonra qeyd itir. Söz də." Son cümlə ilk cümləni bağlayır: "eşidirsən... və bilirsən". Ondan sonra bir cümlə çağırış gəlir. ✔

## 2. Səhnə planı

**Tək dünya:** axşam, qonaq otağı. Divan, televizor, kiçik masa, yapışqanlı qeyd kağızı, telefon.
**Bağlayıcı obyekt:** televizordakı altyazıda vurğulanan söz **inevitable**. Video bu sözlə açılır və bu sözlə bağlanır.
**Çəkiliş dili:** Skript 1 ilə eyni kağız toxuması, palitra, xətt qalınlığı və eyni xarakter (brend ardıcıllığı). Dünya isə tamamilə fərqlidir: axşam işığı, televizorun mavi parıltısı.

| # | Sətir (səs) | Ekranda nə var |
|---|---|---|
| 0 | "Serialda eyni sözü üçüncü dəfə eşidirsən. Yenə bilmirsən." | Xarakter divanda televizora baxır. Ekranda uydurma serial səhnəsi (siluetlər) və altyazı: *"…it was **inevitable**."* Söz vurğulanır, kənarda üç cizgi işarəsi çəkilir (üçüncü dəfə). Xarakterin qaşları çatılır. Böyük yazı: **"Yenə bilmirsən."** |
| 1 | "Dayandırırsan, qeydə yazırsan..." | Pult basılır, ekranda ⏸. Xarakter yapışqanlı qeyd kağızına "inevitable" yazır və masaya qoyur. |
| 2 | "Sonra qeyd itir. Söz də." | Qeyd kağızı masadan sürüşüb divanın arxasına düşür. Televizordakı sözün hərfləri dağılıb solur. Qısa sakit an. |
| 3 | "Vocabox hazır prompt verir: altyazını öz AI köməkçinə göndər, cavabı tətbiqə yapışdır." | Xarakter telefonu götürür, kamera telefona girir. Vocabox "Mətn → lüğət" ekranı: "Promptu kopyala"ya toxunur → altyazı mətni ümumi bir AI söhbət pəncərəsinə gedir (brendsiz) → cavab geri gəlir → "Dəstə əlavə et". |
| 4 | "Sözlər karta çevrilir, qutularda təkrar olunur." | Cavabdakı sözlər karta çevrilib yaddaş qutularına (1–6) düşür. **inevitable** kartı bir qutu irəli gedir. |
| 5 | "Növbəti seriyada o sözü eşidirsən... və bilirsən." | Kamera televizora qayıdır (ilk kadra dönüş): yeni seriya, eyni altyazı, **inevitable** sözü. Bu dəfə sözün altında yaşıl ✓ görünür, xarakter gülümsəyib başını tərpədir. Böyük yazı: **"…və bilirsən."** |
| 6 | "Link bio-dadır." | Vocabox loqosu və "Link bio-da ↓". |

**Qeydlər:**
- Serial uydurmadır: real şou adı, personaj və loqo yoxdur.
- AI söhbət pəncərəsi brendsizdir (heç bir real AI xidmətinin görünüşü yoxdur).
- Telefon ekranı sadələşdirilmiş illüstrasiyadır, real ekran yazısı deyil.
- Səs: Skript 1-dəki Abbas səsi, `eleven_v4`. Gözlənilən xərc: ~1 000–1 200 simvol, 2 variant (~800 kredit).
