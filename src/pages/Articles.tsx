import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StickyNav } from '../components/ui/StickyNav';
import { ArrowLeft } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Future of Generative AI in Enterprise Automation",
    excerpt: "Discover how large language models are transforming backend operations, from predictive analytics to automated customer service resolution.",
    date: "2024-10-12",
    readTime: "5 min read",
    content: "Generative AI is no longer just a novelty. For enterprises, it's becoming the backbone of operational efficiency..."
  },
  {
    id: 2,
    title: "Why Traditional Workflows Are Costing You 40% of Your Capacity",
    excerpt: "An in-depth analysis of the 'Efficiency Gap' and how algorithmic task routing can reclaim thousands of hours per year.",
    date: "2024-11-05",
    readTime: "7 min read",
    content: "When we audit enterprise workflows, we consistently find the same bottleneck: human routing of digital tasks..."
  },
  {
    id: 3,
    title: "Building Resilient Data Pipelines with Modern Webhooks",
    excerpt: "Learn the architectural best practices for asynchronous data delivery, ensuring zero data loss during high-volume events.",
    date: "2024-12-01",
    readTime: "6 min read",
    content: "Reliable data transfer is the lifeblood of automation. Moving away from direct database writes to a webhook-first architecture..."
  }
];

export default function ArticlesPage() {
  const currentDate = new Date().toISOString().split('T')[0];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "JKG.RESULTS Automation Insights",
    "url": "https://jkg.results/articles",
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "datePublished": article.date,
      "dateModified": currentDate,
      "abstract": article.excerpt,
      "author": {
        "@type": "Organization",
        "name": "JKG.RESULTS"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col">
      <Helmet>
        <title>Articles & Insights | JKG.RESULTS</title>
        <meta name="description" content="Read our latest insights on AI automation, system architecture, and operational efficiency." />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <StickyNav onBookAudit={() => {}} />

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
              <article key={article.id} className="group cursor-pointer">
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
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-16 px-6 bg-black mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.3em] uppercase flex items-baseline gap-1">
            <span className="glow-white">JKG</span>
            <span className="text-white/70 font-light text-sm tracking-[0.4em]">.RESULTS</span>
          </div>
          <div className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
            LAST_UPDATED: {currentDate} // © 2024 JKG.RESULTS
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
