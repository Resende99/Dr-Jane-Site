import React, { memo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { doctor } from '../data/doctor.js';

function Testimonials() {
  const [active, setActive] = useState(0);
  return <div className="testimonial-card"><span className="quote-mark" aria-hidden="true">“</span><p>{doctor.testimonials[active]}</p>
    <div className="testimonial-controls"><span>RELATO DEMONSTRATIVO · {String(active + 1).padStart(2, '0')} / 03</span><div>
      <button onClick={() => setActive((active + doctor.testimonials.length - 1) % doctor.testimonials.length)} aria-label="Depoimento anterior"><ArrowLeft/></button>
      <button onClick={() => setActive((active + 1) % doctor.testimonials.length)} aria-label="Próximo depoimento"><ArrowRight/></button>
    </div></div><small>Depoimentos fictícios usados apenas como placeholder de protótipo.</small>
  </div>;
}

export default memo(Testimonials);
