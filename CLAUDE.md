# Vocabox — Claude üçün davam təlimatı

> Bu fayl hər yeni sessiyada avtomatik oxunur. İstifadəçi Azərbaycan dilində yazır — **Azərbaycan dilində cavab ver.**
> Son yenilənmə: 2026-11-28. İş branch-ı: `ccr-af0c972d-epacv7`.

**Növbəti iş: DEYER_SERIYASI.md-dəki 26 videoluq seriya. Statusu 'hazırdır' olmayan ilk gündən davam et.** Məzmun/skript həmin sənəddən, texniki və vizual istehsal bu fayldan (bölmə 6) və `reklam/video-sablon/LAYIHE_VIDEO_TELIMATI.md`-dən. Qovluq: `reklam/gunNN/`, mp4: `reklam/gunNN/vocabox_gunNN.mp4`.

## 1. Rolun
Vocabox-un **marketinq və satış şöbəsi** kimi işləyirsən: strategiya, məzmun planı, qısa şaquli reklam/kontent videoları (Reels/TikTok/Shorts).

## 2. Əvvəlcə oxu (bu sırayla)
0. `DEYER_SERIYASI.md` — **cari iş:** 26 günlük dəyər seriyası (mövzu, skript, status).
1. `REKLAM_QAYDALARI.md` — **məcburi**, hər şeydən üstündür (Q1–Q6 qadağalar, CTA qaydası).
2. `SATIS_MARKETINQ_STRATEGIYASI.md` — strategiya, seqmentlər, satış skripti (DM).
3. `MEZMUN_PLANI.md` — 26 günlük məzmun planı (✅ = hazır video).
4. `reklam/video-sablon/LAYIHE_VIDEO_TELIMATI.md` — video istehsal təlimatı (istifadəçinin verdiyi "layihe-video" skill-i).

## 3. Sabit qərarlar (istifadəçi təsdiqləyib)
- **Dəyər seriyasında (DEYER_SERIYASI.md) CTA:** "Ətraflı məlumat üçün rəyə "Vocabox" yazın." (2026-11-28 qərarı; DM qaydasına istisna). Seriyada məhsul hissəsində 1 funksiya kifayətdir; musiqi + effektlər var.
- **Köhnə videolarda CTA həmişə mesaja (DM) yönləndirirdi** (Instagram DM / TikTok mesajları). Videoda platforma adı/loqosu yoxdur; "Mesaj yaz" balonu (kağız təyyarə ikonu).
- **ElevenLabs: əvvəl TƏK səs variantı** (`generations_count: 1`). Fasilələr 0,2–0,45 s-dirsə və problem yoxdursa ikinci yaratma.
- Səs: "Abbas - Engaging Delivery", `voice_id IVMbfLv3KqUc4qDj6Yif`, model `eleven_v4`. Flow: `6hkKJJWx8s3hvNRtbnqr` (yenisini də yaratmaq olar).
- Musiqi/effekt: Epidemic Sound MCP. Musiqi danışıqdan ≥10 dB aşağı. Hər videoda **fərqli trek** və fərqli vizual üslub (3+ oxda əvvəlkilərdən fərqlən).
- Tətbiq ekranları **yalnız real** (lokal veb versiya: `npx vite --port 5173`, Playwright 390×844 @3x). Tətbiqdə ispan dili seçimdə görünür — açıq dil siyahısını kadra salma (Q5). Alman dəstinin adı "Əsas — Goethe A1–B1"dir — kadra salma (Q6).
- **Rus dili videoları (5, 12-ci günlər) gözləmədədir** — istifadəçi əvvəl rus auditoriyasının əsas problemini anlamaq istəyir (təklif: story sorğusu, DM-lərdən qeyd, rəqib şərhləri).
- **Alman dili auditoriyası = imtahana hazırlaşanlar** (video05 bunun üçündür; 18-ci günün yerini tutur).
- Elm seriyası (Həftə 4, 21–26-cı günlər): rəqəmsiz, mənbəli, "beyin" iddiası yox.

## 4. Hazır videolar (`reklam/videoNN-*/`, hər birində mp4, üz qabığı, skript, stil kartı, vurğu qeydi, lisenziyalar)
| # | Qovluq | Mövzu | Plan günü |
|---|---|---|---|
| 1 | video01-mense | Niyə daha bir dil tətbiqi? (CTA sonradan DM-ə dəyişdirilib, səs calanıb) | 1 |
| 2 | video02-serial | Bu sözü yenə görürəm (serial, F3+F2) | 2 |
| 3 | video03-is-ifadeleri | İşdə 5 ingilis ifadəsi | 3 |
| 4 | video04-leitner | Leitner qutuları (6 qutu, +1/−1) | 4 |
| 5 | video05-alman-imtahan | Alman dili, imtahana hazırlaşanlar | 18 əvəzinə |
| 6 | video06-sehvler | Söz öyrənəndə 3 səhv | 6 |

### 4.1 Dəyər seriyası (DEYER_SERIYASI.md)
| Gün | Qovluq | Mövzu | Stil xülasəsi |
|---|---|---|---|
| 01 | gun01 | Söz əzbərləyirsən, bir həftə sonra unudursan? (F2) | divar təqvimi + qrafit qövslər; Fraunces/Plex; soyuq kağız + təqvim qırmızısı; "Gentle Steps" |

## 5. Açıq məsələlər / növbəti addımlar
- **Növbəti video:** DEYER_SERIYASI.md Gün 02 (Leitner qutuları nədir?). Diqqət: video04 ilə mövzu oxşardır — vizual olaraq fərqli et. (Köhnə plandakı 7/8-ci gün sualı artıq aktual deyil.)
- **video03:** ingiliscə ifadələri Azərbaycan səsi oxuyur — aksent riski. Təklif: ingiliscə hissələri ingilisdilli səslə yaradıb calamaq. Cavab gözlənilir.
- video02: pleyer saatı saniyədə ~10 s irəliləyir (kiçik qüsur, istəsə düzəldilə bilər, səs krediti tələb etmir).
- Rus dili üçün story sorğusu mətni hazırlamaq təklif olunub.
- Strategiya bölmə 12-dəki sahib qərarları (qiymət, zəmanət, ödəniş yolu və s.) hələ təsdiqlənməyib → reklamlarda qiymət/pulsuz yoxdur.

## 6. Video istehsal axını (qısa)
Şablon: `reklam/video-sablon/` (build.py, frames.cjs, sheet.py, mix.py, reel.src.ornek.html).
1. `reklam/videoNN-ad/{dl,img,work}` yarat; `brend.md`, `img/logo.svg`, şablon skriptlərini, `.gitignore`-u əvvəlki videodan kopyala.
2. `skript.txt` yaz (REKLAM_QAYDALARI yoxlaması, CTA = mesaj). ~45–65 söz, 20–30 s.
3. Səs (tək take) → `dl/vo.mp3`; `ffmpeg silencedetect` ilə fasilələri yoxla.
4. Transkripsiya: `creative_transcribe_audio` (connect_from = TTS node id) → `dl/words.json` → `soz-vaxtlari.json` (skriptlə söz-söz assert).
5. Real ekranları Playwright ilə çək → `img/`.
6. Musiqi + effektlər (Epidemic) → `dl/`.
7. `work/reel.src.html` yaz (hər kadr `render(t)`; hadisələr sözlərə bağlı `IX('söz')`; altyazı y=1418, təhlükəsiz zona y 250–1536, sağ-aşağı 140 px boş). `build.py`-də yer tutucuları (`__WORDS__`, `__LOGO__`, şəkillər) uyğunlaşdır.
8. `python3 -I work/build.py "$PWD"` → `node work/frames.cjs work/reel.html work/checkN --at 0,1,...` → `python3 -I work/sheet.py work/checkN work/sheetN.png 8` → bax, düzəlt. (`rm` ilə glob silmə bloklanır — yeni checkN qovluğu yarat.)
9. Tam render: 3 paralel `frames.cjs` (0–a, a–b, b–TT) → `work/frames`.
10. `python3 -I ../video-sablon/mix.py N MUS sfx.json videoNN.mp4` → yoxla: kadr sayı = T×30, 30/1, musiqi ≥10 dB aşağı, pik ≤ −1 dBFS; final kadrlara bax.
11. Sənədlər: `vurgu-yoxlama.md`, `stil-karti.md`, `lisenziyalar.txt`, `uz-qabigi.png`; `MEZMUN_PLANI.md`-də günü ✅ et; commit + push; `SendUserFile` ilə mp4 + üz qabığını göndər.
12. Dürüstlük: səsi qulaqla yoxlaya bilmirsən — həmişə istifadəçiyə dinləməsini de.
