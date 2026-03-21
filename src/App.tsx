import { useState } from 'react';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { CaseStudies } from './components/sections/CaseStudies';
import { FounderNote } from './components/sections/FounderNote';
import { DiagnosisForm } from './components/sections/DiagnosisForm';
import { AutomationIndex } from './components/sections/AutomationIndex';
import { AutomationCalculator } from './components/ui/AutomationCalculator';
import { ComparisonSlider } from './components/ui/ComparisonSlider';
import { SystemSchematic } from './components/ui/SystemSchematic';
import { LogoCloud } from './components/ui/LogoCloud';
import { StickyNav } from './components/ui/StickyNav';
import { ExitIntent } from './components/ui/ExitIntent';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      <StickyNav onBookAudit={scrollToContact} />
      <ExitIntent />

      <main>
        <Hero onExplore={scrollToFeatures} onConsultation={scrollToContact} />
        
        <LogoCloud />

        <section className="py-32 px-6 border-b border-white/5 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight">
                  Quantifying_The
                  <br />
                  <span className="glow-white font-medium">Efficiency_Gap</span>
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-12 uppercase tracking-wider font-light">
                  Most teams operate at 40% efficiency due to manual overhead. Our systems recapture that lost time, allowing your experts to focus on high-value strategy.
                </p>
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-6 p-6 border border-white/10 bg-black/40">
                      <div className="text-3xl font-light glow-white tracking-tighter">150+</div>
                      <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Hours recovered<br/>per employee / month</div>
                   </div>
                   <button 
                    onClick={() => setShowCalculator(!showCalculator)}
                    className="text-left text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white transition-colors border-b border-white/10 pb-2 inline-block w-fit"
                   >
                    {showCalculator ? 'CLOSE_MODEL' : 'LAUNCH_ROI_CALCULATOR_PREVIEW'}
                   </button>
                </div>
              </div>
              <div>
                {showCalculator ? <AutomationCalculator /> : <ComparisonSlider />}
              </div>
            </div>
          </div>
        </section>

        <Features />

        <section className="py-32 px-6 relative bg-zinc-950/30">
          <div className="max-w-7xl mx-auto text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight">
                Procedural_Evolution
              </h2>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Visualizing_System_Architecture</p>
          </div>
          <SystemSchematic />
        </section>

        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase leading-tight">
                  Snapshots_Of_Success
                </h2>
                <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Quantified_Metrics // Verified_Impact</p>
             </div>
             <CaseStudies />
          </div>
        </section>

        <AutomationIndex />

        <section id="contact" className="py-32 px-6 relative overflow-hidden bg-white/5">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight uppercase">
                System_Audit
              </h2>
              <p className="text-sm text-white/40 mb-20 tracking-[0.3em] uppercase max-w-2xl mx-auto leading-loose">
                Identify automation vulnerabilities and potential efficiency gains in your current operational stack.
              </p>

              <DiagnosisForm />
           </div>
        </section>

        <FounderNote />
      </main>

      <footer className="border-t border-white/10 py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-semibold tracking-[0.3em] uppercase">
            JKG<span className="font-light">.AI</span>
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
            © 2024 JKG.AI — ALL_RIGHTS_RESERVED // LONDON_NY_SF
          </div>
          <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase">
            <a href="#" className="text-white/30 hover:text-white transition-colors">Privacy_Protocol</a>
            <a href="#" className="text-white/30 hover:text-white transition-colors">Operating_Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
