import { motion } from 'framer-motion';
import { Activity, BarChart, Terminal, FileText, Code2, Shield } from 'lucide-react';
import { DashboardScene } from '../three/DashboardScene';

const features = [
  { Icon: Activity, t: 'Monitoramento em tempo real de todos os módulos' },
  { Icon: BarChart, t: 'Dashboard com KPIs e gráficos de atividade' },
  { Icon: Terminal, t: 'Console integrado para todos os serviços' },
  { Icon: FileText, t: 'Suporte a CSV, Excel, PDF, Voz e Texto' },
  { Icon: Code2, t: 'Integração via API REST completa' },
  { Icon: Shield, t: 'Disponibilidade 24/7 com SLA garantido' },
];

export function Platform() {
  return (
    <section id="plataforma" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[500px] glass rounded-3xl border-pulse"
        >
          <DashboardScene />
        </motion.div>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gradient-cyan mb-6"
          >
            Plataforma Unificada — Uma Interface para Toda a IA
          </motion.h2>
          <ul className="space-y-3">
            {features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 glass rounded-xl p-4"
              >
                <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <f.Icon className="w-5 h-5" />
                </div>
                <span className="text-foreground">{f.t}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
