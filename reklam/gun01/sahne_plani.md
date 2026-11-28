# Gün 01 — "Söz əzbərləyirsən, bir həftə sonra unudursan?"

> **Seriya:** Söz öyrənmə üsulu, Gün 1 / 26 ([DEYER_SERIYASI.md](../../DEYER_SERIYASI.md))
> **Fikir:** Sözlə bir dəfə görüşmək azdır. Ona aralarla qayıtmaq lazımdır, çətin sözə isə daha tez-tez.
> **Məhsul (5–10 san.):** F2: Leitner qutuları. Bildiyin söz irəli gedir, çətin söz geri qayıdıb yenə qarşına çıxır.
> **Auditoriya:** ümumi, ingilis dili nümunəsi ilə.
> **Status:** mətn + plan → **TƏSDİQ GÖZLƏYİR**

---

## 1. Səs mətni (~72 söz, təxminən 34–38 san.)

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
[friendly] Link bio-dadır.
```

**Vaxt bölgüsü:** hook 0–4 san. · dəyər ~4–26 san. · **məhsul ~26–33 san. (≈7 san.)** · bağlanış və çağırış ~33–37 san.

**Yoxlama (REKLAM_QAYDALARI §8 + DEYER_SERIYASI §2.6):**
- Məhsul hissəsini silsən, video yenə də işlək məsləhət verir: "aralarla qayıt, çətin sözə tez-tez". ✔
- Q1: "geri qayıdır" deyilir, "1-ci qutuya" deyilmir. ✔ · Q2: qiymət yoxdur. ✔ · Q3: faiz, müddət vədi, elmi iddia yoxdur. "On söz" vəziyyət təsviridir. ✔ · Q4: AI yoxdur. ✔ · Q5/Q6: ispan dili, brend adı yoxdur. ✔
- Tətbiqin vaxt planladığı deyilmir. "Sabah, bir neçə gün sonra" ümumi məsləhətdir, məhsul cümləsi yalnız qutuları təsvir edir. ✔
- Son cümlə ilk cümləni bağlayır (bazar ertəsi → bazar günü). Ondan sonra bir cümlə çağırış gəlir. ✔
- Bir funksiya (F2) var, seriya istisnası §2.3-ə görə. ✔

---

## 2. Stil kartı

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
              Hamısı ə/Ə, İ/ı ilə yoxlanıb (cikti/sablon_FontTesti.png).
Palitra:      Divar təqvimi kağızı (soyuq ağ, #ecebe5), çap mürəkkəbi (#1e2124), təqvimin bazar
              günü qırmızısı (#c23a2e, yalnız bazar günü və "unudulmuş" an üçün), mürəkkəb
              qövsləri qrafit (#3a4046). Vocabox yaşılı (#204e40 / laym #d8ed9b) yalnız qutular
              panelində və sonluqda.
Toxuma:       Kağız lifləri (kadr nömrəsi ilə seed-lənən incə grain), çap mürəkkəbinin kənarında
              cüzi yayılma. Vinyet yox.
İmza öğə:     "borrow" kartının həftə boyunca böyüyən qövslərlə tullanması (B.E. → Ç.A. → C. → növbəti B.E.).
Səs:          Yalnız Abbas səsi. Effekt səsi və musiqi yoxdur. "Problem səndə deyil."-dən əvvəl
              tam sükut.
İşlənməyənlər: personaj və əllər (skript1/5-də var idi), gecə otağı/TV, krem kağız + əl çizgisi,
              qeyd sarısı, söz-söz pop altyazı, mərkəzə düzülmüş başlıq, crossfade, aşağıdan
              fade-slide, bounce, telefon mockup-u.
```

**Əvvəlki videolardan fərqlənən oxlar:** şrift (Fraunces + Plex Mono, əvvəl Segoe/Bahnschrift), palitra (soyuq ağ + təqvim qırmızısı), kadraj (personaj yox, sabit təqvim zolağı), üsul (mekanizm diaqramı), imza öğə (qövslər). Cəmi 5 ox.

---

## 3. Səhnə planı (hər sətir: "bu cümlə deyiləndə ekranda nə var?")

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
| 11 | "Link bio-dadır." | Vocabox loqosu, "Link bio-da". Kiçik yazı: **"Sabah: Leitner qutuları nədir?"** |

**Qeydlər:**
- Kartdakı sözlər real ingilis sözləridir. Tərcümə ekranda yoxdur, ona görə tərcümə xətası riski də yoxdur.
- Qutular paneli real tətbiqin quruluşunu (1–6, qutu adları, yaşıl rənglər) sadələşdirilmiş illüstrasiya kimi göstərir, real ekran yazısı deyil.
- Altyazı: neytral cümlə bloku, aşağıda (y≈1478–1560), sola yaslı. Böyük yazı eyni cümləni deyəndə altyazı gizlənir.
- Səs: Abbas, `eleven_v4`, 1 variant. Təxminən 480 simvol, ~400 kredit.
