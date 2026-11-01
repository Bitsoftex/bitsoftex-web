<script lang="ts">
	import { themeBootstrap } from '#lib/helpers/colorMode.js';
	import Header from '#components/bitsoftex/Header.svelte';
	import Footer from '#components/bitsoftex/Footer.svelte';
	import type { Snippet } from 'svelte';
	import { browser } from '$app/env';
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import {
		applyLocale,
		detectLocale,
		getAvailableLocales,
		getFirstSegmentLocale
	} from '#lib/helpers/i18n.js';
	import { getStoredLocale, setStoredLocale } from '#lib/helpers/storageKeys.js';
	import { getSiteConfig } from '#lib/helpers/siteConfig.js';
	import { LL, t } from '#lib/helpers/i18n.js';
	import type { Config } from 'vite-plugin-config';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const __cfg = getSiteConfig();
	const cfg: Partial<Config> = __cfg ?? {};
	const { themeConfig, language, title, favicon } = cfg;
	const _theme = themeConfig ?? {};
	const { metadata } = _theme;
	const metaList = (metadata ?? []) as (
		| { name?: string; content: string; property?: string }
		| { rel: string; href: string }
	)[];

	const enabled = language?.enabled || false;

	// Apply locale: explicit path segment wins (stable during link prefetch), then URL flag + data, then stored, …
	$effect(() => {
		if (!enabled || !browser) return;
		const storedLocale = getStoredLocale();
		const localeCodes = getAvailableLocales();
		const segmentLocale = getFirstSegmentLocale(page.url.pathname);
		const pathLocaleValid = Boolean(segmentLocale && localeCodes.includes(segmentLocale));
		const urlLocaleValid =
			(data as { fromUrl?: boolean; locale?: string }).fromUrl && data.locale && localeCodes.includes(data.locale);
		const storedValid = storedLocale && localeCodes.includes(storedLocale);

		// Priority 1a: locale in the address bar (e.g. /ru/…) — not affected by prefetch of other routes’ `data.locale`
		if (pathLocaleValid && segmentLocale) {
			const finalLocale = segmentLocale;
			setStoredLocale(finalLocale);
			document.documentElement.setAttribute('lang', finalLocale);
			applyLocale(finalLocale);
		}
		// Priority 1b: server said locale came from param (same as 1a when segment exists; covers edge cases)
		else if (urlLocaleValid) {
			const finalLocale = data.locale;
			setStoredLocale(finalLocale);
			document.documentElement.setAttribute('lang', finalLocale);
			applyLocale(finalLocale);
		}
		// Priority 2: stored locale (mota.locale)
		else if (storedValid) {
			const finalLocale = storedLocale!;
			document.documentElement.setAttribute('lang', finalLocale);
			applyLocale(finalLocale);
		}
		// Priority 3: Auto-detect
		else if (language?.autoDetect) {
			detectLocale(navigator.language, localeCodes)
				.then(detectedLocale => {
					const finalLocale =
						detectedLocale && localeCodes.includes(detectedLocale)
							? detectedLocale
							: language?.defaultLocale || 'en';
					setStoredLocale(finalLocale);
					document.documentElement.setAttribute('lang', finalLocale);
					applyLocale(finalLocale);
				})
				.catch(() => {
					const finalLocale = language?.defaultLocale || 'en';
					document.documentElement.setAttribute('lang', finalLocale);
					applyLocale(finalLocale);
				});
		}
		// Priority 4: Default
		else {
			const finalLocale = language?.defaultLocale || 'en';
			document.documentElement.setAttribute('lang', finalLocale);
			applyLocale(finalLocale);
		}
	});

</script>

<svelte:head>
	{@html `<script>${themeBootstrap}</script>`}
	<title>{title ?? ''}</title>
	{#if favicon}
		<link rel="icon" href={favicon} type="image/svg+xml" />
	{/if}
	{#if metaList.length}
		{#each metaList as item}
			{#if 'rel' in item}
				<link rel={item.rel} href={item.href} />
			{:else}
				{@const metaContent = t(item.content, $LL)}
				{#if item.name}
					<meta name={item.name} content={metaContent} />
				{/if}
				{#if item.property}
					<meta property={item.property} content={metaContent} />
				{/if}
			{/if}
		{/each}
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${cfg.url}/#organization`,
				name: 'Bitsoftex',
				url: cfg.url,
				logo: `${cfg.url}/img/bitsoftex-logo.webp`,
				email: 'contact@bitsoftex.eu',
				description: 'AI engineering, penetration testing, AI security audits, reverse engineering and custom software development.',
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Engineering and security services',
					itemListElement: [
						['AI engineering', 'AI model setup, application integration and custom development.'],
						['Penetration testing', 'White-box, black-box and gray-box application security testing.'],
						['AI security audits', 'Prompt injection, data exposure and connected tool permission testing.'],
						['Reverse engineering', 'Software analysis, bug fixes, compatibility investigations and custom integrations.']
					].map(([name, description]) => ({
						'@type': 'Offer',
						itemOffered: { '@type': 'Service', name, description, provider: { '@id': `${cfg.url}/#organization` } }
					}))
				}
			},
			{
				'@type': 'WebSite',
				'@id': `${cfg.url}/#website`,
				name: 'Bitsoftex',
				url: cfg.url,
				inLanguage: 'en',
				publisher: { '@id': `${cfg.url}/#organization` }
			}
		]
	}).replace(/</g, '\u003c')}</script>`}

</svelte:head>

<div class="bx-site" id="top">
	<a class="bx-skip" href="#main-content">Skip to content</a>
	<Header />
	<main id="main-content">
		{@render children()}
	</main>
	<Footer />
</div>
