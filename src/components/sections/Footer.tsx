import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="h-px max-w-7xl mx-auto mb-12 origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(190 100% 50%), transparent)' }}
      />
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-3xl font-black text-gradient-cyan glow-text mb-3">ELEVEN</div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Inteligência que transforma decisões. Construído em Angola para África.
          </p>
        </div>
        <div>
          <div className="text-sm uppercase tracking-wider text-primary mb-3">Navegação</div>
          <ul className="space-y-2 text-muted-foreground text-sm">
            {['Sobre', 'Rotas', 'Serviços', 'Plataforma', 'Planos', 'Contacto'].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors relative inline-block group">
                {l}
                <span className="absolute -bottom-px left-0 w-0 h-px bg-primary group-hover:w-full transition-all" />
              </a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm uppercase tracking-wider text-primary mb-3">Redes</div>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.7 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary hover:glow-cyan"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 ELEVEN — Inteligência que transforma decisões
      </div>
    </footer>
  );
}
