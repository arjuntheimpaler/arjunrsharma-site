import rss from '@astrojs/rss';
import { getPosts, getSettings } from '../lib/utils';

export async function GET(context: any) {
  const settings = await getSettings();
  const posts = await getPosts();
  return rss({
    title: settings.site_name || 'Arjun R Sharma',
    description: settings.tagline || '',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
    })),
  });
}
