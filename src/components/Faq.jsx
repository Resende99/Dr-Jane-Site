import React, { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { doctor } from '../data/doctor.js';

function Faq() {
  const [active, setActive] = useState(0);
  return <div className="faq-list">{doctor.faqs.map(([question, answer], index) => <article className="faq-item" key={question}>
    <button aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}><span>{question}</span><ChevronDown className={active === index ? 'rotated' : ''}/></button>
    {active === index && <p>{answer}</p>}
  </article>)}</div>;
}

export default memo(Faq);
