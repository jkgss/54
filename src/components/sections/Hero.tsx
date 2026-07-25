import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PAIN_POINTS = [
  'onboarding',
  'reporting',
  'CRM syncing',
  'outdated websites',
  'slow lead follow-up',
];

const TYPE_MS = 80;
const DELETE_MS = 40;
const HOLD_MS = 1800;

const useTypewriter = (words: string[]) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const tick = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(tick);
  }, [text, deleting, wordIndex, words]);

  return text;
};

export const Hero = ({ onConsultation }: { onExplore?: () => void; onConsultation?: () => void }) => {
  const typed = useTypewriter(PAIN_POINTS);

  return (
    <section
      className="text-white px-4 sm:px-12 pb-16 pt-28 sm:pb-20 sm:pt-32 flex flex-col justify-center min-h-[70vh] border-b border-white/5 overflow-x-hidden w-full bg-[#060709]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(16,185,129,0.08), transparent 60%)',
      }}
    >
      <div className="max-w-3xl mx-auto w-full text-left min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 mb-8 sm:mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] sm:text-xs text-white/50 tracking-wide">
            New accepting audit requests for Q2 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] text-[#f3f4f6] mb-2">
          Your team is spending hours on
        </h1>
        <div className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] min-h-[1.3em] mb-5">
          <span className="text-emerald-100/70">{typed}</span>
          <span
            className="inline-block w-[2px] h-[0.9em] align-[-0.08em] bg-emerald-200/80 animate-pulse ml-1"
            aria-hidden="true"
          />
        </div>

        <div className="h-[3px] w-14 bg-emerald-500/80 rounded-full mb-8 sm:mb-10" />

        <p className="text-sm sm:text-base text-white/40 leading-relaxed max-w-xl mb-1">
          Manual data entry. Disconnected tools. Repeating the same steps every day.
        </p>
        <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-xl mb-10 sm:mb-12">
          AI automation isn&apos;t a trend—it&apos;s a systematic way to reclaim time.
        </p>

        {onConsultation && (
          <button
            onClick={onConsultation}
            className="inline-flex items-center gap-2 rounded-md bg-white text-black px-5 sm:px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-all duration-200 cursor-pointer"
          >
            Request an Automation Audit <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
