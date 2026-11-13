// ŞABLON — yeni skript üçün bu qovluğu kopyala: src/sablon → src/skriptN, sonra aşağıdakı
// VERI və SES yollarını public/skriptN-ə yönəlt. Bu fayl yalnız quruluşu göstərir; görünüşü
// stil kartına görə sıfırdan qur (skript1/skript5-in görünüşünü təkrarlama).
//
// Qaydalar:
// - Görüntü yalnız kadr nömrəsinin funksiyasıdır (CSS animasiya, setTimeout, Date.now yox).
// - Anlar söz vaxtlarından: an(sətir, söz). Saniyəni əllə yazma.
// - Şriftlər yalnız FONT-dan (açıq lisenziyalı, repoda). Sistem şriftləri buludda yoxdur.
// - <Audio> render zamanı söndürülür (sessiz prop), səs render.mjs ilə ffmpeg-lə birləşdirilir.
import React from 'react';
import {AbsoluteFill, Audio, Composition, getInputProps, staticFile, useCurrentFrame} from 'remotion';
import veri from '../../public/sablon/kelimeler.json'; // VERI: public/skriptN/kelimeler.json
import {FONT, useFontlar} from '../ortak/fontlar';
import {FontTesti} from '../ortak/FontTesti';
import {FPS, Kelime, damga, kamera, u, zamanYarat} from '../ortak/zaman';

const SES = 'sablon/ses.mp3'; // SES: skriptN/ses.mp3
const K = veri as Kelime[];
const {an, son, satirMetni, aktivSatir, sure} = zamanYarat(K);

const P = {zemin: '#efe9dc', metin: '#1f1c18', vurgu: '#c4472a'}; // Palitranı stil kartındakı mənbədən türət

// Səs altyazısı: neytral cümlə bloku. Böyük yazı eyni cümləni deyəndə GIZLƏT (gizli siyahısı).
const SesAltyazisi: React.FC<{t: number; gizli: number[]}> = ({t, gizli}) => {
  const c = aktivSatir(t);
  if (c === undefined || gizli.includes(c)) return null;
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 1478, fontFamily: FONT.sans, fontWeight: 600, fontSize: 44, lineHeight: 1.22, color: P.metin}}>
      {satirMetni(c)}
    </div>
  );
};

const Video: React.FC = () => {
  useFontlar();
  const f = useCurrentFrame();
  const t = f / FPS;
  const kam = kamera(t, [
    {t: an(2, 0), d: 1.4, S: 1.6, fx: 540, fy: 900, sx: 540, sy: 860}, // nümunə: yaxınlaş
    {t: an(5, 0), d: 1.4, S: 1, fx: 540, fy: 960, sx: 540, sy: 960}, // nümunə: geri qayıt
  ]);
  const basliq = damga(t, an(1, 0)) * (1 - u(t, son(1) + 0.3, 0.2));
  return (
    <AbsoluteFill style={{background: P.zemin}}>
      {!getInputProps().sessiz && <Audio src={staticFile(SES)} />}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={kam}>
          {/* Dünyanı burada çək (bir dünya, bağlayıcı obyekt) */}
          <rect x={240} y={700} width={600} height={400} fill="none" stroke={P.metin} strokeWidth={6} />
        </g>
      </svg>
      {basliq > 0 && (
        <div style={{position: 'absolute', left: 56, top: 300, fontFamily: FONT.dar, fontWeight: 800, fontSize: 170, lineHeight: 1, color: P.metin}}>
          {satirMetni(1)}
        </div>
      )}
      <SesAltyazisi t={t} gizli={[1]} />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} durationInFrames={sure()} fps={FPS} width={1080} height={1920} />
    <Composition id="FontTesti" component={FontTesti} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
