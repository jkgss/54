import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { StickyNav } from '../components/ui/StickyNav';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  absoluteUrl,
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from '../lib/seo';

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateModified: string;
  readTime: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    id: 1,
    slug: 'what-is-an-automation-audit',
    title: 'What is an Automation Audit?',
    excerpt:
      'A practical overview of how an automation audit maps real workflows, finds friction, and shows where AI systems reclaim the most time.',
    date: '2024-10-12',
    dateModified: '2026-08-02',
    readTime: '8 min read',
    sections: [
      {
        paragraphs: [
          'An automation audit is a structured review of how work actually moves through your business—not how the org chart says it should. The goal is simple: find repetitive, high-cost handoffs and quantify what you gain by removing them.',
          'For most teams, the biggest leaks are not dramatic failures. They are quiet ones: copying data between tools, chasing status updates, qualifying the same lead types by hand, or rebuilding the same report every week.',
        ],
      },
      {
        heading: 'What the audit looks at',
        paragraphs: [
          'A useful audit starts with intake: which tools you use, who owns each step, and where work waits. We map the path from first customer touch to closed outcome, then mark every manual transfer, dual entry, and approval bottleneck.',
          'Next we score each bottleneck by volume, cost of delay, and error risk. That ranking keeps the roadmap honest—so you do not automate the loudest complaint instead of the most expensive one.',
        ],
      },
      {
        heading: 'What you get from jkgresults',
        paragraphs: [
          'Our free automation audit produces a clear picture of the efficiency gap: hours spent on work that should not need a human, and a prioritized list of automations worth building first.',
          'You leave with enough clarity to decide whether to build with us, handle it internally, or wait. No pressure close—just a map of where AI systems can reclaim capacity.',
        ],
      },
      {
        heading: 'How to get started',
        paragraphs: [
          'Request an audit on our homepage. Share team size, your primary bottleneck, and urgency. We review the details and follow up—usually within 24 hours—to walk through findings and next steps.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'how-to-calculate-roi-of-automation',
    title: 'How to Calculate the ROI of Automation',
    excerpt:
      'A straightforward way to measure automation ROI using reclaimed hours, fully loaded labor cost, and realistic efficiency gains—not vanity software savings.',
    date: '2024-11-05',
    dateModified: '2026-08-02',
    readTime: '9 min read',
    sections: [
      {
        paragraphs: [
          'Automation ROI is often sold as “software replaces headcount.” In practice, the better frame is capacity: how many hours return to revenue, delivery, or customer work that currently drown in admin.',
          'If you only count license fees, you will underinvest. If you invent magical savings, you will overpromise. The middle path is a transparent hours model.',
        ],
      },
      {
        heading: 'A simple ROI formula',
        paragraphs: [
          'Start with three numbers: people touching the process, manual hours per person per week, and a fully loaded hourly rate (salary + burden). Multiply hours reclaimed by rate to estimate annual impact.',
          'Example: 10 people × 8 manual hours/week × 80% automatable × 48 working weeks × $65/hour ≈ meaningful six-figure capacity—even before error reduction or faster response times.',
        ],
      },
      {
        heading: 'What to include (and exclude)',
        paragraphs: [
          'Include: repetitive intake, CRM syncing, document routing, status chasing, and report assembly. Exclude: judgment-heavy work, one-off projects, and anything that still needs human accountability.',
          'Also model soft gains carefully—faster lead follow-up and fewer data errors matter, but keep them as upside unless you can measure them.',
        ],
      },
      {
        heading: 'Turning ROI into a decision',
        paragraphs: [
          'Compare first-year impact against build cost and ongoing maintenance. If payback is measured in months and the workflow is stable, automation usually wins. If the process still changes weekly, fix the process first.',
          'Use our on-site ROI calculator for a first pass, then validate assumptions in an automation audit before you commit to a build.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'building-resilient-data-pipelines-with-modern-webhooks',
    title: 'Building Resilient Data Pipelines with Modern Webhooks',
    excerpt:
      'Why webhook-first architecture beats brittle database syncs—and how retries, idempotency, and clear contracts keep automation reliable at volume.',
    date: '2024-12-01',
    dateModified: '2026-08-02',
    readTime: '8 min read',
    sections: [
      {
        paragraphs: [
          'Reliable automation depends on reliable data movement. When systems write directly into each other’s databases—or poll APIs on fragile schedules—one outage cascades into missing leads, duplicate records, and silent failure.',
          'A webhook-first pipeline flips that model: when something happens, the source system notifies subscribers immediately with a signed, structured event.',
        ],
      },
      {
        heading: 'Core design principles',
        paragraphs: [
          'Use clear event contracts (what fields mean, when they fire). Make consumers idempotent so retries do not create duplicates. Log delivery and failures where operators can see them.',
          'Prefer asynchronous handoffs for high volume. Let the webhook acknowledge quickly, then process downstream work in a queue or workflow engine so spikes do not take down your app.',
        ],
      },
      {
        heading: 'Where this shows up for operators',
        paragraphs: [
          'Form submits, payment confirmations, CRM stage changes, and calendar bookings are natural webhook events. Wired correctly, they trigger follow-up SMS, enrichment, routing, and reporting without a human copying data.',
          'This is the backbone of the systems we build at jkgresults: intake → AI processing → tool orchestration → human review only where it adds judgment.',
        ],
      },
      {
        heading: 'Getting it right the first time',
        paragraphs: [
          'Before you connect five more tools, audit the events you already have and the failures you ignore. Resilience is less about more integrations and more about trustworthy delivery between the ones that matter.',
        ],
      },
    ],
  },
];

export default function ArticlesPage() {
  const description =
    'Insights on automation audits, ROI, and resilient webhook pipelines from jkgresults.';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'jkgresults Automation Insights',
    url: absoluteUrl('/articles'),
    publisher: {
      '@type': 'Organization',
      name: 'jkgresults',
      url: SITE_URL,
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      datePublished: article.date,
      dateModified: article.dateModified,
      description: article.excerpt,
      url: absoluteUrl(`/articles/${article.slug}`),
      author: {
        '@type': 'Organization',
        name: 'jkgresults',
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white flex flex-col">
      <Helmet>
        <title>Articles & Insights | jkgresults</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl('/articles')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/articles')} />
        <meta property="og:title" content="Articles & Insights | jkgresults" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
        <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Articles & Insights | jkgresults" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <StickyNav
        onBookAudit={() => {
          window.location.href = '/#contact';
        }}
      />

      <main className="flex-grow pt-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-[#9ca3af] hover:text-white mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#10b981] mb-3">Insights</p>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#f3f4f6] mb-4">
            Automation insights
          </h1>
          <p className="text-sm sm:text-base text-[#9ca3af] mb-14 max-w-2xl leading-relaxed border-b border-white/[0.08] pb-10">
            Practical guides on audits, ROI, and reliable data pipelines—written for operators who want clarity before they build.
          </p>

          <div className="flex flex-col gap-8">
            {articles.map((article) => (
              <Link to={`/articles/${article.slug}`} key={article.id} className="block group">
                <article className="glass-card p-6 sm:p-8 hover:border-emerald-500/30 transition-all glow-emerald">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#9ca3af] mb-4">
                    <span>Published {article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Updated {article.dateModified}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-medium text-[#f3f4f6] mb-3 group-hover:text-white">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-5">{article.excerpt}</p>
                  <div className="text-xs font-semibold text-[#10b981] inline-flex items-center gap-2">
                    Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-12 px-4 sm:px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-sm font-semibold text-white">jkgresults</span>
          </div>
          <p className="text-xs text-[#9ca3af]">
            Last updated {articles.reduce((latest, a) => (a.dateModified > latest ? a.dateModified : latest), articles[0].dateModified)} · © jkgresults
          </p>
          <Link to="/#contact" className="text-xs text-[#9ca3af] hover:text-white transition-colors">
            Request an audit →
          </Link>
        </div>
      </footer>
    </div>
  );
}
