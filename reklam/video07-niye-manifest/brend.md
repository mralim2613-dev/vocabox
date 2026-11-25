# Brend — Vocabox

Ad: Vocabox (mənbə: app.json `expo.name`, package.json `name`)
Şüar: yoxdur. package.json description: "Vocabox — Fasiləli təkrar və Leitner sistemi ilə ağıllı xarici dil lüğəti" (videoda işlədilmir)
Loqo: public/favicon.svg → img/logo.svg (inline SVG, tünd yaşıl kvadrat + laym "V" monoqram)
Şrift: tətbiq `system-ui` işlədir, brend şrifti yoxdur → **Inter** (Azərbaycan hərflərini dəstəkləyir)
Məhsul görüntüləri (əvvəlki çəkilişlərdən, lokal veb versiya): img/top.png (dil/dəst seçimi), img/boxes.png (Yaddaş qutuları), img/fb_right.png (Qutu 3 → 4), img/fb_wrong.png (Qutu 3 → 2), img/prompt.png (prompt addımı), img/preview.png (Mətn → lüğət önbaxışı)

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
