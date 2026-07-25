import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';

const STEPS = [
  {
    id: 'team',
    question: 'How large is the team involved?',
    options: [
      '1-5 Employees',
      '6-15 Employees',
      '16-50 Employees',
      '51-200 Employees',
      '200+ Employees',
    ],
  },
  {
    id: 'friction',
    question: "What's your primary workflow bottleneck?",
    options: [
      'High Performance Web Design',
      'Manual Data Entry & CRM Syncing',
      'Document Processing & Extraction',
      'Customer Onboarding Friction',
      'Disconnected Software Tools',
      'Fragmented Communication',
    ],
  },
  {
    id: 'urgency',
    question: 'How soon do you need to implement a solution?',
    options: ['1 Week', 'Next 3 months', 'Researching for future'],
  },
] as const;

type StepId = (typeof STEPS)[number]['id'];

export const DiagnosisForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<StepId, string>>>({});
  const answersRef = useRef(answers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    gdprConsent: false,
  });

  const handleOptionSelect = (stepId: StepId, option: string) => {
    const next = { ...answersRef.current, [stepId]: option };
    answersRef.current = next;
    setAnswers(next);
    setSubmitError(null);
  };

  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const selected = answersRef.current;
    const friction = selected.friction ?? '';

    if (!friction) {
      setSubmitError('Please go back and select a bottleneck.');
      setIsSubmitting(false);
      return;
    }

    const formData = {
      name: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
      email: contactInfo.email,
      phone: contactInfo.phone,
      businessName: contactInfo.businessName,
      team: selected.team ?? '',
      friction,
      urgency: selected.urgency ?? '',
    };

    try {
      const response = await fetch('/api/n8n-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('n8n proxy failed', response.status, result);
        setSubmitError(
          'Could not reach the audit webhook. Activate the n8n workflow (top-right toggle), then try again.',
        );
        setIsSubmitting(false);
        return;
      }

      console.info('Webhook accepted', result.sent);
    } catch (error) {
      console.error('Error sending data to n8n:', error);
      setSubmitError('Network error sending the audit request. Try again.');
      setIsSubmitting(false);
      return;
    }

    const calendlyUrl = `https://calendly.com/jacob-jkgresults?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
    window.location.href = calendlyUrl;
  };

  const activeStep = STEPS[currentStep];
  const selectedOption = activeStep ? answers[activeStep.id] : undefined;

  const cardClass =
    'w-full max-w-[480px] mx-auto bg-[rgba(13,17,23,0.75)] border border-white/[0.08] backdrop-blur-[12px] rounded-xl p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)]';

  return (
    <div className="max-w-xl mx-auto min-h-[320px] sm:min-h-[400px]">
      <AnimatePresence mode="wait">
        {currentStep < STEPS.length && activeStep ? (
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cardClass}
          >
            <span className="block text-xs font-bold tracking-[0.1em] uppercase text-[#10b981] mb-4">
              Step {currentStep + 1} of {STEPS.length}
            </span>

            <h3 className="text-2xl font-medium text-[#f3f4f6] mb-8 leading-snug">
              {activeStep.question}
            </h3>

            <div className="flex flex-col gap-2.5">
              {activeStep.options.map((option) => {
                const isActive = selectedOption === option;
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => handleOptionSelect(activeStep.id, option)}
                    className={`w-full flex items-center justify-between gap-3 rounded-lg px-[18px] py-3.5 text-[0.95rem] text-left border transition-all ${
                      isActive
                        ? 'bg-[rgba(16,185,129,0.05)] border-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                        : 'bg-white/[0.02] border-white/10 text-[#d1d5db] hover:bg-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">{option}</span>
                    {isActive && <Check className="w-4 h-4 shrink-0 text-[#10b981]" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex items-center gap-1 bg-transparent text-[#9ca3af] border border-white/10 rounded-lg py-3 px-4 hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                type="button"
                disabled={!selectedOption}
                onClick={handleContinue}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black rounded-lg p-3 font-semibold hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentStep(STEPS.length - 1)}
                className="flex items-center gap-1 text-xs text-[#9ca3af] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="text-xs font-bold tracking-[0.1em] uppercase text-[#10b981]">
                Final Step / Contact Info
              </div>
            </div>

            <div className="text-[10px] tracking-widest uppercase text-white/50 space-y-1 mb-6 text-center border border-white/10 p-4">
              <p>Team: {answers.team || '—'}</p>
              <p>Bottleneck: {answers.friction || '—'}</p>
              <p>Urgency: {answers.urgency || '—'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="FIRST_NAME"
                  required
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
                <input
                  type="text"
                  placeholder="LAST_NAME"
                  required
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="BUSINESS_NAME"
                  required
                  value={contactInfo.businessName}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, businessName: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="BUSINESS_EMAIL"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="PHONE"
                  required
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 p-4 outline-none focus:border-white transition-all text-sm tracking-widest uppercase"
                />
              </div>
              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="gdpr"
                  required
                  checked={contactInfo.gdprConsent}
                  onChange={(e) => setContactInfo((prev) => ({ ...prev, gdprConsent: e.target.checked }))}
                  className="mt-1 bg-black border-white/20 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="gdpr" className="text-[10px] tracking-widest uppercase text-white/50 leading-relaxed cursor-pointer">
                  I AGREE TO THE PRIVACY PROTOCOL AND CONSENT TO BEING CONTACTED REGARDING THIS AUDIT.
                </label>
              </div>
              {submitError && (
                <p className="text-xs text-red-400 tracking-wide">{submitError}</p>
              )}
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
