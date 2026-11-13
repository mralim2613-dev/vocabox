// Vocabox · Skript 5 — "Serialdakı söz". ozansihay-motion skill-i ilə (Azərbaycan dilinə uyğunlaşdırılıb).
// İmza öğə: televizor altyazısındakı "inevitable" sözü. Söz altyazıdan qopur, qeydə düşür, itir,
// karta çevrilir və növbəti seriyada altyazıya tanış söz kimi qayıdır.
// Bütün anlar söz vaxtlarından (an) gəlir; animasiya yalnız kadr nömrəsinin funksiyasıdır.
import React from 'react';
import {AbsoluteFill, Audio, Composition, Easing, getInputProps, interpolate, staticFile, useCurrentFrame} from 'remotion';
import veri from '../../public/skript5/kelimeler.json';

type Kelime = {w: string; s: number; e: number; c: number};
type Nokta = [number, number];
const K = veri as Kelime[];
const FPS = 30;

const an = (satir: number, kelime = 0) => K.filter((k) => k.c === satir)[kelime].s;
const son = (satir: number) => { const s = K.filter((k) => k.c === satir); return s[s.length - 1].e; };
const satirMetni = (c: number) => K.filter((k) => k.c === c).map((k) => k.w).join(' ');

// Əyri ailələri (skill: hər hərəkətə eyni əyri verilmir)
const DOLLY = Easing.bezier(0.55, 0, 0.1, 1); // ağır kalkış, uzun oturma — kamera
const TERK = Easing.bezier(0.7, 0, 0.84, 0); // sürətlənərək tərk — itən qeyd
const KALEM = Easing.inOut(Easing.sin); // qələm: sürətli, yavaş, sürətli
const YUMSAQ = Easing.bezier(0.25, 0.1, 0.25, 1); // yüngül etiket
const u = (t: number, t0: number, d: number, e: (x: number) => number = YUMSAQ) =>
  interpolate(t, [t0, t0 + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
const damga = (t: number, t0: number) => (t >= t0 ? 1 : 0); // easing yox, tək kadrda
const karis = (a: number, b: number, x: number) => a + (b - a) * x;
const nk = (a: Nokta, b: Nokta, x: number): Nokta => [karis(a[0], b[0], x), karis(a[1], b[1], x)];

// Palitra mənbəyi: gecə otağı, yeganə işıq televizordur (~6500K soyuq mavi-ağ).
// Vurğu: real yapışqanlı qeyd kağızının sarısı. Vocabox yaşılı yalnız tətbiq ekranında və sonluqda.
const P = {
  otaq: '#151c26', otaq2: '#1d2633', isiq: '#9fb9cc', metin: '#e6e1d3', metin2: '#a9b4bf',
  qeyd: '#f1d96a', qeydKolge: '#b79f3c', vb: '#1f5a47', vbLaym: '#c9e66a', deri: '#b98f7a', qol: '#2a3442', ekranKenar: '#0b0f14',
};
const SANS = 'Bahnschrift, "Segoe UI", sans-serif';
const DAR = '"Bahnschrift Condensed", Bahnschrift, sans-serif';
const EL = '"Ink Free", "Segoe Print", cursive';

// ===== Kamera: dünya nöqtəsi (fx,fy) ekranda (sx,sy)-yə, miqyas S =====
type Kam = {t: number; d: number; S: number; fx: number; fy: number; sx: number; sy: number};
const kamera = (t: number, kadrlar: Kam[]) =>
  kadrlar.reduce((c, k) => {
    const x = u(t, k.t, k.d, DOLLY);
    return {S: c.S * Math.pow(k.S / c.S, x), fx: karis(c.fx, k.fx, x), fy: karis(c.fy, k.fy, x), sx: karis(c.sx, k.sx, x), sy: karis(c.sy, k.sy, x)};
  }, {S: 1, fx: 540, fy: 960, sx: 540, sy: 960});

// ===== Televizor (dünya: 50..1030 × 170..721) =====
const TV = {x: 50, y: 170, w: 980, h: 551};
const Seriya: React.FC<{t: number; ikinci: number; sonuk: number}> = ({t, ikinci, sonuk}) => {
  const {x, y, w, h} = TV;
  // 1-ci seriya: gecə, soyuq ton. 2-ci seriya: gündüz, isti ton (sərt kəsmə).
  const gun = ikinci > 0;
  const fon = gun ? '#b89a72' : '#27394a';
  const pencere = gun ? '#e7d3a8' : '#4f6b80';
  const fiqur = gun ? '#3a2c22' : '#0f161d';
  const nefes = Math.sin(t * 1.1) * 3;
  return (
    <g>
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} fill={fon} />
      <rect x={x + 560} y={y + 70} width={300} height={260} fill={pencere} />
      <path d={`M ${x + 710} ${y + 70} L ${x + 710} ${y + 330} M ${x + 560} ${y + 200} L ${x + 860} ${y + 200}`} stroke={fon} strokeWidth={10} />
      {/* İki siluet üz-üzə */}
      <g fill={fiqur}>
        <ellipse cx={x + 300} cy={y + 230 + nefes} rx={58} ry={66} />
        <path d={`M ${x + 200} ${y + h - 14} Q ${x + 210} ${y + 320 + nefes} ${x + 300} ${y + 310 + nefes} Q ${x + 390} ${y + 320 + nefes} ${x + 400} ${y + h - 14} Z`} />
        <ellipse cx={x + 650} cy={y + 270 - nefes} rx={52} ry={60} />
        <path d={`M ${x + 560} ${y + h - 14} Q ${x + 570} ${y + 350 - nefes} ${x + 650} ${y + 342 - nefes} Q ${x + 730} ${y + 350 - nefes} ${x + 740} ${y + h - 14} Z`} />
      </g>
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} fill="#000" opacity={sonuk * 0.45} />
    </g>
  );
};

// Mətn eni şriftin real ölçüsü ilə (canvas measureText), təxmin yox.
const olcCache = new Map<string, number>();
const olc = (metin: string, font: string) => {
  const key = font + '|' + metin;
  if (!olcCache.has(key)) {
    const ctx = document.createElement('canvas').getContext('2d')!;
    ctx.font = font;
    olcCache.set(key, ctx.measureText(metin).width);
  }
  return olcCache.get(key)!;
};

// Altyazı xətti: "inevitable" ayrıca çəkilir, çünki hadisənin özüdür.
const Altyazi: React.FC<{once: string; soz: string; sonra: string; silinme: number; xett: number; sual: number; tercume: number}> = ({once, soz, sonra, silinme, xett, sual, tercume}) => {
  const cx = TV.x + TV.w / 2, by = TV.y + TV.h - 58;
  const olcu = 42, font = `600 ${olcu}px Bahnschrift`;
  const w1 = olc(once, font), w2 = olc(soz, font), w3 = olc(sonra, font);
  const x0 = cx - (w1 + w2 + w3) / 2;
  const sx = x0 + w1, sw = w2;
  const yazi = {fill: P.metin, stroke: '#0b0f14', strokeWidth: 7, paintOrder: 'stroke' as const, style: {whiteSpace: 'pre' as const}};
  return (
    <g fontFamily={SANS} fontWeight={600} fontSize={olcu}>
      <defs>
        <clipPath id="sozKlip"><rect x={sx - 4 + (sw + 8) * silinme} y={by - 50} width={sw + 8} height={70} /></clipPath>
      </defs>
      <text x={x0} y={by} {...yazi}>{once}</text>
      <text x={sx + sw} y={by} {...yazi}>{sonra}</text>
      <text x={sx} y={by} {...yazi} clipPath="url(#sozKlip)">{soz}</text>
      {sual > 0 && <line x1={sx} x2={sx + sw * sual} y1={by + 12} y2={by + 12} stroke={P.qeyd} strokeWidth={4} strokeDasharray="10 8" />}
      {xett > 0 && <line x1={sx} x2={sx + sw * xett} y1={by + 12} y2={by + 12} stroke={P.vbLaym} strokeWidth={6} strokeLinecap="round" />}
      {tercume > 0 && (
        <g opacity={tercume} transform={`translate(${sx + sw / 2} ${by - 70}) rotate(-3)`}>
          <rect x={-104} y={-40} width={208} height={64} fill={P.qeyd} />
          <text x={0} y={6} textAnchor="middle" fontFamily={EL} fontWeight={400} fontSize={40} fill="#2b2410">qaçılmaz</text>
        </g>
      )}
    </g>
  );
};

// ===== Telefon (dünya: mərkəz ~ (790, 1170), 300 × 540) =====
const TEL = {w: 300, h: 540};
const QUTU = {x0: 26, w: 34, gap: 7, y: 230, h: 150};
const qx = (i: number) => QUTU.x0 + i * (QUTU.w + QUTU.gap) + QUTU.w / 2;
const KARTLAR = ['inevitable', 'avoid', 'tried'];
const Telefon: React.FC<{t: number; gelen: number; qutu: number; ireli: number; kopyala: number; elave: number}> = ({t, gelen, qutu, ireli, kopyala, elave}) => (
  <g>
    <rect x={0} y={0} width={TEL.w} height={TEL.h} rx={34} fill={P.ekranKenar} />
    <rect x={12} y={14} width={TEL.w - 24} height={TEL.h - 28} rx={24} fill="#f5f2ea" />
    <rect x={12} y={14} width={TEL.w - 24} height={60} rx={24} fill={P.vb} />
    <rect x={12} y={50} width={TEL.w - 24} height={24} fill={P.vb} />
    <text x={TEL.w / 2} y={56} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={24} fill="#f5f2ea">Vocabox</text>
    {/* Mətn → lüğət görünüşü */}
    <g opacity={1 - qutu}>
      <text x={30} y={112} fontFamily={SANS} fontWeight={700} fontSize={20} fill={P.vb}>Mətn → lüğət</text>
      <rect x={30} y={128} width={TEL.w - 60} height={50} rx={10} fill={kopyala > 0 && kopyala < 1 ? P.vbLaym : P.vb} />
      <text x={TEL.w / 2} y={160} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={19} fill={kopyala > 0 && kopyala < 1 ? P.vb : '#f5f2ea'}>Promptu kopyala</text>
      <rect x={30} y={196} width={TEL.w - 60} height={210} rx={10} fill="#fff" stroke="#c9c2b2" strokeWidth={2} />
      {KARTLAR.map((k, i) => i < gelen ? (
        <g key={k} transform={`translate(${TEL.w / 2} ${226 + i * 58})`}>
          <rect x={-100} y={-20} width={200} height={42} rx={8} fill="#f5f2ea" stroke="#2b2722" strokeWidth={2} />
          <text x={0} y={8} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={20} fill="#2b2722">{k}</text>
        </g>
      ) : null)}
      <rect x={30} y={424} width={TEL.w - 60} height={50} rx={10} fill={elave > 0 && elave < 1 ? P.vbLaym : '#dfe6dc'} />
      <text x={TEL.w / 2} y={456} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={19} fill={P.vb}>Dəstə əlavə et</text>
    </g>
    {/* Yaddaş qutuları */}
    <g opacity={qutu}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = QUTU.x0 + i * (QUTU.w + QUTU.gap);
        return (
          <g key={i}>
            <rect x={x} y={QUTU.y} width={QUTU.w} height={QUTU.h} rx={6} fill={i === 5 ? '#eef3dc' : '#ebe5d8'} stroke={i === 5 ? P.vb : '#a39c8c'} strokeWidth={2} />
            <text x={x + QUTU.w / 2} y={QUTU.y + 28} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={20} fill={i === 5 ? P.vb : '#2b2722'}>{i + 1}</text>
          </g>
        );
      })}
      {KARTLAR.map((k, i) => {
        const dus = u(t, an(8, 1) + i * 0.12, 0.5, DOLLY);
        const bu = k === 'inevitable';
        const x = bu ? karis(qx(2), qx(3), ireli) : qx(2);
        const y = karis(150, QUTU.y + QUTU.h - 22 - i * 20, dus) - (bu ? Math.sin(ireli * Math.PI) * 40 : 0);
        return (
          <g key={k} transform={`translate(${x} ${y})`} opacity={dus}>
            <rect x={bu ? -62 : -16} y={-11} width={bu ? 124 : 32} height={22} rx={5} fill={bu ? P.qeyd : '#fff'} stroke="#2b2722" strokeWidth={1.5} />
            {bu && <text x={0} y={6} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={15} fill="#2b2722">inevitable</text>}
          </g>
        );
      })}
    </g>
  </g>
);

const Logo: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="13" fill={P.vb} />
    <rect x="13" y="10" width="20" height="14" rx="3.5" transform="rotate(-9 13 10)" fill="#fff" fillOpacity="0.18" />
    <rect x="16" y="11" width="20" height="14" rx="3.5" transform="rotate(7 16 11)" fill="#fff" fillOpacity="0.32" />
    <path d="M13 18.5L24 33.5L35 18.5" stroke={P.vbLaym} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 19.5L24 28.5L30.5 19.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="14" r="2.5" fill={P.vbLaym} />
  </svg>
);

// Səs altyazısı: neytral, cümlə bloku, sola yaslı. Böyük yazı eyni cümləni deyəndə gizlənir.
const SesAltyazisi: React.FC<{t: number}> = ({t}) => {
  const c = K.filter((k) => k.s - 0.05 <= t && t <= son(k.c) + 0.35).pop()?.c;
  if (c === undefined || [1, 10, 11].includes(c)) return null;
  const op = Math.min(u(t, an(c) - 0.05, 0.1, Easing.linear), 1 - u(t, son(c) + 0.25, 0.1, Easing.linear));
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 1478, fontFamily: SANS, fontWeight: 500, fontSize: 44, lineHeight: 1.22, color: P.metin, opacity: op}}>
      {satirMetni(c)}
    </div>
  );
};

const Video: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;

  // ---- Kamera: sabit iş sahəsi; yalnız iki hərəkət (telefona en, televizora qayıt) ----
  const kam = kamera(t, [
    {t: an(8, 0) - 0.35, d: 1.6, S: 2.2, fx: 790, fy: 1170, sx: 540, sy: 830}, // telefon altyazıya girməsin
    {t: an(9, 0) - 0.5, d: 1.8, S: 1, fx: 540, fy: 960, sx: 540, sy: 960},
  ]);

  // ---- Televizor ----
  const pauza = t >= an(2, 0) - 0.03 && t < an(5, 0);
  const ikinci = damga(t, an(9, 0) - 0.15);
  const altyaziVar = t >= 0.2; // ilk hərəkət 6-cı kadrda
  const silinme = ikinci ? 0 : u(t, an(4, 0) - 0.05, 0.4, KALEM);
  const sual = ikinci ? 0 : u(t, an(1, 0), 0.35, KALEM) * (1 - damga(t, an(2, 0)));
  const xett = u(t, an(10, 1) - 0.1, 0.45, KALEM);
  const tercume = u(t, an(10, 1) + 0.2, 0.3);
  // üç cizgi: "üçüncü" sözündə damğa kimi, 3 kadr arayla
  const cizgi = [0, 1, 2].filter((i) => t >= an(0, 3) + i * 0.1).length * (1 - damga(t, an(2, 0)));

  // ---- Qeyd kağızı ----
  const qeydGel = u(t, an(2, 1) - 0.3, 0.5, DOLLY);
  const yazi = u(t, an(2, 2) - 0.15, son(2) - an(2, 2) + 0.15, KALEM);
  const qeydGet = u(t, an(3, 1) + 0.1, 0.55, TERK);
  const elQeyd = Math.min(qeydGel, 1 - u(t, son(2) + 0.1, 0.35, TERK));

  // ---- Altyazı zolağı → AI köməkçin → kartlar → telefon ----
  const telGel = u(t, an(5, 0) - 0.2, 0.8, DOLLY);
  const telGet = u(t, an(9, 0) + 0.2, 0.5, TERK);
  const telPos: Nokta = [640, karis(1700, 900, telGel) + telGet * 800];
  const kopyala = u(t, an(5, 2), 0.35, Easing.linear);
  const qutuAc = u(t, an(6, 2) - 0.2, 0.35); // "AI köməkçin" qutusu
  const zolaqQalx = u(t, an(6, 0) - 0.05, 0.4, DOLLY);
  const zolaqGet = u(t, an(6, 3), 0.7, DOLLY);
  const zolaqPos = nk([TV.x + TV.w / 2, TV.y + TV.h - 70], [280, 1150], zolaqGet);
  const qutuBagla = u(t, an(8, 0) - 0.4, 0.3);
  const gelenler = KARTLAR.map((_, i) => u(t, an(7, 0) + i * 0.15, 0.7, DOLLY));
  const gelen = gelenler.filter((x) => x >= 1).length;
  const elave = u(t, an(7, 2), 0.35, Easing.linear);
  const qutuGor = u(t, an(8, 0) + 0.2, 0.3);
  const ireli = u(t, an(8, 4) - 0.1, 0.8, DOLLY);

  // ---- Böyük yazılar (damğa, kadrdan daşır) ----
  const yazi1 = damga(t, an(1, 0) - 0.03) * (1 - u(t, an(2, 0), 0.2, TERK));
  const yazi2 = damga(t, an(10, 0) - 0.03);
  const cta = u(t, an(11, 0) - 0.1, 0.4);

  const grenSeed = f % 997;

  return (
    <AbsoluteFill style={{background: P.otaq}}>
      {!getInputProps().sessiz && <Audio src={staticFile('skript5/ses.mp3')} />}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="otaq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.otaq2} /><stop offset="1" stopColor={P.otaq} /></linearGradient>
          <radialGradient id="tvIsiq" cx="50%" cy="25%" r="60%"><stop offset="0" stopColor={P.isiq} stopOpacity="0.22" /><stop offset="1" stopColor={P.isiq} stopOpacity="0" /></radialGradient>
          <filter id="gren"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={grenSeed} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <radialGradient id="vinyet" cx="50%" cy="45%" r="78%"><stop offset="55%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.45" /></radialGradient>
          <filter id="halo" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        <g transform={`translate(${kam.sx - kam.fx * kam.S} ${kam.sy - kam.fy * kam.S}) scale(${kam.S})`}>
          <rect x={-800} y={-800} width={2680} height={3520} fill="url(#otaq)" />
          <rect x={-800} y={-800} width={2680} height={2400} fill="url(#tvIsiq)" />
          {/* Televizor işığının divara düşən halation-u */}
          <rect x={TV.x + 20} y={TV.y + 20} width={TV.w - 40} height={TV.h - 40} fill={ikinci ? '#d9b98c' : '#6f8fa8'} opacity={0.35} filter="url(#halo)" />
          {/* Masa səthi */}
          <path d="M -200 980 L 1280 980 L 1280 1500 L -200 1500 Z" fill="#202a36" />
          <line x1={-200} x2={1280} y1={980} y2={980} stroke="#2e3a48" strokeWidth={3} />
          {/* Televizor */}
          <rect x={TV.x} y={TV.y} width={TV.w} height={TV.h} rx={8} fill={P.ekranKenar} />
          <Seriya t={t} ikinci={ikinci} sonuk={pauza ? 1 : 0} />
          {altyaziVar && (ikinci ? (
            t >= an(9, 3) - 0.1 && <Altyazi once="…it's " soz="inevitable" sonra=", right?" silinme={0} xett={xett} sual={0} tercume={tercume} />
          ) : (
            <Altyazi once="…it was " soz="inevitable" sonra="." silinme={silinme} xett={0} sual={sual} tercume={0} />
          ))}
          {/* Üç cizgi: üçüncü dəfə */}
          {cizgi > 0 && (() => {
            const font = '600 42px Bahnschrift', w1 = olc('…it was ', font), w2 = olc('inevitable', font), w3 = olc('.', font);
            const mx = TV.x + TV.w / 2 - (w1 + w2 + w3) / 2 + w1 + w2 / 2;
            return (
              <g stroke={P.qeyd} strokeWidth={7} strokeLinecap="round">
                {[0, 1, 2].slice(0, cizgi).map((i) => <line key={i} x1={mx - 26 + i * 26} y1={608} x2={mx - 20 + i * 26} y2={566} />)}
              </g>
            );
          })()}
          {/* Pauza işarəsi: sərt kəsmə */}
          {pauza && (
            <g fill={P.metin} opacity={0.92}>
              <rect x={TV.x + TV.w / 2 - 50} y={TV.y + 200} width={34} height={110} rx={4} />
              <rect x={TV.x + TV.w / 2 + 16} y={TV.y + 200} width={34} height={110} rx={4} />
            </g>
          )}
          {/* Qeyd kağızı və qələmli əl */}
          {qeydGel > 0 && qeydGet < 1 && (
            <g transform={`translate(${karis(-300, 130, qeydGel) - qeydGet * 520} ${1030 + qeydGet * 640}) rotate(${-4 - qeydGet * 38} 170 150)`}>
              <rect x={6} y={10} width={340} height={300} fill={P.qeydKolge} opacity={0.5} />
              <rect x={0} y={0} width={340} height={300} fill={P.qeyd} />
              <rect x={0} y={0} width={340} height={44} fill="#e4c955" />
              <defs><clipPath id="yaziKlip"><rect x={20} y={110} width={300 * yazi} height={100} /></clipPath></defs>
              <text x={30} y={180} fontFamily={EL} fontSize={62} fill="#2b2410" clipPath="url(#yaziKlip)">inevitable</text>
            </g>
          )}
          {elQeyd > 0 && (
            <g transform={`translate(${130 + 30 + 300 * yazi} ${karis(1560, 1205, elQeyd)})`}>
              {/* Qol aşağı-sağdan gəlir, əl qələmi tutur, qələmin ucu yazının sonundadır */}
              <rect x={40} y={30} width={96} height={520} rx={40} fill={P.qol} transform="rotate(-32 40 30)" />
              <rect x={-4} y={-96} width={12} height={112} rx={5} fill={P.metin} transform="rotate(24 0 0)" />
              <path d="M 0 0 L -4 -10 L 4 -10 Z" fill="#2b2722" />
              <ellipse cx={36} cy={22} rx={48} ry={34} fill={P.deri} transform="rotate(-20 36 22)" />
              <ellipse cx={8} cy={4} rx={16} ry={11} fill={P.deri} />
            </g>
          )}
          {/* AI köməkçin qutusu (istifadəçinin öz köməkçisi, brendsiz) */}
          {qutuAc > 0 && (
            <g opacity={qutuAc * (1 - qutuBagla)} transform="translate(90 1030)">
              <rect x={0} y={0} width={380} height={250} rx={18} fill="#1a222d" stroke={P.metin2} strokeWidth={3} strokeDasharray="14 10" />
              <text x={190} y={-18} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={32} fill={P.metin2}>AI köməkçin</text>
            </g>
          )}
          {/* Altyazı zolağı: televizordan qopur, köməkçiyə gedir */}
          {zolaqQalx > 0 && qutuBagla < 1 && (
            <g transform={`translate(${zolaqPos[0]} ${zolaqPos[1] + (1 - zolaqQalx) * 30}) scale(${karis(1, 0.66, zolaqGet)})`} opacity={zolaqQalx * (1 - qutuBagla)}>
              <rect x={-250} y={-60} width={500} height={120} fill={P.metin} />
              <text x={-226} y={-12} fontFamily={SANS} fontWeight={600} fontSize={32} fill="#2b2722">…it was inevitable.</text>
              <text x={-226} y={34} fontFamily={SANS} fontWeight={600} fontSize={32} fill="#2b2722">We tried to avoid it.</text>
            </g>
          )}
          {/* Cavab: kartlar köməkçidən telefona */}
          {KARTLAR.map((k, i) => {
            const x = gelenler[i];
            if (x <= 0 || x >= 1) return null;
            const p = nk([280, 1150], [telPos[0] + TEL.w / 2, telPos[1] + 226 + i * 58], x);
            return (
              <g key={k} transform={`translate(${p[0]} ${p[1] - Math.sin(x * Math.PI) * 120})`}>
                <rect x={-100} y={-20} width={200} height={42} rx={8} fill="#f5f2ea" stroke="#2b2722" strokeWidth={2} />
                <text x={0} y={8} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={20} fill="#2b2722">{k}</text>
              </g>
            );
          })}
          {/* Telefon və tutan əl */}
          {telGel > 0 && telGet < 1 && (
            <g transform={`translate(${telPos[0]} ${telPos[1]})`}>
              <rect x={210} y={420} width={110} height={700} rx={40} fill={P.qol} />
              <ellipse cx={260} cy={440} rx={60} ry={70} fill={P.deri} />
              <Telefon t={t} gelen={gelen} qutu={qutuGor} ireli={ireli} kopyala={kopyala} elave={elave} />
              <ellipse cx={292} cy={470} rx={26} ry={44} fill={P.deri} />
            </g>
          )}
        </g>
        <rect width={1080} height={1920} filter="url(#gren)" opacity={0.08} style={{mixBlendMode: 'screen'}} />
        <rect width={1080} height={1920} fill="url(#vinyet)" />
      </svg>

      {/* Böyük yazı: sola yaslı, kadrdan daşır, damğa kimi enir */}
      {yazi1 > 0 && (
        <div style={{position: 'absolute', left: 56, top: 790, whiteSpace: 'nowrap', fontFamily: DAR, fontWeight: 700, fontSize: 178, lineHeight: 1, color: P.metin, opacity: yazi1, letterSpacing: -2}}>
          Yenə bilmirsən.
        </div>
      )}
      {yazi2 > 0 && (
        <div style={{position: 'absolute', left: 56, top: 790, whiteSpace: 'nowrap', fontFamily: DAR, fontWeight: 700, fontSize: 178, lineHeight: 1, color: P.metin, letterSpacing: -2}}>
          …və bilirsən.
        </div>
      )}
      {cta > 0 && (
        <div style={{position: 'absolute', left: 60, top: 1080, display: 'flex', alignItems: 'center', gap: 22, opacity: cta}}>
          <Logo size={96} />
          <div>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 62, color: P.metin, lineHeight: 1}}>Vocabox</div>
            <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 40, color: P.qeyd, marginTop: 10}}>Link bio-da ↓</div>
          </div>
        </div>
      )}
      <SesAltyazisi t={t} />
    </AbsoluteFill>
  );
};

const sure = Math.ceil((K[K.length - 1].e + 1.6) * FPS);
export const Root: React.FC = () => <Composition id="Video" component={Video} durationInFrames={sure} fps={FPS} width={1080} height={1920} />;
