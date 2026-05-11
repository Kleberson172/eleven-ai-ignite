import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '89.820',
    features: ['10.000 consultas/mês', 'Atendimento Inteligente', 'Voz básico', 'Dashboard'],
    cta: 'Começar Agora',
    featured: false,
  },
  {
    name: 'Pro',
    price: '269.820',
    features: ['100.000 consultas/mês', 'Todos os módulos', 'Voz em tempo real', 'Otimizador de Rotas', 'Geração de Imagens (500/mês)', 'API REST', 'Suporte 24h'],
    cta: 'Escolher Pro',
    featured: true,
  },
  {
    name: 'Premium',
    price: '899.820',
    features: ['Consultas ilimitadas', 'IA personalizada', 'Infraestrutura dedicada', 'Integração ERP/CRM', 'Imagens ilimitadas', 'SLA 99,9%', 'Gerente dedicado'],
    cta: 'Contactar Vendas',
    featured: false,
  },
];

function confetti(e: React.MouseEvent<HTMLButtonElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const colors = ['#00D4FF', '#7B61FF', '#00FF88', '#FF6B35', '#ffffff'];
  for (let i = 0; i < 36; i++) {
    const d = document.createElement('div');
    const a = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    d.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:8px;height:8px;background:${colors[i%5]};box-shadow:0 0 10px ${colors[i%5]};border-radius:2px;pointer-events:none;z-index:200;transition:all 1s cubic-bezier(.2,.8,.2,1);`;
    document.body.appendChild(d);
    requestAnimationFrame(() => {
      d.style.transform = `translate(${Math.cos(a)*dist}px, ${Math.sin(a)*dist + 60}px) rotate(${Math.random()*720}deg)`;
      d.style.opacity = '0';
    });
    setTimeout(() => d.remove(), 1100);
  }
}

export function Pricing() {
  return (
    <section id="planos" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Planos</div>
          <h2 className="text-4xl md:text-6xl font-black text-gradient-cyan">Escolha o seu plano</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: 'spring' }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 flex flex-col ${p.featured ? 'glass-strong border-pulse md:scale-105 md:-mt-4' : 'glass'}`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1 glow-cyan">
                  <Star className="w-3 h-3 fill-current" /> Mais Escolhido
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground">{p.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-5xl font-black text-gradient-cyan">{p.price}</span>
                <span className="text-muted-foreground"> Kz/mês</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground/90">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={confetti}
                className={`w-full py-3 rounded-full font-semibold transition-all ${p.featured ? 'bg-primary text-primary-foreground glow-cyan hover:scale-105' : 'glass border border-primary/40 hover:border-primary'}`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block px-6 py-2 rounded-full glass shimmer text-sm text-foreground">
            Sem taxas ocultas. Cancelamento a qualquer momento.
          </span>
        </div>
      </div>
    </section>
  );
}
