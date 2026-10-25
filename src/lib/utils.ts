import { marked } from 'marked';
import { getCollection, getEntry } from 'astro:content';

export const SITE = 'https://arjunrsharma.com';

/** Render a markdown string (from the editor) to HTML. */
export function md(text?: string | null): string {
  if (!text) return '';
  return marked.parse(text, { async: false }) as string;
}

/** Render a short markdown string without wrapping <p>. */
export function mdInline(text?: string | null): string {
  if (!text) return '';
  return marked.parseInline(text, { async: false }) as string;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function plain(text?: string | null): string {
  return stripHtml(md(text));
}

/** Get the 11-character YouTube ID from any YouTube link (watch, youtu.be, shorts, embed) or a bare ID. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null;
  const s = url.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Make an absolute URL from a path or return as-is if already absolute. */
export function abs(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, SITE).toString();
}

/** Ensure internal links end with a slash (site uses trailing slashes). */
export function link(href?: string | null): string {
  if (!href) return '#';
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const [p, rest = ''] = href.split(/(?=[?#])/);
  const withSlash = p.endsWith('/') || /\.[a-z0-9]+$/i.test(p) ? p : p + '/';
  return withSlash + rest;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export async function getSettings(): Promise<any> {
  const entry = await getEntry('settings', 'site');
  return entry?.data ?? {};
}

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing page content file: src/content/pages/${id}.yml`);
  return entry.data;
}

const isLive = (e: any) => !e.data.draft;
const byDate = (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getPosts() {
  return (await getCollection('blog', isLive)).sort(byDate);
}
export async function getCaseStudies() {
  return (await getCollection('case-studies', isLive)).sort(byDate);
}
export async function getVideos() {
  return (await getCollection('videos', isLive)).sort(byDate);
}
export async function getServices() {
  const all = await getCollection('services', isLive);
  return all.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export function servicePath(entry: { id: string; data: { parent?: string | null } }): string {
  return entry.data.parent ? `/services/${entry.data.parent}/${entry.id}/` : `/services/${entry.id}/`;
}
