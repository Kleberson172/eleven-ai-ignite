import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1800); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
        >
          <div className="relative">
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: Math.cos(a) * 200, y: Math.sin(a) * 200, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.02, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  style={{ boxShadow: '0 0 10px #00D4FF' }}
                />
              );
            })}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-6xl font-black text-gradient-cyan glow-text"
            >
              ELEVEN
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
