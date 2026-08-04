import { motion } from 'framer-motion';

export const FounderNote = () => {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative glass-card p-8 sm:p-10"
      >
        <div className="absolute -top-6 left-6 text-7xl text-emerald-500/10 font-serif select-none">"</div>
        <p className="text-lg md:text-xl text-[#d1d5db] italic leading-relaxed mb-10 font-light relative z-10">
          "Our goal isn't just to add code; it's to remove friction. We build systems that don't just work, they evolve. Every automation we deploy is a statement of intent: that human potential should be spent on creativity, not repetition."
        </p>
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-semibold text-emerald-400">
             JG
          </div>
          <div>
            <div className="text-sm font-medium text-white">Jacob Garrison</div>
            <div className="text-xs text-[#9ca3af] mt-1">Founding Partner &amp; Architect</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
