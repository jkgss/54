import { Link } from 'react-router-dom';

export const Hero = ({ onExplore, onConsultation }: { onExplore?: () => void, onConsultation?: () => void }) => {
  return (
    <section className="bg-black text-white p-12 font-mono flex flex-col justify-center min-h-[60vh] border-b border-neutral-800">
      <div className="max-w-4xl mx-auto w-full">
        <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
          // core_offering
        </span>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
          HIGH_PERFORMANCE_WEB_DESIGN
        </h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed mb-8 uppercase">
          CUSTOM-ENGINEERED, MOBILE-FIRST WEBSITES BUILT FOR SPEED AND AUTHORITY. 
          THIS IS YOUR DIGITAL STOREFRONT, OPTIMIZED TO RANK ON GOOGLE AND TURN 
          LOCAL SEARCHERS INTO HIGH-VALUE LEADS.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Action Button */}
          <Link
            to="/apply"
            className="border border-white bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-center"
          >
            Buy Web Design — $500 Setup + $50/mo
          </Link>
          
          {onConsultation && (
            <button
              onClick={onConsultation}
              className="border border-white/20 bg-transparent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:border-white transition-all duration-200 ease-in-out cursor-pointer"
            >
              System Audit
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
