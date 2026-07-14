import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const StickyNav = ({ onBookAudit }: { onBookAudit: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleBookAudit = () => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    onBookAudit();
  };

  const navLinkClass = 'hover:text-white/60 transition-colors uppercase';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-[0.3em] uppercase flex items-baseline gap-1 shrink-0">
            <span className="glow-white">JKG</span>
            <span className="text-white/70 font-light text-sm tracking-[0.4em]">.RESULTS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center text-[10px] tracking-[0.2em]">
            <a href="/#features" className={navLinkClass}>Features</a>
            <Link to="/articles" className={navLinkClass}>Insights</Link>
            <button
              onClick={handleBookAudit}
              className={`px-6 py-2 border transition-all duration-300 uppercase tracking-widest ${isScrolled ? 'border-white bg-white text-black hover:bg-black hover:text-white' : 'border-white/30 hover:border-white'}`}
            >
              Book_Audit
            </button>
            <button
              onClick={handleBookAudit}
              className="px-6 py-2 border border-white/20 bg-black/50 backdrop-blur-md text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 transition-all"
            >
              OPERATOR_LOGIN
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden p-2 border border-white/10 bg-black/40 text-white/80 hover:text-white hover:border-white/30 transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] bottom-0 bg-black/98 backdrop-blur-md z-40 overflow-y-auto px-6 py-10 flex flex-col gap-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-[12px] tracking-[0.3em] uppercase font-mono">
              <a
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-white/60 transition-colors"
              >
                Features
              </a>
              <Link
                to="/articles"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-white/60 transition-colors"
              >
                Insights
              </Link>
              <button
                onClick={handleBookAudit}
                className="w-full py-4 border border-white text-center font-bold uppercase tracking-widest bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Book_Audit
              </button>
            </div>

            <div className="border-t border-white/10 pt-8">
              <button
                onClick={handleBookAudit}
                className="w-full py-4 border border-white/20 bg-black text-center text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 transition-all font-bold"
              >
                OPERATOR_LOGIN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
