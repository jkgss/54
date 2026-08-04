import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'What is an automation audit?',
    answer:
      'An automation audit maps how work actually moves through your tools and team, finds repetitive handoffs, and ranks the highest-ROI automations to build first.',
  },
  {
    question: 'How long does implementation usually take?',
    answer:
      'Focused workflow automations often ship in 2–4 weeks. Broader multi-system builds typically take 6–12 weeks from audit to stable production.',
  },
  {
    question: 'Do we need in-house engineers to use what you build?',
    answer:
      'No. We design for operators. Your team uses clear interfaces and trusted workflows; we handle the orchestration, integrations, and maintenance path.',
  },
  {
    question: 'How do you handle data security?',
    answer:
      'We use encrypted transport, least-privilege access, and isolated processing. Client data is not used to train public models without explicit written consent.',
  },
  {
    question: 'Can this connect to our existing CRM and tools?',
    answer:
      'Yes. Most modern CRMs, inboxes, calendars, and ops tools connect through APIs and webhooks. The audit identifies the cleanest integration path for your stack.',
  },
  {
    question: 'What ROI should we expect?',
    answer:
      'Teams commonly reclaim a large share of repetitive admin hours within the first quarter. Exact impact depends on volume, hourly cost, and how stable the process is.',
  },
  {
    question: 'Do you support systems after launch?',
    answer:
      'Yes. We offer ongoing monitoring, iteration, and support so automations keep working as your tools and volume change.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Submit the free audit form on this site with your team size, main bottleneck, and urgency. We review it and follow up—typically within 24 hours.',
  },
  {
    question: 'Are solutions customized?',
    answer:
      'Always. We do not drop in generic templates as the product. Every workflow is tailored to your operations, tools, and decision rules.',
  },
  {
    question: 'How is jkgresults different from a typical agency?',
    answer:
      'We prioritize measurable capacity gains over vanity dashboards. The engagement starts with an audit, then a clear build path you can accept, defer, or run internally.',
  },
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
