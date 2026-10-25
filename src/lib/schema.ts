import { SITE, abs, plain, youtubeId, youtubeThumb } from './utils';

export type Crumb = { name: string; path: string };

export function personNode(settings: any) {
  const p = settings.person ?? {};
  const sameAs = [settings.linkedin, ...(p.same_as ?? [])].filter(Boolean);
  return {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: p.name || settings.site_name,
    url: `${SITE}/`,
    jobTitle: p.job_title || undefined,
    description: p.description || undefined,
    image: abs(p.image),
    email: settings.email ? `mailto:${settings.email}` : undefined,
    worksFor: p.works_for ? { '@type': 'Organization', name: p.works_for } : undefined,
    knowsAbout: p.knows_about?.length ? p.knows_about : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteNode(settings: any) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: settings.site_name,
    description: settings.tagline || undefined,
    publisher: { '@id': `${SITE}/#person` },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbNode(url: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqEntities(items?: { question: string; answer: string }[] | null) {
  if (!items?.length) return undefined;
  return items.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: { '@type': 'Answer', text: plain(q.answer) },
  }));
}

/** The WebPage node. If the page has FAQs it is also typed FAQPage with the questions as mainEntity. */
export function webPageNode(opts: {
  url: string;
  name: string;
  description?: string;
  pageType?: string | null;
  crumbs?: Crumb[];
  faq?: { question: string; answer: string }[] | null;
  image?: string;
  about?: object;
}) {
  const base = opts.pageType || 'WebPage';
  const faqs = faqEntities(opts.faq);
  let type: string | string[] = base;
  if (faqs) type = base === 'WebPage' || base === 'FAQPage' ? 'FAQPage' : [base, 'FAQPage'];
  return {
    '@type': type,
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description || undefined,
    isPartOf: { '@id': `${SITE}/#website` },
    inLanguage: 'en-IN',
    primaryImageOfPage: opts.image ? { '@type': 'ImageObject', url: abs(opts.image) } : undefined,
    breadcrumb: opts.crumbs && opts.crumbs.length > 1 ? { '@id': `${opts.url}#breadcrumb` } : undefined,
    about: opts.about,
    mainEntity: faqs,
  };
}

export function serviceNode(url: string, name: string, description: string, serviceType?: string) {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: serviceType || name,
    description,
    url,
    provider: { '@id': `${SITE}/#person` },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
  };
}

export function videoNode(opts: {
  url: string;
  name: string;
  description: string;
  youtube: string;
  uploadDate: Date;
  duration?: string | null;
  thumbnail?: string | null;
}) {
  const id = youtubeId(opts.youtube);
  if (!id) return undefined;
  return {
    '@type': 'VideoObject',
    '@id': `${opts.url}#video`,
    name: opts.name,
    description: opts.description,
    thumbnailUrl: abs(opts.thumbnail) || youtubeThumb(id),
    uploadDate: opts.uploadDate.toISOString(),
    duration: toIsoDuration(opts.duration),
    embedUrl: `https://www.youtube.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
  };
}

/** "8:30" or "1:02:05" or "PT8M30S" -> ISO 8601 duration */
export function toIsoDuration(d?: string | null): string | undefined {
  if (!d) return undefined;
  if (/^PT/i.test(d)) return d.toUpperCase();
  const parts = d.split(':').map((n) => parseInt(n, 10));
  if (parts.some(isNaN)) return undefined;
  while (parts.length < 3) parts.unshift(0);
  const [h, m, s] = parts;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${s ? s + 'S' : ''}` || 'PT0S';
}

/** Parse the editor's custom JSON-LD box. Invalid JSON is skipped (with a build warning) instead of breaking the site. */
export function parseCustom(raw?: string | null, where = ''): object[] {
  if (!raw || !raw.trim()) return [];
  let text = raw.trim();
  // Allow people to paste a full <script type="application/ld+json"> block
  text = text.replace(/^<script[^>]*>/i, '').replace(/<\/script>\s*$/i, '').trim();
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    console.warn(`[schema] Skipped invalid custom JSON-LD on ${where}: ${(e as Error).message}`);
    return [];
  }
}

export function graph(nodes: (object | undefined | null | false)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
