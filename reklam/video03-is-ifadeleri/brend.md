# Brend — Vocabox

Ad: Vocabox (mənbə: app.json `expo.name`, package.json `name`)
Şüar: yoxdur. package.json description: "Vocabox — Fasiləli təkrar və Leitner sistemi ilə ağıllı xarici dil lüğəti" (videoda işlədilmir)
Loqo: public/favicon.svg → img/logo.svg (inline SVG, tünd yaşıl kvadrat + laym "V" monoqram)
Şrift: tətbiq `system-ui` işlədir, brend şrifti yoxdur → **Inter** (Azərbaycan hərflərini dəstəkləyir)
Məhsul görüntüləri (lokal veb versiya, Playwright 390×844 @3x): img/card_front.png ("İş ifadələri" dəstindən "I'll get back to you" məşq kartı), img/card_back.png, img/boxes.png (5 kart Qutu 4-də), img/top.png

| Rol | Rəng | Mənbə |
|---|---|---|
| --p | #204E40 | src/styles/app.css `--green` |
| --pd | #15382D | app.css `button.primary:hover` |
| --pl | #EEF2E9 | app.css `.pill`/`.box b` fonu |
| --y | #D8ED9B | app.css `--lime` |
| --yd | #8FD463 | logo `accentGrad` sonu |
| --tx | #172F29 | app.css `--ink` |
| --mu | #6B7872 | app.css `--muted` |

Kontrast: ağ mətn --p üstündə ≈ 9.6:1 · --tx ağ fonda ≈ 14:1 · --tx --y üstündə ≈ 11:1. Ağ mətn --y üstündə işlədilmir (kontrast çatmır), --y pill-lərdə mətn --tx-dir.
Qeyd: tətbiqdə ispan dili seçimdə görünür, REKLAM_QAYDALARI Q5-ə görə videoda açıq dil siyahısı göstərilmir.
