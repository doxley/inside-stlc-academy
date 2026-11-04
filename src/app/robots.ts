import type { MetadataRoute } from 'next';

const SITE = 'https://www.insidestlcacademy.com';

// Allow public marketing/course pages; keep the app, admin, API and auth
// areas out of search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/admin',
        '/api',
        '/auth',
        '/payment',
        '/certificate',
        '/update-password',
        '/login',
        '/register',
        '/reset-password',
      ],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
