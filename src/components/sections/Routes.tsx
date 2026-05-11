import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, RefreshCw, Clock } from 'lucide-react';
import { RoutesScene } from '../three/RoutesScene';

const benefits = [
  { Icon: TrendingDown, title: 'Redução de até 22% nos custos logísticos' },
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
      {/* hero glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 20px hsl(190 100% 50% / 0.4)', '0 0 40px hsl(190 100% 50% / 0.7)', '0 0 20px hsl(190 100% 50% / 0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/40 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Produto Carro-Chefe</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-gradient-cyan mb-6 glow-text">
            Otimizador de Rotas
          </h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 flex flex-wrap justify-center gap-x-2 text-center"
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
          className="relative glass-strong rounded-3xl overflow-hidden border-pulse h-[520px] md:h-[600px] mb-16 shadow-[0_0_80px_hsl(190_100%_50%/0.25)]"
        >
          {/* corner brackets */}
          {[
            'top-3 left-3 border-l-2 border-t-2',
            'top-3 right-3 border-r-2 border-t-2',
            'bottom-3 left-3 border-l-2 border-b-2',
            'bottom-3 right-3 border-r-2 border-b-2',
          ].map((c) => (
            <div key={c} className={`absolute ${c} border-primary w-8 h-8 z-10 rounded-sm`} />
          ))}
          {/* live label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-foreground">Mapa de Angola — Rota ao Vivo</span>
          </div>
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
