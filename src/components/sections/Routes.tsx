import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, RefreshCw, Clock } from 'lucide-react';
import { RoutesScene } from '../three/RoutesScene';

const benefits = [
  { Icon: TrendingDown, title: 'Redução de até 40% nos custos logísticos' },
  { Icon: DollarSign, title: 'Economia média de 32.400.000 Kz/ano por cliente' },
  { Icon: RefreshCw, title: 'Recálculo dinâmico em tempo real' },
  { Icon: Clock, title: 'Disponibilidade 24/7 sem interrupção' },
];

const audience = [
  'Empresas com frotas de entrega',
  'Operações de distribuição e supply chain',
  'Negócios com múltiplos pontos de paragem',
  'Qualquer empresa que queira cortar custos logísticos',
];

const description = 'O Otimizador de Rotas calcula em segundos o caminho mais eficiente para a sua frota, reduzindo combustível, tempo e quilómetros percorridos.';

export function Routes() {
  return (
    <section id="rotas" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Produto Carro-Chefe</div>
          <h2 className="text-4xl md:text-6xl font-black text-gradient-cyan mb-6">
            Otimizador de Rotas
          </h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="text-xl text-muted-foreground max-w-3xl mb-12 flex flex-wrap gap-x-2"
        >
          {description.split(' ').map((w, i) => (
            <motion.span key={i} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
              {w}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl overflow-hidden border-pulse h-[420px] mb-16"
        >
          <RoutesScene />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 group"
            >
              <motion.div whileHover={{ rotateY: 360 }} transition={{ duration: 0.8 }} className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <b.Icon />
              </motion.div>
              <p className="font-semibold text-foreground">{b.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-xl font-bold text-primary mb-5">Para quem é:</h3>
          <div className="flex flex-wrap gap-3">
            {audience.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-4 py-2 rounded-full glass border border-primary/30 text-sm text-foreground"
              >
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
