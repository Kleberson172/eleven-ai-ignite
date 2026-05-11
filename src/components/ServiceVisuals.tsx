import { motion } from 'framer-motion';

type Props = { color: string };

export function ChatVisual({ color }: Props) {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl mb-5"
         style={{ background: `linear-gradient(135deg, ${color}11, transparent)`, border: `1px solid ${color}22` }}>
      {/* incoming bubble */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.6 }}
        className="absolute left-3 top-3 px-3 py-2 rounded-2xl rounded-bl-sm text-xs"
        style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
      >
        Olá, preciso de ajuda
      </motion.div>
      {/* typing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        className="absolute right-3 top-12 px-3 py-2 rounded-2xl rounded-br-sm flex gap-1"
        style={{ background: color, boxShadow: `0 0 20px ${color}88` }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        ))}
      </motion.div>
      {/* response */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.6 }}
        className="absolute right-3 bottom-3 px-3 py-2 rounded-2xl rounded-br-sm text-xs text-white"
        style={{ background: color, boxShadow: `0 0 20px ${color}66` }}
      >
        Claro! Estou a tratar disso ✨
      </motion.div>
    </div>
  );
}

export function VoiceVisual({ color }: Props) {
  const bars = Array.from({ length: 32 });
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl mb-5 flex items-center justify-center gap-1 px-4"
         style={{ background: `linear-gradient(135deg, ${color}11, transparent)`, border: `1px solid ${color}22` }}>
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [0.2, 1, 0.4, 0.8, 0.3, 0.6, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
          className="w-1 rounded-full origin-center"
          style={{
            height: `${20 + (i % 5) * 8}px`,
            background: color,
            boxShadow: `0 0 8px ${color}aa`,
          }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-3 right-3 w-3 h-3 rounded-full"
        style={{ background: color, boxShadow: `0 0 16px ${color}` }}
      />
    </div>
  );
}

export function ChartVisual({ color }: Props) {
  const heights = [40, 65, 50, 80, 55, 90, 70, 95];
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl mb-5 p-4 flex items-end gap-1.5"
         style={{ background: `linear-gradient(135deg, ${color}11, transparent)`, border: `1px solid ${color}22` }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: [`0%`, `${h}%`, `${h}%`, `${h * 0.6}%`] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          className="flex-1 rounded-t-sm"
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}55)`,
            boxShadow: `0 -4px 20px ${color}66`,
          }}
        />
      ))}
      {/* trend line */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100" preserveAspectRatio="none"
      >
        <motion.polyline
          points="5,70 18,55 30,60 43,40 55,50 67,30 80,35 95,15"
          fill="none" stroke={color} strokeWidth="0.6"
          strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        />
      </motion.svg>
    </div>
  );
}

export function ImageGenVisual({ color }: Props) {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl mb-5"
         style={{ background: `linear-gradient(135deg, ${color}11, transparent)`, border: `1px solid ${color}22` }}>
      {/* canvas grid being filled */}
      <div className="absolute inset-3 grid grid-cols-8 grid-rows-4 gap-0.5">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: (i % 8) * 0.08 + Math.floor(i / 8) * 0.2 }}
            className="rounded-sm"
            style={{
              background: `hsl(${(i * 11) % 360}, 80%, 60%)`,
              boxShadow: `0 0 6px hsl(${(i * 11) % 360}, 80%, 60%)`,
            }}
          />
        ))}
      </div>
      {/* sparkle */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
        className="absolute top-3 right-3 text-2xl"
        style={{ color, filter: `drop-shadow(0 0 8px ${color})` }}
      >
        ✦
      </motion.div>
      {/* scan line */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}
