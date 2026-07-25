import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Lightbulb, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Understand your operation',
    description:
      "We start by mapping how your team actually works—not how you think it should work. We look at what's manual, what's repetitive, and where the friction lives.",
  },
  {
    icon: SlidersHorizontal,
    title: "Identify what's worth automating",
    description:
      "Not everything should be automated. We identify what will actually save time and reduce errors, versus what would create more complexity than it's worth.",
  },
  {
    icon: Lightbulb,
    title: 'Design a clear path forward',
    description:
      "You'll get a straightforward breakdown of what can be built, what it involves, and what the impact would be. No jargon, no inflated promises.",
  },
  {
    icon: ArrowRight,
    title: 'You decide what makes sense',
    description:
      "There's no pressure to move forward with us. You'll have everything you need to make an informed decision—whether that's building with us, doing it internally, or waiting.",
  },
];

export const AutomationIndex = () => {
  return (
    <section id="about" className="py-16 md:py-32 px-4 sm:px-6 overflow-x-hidden w-full">
      <div className="w-full max-w-4xl mx-auto min-w-0">
        <div className="mb-12 md:mb-16 w-full min-w-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight text-[#f3f4f6] break-words">
            How we approach this
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] break-words">
            A systematic framework to identify and build high-impact automation.
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full min-w-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative w-full min-w-0"
            >
              <span className="absolute -top-2 -left-1 sm:-left-6 text-[10px] font-semibold text-emerald-400/80 tracking-widest">
                0{index + 1}
              </span>
              <div className="glass-card hover:border-emerald-500/40 hover:glow-emerald transition-all duration-500 p-5 sm:p-7 flex items-start gap-5 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-base sm:text-lg font-medium text-[#f3f4f6] mb-2 break-words">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed break-words">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
