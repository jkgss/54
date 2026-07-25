import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: "What is AI Automation and how can it help my business?",
    answer: "AI Automation involves using artificial intelligence to streamline repetitive tasks, analyze data, and optimize processes. It helps businesses reduce manual overhead, minimize errors, and free up human talent for high-value strategic work."
  },
  {
    question: "How long does it take to implement your AI systems?",
    answer: "Implementation timelines vary depending on the complexity of the workflow. Basic integrations can be deployed in as little as 2-4 weeks, while comprehensive enterprise-wide systems may take 2-3 months from audit to full deployment."
  },
  {
    question: "Do I need technical expertise to use your automation solutions?",
    answer: "No. Our systems are designed with intuitive interfaces. We build the complex backend logic so you and your team can operate the systems easily with minimal training."
  },
  {
    question: "Is my data secure with your AI tools?",
    answer: "Data security is our top priority. We use industry-standard encryption and secure cloud infrastructure. All data processed by our AI models is strictly isolated and never used to train public models without explicit consent."
  },
  {
    question: "Can your systems integrate with my existing software?",
    answer: "Yes, our automation solutions are designed to integrate seamlessly with most modern CRMs, ERPs, and marketing platforms via APIs and webhooks."
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Our clients typically see a 40-60% reduction in time spent on manual tasks within the first quarter, directly translating into cost savings and increased capacity for revenue-generating activities."
  },
  {
    question: "Do you offer ongoing support after implementation?",
    answer: "Absolutely. We provide ongoing maintenance, system updates, and dedicated support to ensure your automated workflows continue to operate at peak efficiency."
  },
  {
    question: "How do we get started with an AI audit?",
    answer: "You can begin by filling out our System Audit form on our website. We will review your current processes and schedule a consultation to identify the highest-impact areas for automation."
  },
  {
    question: "Are your solutions customizable?",
    answer: "Every solution we build is custom-tailored to your specific operational needs, brand guidelines, and business objectives."
  },
  {
    question: "What makes your approach different from other agencies?",
    answer: "We don't just provide off-the-shelf software; we engineer bespoke, high-performance systems. Our focus is on quantifiable results, premium design, and scalable architecture."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 border-t border-white/5 overflow-x-hidden w-full">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
        <div className="text-center mb-12 md:mb-20 w-full min-w-0">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight text-[#f3f4f6] break-words">
             Frequently asked questions
           </h2>
           <p className="text-sm text-[#9ca3af] break-words">Everything you need to know before getting started.</p>
        </div>

        <div className="flex flex-col gap-4 w-full min-w-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`glass-card transition-all duration-300 min-w-0 overflow-hidden ${openIndex === index ? 'border-emerald-500/40 glow-emerald' : 'hover:border-white/20'}`}
            >
              <button
                className="w-full px-4 sm:px-6 py-5 flex items-center justify-between text-left gap-4 min-w-0"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-sm sm:text-base text-[#f3f4f6] min-w-0 break-words">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-all duration-300 shrink-0 ${openIndex === index ? 'rotate-180 text-emerald-400' : 'text-[#9ca3af]'}`} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-4 sm:px-6 pb-6 text-[#9ca3af] text-sm leading-relaxed text-left break-words">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
