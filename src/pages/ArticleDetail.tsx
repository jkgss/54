import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StickyNav } from '../components/ui/StickyNav';
import { ArrowLeft } from 'lucide-react';
import { articles } from './Articles';
import { absoluteUrl, OG_IMAGE, SITE_URL } from '../lib/seo';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const url = absoluteUrl(`/articles/${article.slug}`);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization',
      name: 'jkgresults',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'jkgresults',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: [OG_IMAGE],
    url,
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col">
      <Helmet>
        <title>{article.title} | jkgresults</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={article.dateModified} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <StickyNav
        onBookAudit={() => {
          window.location.href = '/#contact';
        }}
      />

      <main className="flex-grow pt-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs text-[#9ca3af] hover:text-white mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to insights
          </Link>

          <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#10b981] mb-3">Article</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9ca3af] mb-6">
            <span>Published {article.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Updated {article.dateModified}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#f3f4f6] mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="h-[3px] w-14 bg-[#10b981] rounded-full mb-8" />

          <p className="text-lg text-[#9ca3af] leading-relaxed mb-12 border-l-2 border-[#10b981]/40 pl-5">
            {article.excerpt}
          </p>

          <div className="space-y-10 text-[15px] leading-relaxed text-[#9ca3af]">
            {article.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="text-xl font-medium text-[#f3f4f6] mb-4">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-14 p-6 glass-card">
            <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#10b981] mb-2">Next step</p>
            <p className="text-sm text-[#9ca3af] mb-5">
              Ready to quantify your own efficiency gap? Request a free automation audit.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-lg bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Request an Automation Audit →
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-12 px-4 sm:px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-sm font-semibold text-white">jkgresults</span>
          </div>
          <p className="text-xs text-[#9ca3af]">Updated {article.dateModified} · © jkgresults</p>
          <Link to="/articles" className="text-xs text-[#9ca3af] hover:text-white transition-colors">
            More insights →
          </Link>
        </div>
      </footer>
    </div>
  );
}
