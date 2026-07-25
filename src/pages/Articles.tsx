import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StickyNav } from '../components/ui/StickyNav';
import { ArrowLeft } from 'lucide-react';

export const articles = [
  {
    id: 1,
    slug: "what-is-an-automation-audit",
    title: "What is an Automation Audit?",
    excerpt: "Discover how a comprehensive operational review uncovers hidden bottlenecks and reveals the true efficiency gap in your organization.",
    date: "2024-10-12",
    readTime: "5 min read",
    content: "An automation audit is the critical first step in digital transformation. It involves mapping your existing processes, identifying manual data entry points, and calculating the exact cost of human routing."
  },
  {
    id: 2,
    slug: "how-to-calculate-roi-of-automation",
    title: "How to Calculate the ROI of Automation",
    excerpt: "An in-depth guide to quantifying the financial impact of removing manual tasks and recapturing employee capacity.",
    date: "2024-11-05",
    readTime: "7 min read",
    content: "When evaluating automation investments, the true ROI isn't just in software savings—it's in the recaptured hours of your highest-paid experts. We break down the formula for measuring this impact."
  },
  {
    id: 3,
    slug: "building-resilient-data-pipelines-with-modern-webhooks",
    title: "Building Resilient Data Pipelines with Modern Webhooks",
    excerpt: "Learn the architectural best practices for asynchronous data delivery, ensuring zero data loss during high-volume events.",
    date: "2024-12-01",
    readTime: "6 min read",
    content: "Reliable data transfer is the lifeblood of automation. Moving away from direct database writes to a webhook-first architecture provides scale and reliability."
  }
];

export default function ArticlesPage() {
  const currentDate = new Date().toISOString().split('T')[0];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "jkgresults Automation Insights",
    "url": "https://www.jkgresults.com/articles",
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "datePublished": article.date,
      "dateModified": currentDate,
      "abstract": article.excerpt,
      "author": {
        "@type": "Organization",
        "name": "jkgresults"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col">
      <Helmet>
        <title>Articles & Insights | jkgresults</title>
        <meta name="description" content="Read our latest insights on AI automation, system architecture, and operational efficiency." />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <StickyNav onBookAudit={() => {
        window.location.href = '/#contact';
      }} />

      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return_To_Base
          </Link>

          <h1 className="text-4xl md:text-6xl font-light mb-8 tracking-tight uppercase">
            System_<span className="glow-white font-medium">Insights</span>
          </h1>
          <p className="text-sm text-white/40 mb-20 tracking-[0.3em] uppercase leading-loose border-b border-white/10 pb-12">
            Strategic analysis and technical deep-dives into modern automation architecture.
          </p>

          <div className="flex flex-col gap-12">
            {articles.map((article) => (
              <Link to={`/articles/${article.slug}`} key={article.id} className="block group cursor-pointer">
                <article>
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-light mb-4 group-hover:glow-white transition-all text-white/90">
                    {article.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors flex items-center gap-2">
                    Read_Report <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-16 px-6 bg-black mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.3em] uppercase flex items-baseline gap-1">
            <span className="glow-white">jkgresults</span>
            <span className="text-white/70 font-light text-sm tracking-[0.4em]">.RESULTS</span>
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
            LAST_UPDATED: {currentDate} // © 2024 jkgresults
          </div>
          <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase">
            <Link to="/articles" className="text-white hover:text-white transition-colors">Insights</Link>
            <a href="#" className="text-white/30 hover:text-white transition-colors">Privacy_Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
