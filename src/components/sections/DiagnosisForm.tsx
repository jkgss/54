import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
    options: ['Immediately', 'Next 3 months', 'Researching for future']
  }
];

export const DiagnosisForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });

  const handleOptionSelect = (option: string) => {
    const stepId = STEPS[currentStep].id;
    setAnswers(prev => ({ ...prev, [stepId]: option }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(STEPS.length); // Final step: Contact Info
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...answers,
        ...contactInfo,
        type: 'DIAGNOSIS_CHECK'
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([payload]);

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      console.log('Submission Successful');
      setIsSuccess(true);

      // Attempt to fire webhook in background
      try {
        await fetch('https://jacob11.app.n8n.cloud/webhook-test/3e257289-1446-4104-a9c7-5cef0d09fdd7', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (webhookErr) {
        console.warn('Optional webhook failed:', webhookErr);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-[400px]">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-left py-12 px-8 border border-white/20 bg-black font-mono relative overflow-hidden w-full max-w-[500px] mx-auto my-auto mt-12 z-50"
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 text-white">
                 <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                 <span className="text-[10px] tracking-[0.4em] uppercase">System_Response</span>
              </div>
              <div className="space-y-6 text-xs md:text-sm tracking-[0.2em] md:tracking-widest text-white/70 uppercase">
                <p className="text-white glow-subtle font-medium">[SUCCESS]: AUDIT_DATA_STREAM_CAPTURED</p>
                <p>STATUS: ANALYZING_OPERATIONAL_VULNERABILITIES...</p>
                <p className="pt-4 border-t border-white/10 text-white/50">FINAL_STEP: Check your email for the coordinate report.</p>
              </div>
            </div>
          </motion.div>
        ) : currentStep < STEPS.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="text-[10px] tracking-[0.3em] font-medium text-white/40 uppercase">
                Step-0{currentStep + 1} / 04
              </div>
              {currentStep > 0 && (
                <button 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-xs text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-widest"
                >
                  <ChevronLeft className="w-3 h-3" /> Back
                </button>
              )}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-12 leading-tight">
              {STEPS[currentStep].question}
            </h3>

            <div className="flex flex-col items-center gap-4">
              {STEPS[currentStep].options.map((option) => {
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="group w-full max-w-[500px] p-6 min-h-[80px] border border-white/10 hover:border-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] active:bg-white/10 transition-all flex items-center justify-center text-center relative"
                  >
                    <span className="text-[11px] md:text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors max-w-[90%] leading-relaxed">
                      {option}
                    </span>
                    <ArrowRight className="absolute right-4 md:right-6 w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:text-white shrink-0" />
                  </button>
                );
              })}
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
                <div>
                   <input
                    type="text"
                    placeholder="FULL_NAME"
                    required
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-white text-black text-[10px] tracking-[0.4em] font-bold hover:bg-white/90 transition-all uppercase mt-8"
                >
                  {isSubmitting ? 'PROCESSING...' : 'REQUEST_VULNERABILITY_AUDIT'}
                </button>
              </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
