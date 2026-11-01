import { getSiteConfig } from './siteConfig.js';
import { STORAGE_KEY_THEME } from './storageKeys.js';

export type ColorMode = 'system' | 'light' | 'dark';
export const colorModeConfig = getSiteConfig()?.themeConfig?.colorMode;
export const defaultColorMode: ColorMode = colorModeConfig?.respectPrefersColorScheme
	? 'system'
	: colorModeConfig?.defaultMode ?? 'light';

// Run in the document head before the page paints, using the same MOTA preference as the switch.
export const themeBootstrap = `(() => {
	let mode = ${JSON.stringify(defaultColorMode)};
	try {
		const stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY_THEME)}) ?? localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') mode = stored;
	} catch {}
	const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.classList.toggle('dark', dark);
	document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();`;
