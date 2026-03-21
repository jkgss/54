import { motion } from 'framer-motion';

export const FounderNote = () => {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative"
      >
        <div className="absolute -top-12 -left-12 text-8xl text-white/[0.03] font-serif">"</div>
        <p className="text-lg md:text-xl text-white/70 italic leading-relaxed mb-12 font-light">
          "Our goal isn't just to add code; it's to remove friction. We build systems that don't just work, they evolve. Every automation we deploy is a statement of intent: that human potential should be spent on creativity, not repetition."
        </p>
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xs tracking-tighter overflow-hidden grayscale">
             JG
          </div>
          <div>
            <div className="text-sm tracking-[0.2em] font-medium uppercase">Jacob Garrison</div>
            <div className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Founding_Partner_&_Architect</div>
          </div>
        </div>
        <div className="mt-12">
            <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-40">
                <path d="M10 30 Q 30 10, 50 30 T 90 30" fill="none" stroke="white" strokeWidth="1" />
            </svg>
        </div>
      </motion.div>
    </div>
  );
};
