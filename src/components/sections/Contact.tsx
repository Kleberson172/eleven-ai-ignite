import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

function burst(e: React.MouseEvent<HTMLButtonElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  for (let i = 0; i < 30; i++) {
    const d = document.createElement('div');
    const a = (i / 30) * Math.PI * 2;
    const dist = 80 + Math.random() * 60;
    d.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:6px;height:6px;border-radius:9999px;background:#00D4FF;box-shadow:0 0 12px #00D4FF;pointer-events:none;z-index:200;transition:all .9s cubic-bezier(.2,.8,.2,1);`;
    document.body.appendChild(d);
    requestAnimationFrame(() => { d.style.transform = `translate(${Math.cos(a)*dist}px, ${Math.sin(a)*dist}px) scale(0)`; d.style.opacity = '0'; });
    setTimeout(() => d.remove(), 1000);
  }
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contacto" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* glowing pin map background */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rounded-full bg-primary glow-cyan" />
          <div className="pulse-ring relative w-3 h-3" />
        </div>
        <div className="text-xs text-primary mt-2">Luanda</div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-gradient-cyan text-center mb-16"
        >
          Vamos conversar
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-strong rounded-3xl p-8 border-pulse space-y-4"
          >
            {[
              { name: 'nome', label: 'Nome', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'empresa', label: 'Empresa', type: 'text' },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
                <input required type={f.type} className="mt-1 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground transition-colors" />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Mensagem</label>
              <textarea required rows={4} className="mt-1 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground resize-none" />
            </div>
            <button
              type="submit"
              onClick={burst}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-cyan hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> {sent ? 'Enviado ✓' : 'Enviar Mensagem'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { Icon: Mail, label: 'Email', value: '1.eleven.onze.1@gmail.com', href: 'mailto:1.eleven.onze.1@gmail.com' },
              { Icon: Phone, label: 'WhatsApp', value: '+244 923 111 111', href: 'https://wa.me/244923111111' },
              { Icon: MapPin, label: 'Localização', value: 'Luanda, Angola' },
            ].map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                whileHover={{ x: 6 }}
                className="block glass rounded-2xl p-6 group"
              >
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="flex w-12 h-12 items-center justify-center rounded-xl bg-primary/10 text-primary glow-cyan">
                    <c.Icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="text-foreground font-medium">{c.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* floating WhatsApp */}
      <a
        href="https://wa.me/244923111111"
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-glow text-background flex items-center justify-center font-bold shadow-2xl glow-cyan"
        aria-label="WhatsApp"
      >
        <span className="relative w-full h-full flex items-center justify-center">
          <Phone className="w-6 h-6" />
          <span className="pulse-ring absolute inset-0 rounded-full" />
        </span>
      </a>
    </section>
  );
}
