---
title: 'Robots.txt and AI Crawlers: What to Allow and What to Block'
description: Different AI bots do different jobs. Here is how to make an informed decision about access.
pubDate: 2026-09-28
updatedDate: ''
tags:
  - GEO
hero_image: ''
hero_image_alt: ''
youtube_url: ''
faq: null
featured: false
draft: true
seo: null
schema: null
---

Your robots.txt file tells crawlers which parts of your site they may access. AI companies run several crawlers with different purposes, and treating them as one group can lead to choices you did not intend.

## The common categories

- Training crawlers collect content that may be used to train models. Examples include GPTBot from OpenAI and ClaudeBot from Anthropic.
- Search crawlers index content so it can be shown and cited in AI search features. Examples include OAI-SearchBot and PerplexityBot.
- User-initiated fetchers retrieve a page when a person asks the AI to look at it. An example is ChatGPT-User.
- Google-Extended is a control token that governs whether content may be used for training and grounding of Google's Gemini models. It does not affect inclusion in Google Search or AI Overviews.

Check each company's current documentation, since names and behaviors change.

## How to decide

If your goal is visibility in AI answers, allow the search-related crawlers. Whether to allow training crawlers is a business choice. Some businesses welcome the exposure. Others, particularly publishers with proprietary content, prefer to block training use.

## Check for accidental blocking

Many sites block AI bots unknowingly through a security plugin, CDN rule or host setting, or through blanket rules. Review your robots.txt file and your firewall settings, and test whether the bots you want can reach your pages.

## Keep in mind

Robots.txt is a request that well-behaved crawlers follow, not a security measure. Do not rely on it to protect sensitive content. Revisit your settings every few months as the landscape evolves.
