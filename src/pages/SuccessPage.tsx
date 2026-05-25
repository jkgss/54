import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col items-center justify-center px-6">
      <Helmet>
        <title>Payment Successful | JKG.RESULTS</title>
      </Helmet>

      <div className="max-w-xl w-full text-center border border-white/10 bg-zinc-950/30 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-white mb-8 glow-white" />
          
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
            System_Update // Payment_Verified
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-tight uppercase leading-tight">
            Application Received
          </h1>
          
          <p className="text-sm text-white/60 tracking-[0.2em] leading-relaxed mb-12 uppercase">
            Your payment has been successfully processed. Our systems have captured your project specifications. We will review your details and an operative will reach out to you within 24 hours to commence the build sequence.
          </p>

          <Link
            to="/"
            className="group px-8 py-4 border border-white/20 hover:border-white transition-all text-[10px] tracking-[0.3em] uppercase flex items-center gap-3"
          >
            Return_To_Base
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/50 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
