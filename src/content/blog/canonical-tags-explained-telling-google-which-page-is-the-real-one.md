---
title: 'Canonical Tags Explained: Telling Google Which Page Is the Real One'
description: How canonical tags prevent duplicate content problems, and the mistakes that cause pages to disappear.
pubDate: 2026-09-10
updatedDate: ''
tags:
  - SEO
hero_image: ''
hero_image_alt: ''
youtube_url: ''
faq: null
featured: false
draft: true
seo: null
schema: null
---

A canonical tag is a small piece of code that tells search engines which version of a page is the preferred one when several URLs show the same or very similar content. It looks like a link element in the page's head section that points to the main URL.

## Why duplicate URLs happen

Many sites create duplicates without anyone noticing. The same page can load with and without 'www', with a trailing slash or without, with tracking parameters added, in a printer version, or through filtered and sorted views. To a search engine, each can look like a separate page.

## What the tag does

The canonical tag consolidates signals. It encourages search engines to treat the preferred URL as the main one and to combine the ranking signals of the duplicates onto it. It is a strong hint, though not a command, and search engines may choose differently if signals conflict.

## Best practices

- Give every important page a self-referencing canonical that points to its own clean URL.
- Use absolute URLs with the full domain and protocol.
- Make sure the canonical URL is live, indexable and returns a normal status.
- Keep canonicals consistent with your sitemap and internal links.

## Common mistakes

Pointing every page's canonical to the homepage tells search engines that none of those pages matter. Pointing to a page that redirects or is blocked causes confusion. Combining a canonical to one URL with a noindex on another sends mixed signals. After a migration, check that old canonicals were not carried over.

Review your canonicals whenever you change your site structure or platform. A quick crawl will show pages whose canonical differs from their own address, which is a good list of items to examine.
