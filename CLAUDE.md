# Vocabox — AI agentlər üçün giriş

Vocabox — Azərbaycandilli istifadəçilər üçün xarici dil lüğəti tətbiqi (Leitner qutuları, hazır söz bazaları, mətn → lüğət). Tətbiqin kodu: `src/`, `index.html`, `android/`, `ios/`, `supabase/`. Reklam işi: `reklam/` və kökdəki `REKLAM_*` sənədləri.

## Hazırkı iş: dəyər məzmunu seriyası (26 gün, 26 video)

Növbəti yaradılacaq videolar **"Söz öyrənmə üsulu" seriyasıdır**. Plan, prinsiplər və hər videonun statusu: **[DEYER_SERIYASI.md](DEYER_SERIYASI.md)**. Statusu "hazırdır" olmayan ilk gündən davam et.

## Reklam/video işinə başlamazdan əvvəl oxu (bu sırayla)

1. [REKLAM_QAYDALARI.md](REKLAM_QAYDALARI.md) — məcburi qaydalar (3 funksiya, qadağan iddialar Q1–Q6, CTA). Hamısından üstündür.
2. [DEYER_SERIYASI.md](DEYER_SERIYASI.md) — 26 videonun siyahısı, dəyər məzmunu prinsipləri, status.
3. [reklam/AGENT_VIDEO_PROMPT.md](reklam/AGENT_VIDEO_PROMPT.md) — istehsal axını (A–H, təsdiq nöqtələri), əmrlər, şriftlər, texniki tələlər, hazır videolar cədvəli.
4. [reklam/sistem/Claude Animasyon Sistemi.md](reklam/sistem/Claude%20Animasyon%20Sistemi.md) — hekayə → səs → səhnə planı → kod → yoxlama.
5. [reklam/sistem/ozansihay-motion/SKILL.md](reklam/sistem/ozansihay-motion/SKILL.md) və `references/` — stil kartı, hərəkət, klişe testi.
6. [REKLAM_SKRIPTLERI_v1.md](REKLAM_SKRIPTLERI_v1.md) — köhnə reklam skriptləri (seriyadan kənar).

## Qısa qaydalar

- Dil: Azərbaycan dili. Sənədlər, səs mətni, ekran yazıları — hamısı azərbaycanca.
- Görüntü kodla (Remotion + SVG), səs ElevenLabs (Abbas, `eleven_v4`, 1 variant). Görüntü/video modeli yoxdur.
- Təsdiq nöqtələrində (mətn + plan, çizim dili) dayan və istifadəçidən cavab gözlə. Səs kredit xərcləyir: mətn təsdiqlənmədən səs yaratma.
- Render etmədiyin videonu hazır demə, eşitmədiyin səsi "yoxladım" demə.
- Bulud sessiyasında nəticələri commit et və push et (`AGENT_VIDEO_PROMPT.md`, addım H).
- Bulud mühitində Remotion öz Chrome-unu yükləyə bilmir (`remotion.media` bağlıdır); `ortak.mjs` avtomatik olaraq hazır Chromium-u (`/opt/pw-browsers/...`) işlədir. Başqa yol üçün `REMOTION_BROWSER_EXECUTABLE` dəyişənini ver.
