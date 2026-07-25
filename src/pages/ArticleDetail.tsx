import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StickyNav } from '../components/ui/StickyNav';
import { ArrowLeft } from 'lucide-react';
import { articles } from './Articles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  const currentDate = new Date().toISOString().split('T')[0];

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "datePublished": article.date,
    "dateModified": currentDate,
    "abstract": article.excerpt,
    "author": {
      "@type": "Organization",
      "name": "jkgresults"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col">
      <Helmet>
        <title>{article.title} | jkgresults Insights</title>
        <meta name="description" content={article.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <StickyNav onBookAudit={() => {
        window.location.href = '/#contact';
      }} />

      <main className="flex-grow pt-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back_To_Insights
          </Link>

          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/30 uppercase mb-8">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light mb-12 tracking-tight uppercase leading-tight text-white/90">
            {article.title}
          </h1>

          <div className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-8 font-mono max-w-none">
            <p className="text-xl text-white/80 leading-relaxed mb-12 border-l border-white/20 pl-6">
              {article.excerpt}
            </p>
            <p>
              {article.content}
            </p>
            {/* Extended content for visual completeness */}
            <p>
              By systematically identifying and removing these operational bottlenecks, organizations can recapture significant bandwidth. This allows human operators to focus exclusively on strategic, high-value tasks that drive revenue and innovation, rather than getting bogged down in routine data transfer and communication.
            </p>
            <p>
              The transition requires a comprehensive audit of existing systems to map data flow and identify points of friction. Once mapped, automated workflows can be engineered to seamlessly connect these disparate systems, ensuring data integrity and instantaneous execution of business logic.
            </p>
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
