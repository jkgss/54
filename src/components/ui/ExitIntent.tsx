import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ArrowRight } from 'lucide-react';

export const ExitIntent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-lg glass-card p-6 sm:p-10 overflow-hidden"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-6 right-6 text-[#9ca3af] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-8">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-light mb-4 tracking-tight text-[#f3f4f6]">Free resource</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-8">
              Gartner reports 70% of teams waste 15+ hours/week on "Shadow Ops". Download our guide:
              <span className="text-white block mt-2 font-medium">5 red flags your team needs automation</span>
            </p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); }}>
              <input
                type="email"
                placeholder="Business email"
                required
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-4 text-sm outline-none focus:border-emerald-500/60 transition-all"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                Access the guide
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
