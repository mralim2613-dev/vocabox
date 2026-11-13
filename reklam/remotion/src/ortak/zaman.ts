// Zaman köməkçiləri: anlar söz vaxtlarından gəlir, animasiya yalnız kadr nömrəsinin funksiyasıdır.
import {Easing, interpolate} from 'remotion';

export type Kelime = {w: string; s: number; e: number; c: number};
export type Nokta = [number, number];
export const FPS = 30;

// kelimeler.json-dan an/son/satirMetni funksiyaları
export const zamanYarat = (K: Kelime[]) => ({
  an: (satir: number, kelime = 0) => K.filter((k) => k.c === satir)[kelime].s,
  son: (satir: number) => { const s = K.filter((k) => k.c === satir); return s[s.length - 1].e; },
  satirMetni: (c: number) => K.filter((k) => k.c === c).map((k) => k.w).join(' '),
  aktivSatir: (t: number, sonraGozle = 0.35) => K.filter((k) => k.s - 0.05 <= t && t <= K.filter((x) => x.c === k.c).slice(-1)[0].e + sonraGozle).pop()?.c,
  sure: (sonBosluq = 1.6) => Math.ceil((K[K.length - 1].e + sonBosluq) * FPS),
});

// Əyri ailələri (ozansihay-motion: hər hərəkətə eyni əyri verilmir)
export const DOLLY = Easing.bezier(0.55, 0, 0.1, 1); // kamera: ağır kalkış, uzun oturma
export const TERK = Easing.bezier(0.7, 0, 0.84, 0); // sürətlənərək tərk
export const KALEM = Easing.inOut(Easing.sin); // qələm: sürətli, yavaş, sürətli
export const YUMSAQ = Easing.bezier(0.25, 0.1, 0.25, 1); // yüngül etiket
export const u = (t: number, t0: number, d: number, e: (x: number) => number = YUMSAQ) =>
  interpolate(t, [t0, t0 + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const damga = (t: number, t0: number) => (t >= t0 ? 1 : 0); // easing yox
export const karis = (a: number, b: number, x: number) => a + (b - a) * x;
export const nk = (a: Nokta, b: Nokta, x: number): Nokta => [karis(a[0], b[0], x), karis(a[1], b[1], x)];

// Kamera: dünya nöqtəsi (fx,fy) ekranda (sx,sy)-yə düşür, miqyas S. Zoom eksponensial interpolyasiya olunur.
export type Kam = {t: number; d: number; S: number; fx: number; fy: number; sx: number; sy: number};
export const kamera = (t: number, kadrlar: Kam[]) => {
  const k = kadrlar.reduce((c, x) => {
    const p = u(t, x.t, x.d, DOLLY);
    return {S: c.S * Math.pow(x.S / c.S, p), fx: karis(c.fx, x.fx, p), fy: karis(c.fy, x.fy, p), sx: karis(c.sx, x.sx, p), sy: karis(c.sy, x.sy, p)};
  }, {S: 1, fx: 540, fy: 960, sx: 540, sy: 960});
  return `translate(${k.sx - k.fx * k.S} ${k.sy - k.fy * k.S}) scale(${k.S})`;
};
