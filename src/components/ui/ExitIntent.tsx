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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 uppercase">
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
          className="relative w-full max-w-lg bg-zinc-900 border border-white/20 p-10 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-light mb-4 tracking-tight">FREE_RESOURCE</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-8 font-light uppercase tracking-widest">
              Gartner reports 70% of teams waste 15+ hours/week on "Shadow Ops". Download our guide: 
              <span className="text-white block mt-2">5_RED_FLAGS_YOUR_TEAM_NEEDS_AUTOMATION</span>
            </p>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); }}>
              <input
                type="email"
                placeholder="BUSINESS_EMAIL"
                required
                className="w-full bg-black border border-white/10 p-4 text-xs tracking-widest outline-none focus:border-white transition-all uppercase"
              />
              <button
                type="submit"
                className="w-full py-4 bg-white text-black text-[10px] tracking-[0.3em] font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-3"
              >
                ACCESS_GUIDE_NOW
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
