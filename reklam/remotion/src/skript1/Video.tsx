// Vocabox · Skript 1 — "İngiliscə bilirsən". Bütün görüntü SVG, səs ElevenLabs.
// Səhnə anları söz vaxtlarından gəlir (an), saniyə əllə yazılmır.
// Tək dünya: iş masası. Bağlayıcı obyekt: e-poçtdakı boşluq (açılışda yaranır, sonda dolur).
import React from 'react';
import {AbsoluteFill, Audio, Composition, Easing, getInputProps, interpolate, staticFile, useCurrentFrame} from 'remotion';
import veri from '../../public/skript1/kelimeler.json';

type Kelime = {w: string; s: number; e: number; c: number};
type Nokta = [number, number];
const K = veri as Kelime[];
const FPS = 30;

const an = (satir: number, kelime = 0) => K.filter((k) => k.c === satir)[kelime].s;
const son = (satir: number) => { const s = K.filter((k) => k.c === satir); return s[s.length - 1].e; };
const gir = (t: number, t0: number, sure = 0.8) =>
  interpolate(t, [t0, t0 + sure], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.55, 1)});
const karis = (a: number, b: number, u: number) => a + (b - a) * u;
const noktaKaris = (a: Nokta, b: Nokta, u: number): Nokta => [karis(a[0], b[0], u), karis(a[1], b[1], u)];
// Ardıcıl hərəkət: başlanğıc nöqtədən addım-addım
const yol = (t: number, bas: Nokta, addimlar: {t0: number; d: number; p: Nokta}[]) =>
  addimlar.reduce<Nokta>((cur, a) => noktaKaris(cur, a.p, gir(t, a.t0, a.d)), bas);

// Palitra
const P = {
  kagiz: '#f1e8d4', kagiz2: '#e6dabf', murekkeb: '#2b2722', yasil: '#1f5a47', yasil2: '#2f6b55', laym: '#c9e66a',
  deri: '#f0cba7', sac: '#3a2a20', salvar: '#38465f', masa: '#a07850', masaKenar: '#7d5b3b', ekran: '#fbfaf6', boz: '#8b8578', qirmizi: '#c8553d', mercan: '#f2a593',
};
const XETT = 7;
const ELYAZI = '"Segoe Print", "Comic Sans MS", cursive';
const SADE = '"Segoe UI", system-ui, sans-serif';
const MONO = 'Consolas, "Courier New", monospace';

// ===== Altyazı =====
const Altyazi: React.FC<{t: number}> = ({t}) => {
  const aktif = K.filter((k) => k.s - 0.04 <= t && t <= son(k.c) + 0.45).pop();
  if (!aktif) return null;
  return (
    <div style={{position: 'absolute', left: 80, right: 80, top: 1400, textAlign: 'center', fontFamily: SADE, fontWeight: 700, fontSize: 54, lineHeight: 1.3}}>
      {K.filter((k) => k.c === aktif.c).map((k, i) => {
        const indi = t >= k.s - 0.04 && t < k.e + 0.02;
        return (
          <span key={i} style={{opacity: t >= k.s - 0.04 ? 1 : 0, color: indi ? P.yasil : P.murekkeb, background: indi ? 'rgba(201,230,106,.75)' : 'transparent', borderRadius: 10, padding: '0 6px'}}>
            {k.w}
          </span>
        );
      }).reduce<React.ReactNode[]>((a, el, i) => (i ? [...a, ' ', el] : [el]), [])}
    </div>
  );
};

// ===== Kağız toxuması və vinyet =====
const Kagiz: React.FC = () => (
  <>
    <defs>
      <filter id="gren"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <radialGradient id="vinyet" cx="50%" cy="45%" r="75%"><stop offset="60%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#3a2a10" stopOpacity="0.28" /></radialGradient>
    </defs>
    <rect width={1080} height={1920} filter="url(#gren)" opacity={0.09} style={{mixBlendMode: 'multiply'}} />
    <rect width={1080} height={1920} fill="url(#vinyet)" />
  </>
);

// ===== Xarakter (profil, sağa baxır) =====
type Poz = {nefes: number; el: Nokta; el2: Nokta; qas: number; agiz: number; bas: number};
const Xarakter: React.FC<{p: Poz}> = ({p}) => {
  const omuz: Nokta = [318, 820 + p.nefes];
  const dirsek = (h: Nokta, sag = 1): Nokta => [(omuz[0] + h[0]) / 2 + 18 * sag, (omuz[1] + h[1]) / 2 + 40];
  const d1 = dirsek(p.el), d2 = dirsek(p.el2, -1);
  const ag = p.agiz;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x={168} y={790} width={44} height={250} rx={18} fill={P.masa} stroke={P.murekkeb} strokeWidth={5} />
      <path d="M 196 1040 L 380 1040 M 220 1040 L 205 1270 M 360 1040 L 372 1270" stroke={P.masaKenar} strokeWidth={XETT + 3} fill="none" />
      <path d="M 300 1030 L 470 1035 L 470 1250 M 270 1030 L 430 1050 L 430 1255" stroke={P.salvar} strokeWidth={34} fill="none" />
      <path d="M 448 1262 L 505 1262 M 410 1266 L 462 1266" stroke={P.murekkeb} strokeWidth={22} />
      {/* Arxa qol */}
      <path d={`M ${omuz[0]} ${omuz[1]} Q ${d2[0]} ${d2[1]} ${p.el2[0]} ${p.el2[1]}`} stroke={P.yasil} strokeWidth={30} fill="none" opacity={0.85} />
      <circle cx={p.el2[0]} cy={p.el2[1]} r={16} fill={P.deri} stroke={P.murekkeb} strokeWidth={4} />
      {/* Bədən */}
      <path d={`M 268 ${830 + p.nefes} Q 318 ${790 + p.nefes} 368 ${830 + p.nefes} L 380 1035 L 262 1035 Z`} fill={P.yasil2} stroke={P.murekkeb} strokeWidth={XETT - 2} />
      {/* Baş */}
      <g transform={`translate(330 ${700 + p.nefes}) rotate(${p.bas})`}>
        <path d="M -14 56 L -12 96 L 18 96 L 20 56" fill={P.deri} stroke={P.murekkeb} strokeWidth={4} />
        <ellipse cx={0} cy={0} rx={70} ry={76} fill={P.deri} stroke={P.murekkeb} strokeWidth={XETT - 2} />
        <path d="M -70 -6 Q -76 -84 4 -82 Q 64 -84 70 -30 Q 40 -50 6 -44 Q -30 -40 -40 10 Q -56 4 -70 -6 Z" fill={P.sac} />
        <ellipse cx={-30} cy={8} rx={13} ry={17} fill={P.deri} stroke={P.murekkeb} strokeWidth={4} />
        <circle cx={40} cy={2} r={7} fill={P.murekkeb} />
        <path d={`M 26 ${-22 - p.qas * 0.4} L 58 ${-22 + p.qas}`} stroke={P.murekkeb} strokeWidth={6} />
        <path d="M 66 18 L 74 34 L 62 36" stroke={P.murekkeb} strokeWidth={4} fill="none" />
        <path d={`M 34 50 Q 48 ${50 + ag * 10} 60 ${48 - ag * 2}`} stroke={P.murekkeb} strokeWidth={5} fill="none" />
      </g>
      {/* Ön qol */}
      <path d={`M ${omuz[0]} ${omuz[1]} Q ${d1[0]} ${d1[1]} ${p.el[0]} ${p.el[1]}`} stroke={P.yasil2} strokeWidth={32} fill="none" />
      <path d={`M ${omuz[0]} ${omuz[1]} Q ${d1[0]} ${d1[1]} ${p.el[0]} ${p.el[1]}`} stroke={P.murekkeb} strokeWidth={3} fill="none" opacity={0.25} />
      <circle cx={p.el[0]} cy={p.el[1]} r={18} fill={P.deri} stroke={P.murekkeb} strokeWidth={4} />
    </g>
  );
};

// ===== Monitor ekranı (e-poçt) =====
const EKRAN = {x: 600, y: 690, w: 340, h: 300};
const HERF = 8.8; // Consolas 16px hərf eni
const Eposta: React.FC<{yazilan: string; kursor: boolean; dondu: number; dolu: number}> = ({yazilan, kursor, dondu, dolu}) => {
  const {x, y} = EKRAN;
  const gx = x + 30 + yazilan.length * HERF;
  return (
    <g fontFamily={MONO} fontSize={16} fill={P.murekkeb}>
      <rect x={x + 14} y={y + 14} width={EKRAN.w - 28} height={EKRAN.h - 28} rx={8} fill={P.ekran} />
      <rect x={x + 14} y={y + 14} width={EKRAN.w - 28} height={26} rx={8} fill={P.kagiz2} />
      {[0, 1, 2].map((i) => <circle key={i} cx={x + 30 + i * 14} cy={y + 27} r={4} fill={[P.qirmizi, '#e0b04a', P.yasil2][i]} />)}
      <text x={x + 30} y={y + 66} fill={P.boz} fontSize={13}>Kimə: Komanda</text>
      <line x1={x + 30} x2={x + 310} y1={y + 76} y2={y + 76} stroke={P.kagiz2} strokeWidth={2} />
      <text x={x + 30} y={y + 112}>Hi team,</text>
      <text x={x + 30} y={y + 142}>{yazilan}</text>
      {dolu > 0 && <rect x={gx - 3} y={y + 126} width={7 * HERF + 6} height={22} rx={4} fill={P.laym} opacity={dolu} />}
      {dolu > 0 && <text x={gx} y={y + 142} fill={P.yasil} fontWeight={700} opacity={dolu}>improve</text>}
      {dondu > 0 && dolu < 1 && <rect x={gx} y={y + 124} width={86} height={24} rx={4} fill="none" stroke={P.qirmizi} strokeWidth={2} strokeDasharray="6 5" opacity={dondu * (1 - dolu)} />}
      {kursor && <rect x={gx + (dolu > 0.5 ? 7 * HERF + 4 : 0)} y={y + 126} width={2.5} height={20} fill={dondu > 0 && dolu < 0.5 ? P.qirmizi : P.murekkeb} />}
      {[172, 196, 220].map((yy, i) => <rect key={yy} x={x + 30} y={y + yy - 10} width={[230, 190, 140][i]} height={8} rx={4} fill={P.kagiz2} opacity={0.6} />)}
    </g>
  );
};

// ===== Qrammatika kitabı =====
const Kitab: React.FC<{acil: number; itele: number}> = ({acil, itele}) => (
  <g transform={`translate(${150 - itele * 280} ${990 - Math.sin(itele * Math.PI) * 20}) rotate(${-itele * 14} 75 20)`} opacity={1 - itele}>
    <rect x={0} y={acil * 26} width={150} height={40 - acil * 26} rx={4} fill="#d9b25a" stroke={P.murekkeb} strokeWidth={5} />
    {acil < 0.05 && <path d="M 12 10 L 138 10 M 12 30 L 138 30" stroke={P.murekkeb} strokeWidth={3} opacity={0.35} />}
    {acil > 0 && (
      <g strokeLinejoin="round">
        {/* Açılmış iki səhifə */}
        <path d={`M 75 30 Q 38 ${30 - 14 * acil} -4 ${28} L -4 ${28 - 70 * acil} Q 38 ${16 - 84 * acil} 75 ${30 - 70 * acil} Z`} fill={P.ekran} stroke={P.murekkeb} strokeWidth={4} />
        <path d={`M 75 30 Q 112 ${30 - 14 * acil} 154 ${28} L 154 ${28 - 70 * acil} Q 112 ${16 - 84 * acil} 75 ${30 - 70 * acil} Z`} fill={P.ekran} stroke={P.murekkeb} strokeWidth={4} />
        <path d={`M 14 ${18 - 40 * acil} L 58 ${12 - 48 * acil} M 14 ${30 - 34 * acil} L 52 ${24 - 42 * acil}`} stroke={P.boz} strokeWidth={4} strokeLinecap="round" opacity={acil} />
        <path d={`M 94 ${14 - 36 * acil} L 106 ${24 - 30 * acil} L 134 ${-4 - 46 * acil}`} stroke={P.yasil2} strokeWidth={8} fill="none" strokeLinecap="round" opacity={acil} />
      </g>
    )}
  </g>
);

// ===== Telefon və tətbiq ekranı (telefon koordinatları: 70 × 130) =====
const QUTU = {x0: 5.7, w: 8.6, gap: 1.4, y: 46, h: 38};
const qx = (i: number) => QUTU.x0 + i * (QUTU.w + QUTU.gap) + QUTU.w / 2;
const STACK = [2, 3, 4, 3, 2, 1];
const Kart: React.FC<{soz: string; x: number; y: number; s?: number; isiq?: string; op?: number}> = ({soz, x, y, s = 1, isiq, op = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    {isiq && <rect x={-9} y={-4.6} width={18} height={9.2} rx={2} fill={isiq} opacity={0.6} />}
    <rect x={-7.6} y={-3.4} width={15.2} height={6.8} rx={1.4} fill="#fff" stroke={P.murekkeb} strokeWidth={0.45} />
    <text x={0} y={1.1} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={3} fill={P.murekkeb}>{soz}</text>
  </g>
);
const Etiket: React.FC<{yazi: string; x: number; y: number; bg: string; op: number}> = ({yazi, x, y, bg, op}) => op <= 0 ? null : (
  <g transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * op})`} opacity={op}>
    <rect x={-6} y={-3.6} width={12} height={7.2} rx={3.6} fill={bg} />
    <text x={0} y={1.5} textAnchor="middle" fontFamily={SADE} fontWeight={800} fontSize={4.4} fill={P.murekkeb}>{yazi}</text>
  </g>
);
const Telefon: React.FC<{t: number; merkez: Nokta; dik: number; gelen: number}> = ({t, merkez, dik, gelen}) => {
  const ekranAc = gir(t, an(5, 0) + 0.75, 0.3);
  const dil = gir(t, an(5, 1) - 0.05, 0.3);
  const qutular = gir(t, an(6, 0) - 0.55, 0.4);
  // Sətir 6: "improve" irəli (3 → 4)
  const duzBas = an(6, 0) - 0.05, ireli = gir(t, an(6, 2) - 0.05, 0.7);
  // Sətir 7: "approach" geri (3 → 2), sonra qarşına çıxır
  const sehvBas = an(7, 0) - 0.05;
  const appGor = gir(t, an(7, 0) - 0.25, 0.25), geri = gir(t, an(7, 0) + 0.15, 0.6), qarsi = gir(t, an(7, 3) - 0.1, 0.7);
  const dalga = (t0: number) => { const u = interpolate(t, [t0, t0 + 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}); return u > 0 && u < 1 ? u : 0; };
  const d1 = dalga(duzBas), d2 = dalga(sehvBas);
  return (
    <g transform={`translate(${merkez[0]} ${merkez[1]}) scale(1 ${dik}) translate(-35 -65)`}>
      <rect x={0} y={0} width={70} height={130} rx={10} fill={P.murekkeb} />
      <rect x={4} y={6} width={62} height={118} rx={6} fill="#1a1714" />
      <g opacity={ekranAc}>
        <rect x={4} y={6} width={62} height={118} rx={6} fill={P.ekran} />
        <rect x={4} y={6} width={62} height={14} rx={6} fill={P.yasil} />
        <rect x={4} y={14} width={62} height={6} fill={P.yasil} />
        <text x={35} y={16} textAnchor="middle" fontFamily={SADE} fontWeight={800} fontSize={5.6} fill="#fff">Vocabox</text>
        {/* Dəst görünüşü */}
        <g opacity={1 - qutular}>
          <text x={35} y={32} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={5} fill={P.yasil} opacity={dil}>İngilis dili</text>
          {[2, 1, 0].map((i) => i < gelen ? <rect key={i} x={15 + i * 1.6} y={52 - i * 2.2} width={40} height={24} rx={2.5} fill="#fff" stroke={P.murekkeb} strokeWidth={0.6} /> : null)}
          {gelen > 0 && <text x={35 + (Math.min(gelen, 3) - 1) * 1.6} y={66 - (Math.min(gelen, 3) - 1) * 2.2} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={5} fill={P.murekkeb}>{['improve', 'deadline', 'suggest'][Math.min(gelen, 3) - 1]}</text>}
        </g>
        {/* Yaddaş qutuları */}
        <g opacity={qutular}>
          {STACK.map((n, i) => {
            const x = QUTU.x0 + i * (QUTU.w + QUTU.gap);
            return (
              <g key={i}>
                <rect x={x} y={QUTU.y} width={QUTU.w} height={QUTU.h} rx={1.6} fill={i === 5 ? '#eef6d8' : '#f3eee3'} stroke={i === 5 ? P.yasil2 : P.boz} strokeWidth={0.5} />
                <text x={x + QUTU.w / 2} y={QUTU.y + 7} textAnchor="middle" fontFamily={SADE} fontWeight={800} fontSize={5} fill={i === 5 ? P.yasil : P.murekkeb}>{i + 1}</text>
                {Array.from({length: n}).map((_, k) => <rect key={k} x={x + 1.4} y={QUTU.y + QUTU.h - 4 - k * 3} width={QUTU.w - 2.8} height={2} rx={0.6} fill={P.boz} opacity={0.55} />)}
              </g>
            );
          })}
          {/* Düymələr */}
          <rect x={6} y={100} width={28} height={13} rx={3} fill={d2 > 0 || (t > sehvBas && t < sehvBas + 0.6) ? P.mercan : '#f6dcd5'} />
          <text x={20} y={108.2} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={3.8} fill="#8c2f22">Səhv bildim</text>
          <rect x={36} y={100} width={28} height={13} rx={3} fill={d1 > 0 || (t > duzBas && t < duzBas + 0.6) ? P.yasil2 : P.yasil} />
          <text x={50} y={108.2} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={3.8} fill="#fff">Düz bildim</text>
          {d1 > 0 && <circle cx={50} cy={106.5} r={2 + d1 * 12} fill="none" stroke={P.laym} strokeWidth={1.2} opacity={1 - d1} />}
          {d2 > 0 && <circle cx={20} cy={106.5} r={2 + d2 * 12} fill="none" stroke={P.qirmizi} strokeWidth={1.2} opacity={1 - d2} />}
          {/* Kartlar */}
          <Kart soz="improve" x={karis(qx(2), qx(3), ireli)} y={38 - Math.sin(ireli * Math.PI) * 6} isiq={t > duzBas && t < an(6, 2) + 1.2 ? P.laym : undefined} op={1 - qarsi * 0.6} />
          <Etiket yazi="+1" x={qx(3)} y={28} bg={P.laym} op={gir(t, an(6, 2) + 0.5, 0.25) * (1 - gir(t, an(7, 3) - 0.2, 0.3))} />
          {appGor > 0 && (
            <Kart soz="approach" x={karis(karis(qx(2), qx(1), geri), 35, qarsi)} y={karis(38 - Math.sin(geri * Math.PI) * 6, 70, qarsi)} s={karis(1, 2.5, qarsi)} isiq={P.mercan} op={appGor} />
          )}
          <Etiket yazi="−1" x={qx(1)} y={28} bg={P.mercan} op={gir(t, an(7, 1) + 0.15, 0.25) * (1 - gir(t, an(7, 3) - 0.2, 0.3))} />
        </g>
      </g>
    </g>
  );
};

// ===== Kamera: dünya nöqtəsi (fx, fy) ekranda (sx, sy)-yə düşür, miqyas S =====
type Kam = {t: number; d: number; S: number; fx: number; fy: number; sx: number; sy: number};
const kameraHesabla = (t: number, kadrlar: Kam[]) =>
  kadrlar.reduce((c, k) => {
    const u = gir(t, k.t, k.d);
    return {S: c.S * Math.pow(k.S / c.S, u), fx: karis(c.fx, k.fx, u), fy: karis(c.fy, k.fy, u), sx: karis(c.sx, k.sx, u), sy: karis(c.sy, k.sy, u)};
  }, {S: 1, fx: 540, fy: 960, sx: 540, sy: 960});

const LOGO = (
  <svg width={84} height={84} viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="13" fill={P.yasil} />
    <rect x="13" y="10" width="20" height="14" rx="3.5" transform="rotate(-9 13 10)" fill="#fff" fillOpacity="0.18" />
    <rect x="16" y="11" width="20" height="14" rx="3.5" transform="rotate(7 16 11)" fill="#fff" fillOpacity="0.32" />
    <path d="M13 18.5L24 33.5L35 18.5" stroke={P.laym} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 19.5L24 28.5L30.5 19.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="14" r="2.5" fill={P.laym} />
  </svg>
);

const BALON_SOZ: [string, Nokta][] = [['improve', [400, 412]], ['deadline', [548, 398]], ['suggest', [478, 470]]];

const Video: React.FC = () => {
  const t = useCurrentFrame() / FPS;

  // ---- Kamera ----
  const kam = kameraHesabla(t, [
    {t: an(1, 0) - 0.1, d: 0.9, S: 2.35, fx: 770, fy: 840, sx: 540, sy: 760}, // ekrana gir
    {t: an(2, 1), d: 0.9, S: 1, fx: 540, fy: 960, sx: 540, sy: 960}, // geri çəkil
    {t: an(3, 1), d: 0.9, S: 1.45, fx: 300, fy: 900, sx: 540, sy: 820}, // kitaba
    {t: an(4, 0) - 0.2, d: 0.9, S: 1.2, fx: 420, fy: 700, sx: 540, sy: 700}, // başa və balona (ayaqlar altyazıdan yuxarıda qalır)
    {t: an(5, 0), d: 0.9, S: 1.15, fx: 480, fy: 760, sx: 540, sy: 780}, // telefon
    {t: an(6, 0) - 0.5, d: 0.9, S: 7.2, fx: 490, fy: 780, sx: 540, sy: 760}, // telefonun içinə
    {t: an(8, 0) - 0.45, d: 0.9, S: 1.12, fx: 600, fy: 840, sx: 540, sy: 900}, // ilk kadra qayıt
  ]);

  // ---- E-poçt ----
  const yazi = interpolate(t, [an(0, 0), an(1, 0), an(2, 0) - 0.15], [0, 6, 16], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const yazir = t < an(2, 0) - 0.15;
  const yeniden = t > an(8, 1) + 0.4; // sonda yazmağa davam edir
  const dondu = gir(t, an(2, 0) - 0.1, 0.4);
  const dolu = gir(t, an(8, 1) - 0.1, 0.45);
  const kursor = yazir || yeniden || Math.floor(t * 2.4) % 2 === 0;

  // ---- Kitab ----
  const kitabAc = gir(t, an(3, 3) - 0.1, 0.5) * (1 - gir(t, an(3, 4) + 0.1, 0.3));
  const itele = gir(t, an(3, 4) + 0.1, 0.7);

  // ---- Telefon ----
  const qaldir = gir(t, an(5, 0) + 0.35, 0.6);
  const telMerkez = noktaKaris([475, 1023], [490, 780], qaldir);
  const telDik = karis(14 / 130, 1, qaldir);
  const gelen = BALON_SOZ.filter((_, i) => t >= an(5, 4) + i * 0.15 + 0.7).length;

  // ---- Xarakter ----
  const nefes = Math.sin(t * 1.3) * 3;
  const vurus = yazir ? Math.abs(Math.sin(t * 15)) * 9 : 0;
  const qasima = gir(t, an(2, 2), 0.7) * (1 - gir(t, an(3, 2) - 0.3, 0.6));
  const el2Vurus = (yazir || yeniden) ? Math.abs(Math.cos(t * 15)) * 8 : 0;
  const poz: Poz = {
    nefes,
    el: yol(t, [560, 1012 - vurus], [
      {t0: an(5, 0) - 0.1, d: 0.45, p: [478, 1014]},
      {t0: an(5, 0) + 0.35, d: 0.6, p: [466, 838]},
    ]),
    el2: yol(t, [520, 1016 - el2Vurus], [
      {t0: an(2, 2), d: 0.7, p: [296, 598 + Math.sin(t * 9) * 6 * qasima]},
      {t0: an(3, 2) - 0.3, d: 0.6, p: [306, 1002]},
      {t0: an(3, 4) + 0.05, d: 0.5, p: [236, 1004]},
      {t0: an(4, 0), d: 0.6, p: [300, 1018]},
      {t0: an(8, 0), d: 0.6, p: [520, 1016 - el2Vurus]},
    ]),
    qas: 14 * gir(t, an(2, 0), 0.5) * (1 - gir(t, an(5, 4), 0.6)),
    agiz: karis(karis(karis(1, -0.8, gir(t, an(2, 0), 0.5)), 0.2, gir(t, an(5, 4), 0.6)), 1, gir(t, an(8, 0), 0.5)),
    bas: karis(karis(karis(karis(-6 * gir(t, an(2, 2), 0.7), 7, gir(t, an(3, 1), 0.5)), -10, gir(t, an(4, 0) - 0.1, 0.5)), 9, gir(t, an(5, 0), 0.5)), 0, gir(t, an(8, 0), 0.5)) + Math.sin(t * 0.9) * 1.2,
  };

  // ---- Balon ----
  const balon = gir(t, an(4, 0) - 0.1, 0.45) * (1 - gir(t, an(5, 0) + 0.2, 0.4));
  const sual = gir(t, an(2, 2) + 0.1, 0.35) * (1 - gir(t, son(2) + 0.35, 0.35));

  // ---- Böyük yazılar ----
  const basliq1 = 1 - gir(t, an(1, 0) - 0.25, 0.4); // ilk kadrdan görünür
  const basliq2 = gir(t, an(8, 0) - 0.05, 0.5);
  const cta = gir(t, an(9, 0) - 0.05, 0.45);

  return (
    <AbsoluteFill style={{background: P.kagiz}}>
      {/* Windows-da render serveri ::1-ə qoşula bilmədiyi üçün render zamanı səs ffmpeg ilə sonradan əlavə olunur (render.ps1) */}
      {!getInputProps().sessiz && <Audio src={staticFile('skript1/ses.mp3')} />}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={`translate(${kam.sx - kam.fx * kam.S} ${kam.sy - kam.fy * kam.S}) scale(${kam.S})`}>
          <rect x={-600} y={-600} width={2280} height={1890} fill={P.kagiz} />
          <rect x={-600} y={1290} width={2280} height={1200} fill={P.kagiz2} />
          <line x1={-600} x2={1680} y1={1290} y2={1290} stroke={P.murekkeb} strokeWidth={XETT - 3} opacity={0.5} />
          <g transform="translate(985 1150)">
            <path d="M -40 0 L 40 0 L 30 110 L -30 110 Z" fill="#c07a4f" stroke={P.murekkeb} strokeWidth={5} />
            <path d="M 0 0 Q -60 -90 -20 -170 M 0 0 Q 50 -80 30 -150 M 0 0 Q -10 -60 10 -120" stroke={P.yasil2} strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>
          <Xarakter p={poz} />
          <rect x={120} y={1030} width={850} height={32} rx={6} fill={P.masa} stroke={P.murekkeb} strokeWidth={XETT - 3} />
          <path d="M 170 1062 L 170 1290 M 920 1062 L 920 1290" stroke={P.masaKenar} strokeWidth={XETT + 6} strokeLinecap="round" />
          <Kitab acil={kitabAc} itele={itele} />
          {/* Monitor */}
          <path d="M 560 1030 L 980 1030 L 960 1016 L 580 1016 Z" fill="#c9c3b5" stroke={P.murekkeb} strokeWidth={5} />
          <rect x={EKRAN.x} y={EKRAN.y} width={EKRAN.w} height={EKRAN.h} rx={14} fill={P.murekkeb} />
          <path d={`M ${EKRAN.x + 120} 990 L ${EKRAN.x + 220} 990 L ${EKRAN.x + 230} 1016 L ${EKRAN.x + 110} 1016 Z`} fill={P.murekkeb} />
          <Eposta yazilan={'I would like to '.slice(0, Math.round(yazi))} kursor={kursor} dondu={dondu} dolu={dolu} />
          {/* Sual işarəsi */}
          <text x={430} y={560} fontFamily={ELYAZI} fontSize={110} fill={P.qirmizi} opacity={sual} transform="rotate(12 430 560)">?</text>
          {/* Düşüncə balonu: sözlər yadından çıxır */}
          {balon > 0 && (
            <g opacity={balon}>
              <circle cx={392} cy={606} r={10} fill="#fff" stroke={P.murekkeb} strokeWidth={4} />
              <circle cx={414} cy={560} r={16} fill="#fff" stroke={P.murekkeb} strokeWidth={4} />
              <path d="M 330 440 Q 300 360 380 340 Q 420 290 490 318 Q 560 290 610 340 Q 680 360 650 440 Q 680 510 600 520 Q 540 560 470 530 Q 400 560 360 510 Q 290 500 330 440 Z" fill="#fff" stroke={P.murekkeb} strokeWidth={5} />
            </g>
          )}
          {BALON_SOZ.map(([soz, p], i) => {
            const gorun = gir(t, an(4, 0) + 0.15 + i * 0.12, 0.35);
            const unut = gir(t, an(4, 3) + i * 0.15, 0.8);
            const uc = gir(t, an(5, 4) + i * 0.15, 0.7);
            const balonda = gorun * (1 - unut);
            const ucan = uc > 0 && uc < 1;
            if (balonda <= 0.01 && !ucan) return null;
            const pos = ucan ? noktaKaris([p[0], p[1] - 60], telMerkez, uc) : ([p[0] + unut * 40, p[1] - unut * 70] as Nokta);
            const s = ucan ? karis(1, 0.25, uc) : 1;
            const op = ucan ? Math.min(1, uc * 4) * (1 - uc * 0.6) : balonda;
            return (
              <g key={soz} transform={`translate(${pos[0]} ${pos[1]}) scale(${s})`} opacity={op}>
                <rect x={-72} y={-26} width={144} height={52} rx={12} fill="#fff" stroke={P.murekkeb} strokeWidth={3} />
                <text x={0} y={9} textAnchor="middle" fontFamily={SADE} fontWeight={700} fontSize={28} fill={P.murekkeb}>{soz}</text>
              </g>
            );
          })}
          <Telefon t={t} merkez={telMerkez} dik={telDik} gelen={gelen} />
        </g>
        <Kagiz />
      </svg>

      {/* Böyük yazı: yalnız ilk cümlə və sonluq */}
      <div style={{position: 'absolute', top: 240, left: 0, right: 0, textAlign: 'center', fontFamily: ELYAZI, fontSize: 92, color: P.murekkeb, opacity: basliq1, transform: `translateY(${(1 - basliq1) * 20}px)`}}>
        İngiliscə <span style={{color: P.yasil, borderBottom: `8px solid ${P.laym}`}}>bilirsən.</span>
      </div>
      <div style={{position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', fontFamily: ELYAZI, fontSize: 88, lineHeight: 1.15, color: P.murekkeb, opacity: basliq2, transform: `translateY(${(1 - basliq2) * 20}px)`}}>
        Gəl sözlərdən<br /><span style={{color: P.yasil, borderBottom: `8px solid ${P.laym}`}}>başlayaq.</span>
      </div>
      <div style={{position: 'absolute', top: 450, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: cta, transform: `scale(${0.9 + 0.1 * cta})`}}>
        {LOGO}
        <span style={{fontFamily: SADE, fontWeight: 800, fontSize: 64, color: P.murekkeb}}>Vocabox</span>
      </div>
      <div style={{position: 'absolute', top: 1500, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: cta}}>
        <div style={{fontFamily: SADE, fontWeight: 800, fontSize: 46, color: P.yasil, background: P.laym, borderRadius: 60, padding: '14px 40px', transform: `translateY(${Math.sin(Math.max(0, t - an(9, 0)) * 5) * 6}px)`}}>Link bio-da ↓</div>
      </div>
      <Altyazi t={t} />
    </AbsoluteFill>
  );
};

const sure = Math.ceil((K[K.length - 1].e + 2) * FPS);
export const Root: React.FC = () => <Composition id="Video" component={Video} durationInFrames={sure} fps={FPS} width={1080} height={1920} />;
