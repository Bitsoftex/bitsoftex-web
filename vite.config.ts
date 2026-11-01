import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { Config } from 'vite-plugin-config';
import tailwindcss from '@tailwindcss/vite';

declare const process: { env: Record<string, string | undefined> };

// Language configuration: availableLocales as locale codes; names are read from each locale's language.descriptiveName in src/i18n
const languageConfig = {
	enabled: true,
	icon: 'languages',
	showName: true,
	availableLocales: ['en'],
	defaultLocale: 'en',
	autoDetect: true
};

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://bitsoftex.eu'; // Site domain

// ─── Client config (no server-only keys; used in define and client bundles) ───
const siteConfigClient: Config = {
	title: 'Bitsoftex | AI Engineering & Penetration Testing', // Site title
	url: siteUrl,
	organizationName: 'Bitsoftex', // Organization name - In most cases it's your GitHub username
	projectName: 'bitsoftex-web', // Project name - In most cases it's your repo name
	favicon: '/img/icons/favicon.svg', // Favicon path in static folder
	language: languageConfig,
	themeConfig: {
		navbar: {
			logo: {
				src: '/img/bitsoftex-logo.webp', // Logo path in static folder
				srcDark: '/img/bitsoftex-logo.webp', // Shown in dark theme / auto when navbar is dark (blur=always; transparent=when dark; auto=when user light)
				alt: 'Bitsoftex' // Logo alt attribute
			},
			style: 'blur', // Navbar style (auto, blur, transparent)
			orientation: 'horizontal', // Navbar orientation (horizontal, vertical)
			hideOnScroll: false, // Hide navbar on scroll down
			iconExternal: true, // Icon for external links
			itemsPosition: 'center', // Items position: side (left) or center
			// Use `to` for internal links; use string action keys for connect/disconnect (manualConnect, disconnectWallet).
			items: [
				{ label: 'Expertise', to: '/#expertise', position: 'left' },
				{ label: 'Our approach', to: '/#approach', position: 'left' },
				{ label: 'Contact', href: 'mailto:contact@bitsoftex.eu', position: 'right' }
			]
		},
		footer: {
			style: 'transparent', // Footer style (transparent, light, dark)
			logo: {
				src: '/img/bitsoftex-logo.webp', // Logo path in static folder
				alt: 'Bitsoftex' // Logo alt attribute
			},
			iconExternal: true, // Icon for external links
			links: [
				{
					title: 'Contact',
					items: [
						{ label: 'contact@bitsoftex.eu', to: 'mailto:contact@bitsoftex.eu' }
					]
				}
			],
			liner: [],
			copyright: '© 2017–2026 Bitsoftex. All rights reserved.'
		},
		metadata: [
			{ name: 'description', content: 'AI engineering, white-box, black-box and gray-box penetration testing. Bitsoftex finds security gaps, fixes bugs and reverse engineers software.' }, // Description meta tag
			{ property: 'og:type', content: 'website' },
			{ property: 'og:site_name', content: 'Bitsoftex' },
			{ property: 'og:title', content: 'Bitsoftex | AI Engineering & Penetration Testing' },
			{ property: 'og:description', content: 'AI engineering, ethical penetration testing and reverse engineering. Find weaknesses, fix bugs and build stronger systems.' },
			{ property: 'og:url', content: siteUrl },
			{ property: 'og:image', content: `${siteUrl}/img/bitsoftex-security-social.jpg` },
			{ property: 'og:image:width', content: '1200' },
			{ property: 'og:image:height', content: '630' },
			{ property: 'og:image:alt', content: 'Bitsoftex — AI engineering, penetration testing and reverse engineering' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:image:alt', content: 'AI security inspection illustration with a layered application and neural network core' },
			{ name: 'twitter:title', content: 'Bitsoftex | AI Engineering & Penetration Testing' },
			{ name: 'twitter:description', content: 'AI engineering, ethical penetration testing and reverse engineering. Find weaknesses, fix bugs and build stronger systems.' },
			{ name: 'twitter:image', content: `${siteUrl}/img/bitsoftex-security-social.jpg` },
			{ rel: 'canonical', href: siteUrl },
		],
		colorMode: {
			defaultMode: 'light', // Default color mode
			disableSwitch: false, // Disable color mode switch
			respectPrefersColorScheme: true // Respect browser color scheme preference
		}
	},
	api: {
		enabled: false
	},
	modules: {}
};

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter()
		}),
		VitePWA({
			// Serve the manifest linked in app.html during local development too.
			devOptions: { enabled: true },
			registerType: 'autoUpdate',
			outDir: '.svelte-kit/output/client',
			injectRegister: false,
			includeAssets: ['img/icons/favicon.svg', 'robots.txt', 'img/icons/apple-touch-icon.png'],
			workbox: {
				globPatterns: ['_app/immutable/**/*.{js,css,wasm}'],
				cleanupOutdatedCaches: true,
				skipWaiting: true,
				clientsClaim: true,
				// SvelteKit does not output index.html in precache; disable default fallback to avoid "non-precached-url" error.
				navigateFallback: null
			},
			manifest: {
				name: 'Bitsoftex',
				short_name: 'Bitsoftex',
				description: 'AI models, software development and security audits by Bitsoftex',
				theme_color: '#FFFFFF',
				icons: [
					{
						src: '/img/icons/192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/img/icons/512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/img/icons/maskable-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			}
		}).map((plugin) => {
			// SvelteKit renders app.html itself; manifest and registration are handled
			// by app.html and +layout.svelte rather than Vite's HTML pipeline.
			delete plugin.transformIndexHtml;
			if (plugin.name === 'vite-plugin-pwa:build') {
				// Kit 3 builds server and client environments separately. Generate the
				// service worker only after the client assets have been written.
				plugin.applyToEnvironment = (environment) => environment.name === 'client';
			}
			return plugin;
		})
	],
	define: {
		__SITE_CONFIG__: JSON.stringify(siteConfigClient),
		__DEV_MODE__: process.env.DEV_MODE === '1'
	},
	ssr: {
		noExternal: ['@lucide/svelte']
	}
});
