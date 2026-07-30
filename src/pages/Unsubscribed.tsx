import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Unsubscribed() {
  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <Helmet>
        <title>Unsubscribed | jkgresults</title>
        <meta
          name="description"
          content="You have been unsubscribed from jkgresults marketing emails and SMS."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Ambient emerald glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[rgba(16,185,129,0.12)] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-[480px] bg-[rgba(13,17,23,0.75)] border border-white/[0.08] backdrop-blur-[12px] rounded-xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-sm font-semibold tracking-wide text-white">jkgresults</span>
        </div>

        <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#10b981] mb-3">
          Subscription updated
        </p>

        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#f3f4f6] mb-3 leading-snug">
          You&apos;re unsubscribed
        </h1>

        <div className="h-[3px] w-14 bg-[#10b981] rounded-full mb-6" />

        <p className="text-sm sm:text-[15px] leading-relaxed text-[#9ca3af] mb-4">
          You&apos;ve been removed from our marketing emails and SMS. You won&apos;t receive
          newsletters or promotional updates from us anymore.
        </p>
        <p className="text-sm sm:text-[15px] leading-relaxed text-[#9ca3af] mb-8">
          Transactional messages related to an active audit or booking may still be sent when
          needed.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full sm:w-auto rounded-lg bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-all"
        >
          Back to jkgresults →
        </Link>

        <p className="mt-8 text-xs text-[#9ca3af]/70">
          Changed your mind? Reply to any past email or request a new audit from the homepage.
        </p>
      </div>

      <p className="relative z-10 mt-10 text-xs text-[#9ca3af]/70">© jkgresults</p>
    </div>
  );
}
