import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Lenient helpers: the editor can leave any optional field empty without breaking the build.
const str = () => z.string().nullish();
const bool = () => z.boolean().nullish();
const date = () => z.coerce.date().nullish();

const seo = z
  .object({
    meta_title: str(),
    meta_description: str(),
    canonical: str(),
    noindex: bool(),
    og_title: str(),
    og_description: str(),
    og_image: str(),
    og_image_alt: str(),
  })
  .nullish();

const schema = z
  .object({
    page_type: str(),
    custom_jsonld: str(),
  })
  .nullish();

const faq = z
  .object({
    heading: str(),
    intro: str(),
    items: z.array(z.object({ question: z.string(), answer: z.string() })).nullish(),
  })
  .nullish();

const hero = z
  .object({
    eyebrow: str(),
    heading: str(),
    subheading: str(),
    image: str(),
    image_alt: str(),
    primary_label: str(),
    primary_link: str(),
    secondary_label: str(),
    secondary_link: str(),
  })
  .nullish();

const form = z
  .object({
    enabled: bool(),
    heading: str(),
    intro: str(),
    service_name: str(),
    button_label: str(),
  })
  .nullish();

// Content blocks are flexible; each block is rendered by its `type`.
const sections = z.array(z.object({ type: z.string() }).passthrough()).nullish();

const pageFields = {
  title: z.string(),
  seo,
  schema,
  hero,
  sections,
  faq,
  form,
};

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/pages' }),
  schema: z.object(pageFields),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/services' }),
  schema: z.object({
    ...pageFields,
    parent: str(),
    order: z.number().nullish(),
    card_summary: str(),
    draft: bool(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: date(),
    tags: z.array(z.string()).nullish(),
    hero_image: str(),
    hero_image_alt: str(),
    youtube_url: str(),
    featured: bool(),
    draft: bool(),
    seo,
    schema,
    faq,
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client_label: str(),
    industry: str(),
    services: z.array(z.string()).nullish(),
    results: z.array(z.object({ metric: z.string(), value: z.string() })).nullish(),
    duration: str(),
    pubDate: z.coerce.date(),
    hero_image: str(),
    hero_image_alt: str(),
    youtube_url: str(),
    featured: bool(),
    draft: bool(),
    seo,
    schema,
    faq,
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    youtube_url: z.string(),
    duration: str(),
    thumbnail: str(),
    thumbnail_alt: str(),
    tags: z.array(z.string()).nullish(),
    featured: bool(),
    draft: bool(),
    seo,
    schema,
    faq,
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/settings' }),
  schema: z.object({}).passthrough(),
});

export const collections = { pages, services, blog, 'case-studies': caseStudies, videos, settings };
