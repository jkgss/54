import { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { CaseStudies } from '../components/sections/CaseStudies';
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
import { absoluteUrl, defaultDescription, OG_IMAGE, SITE_URL } from '../lib/seo';

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
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'jkgresults',
    url: SITE_URL,
    logo: OG_IMAGE,
    description: 'Enterprise AI automation and system architecture.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'jkgresults',
    url: SITE_URL,
    description: defaultDescription,
  };

  return (
    <div
      className="min-h-screen bg-[#060709] text-white selection:bg-emerald-500/30 selection:text-white overflow-x-hidden w-full relative"
    >
      {/* Ambient green glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 40% at 0% 10%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(ellipse 40% 30% at 100% 80%, rgba(16,185,129,0.06), transparent 60%)',
        }}
      />

      <Helmet>
        <title>jkgresults | AI Automation Agency</title>
        <meta name="description" content={defaultDescription} />
        <link rel="canonical" href={absoluteUrl('/')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/')} />
        <meta property="og:title" content="jkgresults | AI Automation Agency" />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="jkgresults | AI Automation Agency" />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      <StickyNav onBookAudit={scrollToContact} />
      <ExitIntent />

      <main className="overflow-x-hidden w-full relative z-10">
        <Hero onExplore={scrollToFeatures} onConsultation={scrollToContact} />

        <LogoCloud />

        <section className="py-16 md:py-32 border-b border-white/5 overflow-x-hidden w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto px-4 min-w-0">
            <div className="w-full min-w-0 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight text-[#f3f4f6] break-words">
                Quantifying the efficiency gap
              </h2>
              <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed mb-12 max-w-lg break-words">
                Most teams operate at 40% efficiency due to manual overhead. Our systems recapture that lost time, allowing your experts to focus on high-value strategy.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 glass-card min-w-0">
                <div className="text-3xl font-light text-emerald-400 tracking-tighter shrink-0">150+</div>
                <div className="text-xs text-[#9ca3af] min-w-0 break-words leading-relaxed">
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

        <AutomationIndex />

        <section className="py-16 md:py-32 px-4 sm:px-6 relative overflow-x-hidden w-full">
          <div className="w-full max-w-5xl mx-auto min-w-0">
            <p className="text-base sm:text-lg text-[#9ca3af] mb-12 md:mb-16 break-words">
              The <span className="text-white font-semibold">Architecture of Flow</span>: A glimpse into how we build.
            </p>
            <SystemSchematic />
          </div>
        </section>

        <section className="py-16 md:py-32 px-4 sm:px-6 overflow-x-hidden w-full">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
            <div className="text-center mb-12 md:mb-20 w-full min-w-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-[#f3f4f6] break-words">
                Snapshots of success
              </h2>
              <p className="text-sm text-[#9ca3af] break-words">
                Quantified metrics, verified impact.
              </p>
            </div>
            <CaseStudies />
          </div>
        </section>

        <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-hidden w-full">
          <div className="max-w-4xl mx-auto text-center relative z-10 min-w-0 w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight text-[#f3f4f6] text-center break-words">
              Request an automation audit
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af] mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed break-words">
              Identify leaks in your current lead capture process and uncover potential efficiency gains in your operational stack.
            </p>

            <DiagnosisForm />
          </div>
        </section>

        <FAQ />
      </main>

      <footer className="border-t border-white/[0.08] py-12 md:py-16 px-4 sm:px-6 relative z-10 overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-sm font-semibold tracking-wide text-white">jkgresults</span>
          </div>
          <div className="text-xs text-[#9ca3af]/70 max-w-sm md:max-w-none leading-relaxed break-words">
            Last updated {currentDate} · © 2024 jkgresults — All rights reserved
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs">
            <Link to="/articles" className="text-[#9ca3af] hover:text-white transition-colors">
              Insights
            </Link>
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors">
              Privacy policy
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors">
              Operating terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
