# Vocabox — Dəyər məzmunu seriyası: "Söz öyrənmə üsulu" (26 gün, 26 video)

> **Status:** aktiv. Bu, Vocabox üçün **növbəti istehsal ediləcək videolardır**. Başqa skript götürməzdən əvvəl bu seriyanı davam etdir.
> **Əsas sənədlər:** [REKLAM_QAYDALARI.md](REKLAM_QAYDALARI.md) (məcburi), [reklam/AGENT_VIDEO_PROMPT.md](reklam/AGENT_VIDEO_PROMPT.md) (istehsal axını).
> Bu sənəd REKLAM_QAYDALARI.md ilə ziddiyyət təşkil edərsə, **REKLAM_QAYDALARI.md üstündür** (yalnız aşağıdakı 2.3-cü bənd seriya üçün açıq istisnadır).

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

### 2.3 Seriya üçün istisna (istifadəçi təsdiqi ilə)
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
| 01 | Söz əzbərləyirsən, bir həftə sonra unudursan? | Sözlə bir dəfə görüşmək azdır, ona aralarla qayıtmaq lazımdır. | F2 | **plan təsdiqə gözləyir** |
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
