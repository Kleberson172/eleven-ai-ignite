import { motion } from 'framer-motion';

const quads = [
  { title: 'Forças', color: '#00FF88', items: ['IA acessível', 'Plataforma unificada', '98% precisão de voz', '3x mais rápido', 'Equipa multidisciplinar', 'Disponibilidade 24/7'] },
  { title: 'Fraquezas', color: '#FF6B35', items: ['Empresa em fase de crescimento', 'Dependência de infraestrutura cloud', 'Mercado de IA em maturação em Angola'] },
  { title: 'Oportunidades', color: '#00D4FF', items: ['Crescimento da digitalização em Angola', 'Baixa concorrência local em IA', 'Expansão para mercados africanos', 'Parcerias com telecos e bancos'] },
  { title: 'Ameaças', color: '#FF3355', items: ['Concorrência de Google e Microsoft', 'Instabilidade económica', 'Evolução rápida da tecnologia', 'Conectividade limitada em algumas regiões'] },
];

export function SWOT() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-gradient-cyan text-center mb-16"
        >
          Análise SWOT
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quads.map((q, i) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, scale: 0.7, rotateZ: i % 2 ? 5 : -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 14, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass-strong rounded-2xl p-8 relative group"
              style={{ boxShadow: `0 0 0 1px ${q.color}33, 0 0 40px ${q.color}22` }}
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: `0 0 60px ${q.color}55` }} />
              <h3 className="text-2xl font-black mb-5" style={{ color: q.color, textShadow: `0 0 20px ${q.color}77` }}>
                {q.title}
              </h3>
              <ul className="space-y-2">
                {q.items.map((it, j) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex items-start gap-2 text-foreground/90"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: q.color, boxShadow: `0 0 8px ${q.color}` }} />
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
