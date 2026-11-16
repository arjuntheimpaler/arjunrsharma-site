---
title: 301 vs 302 Redirects, and How to Handle Them During a Site Migration
description: Which redirect to use, why redirect chains hurt, and the migration steps that protect your rankings.
pubDate: 2026-08-31
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

A redirect sends visitors and search engines from one URL to another. Used properly, redirects preserve rankings when pages move. Used carelessly, they cause lost traffic, slow pages and confused crawlers.

## 301 and 302

A 301 redirect signals a permanent move. Search engines treat the new URL as the replacement and pass most ranking signals to it over time. A 302 redirect signals a temporary move, so search engines may keep the original URL in the index. Use 301 for permanent changes such as renamed pages, domain changes and HTTPS moves. Use 302 only when you really intend to bring the original back.

## Redirect chains and loops

A chain happens when A redirects to B, which redirects to C. Each hop adds delay and wastes crawl effort, and long chains risk being dropped. A loop sends crawlers around in circles. Always redirect the old URL straight to the final destination, and update internal links to point directly to the final URL.

## Redirects during a migration

Whenever you redesign, change platforms or move domains, URLs usually change. Rankings can fall sharply if the old addresses are not handled. Follow a plan.

- Before launch, crawl the existing site and list every URL, along with its traffic, links and rankings.
- Map each old URL to its closest equivalent on the new site. Avoid sending everything to the homepage.
- Implement 301 redirects at the server level where possible.
- Keep the same URLs wherever they do not need to change.
- After launch, crawl the old URL list to confirm each one lands on a live page in a single hop.
- Update your sitemap, canonical tags and internal links, and submit the new sitemap in Search Console.

## Watch after launch

Monitor Search Console for crawl errors, coverage changes and shifts in clicks over the following weeks. Keep the redirects in place for at least a year, and ideally longer, as search engines and external links catch up.

A careful redirect map is one of the most valuable hours of work in any migration.
