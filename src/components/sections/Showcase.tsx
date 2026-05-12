import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { AngolaMiniMap } from '../three/AngolaMiniMap';

const pillars = [
  {
    icon: '◈',
    title: 'Inovação',
    desc: 'Tecnologia de ponta desenhada para o mercado angolano.',
    color: '#00D4FF',
    metric: '100%',
    metricLabel: 'Made in Angola',
  },
  {
    icon: '⬡',
    title: 'Precisão',
    desc: 'Modelos treinados com dados locais para máxima exatidão.',
    color: '#A855F7',
    metric: '98%',
    metricLabel: 'Acurácia média',
  },
  {
    icon: '✦',
    title: 'Velocidade',
    desc: 'Respostas em milissegundos, decisões em tempo real.',
    color: '#00FF88',
    metric: '3x',
    metricLabel: 'Mais rápido',
  },
  {
    icon: '◉',
    title: 'Confiança',
    desc: 'Disponibilidade 24/7 com infraestrutura de classe mundial.',
    color: '#FF6B35',
    metric: '24/7',
    metricLabel: 'Sempre ativo',
  },
];

function TiltCard({ p, i }: { p: typeof pillars[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, type: 'spring', damping: 18 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
      className="relative group"
    >
      <div
        className="glass-strong rounded-3xl p-8 h-full overflow-hidden relative holo-shine"
        style={{
          boxShadow: `0 0 0 1px ${p.color}22, 0 20px 60px -20px ${p.color}55`,
          background: `linear-gradient(135deg, ${p.color}0a, transparent 60%), oklch(0.13 0.05 265 / 0.7)`,
        }}
      >
        {/* glow orb */}
        <motion.div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
          style={{ background: p.color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
        />
        {/* corner brackets */}
        <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl" style={{ borderColor: p.color }} />
        <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 rounded-tr" style={{ borderColor: p.color }} />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 rounded-bl" style={{ borderColor: p.color }} />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br" style={{ borderColor: p.color }} />

        <div style={{ transform: 'translateZ(40px)' }} className="relative">
          <motion.div
            className="text-5xl mb-4 inline-block"
            style={{ color: p.color, filter: `drop-shadow(0 0 20px ${p.color})` }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {p.icon}
          </motion.div>
          <h3 className="text-2xl font-black mb-2 text-white">{p.title}</h3>
          <p className="text-foreground/70 text-sm mb-6 leading-relaxed">{p.desc}</p>
          <div className="flex items-end gap-2 pt-4 border-t" style={{ borderColor: `${p.color}33` }}>
            <span
              className="text-4xl font-black"
              style={{ color: p.color, textShadow: `0 0 24px ${p.color}88` }}
            >
              {p.metric}
            </span>
            <span className="text-xs text-foreground/60 pb-2">{p.metricLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Showcase() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* 3D Angola map background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AngolaMiniMap />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
      {/* ambient blobs */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[120px] opacity-30"
        style={{ background: '#00D4FF' }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-[120px] opacity-30"
        style={{ background: '#A855F7' }}
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: 'linear-gradient(90deg, #00D4FF22, #A855F722)',
              border: '1px solid #00D4FF44',
              color: '#00D4FF',
            }}
            animate={{ boxShadow: ['0 0 20px #00D4FF44', '0 0 40px #00D4FF88', '0 0 20px #00D4FF44'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✦ Por que ELEVEN
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-gradient-cyan">A inteligência</span>
            <br />
            <span className="text-white">que move Angola</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Quatro pilares que fazem da ELEVEN a escolha das empresas que querem liderar a era da IA.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {pillars.map((p, i) => (
            <TiltCard key={p.title} p={p} i={i} />
          ))}
        </div>

        {/* marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden py-8 glass rounded-2xl"
        >
          <motion.div
            className="flex gap-12 whitespace-nowrap text-2xl md:text-3xl font-black"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ['INOVAÇÃO', '✦', 'PRECISÃO', '◈', 'VELOCIDADE', '⬡', 'CONFIANÇA', '◉', 'IA ANGOLANA', '★'].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className="text-gradient-cyan"
                  style={{ textShadow: '0 0 20px #00D4FF66' }}
                >
                  {t}
                </span>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
