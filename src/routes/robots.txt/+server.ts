import { getSiteConfig } from '#lib/helpers/siteConfig.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const sitemap = new URL('/sitemap.xml', getSiteConfig()?.url ?? 'https://bitsoftex.eu').href;
	return new Response(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemap}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
