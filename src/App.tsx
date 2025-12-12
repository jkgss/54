import { useState } from 'react';
import { Bot, Zap, Network, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      await fetch('https://hook.us2.make.com/4gqypccdyvrz6ke3jbqn7l47djgyul0n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const scrollToConsultation = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => {
        setShowForm(true);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-[0.3em] uppercase">
            JKG<span className="font-light">.AI</span>
          </div>
          <div className="flex gap-10 items-center text-xs tracking-[0.2em]">
            <a href="#features" className="hover:text-white/60 transition-colors">FEATURES</a>
            <a href="#contact" className="hover:text-white/60 transition-colors">CONTACT</a>
            <button
              onClick={scrollToConsultation}
              className="px-6 py-2.5 border border-white/30 hover:border-white hover:border-glow transition-all duration-300"
            >
              BOOK_A_CALL
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 animate-slide-up">
          <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 border border-white/20 text-xs tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-white/70">AI_AUTOMATION_SPECIALISTS</span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light mb-10 tracking-[-0.02em] leading-[0.9]">
            SOVEREIGN
            <br />
            <span className="glow-white font-medium">
              AI_AGENTS
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/50 mb-14 max-w-2xl mx-auto leading-relaxed tracking-wide font-light">
            Transform your business with intelligent automation.
            <br />
            Custom AI chat agents, lead generation, and seamless CRM integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={scrollToConsultation}
              className="group px-10 py-4 bg-white hover:bg-white/90 text-black text-sm tracking-[0.15em] transition-all duration-300 border-glow-hover flex items-center gap-3 font-medium"
            >
              SCHEDULE_CONSULTATION
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-10 py-4 border border-white/30 hover:border-white hover:border-glow text-sm tracking-[0.15em] transition-all duration-300"
            >
              EXPLORE_FEATURES
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              CUTTING_EDGE
              <br />
              <span className="glow-subtle font-medium">CAPABILITIES</span>
            </h2>
            <p className="text-sm text-white/40 tracking-[0.2em] uppercase">Engineered_For_Excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-black">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white/40 transition-all duration-300">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-5 tracking-wide">AI_CHAT_AGENTS</h3>
              <p className="text-white/50 leading-relaxed mb-8 text-sm font-light">
                Deploy intelligent conversational AI that understands context, learns from interactions, and delivers human-like experiences 24/7.
              </p>
              <ul className="space-y-3 text-xs text-white/40 font-light">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Natural_Language_Processing
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Multi_Platform_Integration
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Custom_Training_&_Optimization
                </li>
              </ul>
            </div>

            <div className="group p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-black">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white/40 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-5 tracking-wide">LEAD_GENERATION</h3>
              <p className="text-white/50 leading-relaxed mb-8 text-sm font-light">
                Automate prospect discovery, qualification, and nurturing with AI-powered systems that work while you sleep.
              </p>
              <ul className="space-y-3 text-xs text-white/40 font-light">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Intelligent_Lead_Scoring
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Automated_Outreach_Campaigns
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Real_Time_Analytics_&_Insights
                </li>
              </ul>
            </div>

            <div className="group p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-black">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white/40 transition-all duration-300">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-5 tracking-wide">CRM_INTEGRATION</h3>
              <p className="text-white/50 leading-relaxed mb-8 text-sm font-light">
                Seamlessly connect your AI agents with existing CRM systems for unified data flow and enhanced customer insights.
              </p>
              <ul className="space-y-3 text-xs text-white/40 font-light">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Universal_CRM_Compatibility
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Bidirectional_Sync
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Custom_Workflow_Automation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            READY_TO
            <br />
            <span className="glow-white font-medium">
              TRANSFORM
            </span>
          </h2>
          <p className="text-sm text-white/50 mb-16 tracking-wide font-light">
            Schedule a consultation to discover how AI automation can revolutionize your business operations
          </p>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="group px-12 py-5 bg-white hover:bg-white/90 text-black text-sm tracking-[0.2em] transition-all duration-300 border-glow-hover inline-flex items-center gap-3 font-medium"
            >
              BOOK_YOUR_CALL_NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="max-w-2xl mx-auto animate-slide-up">
              {submitSuccess ? (
                <div className="p-10 border border-white border-glow bg-white/5">
                  <CheckCircle className="w-12 h-12 mx-auto mb-5" />
                  <h3 className="text-xl font-medium mb-2 tracking-wide">MESSAGE_RECEIVED</h3>
                  <p className="text-white/50 text-sm">We'll be in touch shortly to schedule your consultation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium mb-3 text-white/60 tracking-[0.15em]">
                      FULL_NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border border-white/20 focus:border-white focus:border-glow outline-none transition-all text-white text-sm"
                      placeholder="john_smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-3 text-white/60 tracking-[0.15em]">
                      EMAIL_ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border border-white/20 focus:border-white focus:border-glow outline-none transition-all text-white text-sm"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-medium mb-3 text-white/60 tracking-[0.15em]">
                      COMPANY
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border border-white/20 focus:border-white focus:border-glow outline-none transition-all text-white text-sm"
                      placeholder="your_company_inc"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-3 text-white/60 tracking-[0.15em]">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-black border border-white/20 focus:border-white focus:border-glow outline-none transition-all text-white resize-none text-sm"
                      placeholder="tell_us_about_your_project..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-4 bg-white hover:bg-white/90 disabled:bg-white/50 text-black font-medium transition-all duration-300 border-glow-hover text-xs tracking-[0.15em]"
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT_REQUEST'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-8 py-4 border border-white/30 hover:border-white transition-all duration-300 text-xs tracking-[0.15em]"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-semibold tracking-[0.3em] uppercase">
            JKG<span className="font-light">.AI</span>
          </div>
          <div className="text-xs text-white/40 tracking-wider">
            © 2024 JKG.AI — ALL_RIGHTS_RESERVED
          </div>
          <div className="flex gap-8 text-xs tracking-[0.15em]">
            <a href="#" className="text-white/40 hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
