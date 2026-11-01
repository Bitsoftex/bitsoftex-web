import { getSiteConfig } from '#lib/helpers/siteConfig.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = new URL('/', getSiteConfig()?.url ?? 'https://bitsoftex.eu').href;
	const escapedUrl = siteUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url><loc>${escapedUrl}</loc></url>
</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
