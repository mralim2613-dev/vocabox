// Açıq lisenziyalı (SIL OFL) şriftlər: repoda node_modules/@fontsource-dan gəlir, Windows/Linux-da eyni görünür.
// Hamısı Azərbaycan hərfləri (Ə ə İ ı Ş Ç Ğ Ö Ü) ilə yoxlanıb: `node kadr.mjs sablon --komp FontTesti`.
// Sistem şriftlərindən (Bahnschrift, Segoe və s.) istifadə ETMƏ: bulud (Linux) mühitində yoxdur.
import {useEffect, useState} from 'react';
import {continueRender, delayRender} from 'remotion';

import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/fraunces/900.css';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/600.css';
import '@fontsource/caveat/400.css';
import '@fontsource/caveat/700.css';

export const FONT = {
  sans: '"IBM Plex Sans", sans-serif', // interfeys, altyazı, etiket
  mono: '"IBM Plex Mono", monospace', // kod, terminal, e-poçt dünyası
  dar: '"Barlow Condensed", sans-serif', // böyük damğa yazı, tablo, afiş
  serif: 'Fraunces, serif', // başlıq, kitab, editoryal
  serif2: 'Newsreader, serif', // qəzet, mətn bloku
  el: 'Caveat, cursive', // əl yazısı, qeyd kağızı, kənar qeyd
};

// Render-dən əvvəl bütün şriftlər (Azərbaycan hərfləri daxil) yüklənsin.
const YUKLE = [
  '400 40px "IBM Plex Sans"', '600 40px "IBM Plex Sans"', '700 40px "IBM Plex Sans"',
  '400 40px "IBM Plex Mono"', '600 40px "IBM Plex Mono"',
  '500 40px "Barlow Condensed"', '700 40px "Barlow Condensed"', '800 40px "Barlow Condensed"',
  '400 40px Fraunces', '700 40px Fraunces', '900 40px Fraunces',
  '400 40px Newsreader', '600 40px Newsreader',
  '400 40px Caveat', '700 40px Caveat',
];
export const useFontlar = () => {
  const [h] = useState(() => delayRender('Şriftlər yüklənir'));
  useEffect(() => {
    Promise.all(YUKLE.map((f) => document.fonts.load(f, 'Əə İı Şş Çç Ğğ Öö Üü abc'))).then(() => continueRender(h));
  }, [h]);
};

// Mətn eni (SVG-də sözün yerini hesablamaq üçün). Təxmini hərf eni işlətmə.
const cache = new Map<string, number>();
export const olc = (metin: string, font: string) => {
  const k = font + '|' + metin;
  if (!cache.has(k)) {
    const c = document.createElement('canvas').getContext('2d')!;
    c.font = font;
    cache.set(k, c.measureText(metin).width);
  }
  return cache.get(k)!;
};
