import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col items-center justify-center px-6">
      <Helmet>
        <title>Payment Cancelled | JKG.RESULTS</title>
      </Helmet>

      <div className="max-w-xl w-full text-center border border-white/10 bg-zinc-950/30 p-12">
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-white/40 mb-8" />
          
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
            System_Alert // Payment_Terminated
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-tight uppercase leading-tight">
            Checkout Cancelled
          </h1>
          
          <p className="text-sm text-white/60 tracking-[0.2em] leading-relaxed mb-12 uppercase">
            The payment process was interrupted. No charges have been made. If you experienced technical difficulties or have questions before proceeding, please schedule a consultation.
          </p>

          <Link
            to="/apply"
            className="group px-8 py-4 bg-white text-black hover:bg-white/90 transition-all text-[10px] tracking-[0.3em] uppercase font-bold flex items-center gap-3 mb-4 w-full justify-center"
          >
            Retry_Application
          </Link>
          
          <Link
            to="/"
            className="group px-8 py-4 border border-white/20 hover:border-white transition-all text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 w-full"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-white/50 group-hover:text-white" />
            Return_To_Base
          </Link>
        </div>
      </div>
    </div>
  );
}
