import React, { lazy, memo, Suspense } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Activity, HeartPulse, Microscope, Sparkles } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';
import { doctor } from '../data/doctor.js';
import { images } from '../data/images.js';
import { questions } from '../data/quizData.js';
import { WHATSAPP_NUMBER } from '../config.js';

const BeforeAfter = lazy(() => import('./BeforeAfter.jsx'));
const Testimonials = lazy(() => import('./Testimonials.jsx'));
const Faq = lazy(() => import('./Faq.jsx'));
const fadeIn = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .25 } };
const treatmentsIcons = [<Microscope/>, <Activity/>, <Sparkles/>, <HeartPulse/>];
const InlineFallback = () => <div className="section-fallback" aria-hidden="true"/>;

function Portfolio({ profile, answers }) {
  const summary = answers.map((answer, index) => `${questions[index].title} ${questions[index].options[answer]}`).join('; ');
  const message = `Olá, Dra. Jane! Realizei a análise capilar no site e meu perfil foi: ${profile}. Respostas: ${summary}. Gostaria de agendar uma avaliação.`;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return <m.div className="portfolio" {...fadeIn}>
    <section className="doctor-hero section" id="sobre"><div className="doctor-copy"><div className="eyebrow"><span className="eyebrow-dot"/> CONHEÇA QUEM CUIDA</div><h2>Ciência com cuidado.<br/><em>Precisão com propósito.</em></h2><p>{doctor.bio}</p><div className="doctor-id"><strong>{doctor.name}</strong><span>{doctor.title}</span><small>{doctor.crm} · {doctor.city}</small></div><a href="#metodo" className="text-link">Conheça o método <ArrowRight size={16}/></a></div>
      <div className="doctor-photo"><picture><source media="(max-width: 700px)" srcSet={images.doctor.mobileSrcSet} sizes={images.doctor.sizes}/><img src={images.doctor.src} srcSet={images.doctor.srcSet} sizes={images.doctor.sizes} width={images.doctor.width} height={images.doctor.height} alt="Retrato ilustrativo de médica" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }}/></picture><div className="photo-caption"><span>ABORDAGEM INDIVIDUALIZADA</span><b>Tricologia de precisão</b></div><div className="photo-seal"><Sparkles aria-hidden="true"/><small>CIÊNCIA<br/>CAPILAR</small></div></div>
    </section>
    <section className="section method-section" id="metodo"><div className="section-heading"><span className="eyebrow">O MÉTODO REGENERADOR</span><h2>Um plano construído <em>etapa por etapa.</em></h2><p>Cuidado capilar começa com escuta, avaliação e decisões compartilhadas.</p></div><div className="timeline">{doctor.steps.map(([number, title, description]) => <article className="timeline-item" key={number}><span className="timeline-num">{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
    <section className="section tech-section"><div className="section-heading"><span className="eyebrow">RECURSOS E CUIDADO</span><h2>Tecnologia a serviço <em>da avaliação.</em></h2></div><div className="tech-grid">{doctor.treatments.map((item, index) => <article className="tech-card" key={item}><span>{React.cloneElement(treatmentsIcons[index], { size: 21, 'aria-hidden': true })}</span><h3>{item}</h3><p>Recurso considerado conforme avaliação individual e indicação profissional.</p></article>)}</div></section>
    <section className="section results-section"><div className="section-heading"><span className="eyebrow">ACOMPANHAMENTO</span><h2>Uma jornada, <em>observada de perto.</em></h2><p>O cuidado é acompanhado de forma individual ao longo do tempo.</p></div><Suspense fallback={<InlineFallback/>}><BeforeAfter/></Suspense></section>
    <section className="section testimonial-section"><div className="section-heading"><span className="eyebrow">EXPERIÊNCIAS</span><h2>Escuta que faz <em>parte do cuidado.</em></h2></div><Suspense fallback={<InlineFallback/>}><Testimonials/></Suspense></section>
    <section className="section faq-section" id="duvidas"><div className="section-heading"><span className="eyebrow">PERGUNTAS FREQUENTES</span><h2>O que você quer <em>saber primeiro?</em></h2></div><Suspense fallback={<InlineFallback/>}><Faq/></Suspense></section>
    <section className="contact section" id="contato"><div><div className="eyebrow">PRÓXIMO PASSO</div><h2>Vamos conversar <em>sobre o seu cabelo?</em></h2><p>Agende uma avaliação e conheça possibilidades adequadas ao seu caso.</p><WhatsAppButton href={wa}/></div><div className="contact-details"><div><span>ENDEREÇO</span><b>[Rua, número — bairro]</b><small>{doctor.city}</small></div><div><span>HORÁRIOS</span><b>Segunda a sexta</b><small>09h às 18h · mediante agendamento</small></div></div><div className="map-placeholder"><div className="map-grid"><span className="map-pin">⌖</span><span>MAPA DA CLÍNICA</span><small>INSIRA AQUI O ENDEREÇO REAL</small></div></div></section>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">J</span><span>DRA. JANE<small>TRICOLOGIA DE PRECISÃO</small></span></a><p>Este conteúdo é informativo e não substitui avaliação médica.</p><a href="#privacidade">Política de privacidade</a><small>© 2026 Dra. Jane · Conteúdo sujeito a revisão profissional.</small></footer>
    <WhatsAppButton href={wa}/>
  </m.div>;
}

export default memo(Portfolio);
