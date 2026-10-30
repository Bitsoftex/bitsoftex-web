<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { getSiteConfig } from '#lib/helpers/siteConfig.js';

	const config = getSiteConfig();
	const footer = config?.themeConfig?.footer;
	const contact = footer?.links?.flatMap((section) => section.items ?? [])
		.find((item) => (item.to ?? item.href)?.startsWith('mailto:'));
</script>

<footer class="bx-footer">
	<div class="bx-wrap">
		<div class="bx-footer-top">
			<div>
				<a class="bx-brand" href="/" aria-label="Bitsoftex home">
					{#if footer?.logo}<img src={footer.logo.src} width="36" height="36" alt="" />{/if}
					<span>{config?.organizationName}<span class="brand-period">.</span></span>
				</a>
				<p>Intelligent software. Security at the core.</p>
			</div>
			{#if contact}
				<div class="bx-footer-contact"><span class="bx-eyebrow">START A CONVERSATION</span><a href={contact.to ?? contact.href}>{contact.label} <ArrowUpRight size={20} /></a></div>
			{/if}
		</div>
		<div class="bx-footer-bottom"><span>{footer?.copyright}</span><span>Software development & AI security</span><a href="#top">Back to top ↑</a></div>
	</div>
</footer>
