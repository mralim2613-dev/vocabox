// Kadr panosu: public/_pano/ altındakı kadrları şəbəkəyə düzür (kadr.mjs işlədir).
import React from 'react';
import {AbsoluteFill, Composition, Img, registerRoot, staticFile} from 'remotion';

type Props = {resimler: string[]; etiketler: string[]; sutun: number; en: number; hund: number};
const Pano: React.FC<Props> = ({resimler, etiketler, sutun, en, hund}) => (
  <AbsoluteFill style={{background: '#111', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
    {resimler.map((r, i) => (
      <div key={r} style={{position: 'relative', width: en, height: hund}}>
        <Img src={staticFile(r)} style={{width: en, height: hund, display: 'block'}} />
        <div style={{position: 'absolute', left: 4, top: 4, background: 'rgba(0,0,0,.65)', color: '#ff0', font: '600 16px "IBM Plex Mono", monospace', padding: '1px 6px'}}>{etiketler[i]}</div>
      </div>
    ))}
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition
    id="Pano"
    component={Pano as unknown as React.FC<Record<string, unknown>>}
    durationInFrames={1}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{resimler: [], etiketler: [], sutun: 8, en: 240, hund: 427}}
    calculateMetadata={({props}) => {
      const p = props as unknown as Props;
      return {width: p.sutun * p.en, height: Math.ceil(p.resimler.length / p.sutun) * p.hund};
    }}
  />
);
registerRoot(Root);
