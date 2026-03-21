import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const StickyNav = ({ onBookAudit }: { onBookAudit: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-[0.3em] uppercase">
            JKG<span className="font-light">.AI</span>
          </div>
          <div className="flex gap-10 items-center text-[10px] tracking-[0.2em]">
            <a href="#features" className="hover:text-white/60 transition-colors uppercase">Features</a>
            <a href="#about" className="hover:text-white/60 transition-colors uppercase">Insights</a>
            <button
              onClick={onBookAudit}
              className={`px-6 py-2 border transition-all duration-300 uppercase tracking-widest ${isScrolled ? 'border-white bg-white text-black' : 'border-white/30 hover:border-white'}`}
            >
              Book_Audit
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
          style={{ scaleX }}
        />
      </nav>
    </>
  );
};
