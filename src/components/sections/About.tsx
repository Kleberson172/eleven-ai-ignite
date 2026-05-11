import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const cards = [
  { title: 'Missão', body: 'Democratizar o acesso à IA em Angola.', accent: 'from-cyan-glow/30' },
  { title: 'Visão', body: 'Ser a plataforma de IA de referência em Angola até 2028.', accent: 'from-purple-glow/30' },
  { title: 'Valores', body: 'Inovação, Acessibilidade, Impacto, Confiança.', accent: 'from-green-glow/30' },
];

const cities = [
  { name: 'Luanda', x: 28, y: 55 },
  { name: 'Benguela', x: 22, y: 70 },
  { name: 'Huambo', x: 38, y: 68 },
  { name: 'Lubango', x: 28, y: 80 },
  { name: 'Cabinda', x: 18, y: 28 },
  { name: 'Malanje', x: 50, y: 50 },
];

export function About() {
  return (
    <section id="sobre" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glitch text-5xl md:text-7xl font-black text-gradient-cyan mb-4"
        >
          Quem Somos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-16"
        >
          ELEVEN é uma empresa angolana de IA que democratiza o acesso à inteligência
          artificial para empresas de qualquer dimensão em Angola.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60, rotateY: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
              className="holo-shine glass rounded-2xl p-8 relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <h3 className="relative text-2xl font-bold text-primary mb-3">{c.title}</h3>
              <p className="relative text-muted-foreground">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square glass rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute inset-0 grid-bg opacity-30" />
            {/* stylized Angola outline */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-6">
              <path
                d="M15 25 L40 22 L60 30 L70 45 L65 70 L50 85 L30 88 L20 75 L10 60 L15 40 Z"
                fill="none"
                stroke="hsl(190 100% 50%)"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>
            {cities.map((c, i) => (
              <div key={c.name} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <div className="relative w-3 h-3 -ml-1.5 -mt-1.5">
                  <div className="absolute inset-0 rounded-full bg-primary glow-cyan" />
                  <div
                    className="absolute inset-0 rounded-full border border-primary"
                    style={{ animation: `pulse-ring 2s ease-out ${i * 0.3}s infinite` }}
                  />
                </div>
                <div className="text-xs text-primary mt-2 ml-2 font-medium">{c.name}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="float glass-strong rounded-2xl p-8 border-pulse"
          >
            <MapPin className="w-12 h-12 text-primary mb-4" />
            <div className="text-3xl font-black text-gradient-cyan">Fundada em Angola.</div>
            <div className="text-3xl font-black text-foreground">Feita para África.</div>
            <p className="mt-4 text-muted-foreground">
              Construímos tecnologia local que entende o contexto, a língua e as necessidades das empresas africanas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
