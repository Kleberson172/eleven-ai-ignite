import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  ['Sobre', '#sobre'],
  ['Rotas', '#rotas'],
  ['Serviços', '#servicos'],
  ['Plataforma', '#plataforma'],
  ['Planos', '#planos'],
  ['Contacto', '#contacto'],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'glass-strong py-3' : 'py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="text-2xl font-black tracking-tight text-gradient-cyan glow-text">
          ELEVEN
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors relative group">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary group-hover:w-full transition-all" />
            </a>
          ))}
        </nav>
        <button className="md:hidden text-primary" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <motion.div animate={{ rotate: open ? 90 : 0 }}>{open ? <X /> : <Menu />}</motion.div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="text-foreground" onClick={() => setOpen(false)}>{label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
