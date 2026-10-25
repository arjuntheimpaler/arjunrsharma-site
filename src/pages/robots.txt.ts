export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /thank-you/\n\nSitemap: https://arjunrsharma.com/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
