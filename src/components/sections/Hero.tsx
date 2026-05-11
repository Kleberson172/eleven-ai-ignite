import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroScene } from '../three/HeroScene';
import { Counter } from '../Counter';

const headline = 'ELEVEN';
const subline = 'Inteligência que transforma decisões';

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v < text.length ? v + 1 : v)), 40);
    return () => clearInterval(id);
  }, [text.length]);
  return <>{text.slice(0, n)}<span className="opacity-60">|</span></>;
}

function burst(e: React.MouseEvent<HTMLButtonElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    const a = (i / 18) * Math.PI * 2;
    const d = 60 + Math.random() * 40;
    dot.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:9999px;background:#00D4FF;box-shadow:0 0 12px #00D4FF;pointer-events:none;z-index:200;transition:all .7s cubic-bezier(.2,.8,.2,1);`;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(0)`;
      dot.style.opacity = '0';
    });
    setTimeout(() => dot.remove(), 800);
  }
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="flex flex-wrap text-6xl md:text-8xl font-black tracking-tighter"
        >
          {headline.split('').map((c, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 40, rotateX: -90 }, visible: { opacity: 1, y: 0, rotateX: 0 } }}
              transition={{ type: 'spring', damping: 12 }}
              className="text-gradient-cyan glow-text inline-block"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 text-2xl md:text-4xl font-light text-foreground/90 max-w-3xl"
        >
          {subline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl"
        >
          <Typewriter text="A plataforma de IA mais confiável de Angola" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={(e) => { burst(e); document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="relative px-8 py-4 rounded-full font-semibold bg-primary text-primary-foreground glow-cyan hover:scale-105 transition-transform"
          >
            Ver Produtos
          </button>
          <button
            onClick={(e) => { burst(e); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-full font-semibold glass border border-primary/40 text-foreground hover:border-primary transition-all"
          >
            Falar Connosco
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { v: 500, s: '+', l: 'Empresas Atendidas' },
            { v: 40, s: '%', l: 'Redução de Custos' },
            { v: 98, s: '%', l: 'Precisão de Voz' },
            { v: 24, s: '/7', l: 'Disponibilidade' },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5">
              <div className="text-3xl md:text-4xl font-black text-gradient-cyan">
                <Counter value={s.v} suffix={s.s} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary"
      >
        <ArrowDown />
      </motion.div>
    </section>
  );
}
