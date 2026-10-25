# arjunrsharma.com

Your website (built with Astro) plus its editor (Sveltia CMS) at **arjunrsharma.com/admin**.

---

## One-time setup (about 20 minutes)

### Step 1: Put the site on GitHub (5 min)

1. Sign in to GitHub as **arjuntheimpaler**.
2. Click **+** (top right) → **New repository**.
3. Name it exactly **`arjunrsharma-site`**. The editor is configured for this exact name.
4. Choose Public or Private (both work). **Don't** tick "Add a README". Click **Create repository**.
5. On the next page, click **"uploading an existing file"**.
6. Unzip this ZIP. Open the `arjunrsharma-site` folder, select **everything inside it**, and drag it onto the GitHub page.
   - On a Mac, press `Cmd + Shift + .` in Finder first so hidden files like `.gitignore` show and get included.
7. Click **Commit changes**.

### Step 2: Connect Netlify to GitHub (5 min)

Your domain and live site stay the same. Netlify just starts building from GitHub instead of from a ZIP.

1. In Netlify, open your existing **arjunrsharma.com** project (Netlify now calls sites "projects").
2. Go to **Project configuration → Build & deploy → Continuous deployment → Link repository**.
3. Choose **GitHub**, authorise Netlify if it asks, and pick **arjunrsharma-site**.
4. The build settings fill in automatically from `netlify.toml` (build command `npm run build`, publish directory `dist`). Click **Deploy**.
5. Wait about a minute, then open arjunrsharma.com. The new design should be live.

### Step 3: Turn on the enquiry forms (2 min)

1. In Netlify, open **Forms** (left menu) → **Enable form detection**.
2. Go to **Deploys → Trigger deploy → Deploy site** so Netlify picks up the form.
3. To get each enquiry by email: **Project configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**, then enter your email.

All submissions also appear under **Forms → enquiry**. Each one shows which service page it came from.

### Step 4: Let yourself log in to the editor (5 min)

**a) Create a GitHub OAuth app**
1. GitHub → your profile picture → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - Application name: `arjunrsharma.com editor`
   - Homepage URL: `https://arjunrsharma.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. Click **Register application**. Copy the **Client ID**. Click **Generate a new client secret** and copy that too.

**b) Give the keys to Netlify**
1. Netlify → your project → **Project configuration → Security → OAuth**.
2. Under **Authentication providers**, click **Install provider** → **GitHub**. Paste the Client ID and Client secret, then **Install**.

**c) Log in**
Go to **arjunrsharma.com/admin** → **Sign In with GitHub**. Done.

> Backup login: on the same screen, **Sign In Using Access Token** works with a GitHub personal access token that has "Contents: Read and write" access to this repository.

---

## Day-to-day: using the editor

Go to **arjunrsharma.com/admin**, edit, and click **Save**. The site rebuilds and updates in about a minute.

| What you want to do | Where |
|---|---|
| Write a blog post | **Blog → New** |
| Add a video | **Videos → New**, then paste the YouTube link |
| Add a case study | **Case Studies → New** |
| Edit Home, About, FAQ, Contact, or the Blog / Case Studies / Videos landing pages | **Pages** |
| Edit or add a service page | **Services** (choose a parent to place it under Organic Search) |
| Change the menu, footer, email, LinkedIn, Google verification, analytics | **Site settings** |

**Every page has:**
- **Header section**: heading, intro, image + alt text, buttons
- **Page content (sections)**: add, remove and drag to reorder. Types: Text, Text + image, Image, Cards, Service cards, Numbered steps, Accordion (dropdowns), Numbers/results, Brand names, Timeline, YouTube video, Latest posts/videos/case studies, Call to action, Custom HTML
- **FAQ section**: FAQ schema is added automatically
- **Enquiry form**: turn on or off per page
- **SEO & social sharing**: meta title, meta description, canonical, noindex, OG title, OG description, OG image + alt
- **Schema**: page type, plus a box for your own custom JSON-LD

**Added automatically on every page:** WebSite + Person schema, breadcrumbs (visible and as schema), BlogPosting / Service / VideoObject schema where relevant, sitemap (`/sitemap-index.xml`), `robots.txt`, RSS (`/rss.xml`), canonical tags.

**Drafts:** tick **Draft** to save something without publishing it. There's an example draft in Case Studies and in Videos to show the format. Replace them or delete them.

**Netlify free plan:** every Save triggers one deploy, and the free plan allows roughly 20 deploys a month. Finish all your edits to a post, then save once, rather than saving every few minutes.

---

## Your URLs

- `/` Home · `/about/` · `/faq/` · `/contact/`
- `/services/` → `/services/organic-search/` → `/seo/`, `/aeo/`, `/geo/`, `/local-seo/` · `/services/personal-branding/`
- `/blog/` · `/case-studies/` · `/videos/`
- Old blog post URLs are unchanged. `/work` now permanently redirects (301) to `/case-studies/`.

## For developers

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

Content lives in `src/content/` (YAML for pages, services and settings; Markdown for blog, case studies and videos). The editor config is `public/admin/config.yml`.
