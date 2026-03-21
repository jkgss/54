import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = ({ onExplore, onConsultation }: { onExplore: () => void, onConsultation: () => void }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 animate-slide-up">
        <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 border border-white/20 text-[10px] tracking-[0.4em] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-white/70">AI_Automation_Specialists</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-10 tracking-[-0.03em] leading-[0.85] uppercase">
          Sovereign
          <br />
          <span className="glow-white font-medium">
            AI_Agents
          </span>
        </h1>

        <p className="text-base md:text-lg text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed tracking-wider font-light uppercase">
          Transform your business with intelligent automation.
          <br />
          Custom AI chat agents, lead generation, and seamless CRM integration.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={onConsultation}
            className="group px-10 py-5 bg-white hover:bg-white/90 text-black text-[10px] tracking-[0.3em] transition-all duration-300 border-glow-hover flex items-center gap-3 font-bold uppercase"
          >
            Schedule_Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onExplore}
            className="px-10 py-5 border border-white/30 hover:border-white hover:border-glow text-[10px] tracking-[0.3em] transition-all duration-300 uppercase"
          >
            Explore_Features
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
