import { createFileRoute } from '@tanstack/react-router';
import { Loader } from '../components/Loader';
import { CursorTrail } from '../components/CursorTrail';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Routes as RoutesSection } from '../components/sections/Routes';
import { Services } from '../components/sections/Services';
import { Platform } from '../components/sections/Platform';
import { Pricing } from '../components/sections/Pricing';
import { Showcase } from '../components/sections/Showcase';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'ELEVEN — Inteligência que transforma decisões' },
      { name: 'description', content: 'A plataforma de IA mais confiável de Angola. Otimizador de rotas, atendimento inteligente, voz, dados e geração de imagens.' },
      { property: 'og:title', content: 'ELEVEN — Inteligência que transforma decisões' },
      { property: 'og:description', content: 'A plataforma de IA mais confiável de Angola.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Loader />
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <About />
        <RoutesSection />
        <Services />
        <Platform />
        <Pricing />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
