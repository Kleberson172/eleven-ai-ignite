import { motion } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Mic, BarChart3, Sparkles } from 'lucide-react';

type Service = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  desc: string;
  audience: string[];
  from: number;
};

const services: Service[] = [
  {
    Icon: MessageSquare,
    title: 'Atendimento Inteligente',
    color: '#00D4FF',
    desc: 'Chatbots contextuais com NLP e GPT-4 que entendem linguagem natural e resolvem solicitações complexas sem intervenção humana. Disponível 24/7.',
    audience: ['Alto volume de atendimento ao cliente', 'Call centers que automatizam respostas', 'E-commerce e retalho com suporte contínuo', 'Bancos, seguradoras e financeiras', 'Hospitais e clínicas com agendamento'],
    from: -80,
  },
  {
    Icon: Mic,
    title: 'Reconhecimento de Voz',
    color: '#7B61FF',
    desc: 'Transcrição em tempo real com 98% de precisão, suporte a múltiplos sotaques e latência de 120ms. Tecnologia: OpenAI Whisper.',
    audience: ['Meios de comunicação e jornalismo', 'Tribunais e serviços jurídicos', 'Hospitais e clínicas (ditado médico)', 'Empresas com reuniões frequentes', 'Call centers para análise de qualidade'],
    from: 80,
  },
  {
    Icon: BarChart3,
    title: 'Análise de Dados',
    color: '#00FF88',
    desc: 'Dashboards preditivos que transformam dados brutos em insights acionáveis com visualizações interativas geradas em segundos.',
    audience: ['Gestores que precisam de relatórios em tempo real', 'Empresas de retalho com análise de vendas', 'Bancos e instituições financeiras', 'Organismos governamentais', 'Startups com foco em métricas'],
    from: -80,
  },
  {
    Icon: Sparkles,
    title: 'Geração de Imagens com IA',
    color: '#FF6B35',
    desc: 'Criação de visuais profissionais com IA generativa — logos, ilustrações e mockups a partir de texto em segundos. Tecnologia: Flux AI.',
    audience: ['Agências de marketing e publicidade', 'E-commerce com imagens de produto', 'Startups sem budget para design', 'Criadores de conteúdo e influencers', 'Empresas de branding rápido'],
    from: 80,
  },
];

function Card({ s, idx }: { s: Service; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: s.from, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: idx * 0.08, type: 'spring', damping: 16 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="holo-shine glass-strong rounded-3xl p-8 h-full transition-transform duration-200 relative group cursor-pointer"
        style={{ '--c': s.color, boxShadow: `0 0 0 1px ${s.color}33` } as React.CSSProperties}
      >
        <div
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: `0 0 60px ${s.color}66, inset 0 0 30px ${s.color}22`, border: `1px solid ${s.color}` }}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
          className="inline-flex w-16 h-16 items-center justify-center rounded-2xl mb-5"
          style={{ background: `${s.color}22`, color: s.color, boxShadow: `0 0 30px ${s.color}55` }}
        >
          <s.Icon className="w-8 h-8" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: s.color }}>{s.title}</h3>
        <p className="text-muted-foreground mb-5">{s.desc}</p>
        <div className="border-t border-border pt-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Para quem é</div>
          <ul className="space-y-1.5">
            {s.audience.map((a) => (
              <li key={a} className="text-sm text-foreground/90 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full" style={{ background: s.color }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Serviços</div>
          <h2 className="text-4xl md:text-6xl font-black text-gradient-cyan">Soluções complementares</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => <Card key={s.title} s={s} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
