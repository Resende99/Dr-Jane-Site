import React, { memo, useState } from 'react';
import { images } from '../data/images.js';

function BeforeAfter() {
  const [split, setSplit] = useState(52);
  return <div className="ba-wrap">
    <div className="ba-image">
      <img className="ba-background" src={images.hair.src} srcSet={images.hair.srcSet} sizes={images.hair.sizes} width={images.hair.width} height={images.hair.height} alt="Cabelo ilustrativo para comparação" loading="lazy" decoding="async" />
      <div className="ba-overlay" style={{ width: `${split}%` }}><img src={images.patient.src} srcSet={images.patient.srcSet} sizes={images.patient.sizes} width={images.patient.width} height={images.patient.height} alt="Imagem ilustrativa de cabelo saudável" loading="lazy" decoding="async" /></div>
      <span className="ba-tag left">REFERÊNCIA A</span><span className="ba-tag right">REFERÊNCIA B</span><div className="ba-handle" style={{ left: `${split}%` }} />
    </div>
    <input aria-label="Deslize para comparar imagens ilustrativas" type="range" min="10" max="90" value={split} onChange={e => setSplit(Number(e.target.value))} />
    <p>Imagens ilustrativas. Resultados variam conforme cada pessoa. Fotografias de pacientes só devem ser publicadas com autorização.</p>
  </div>;
}

export default memo(BeforeAfter);
