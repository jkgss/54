/** Canonical site origin for SEO / OG / sitemap alignment. */
export const SITE_URL = 'https://www.jkgresults.com';

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path = '/') => {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const defaultDescription =
  'Quantifying the Efficiency Gap. We build enterprise AI automation workflows to reclaim lost capacity.';
