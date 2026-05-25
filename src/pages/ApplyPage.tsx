import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { StickyNav } from '../components/ui/StickyNav';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    specificNeeds: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          businessName: formData.businessName,
          specificNeeds: formData.specificNeeds,
          contactInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            gdprConsent: true,
          }
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout token generation failed:', data.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Network error connecting to Checkout API:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col">
      <Helmet>
        <title>Apply for Web Design | JKG.RESULTS</title>
      </Helmet>

      <StickyNav onBookAudit={() => {}} />

      <main className="flex-grow pt-32 px-6 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return_To_Base
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight uppercase">
              Web Design <span className="glow-white font-medium">Application</span>
            </h1>
            <p className="text-sm text-white/40 tracking-[0.2em] uppercase leading-relaxed">
              Complete the form below to initiate your high-performance web infrastructure project. Proceed to secure payment upon submission.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">Business Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">Business / Company Name</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">Specific Requirements (Optional)</label>
              <textarea
                value={formData.specificNeeds}
                onChange={(e) => setFormData(prev => ({ ...prev, specificNeeds: e.target.value }))}
                rows={3}
                className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase resize-none"
                placeholder="Any specific features or integrations needed?"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group px-8 py-5 bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-3 font-bold uppercase text-[10px] tracking-[0.3em]"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment ($500)'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>Secure Checkout via Stripe</span>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
