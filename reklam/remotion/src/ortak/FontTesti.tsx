// Şrift testi: hər şrift Azərbaycan pangramı və xüsusi hərflərlə. Render: node kadr.mjs sablon --komp FontTesti
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT, useFontlar} from './fontlar';

const PANGRAM = 'Zəfər, jaketini də papağını da götür, bu axşam hava çox soyuq olacaq.';
const XUSUSI = 'Ə ə İ ı Ş ş Ç ç Ğ ğ Ö ö Ü ü · ' + 'bilirsən ilk'.toLocaleUpperCase('az-AZ');
const SIYAHI: [string, string, number][] = [
  ['sans 400', FONT.sans, 400], ['sans 700', FONT.sans, 700], ['mono 400', FONT.mono, 400],
  ['dar 800', FONT.dar, 800], ['serif 900', FONT.serif, 900], ['serif2 400', FONT.serif2, 400], ['el 700', FONT.el, 700],
];

export const FontTesti: React.FC = () => {
  useFontlar();
  return (
    <AbsoluteFill style={{background: '#f3efe6', color: '#1c1a17', padding: 50, gap: 18}}>
      {SIYAHI.map(([ad, f, w]) => (
        <div key={ad}>
          <div style={{font: '600 22px "IBM Plex Mono"', color: '#8a8478'}}>{ad} — {f}</div>
          <div style={{fontFamily: f, fontWeight: w, fontSize: 40, lineHeight: 1.2}}>{PANGRAM}</div>
          <div style={{fontFamily: f, fontWeight: w, fontSize: 52, lineHeight: 1.2}}>{XUSUSI}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
