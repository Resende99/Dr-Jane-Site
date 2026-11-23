import React, { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Menu, X, ShieldCheck, Activity, Microscope, Sparkles, HeartPulse } from 'lucide-react';
import ProgressBar from './components/ProgressBar.jsx';
import { questions, getProfile } from './data/quizData.js';
import { images } from './data/images.js';
import { WHATSAPP_NUMBER } from './config.js';
import './styles/app.css';

const loadPortfolio = () => import('./components/Portfolio.jsx');
const Portfolio = lazy(loadPortfolio);
const { mobileSrcSet: doctorMobileSrcSet, ...doctorImage } = images.doctor;
const choicesIcons = [<Activity/>, <Microscope/>, <Sparkles/>, <HeartPulse/>];
const slide = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: .2 } };

const Header = memo(function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="header"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">J</span><span>DRA. JANE<small>TRICOLOGIA</small></span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Navegação principal"><a href="#metodo" onClick={close}>O método</a><a href="#sobre" onClick={close}>A especialista</a><a href="#duvidas" onClick={close}>Dúvidas</a><a className="nav-cta" href="#contato" onClick={close}>Fale com a clínica <ArrowRight size={15}/></a></nav>
  </header>;
});

const Landing = memo(function Landing({ start }) {
  return <section className="hero section" id="top"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> TRICOLOGIA COM CUIDADO E CIÊNCIA</div>
    <h1>Seu cabelo pode se regenerar. <em>Descubra como.</em></h1>
    <p className="hero-desc">A Dra. Jane une avaliação individual e cuidado especializado para ajudar você a entender a queda capilar e conhecer os próximos passos.</p>
    <div className="hero-actions"><button className="button-primary" onClick={start}>Fazer minha análise capilar <span>2 min</span><ArrowRight size={18}/></button><span className="hero-note"><ShieldCheck size={15}/> Gratuita · Informativa · Privada</span></div>
    <div className="stats"><div><strong>+1.200</strong><small>avaliações realizadas*</small></div><div><strong>8 anos</strong><small>de experiência*</small></div><div><strong>100%</strong><small>olhar individualizado</small></div></div><p className="disclaimer-mini">*Números ilustrativos para edição antes da publicação.</p>
  </div><div className="hero-art"><div className="hero-portrait"><picture><source media="(max-width: 700px)" srcSet={doctorMobileSrcSet} sizes={images.doctor.sizes}/><img {...doctorImage} alt="Retrato ilustrativo de uma médica" loading="eager" fetchPriority="high" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }}/></picture><div className="portrait-note"><span className="portrait-sparkle"><Sparkles size={15}/></span><div><strong>Dra. Jane</strong><small>Tricologia · Método Regenerador</small></div></div></div></div></section>;
});

const Quiz = memo(function Quiz({ step, answers, choose, back }) {
  const question = questions[step];
  return <m.section className="quiz-shell" {...slide}><div className="quiz-top"><button className="back-button" onClick={back}><ArrowLeft size={17}/> Voltar</button><span className="mono">ANÁLISE CAPILAR <i> / 0{step + 1}</i></span><span className="quiz-time">~ 2 MIN</span></div>
    <ProgressBar value={(step + 1) * 25}/><div className="quiz-title"><span className="eyebrow">PERGUNTA 0{step + 1} <span className="slash">/ 04</span></span><h2>{question.title}</h2><p>Escolha a alternativa que melhor representa seu momento.</p></div>
    <div className="options">{question.options.map((option, index) => <button key={option} className={`option ${answers[step] === index ? 'selected' : ''}`} onClick={() => choose(index)}><span className="option-icon">{React.cloneElement(choicesIcons[index], { size: 20, 'aria-hidden': true })}</span><span>{option}</span><span className="option-check">{answers[step] === index ? <Check size={17}/> : <ArrowRight size={16}/>}</span></button>)}</div>
    <div className="quiz-foot"><span><ShieldCheck size={15}/> Suas respostas ficam neste dispositivo.</span><span>Pressione 1–4 para responder</span></div>
  </m.section>;
});

const Analysis = memo(function Analysis() {
  return <m.section className="analysis-screen" {...slide}><div className="analysis-visual" aria-hidden="true"><div className="analysis-orbit"><span><Sparkles size={28}/></span><i/><i/><i/></div></div><span className="eyebrow">ANÁLISE EM ANDAMENTO</span><h2>Conectando os pontos.</h2><p className="typing-copy" aria-live="polite">Organizando suas respostas e preparando um primeiro olhar.</p><ProgressBar value={82}/><p className="small-muted">Leitura educativa baseada nas respostas informadas.</p></m.section>;
});

const Result = memo(function Result({ profile, next }) {
  return <m.section className="result-layout" {...slide}><div><div className="eyebrow"><span className="eyebrow-dot"/> ANÁLISE CONCLUÍDA</div><h2>Um primeiro olhar<br/><em>para o seu momento.</em></h2><p className="result-intro">Pelas respostas informadas, o perfil que mais se aproxima é:</p>
    <div className="report-card"><div className="report-head"><span>PERFIL IDENTIFICADO</span><span className="report-status"><i/> LEITURA INFORMATIVA</span></div><h3>{profile}</h3><div className="attention"><span>NÍVEL DE ATENÇÃO</span><div><b/><b/><b/><b/><b/></div><small>Vale investigar com uma avaliação individual</small></div>
      <div className="report-columns"><div><b>O que isso pode significar</b><ul><li>Diferentes fatores podem influenciar o ciclo capilar.</li><li>Histórico e padrão ajudam a orientar a investigação.</li><li>Uma avaliação profissional pode esclarecer possibilidades.</li></ul></div><div><b>Próximos passos</b><ul><li>Observe quando e como a queda começou.</li><li>Registre mudanças recentes na saúde e rotina.</li><li>Converse com um profissional habilitado.</li></ul></div></div><p className="report-disclaimer">Resultado informativo, baseado em autorrelato. Não constitui diagnóstico ou recomendação de tratamento.</p>
    </div><button className="button-primary" onClick={next}>Conhecer o método da Dra. Jane <ArrowRight size={18}/></button>
  </div><div className="result-side"><div className="result-profile-card"><span className="result-profile-icon"><Sparkles size={22}/></span><p>Este é um primeiro passo para entender melhor o que você está sentindo.</p><div><ShieldCheck size={17}/> <span>Um cuidado pensado para você</span></div></div><div className="side-note"><ShieldCheck size={18}/><p>Seu resultado permanece neste dispositivo.</p></div></div></m.section>;
});

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([-1, -1, -1, -1]);
  const profile = useMemo(() => getProfile(answers), [answers]);
  const choose = useCallback((answer) => {
    setAnswers(current => current.map((value, index) => index === step ? answer : value));
    window.setTimeout(() => step < 3 ? setStep(step + 1) : setScreen('analysis'), 180);
  }, [step]);
  const back = useCallback(() => step === 0 ? setScreen('landing') : setStep(step - 1), [step]);

  useEffect(() => {
    if (screen !== 'analysis') return undefined;
    loadPortfolio().catch(() => {});
    const timer = window.setTimeout(() => setScreen('result'), 850);
    return () => window.clearTimeout(timer);
  }, [screen]);
  useEffect(() => {
    const onKeyDown = event => { if (screen === 'quiz' && ['1', '2', '3', '4'].includes(event.key)) choose(Number(event.key) - 1); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [screen, choose]);
  const openPortfolio = useCallback(() => { window.scrollTo({ top: 0, behavior: 'instant' }); setScreen('portfolio'); }, []);

  return <LazyMotion features={domAnimation} strict><Header/><main><AnimatePresence mode="wait" initial={false}>
    {screen === 'landing' && <Landing key="landing" start={() => { setStep(0); setScreen('quiz'); }}/>}
    {screen === 'quiz' && <Quiz key={`quiz-${step}`} step={step} answers={answers} choose={choose} back={back}/>}
    {screen === 'analysis' && <Analysis key="analysis"/>}
    {screen === 'result' && <Result key="result" profile={profile} next={openPortfolio}/>}
    {screen === 'portfolio' && <Suspense fallback={<div className="portfolio-loading" role="status">Preparando seu conteúdo…</div>}><Portfolio key="portfolio" profile={profile} answers={answers}/></Suspense>}
  </AnimatePresence></main>{screen !== 'portfolio' && <footer className="site-footer"><span>© 2026 Dra. Jane · Método Regenerador</span><span>Este conteúdo é informativo e não substitui avaliação médica. · <a href="#privacidade">Privacidade</a></span></footer>}</LazyMotion>;
}
