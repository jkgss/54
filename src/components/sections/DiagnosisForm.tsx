import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';

const STEPS = [
  {
    id: 'team',
    question: 'How many members are in your operational team?',
    options: ['1-10', '11-50', '51-200', '200+']
  },
  {
    id: 'friction',
    question: 'Which core system module are you looking to implement?',
    options: [
      'HIGH_PERFORMANCE_WEB_DESIGN',
      'AUTOMATED_PHONE_RESPONDER',
      'INSTANT_LEAD_QUALIFICATION',
      'AUTOMATED_SMS_&_EMAIL',
      'CRM_INTEGRATION'
    ]
  },
  {
    id: 'urgency',
    question: 'How soon do you need to implement a solution?',
    options: ['1 Week', 'Next 3 months', 'Researching for future']
  }
];

export const DiagnosisForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    gdprConsent: false,
  });

  const handleOptionSelect = (option: string) => {
    const stepId = STEPS[currentStep].id;
    setAnswers(prev => ({ ...prev, [stepId]: option }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(STEPS.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
      email: contactInfo.email,
      phone: contactInfo.phone,
      businessName: contactInfo.businessName,
      team: answers.team,
      friction: answers.friction,
      urgency: answers.urgency,
    };

    try {
      // Post to our Vercel proxy (avoids browser CORS + HTTPS→HTTP mixed-content blocks)
      const response = await fetch('/api/n8n-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('n8n proxy failed', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error sending data to n8n:', error);
    }

    const calendlyUrl = `https://calendly.com/jacob-jkgresults?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;

    window.location.href = calendlyUrl;
  };

  return (
    <div className="max-w-xl mx-auto min-h-[320px] sm:min-h-[400px]">
      <AnimatePresence mode="wait">
        {currentStep < STEPS.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <div className="text-[10px] tracking-[0.3em] font-medium text-white/40 uppercase">
                Step-0{currentStep + 1} / 04
              </div>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-xs text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-widest"
                >
                  <ChevronLeft className="w-3 h-3" /> Back
                </button>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-8 sm:mb-12 leading-tight">
              {STEPS[currentStep].question}
            </h3>

            <div className="flex flex-col items-center gap-4">
              {STEPS[currentStep].options.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="group w-full max-w-[500px] p-4 md:p-6 min-h-[60px] md:min-h-[80px] border border-white/10 hover:border-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:bg-white/10 transition-all flex items-center justify-center text-center relative overflow-hidden min-w-0"
                >
                  <span className="text-[10px] md:text-sm tracking-wide md:tracking-widest uppercase text-white/70 group-hover:text-white transition-colors max-w-[85%] leading-relaxed break-words [overflow-wrap:anywhere] whitespace-normal">
                    {option}
                  </span>
                  <ArrowRight className="absolute right-4 md:right-6 w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:text-white shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-[10px] tracking-[0.3em] font-medium text-white/40 uppercase mb-8 text-center">
              Final_Step / CONTACT_INFO
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="FIRST_NAME"
                  required
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
                <input
                  type="text"
                  placeholder="LAST_NAME"
                  required
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="BUSINESS_NAME"
                  required
                  value={contactInfo.businessName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="BUSINESS_EMAIL"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="PHONE"
                  required
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-black border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="gdpr"
                  required
                  checked={contactInfo.gdprConsent}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, gdprConsent: e.target.checked }))}
                  className="mt-1 bg-black border-white/20 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="gdpr" className="text-[10px] tracking-widest uppercase text-white/50 leading-relaxed cursor-pointer">
                  I AGREE TO THE PRIVACY PROTOCOL AND CONSENT TO BEING CONTACTED REGARDING THIS AUDIT.
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-white text-black text-[10px] tracking-[0.4em] font-bold hover:bg-white/90 transition-all uppercase mt-8 disabled:opacity-60"
              >
                {isSubmitting ? 'PROCESSING...' : 'Get My Full Audit RoadMap'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
