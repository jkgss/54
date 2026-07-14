export const Hero = ({ onConsultation }: { onExplore?: () => void; onConsultation?: () => void }) => {
  return (
    <section className="bg-black text-white px-6 pb-16 pt-28 sm:px-12 sm:pb-20 sm:pt-32 font-mono flex flex-col justify-center min-h-[70vh] border-b border-neutral-800">
      <div className="max-w-5xl mx-auto w-full text-center">
        <h1 className="text-[1.5rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.12em] sm:tracking-widest leading-[1.2] mb-8 sm:mb-10 glow-white px-1">
          YOUR TEAM IS SPENDING HOURS ON WORK THAT SHOULDN&apos;T REQUIRE A HUMAN.
        </h1>

        <p className="text-white/50 text-[11px] sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed tracking-[0.12em] sm:tracking-[0.2em] uppercase mb-10 sm:mb-14">
          Manual data entry. Disconnected tools. Repeating the same steps every day. This is an unnecessary strain on scaling operations.
        </p>

        <p
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug max-w-3xl mx-auto mb-10 sm:mb-14 glow-subtle px-2"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          AI automation isn&apos;t a trend—it&apos;s a systematic framework to reclaim leverage.
        </p>

        <p className="text-white/40 text-[11px] sm:text-sm max-w-2xl mx-auto leading-loose tracking-[0.1em] sm:tracking-[0.18em] uppercase mb-12 sm:mb-16">
          We engineer custom pipelines that bridge isolated systems, streamline repetitive workflows, and execute cross-platform data syncing in milliseconds. Stop wasting human capital on algorithmic tasks.
        </p>

        {onConsultation && (
          <button
            onClick={onConsultation}
            className="border border-white bg-white text-black px-6 sm:px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 ease-in-out cursor-pointer text-center inline-flex items-center justify-center"
          >
            Request an Automation Audit →
          </button>
        )}
      </div>
    </section>
  );
};
