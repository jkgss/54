import { ReactNode } from 'react';

export function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light tracking-tight uppercase mb-4">
            {title.split('').map((char, i) => (
              <span key={i} className={char === '_' ? 'opacity-20' : ''}>{char}</span>
            ))}
          </h1>
          {subtitle && (
            <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="p-8 border border-white/10 bg-zinc-950/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em]">
            ← BACK_TO_INTERFACE
          </a>
        </div>
      </div>
    </div>
  );
}
