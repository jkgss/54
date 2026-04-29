import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono selection:bg-white selection:text-black">
      <div className="max-w-md w-full text-center space-y-12">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse" />
          <ShieldAlert className="w-24 h-24 text-red-500 relative z-10 mx-auto" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-tight uppercase text-white">
            Access_ <span className="text-red-500 font-medium">Denominator_Denied</span>
          </h1>
          <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase leading-loose max-w-xs mx-auto">
            Security protocol failure. Your operator credentials do not have the required clearance level for this sector.
          </p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="w-full py-4 bg-white text-black text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            RETURN_TO_SAFE_ZONE
          </Link>
          
          <Link
            to="/"
            className="text-[10px] text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
          >
            EXIT_INTERFACE
          </Link>
        </div>

        <div className="pt-12 text-[8px] text-white/10 tracking-[0.2em] uppercase">
          ERROR_CODE: 403_FORBIDDEN // LOGGED_BY_SENTRY
        </div>
      </div>
    </div>
  );
}
