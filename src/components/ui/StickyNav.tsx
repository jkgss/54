import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

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

  const navLinkClass = 'text-[#9ca3af] hover:text-white transition-colors';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.08] py-2.5' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">jkgresults</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center text-xs">
            <a href="/#features" className={navLinkClass}>Features</a>
            <Link to="/articles" className={navLinkClass}>Insights</Link>
            <button
              onClick={handleBookAudit}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-xs font-semibold hover:bg-white/90 transition-all"
            >
              Request Audit <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden p-2 rounded-md border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-white/30 transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/80 origin-left"
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
            className="fixed inset-x-0 top-[53px] bottom-0 bg-[#060709]/[0.98] backdrop-blur-md z-40 overflow-y-auto px-6 py-10 flex flex-col gap-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-sm">
              <a
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-[#9ca3af] hover:text-white transition-colors"
              >
                Features
              </a>
              <Link
                to="/articles"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-[#9ca3af] hover:text-white transition-colors"
              >
                Insights
              </Link>
              <button
                onClick={handleBookAudit}
                className="w-full py-4 rounded-lg text-center font-semibold bg-white text-black hover:bg-white/90 transition-all inline-flex items-center justify-center gap-2"
              >
                Request Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
