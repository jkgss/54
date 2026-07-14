import { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { CaseStudies } from '../components/sections/CaseStudies';
import { FounderNote } from '../components/sections/FounderNote';
import { DiagnosisForm } from '../components/sections/DiagnosisForm';
import { AutomationIndex } from '../components/sections/AutomationIndex';
import { FAQ } from '../components/sections/FAQ';
import { AutomationCalculator } from '../components/ui/AutomationCalculator';
import { Helmet } from 'react-helmet-async';
import { SystemSchematic } from '../components/ui/SystemSchematic';
import { LogoCloud } from '../components/ui/LogoCloud';
import { StickyNav } from '../components/ui/StickyNav';
import { ExitIntent } from '../components/ui/ExitIntent';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(scrollToContact, 100);
    } else if (window.location.hash === '#features') {
      setTimeout(scrollToFeatures, 100);
    }
  }, []);

  const currentDate = new Date().toISOString().split('T')[0];

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JKG.RESULTS",
    "url": "https://www.jkgresults.com/",
    "logo": "https://www.jkgresults.com/vite.svg",
    "description": "Enterprise AI Automation and System Architecture."
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-x-hidden w-full">
      <Helmet>
        <title>JKG.RESULTS | AI Automation Agency</title>
        <meta name="description" content="Quantifying the Efficiency Gap. We build enterprise AI automation workflows to reclaim lost capacity." />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>

      <StickyNav onBookAudit={scrollToContact} />
      <ExitIntent />

      <main className="overflow-x-hidden w-full">
        <Hero onExplore={scrollToFeatures} onConsultation={scrollToContact} />

        <LogoCloud />

        <section className="py-16 md:py-32 border-b border-white/5 bg-zinc-950/20 overflow-x-hidden w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto px-4 min-w-0">
            <div className="w-full min-w-0 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight break-words [overflow-wrap:anywhere] whitespace-normal">
                Quantifying_The
                <br />
                <span className="glow-white font-medium">Efficiency_Gap</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-12 uppercase tracking-wider font-light break-words [overflow-wrap:anywhere] whitespace-normal">
                Most teams operate at 40% efficiency due to manual overhead. Our systems recapture that lost time, allowing your experts to focus on high-value strategy.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 border border-white/10 bg-black/40 min-w-0">
                <div className="text-3xl font-light glow-white tracking-tighter shrink-0">150+</div>
                <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase min-w-0 break-words [overflow-wrap:anywhere]">
                  Hours recovered
                  <br />
                  per employee / month
                </div>
              </div>
            </div>
            <div className="w-full min-w-0 flex justify-center">
              <div className="w-full max-w-xl lg:max-w-none min-w-0">
                <AutomationCalculator />
              </div>
            </div>
          </div>
        </section>

        <Features />

        <section className="py-16 md:py-32 px-4 sm:px-6 relative bg-zinc-950/30 overflow-x-hidden w-full">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center mb-16 md:mb-24 min-w-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight text-center break-words [overflow-wrap:anywhere] whitespace-normal">
              Procedural_Evolution
            </h2>
            <p className="text-[10px] text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase break-words [overflow-wrap:anywhere] whitespace-normal">
              Visualizing_System_Architecture
            </p>
          </div>
          <SystemSchematic />
        </section>

        <section className="py-16 md:py-32 px-4 sm:px-6 border-y border-white/5 overflow-x-hidden w-full">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
            <div className="text-center mb-16 md:mb-24 w-full min-w-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight text-center break-words [overflow-wrap:anywhere] whitespace-normal">
                Snapshots_Of_Success
              </h2>
              <p className="text-[10px] text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase break-words [overflow-wrap:anywhere] whitespace-normal">
                Quantified_Metrics // Verified_Impact
              </p>
            </div>
            <CaseStudies />
          </div>
        </section>

        <AutomationIndex />

        <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-white/5 w-full">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10 min-w-0 w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light mb-8 tracking-tight uppercase text-center break-words [overflow-wrap:anywhere] whitespace-normal">
              System_Audit
            </h2>
            <p className="text-sm text-white/40 mb-12 md:mb-20 tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-2xl mx-auto leading-loose break-words [overflow-wrap:anywhere] whitespace-normal">
              Identify leaks in your current lead capture process and uncover potential efficiency gains in your operational stack.
            </p>

            <DiagnosisForm />
          </div>
        </section>

        <FAQ />
        <FounderNote />
      </main>

      <footer className="border-t border-white/10 py-12 md:py-16 px-4 sm:px-6 bg-black overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left min-w-0">
          <div className="text-xl font-bold tracking-[0.3em] uppercase flex items-baseline gap-1">
            <span className="glow-white">JKG</span>
            <span className="text-white/70 font-light text-sm tracking-[0.4em]">.RESULTS</span>
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-sm md:max-w-none leading-relaxed break-words [overflow-wrap:anywhere]">
            LAST_UPDATED: {currentDate} // © 2024 JKG.RESULTS — ALL_RIGHTS_RESERVED // LONDON_NY_SF
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-[10px] tracking-[0.3em] uppercase">
            <Link to="/articles" className="text-white/30 hover:text-white transition-colors">
              Insights
            </Link>
            <a href="#" className="text-white/30 hover:text-white transition-colors">
              Privacy_Protocol
            </a>
            <a href="#" className="text-white/30 hover:text-white transition-colors">
              Operating_Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
