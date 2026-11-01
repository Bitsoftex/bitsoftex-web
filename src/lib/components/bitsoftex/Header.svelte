<script lang="ts">
	import { Menu, X, Sun, Moon, Monitor } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { colorModeConfig, defaultColorMode, type ColorMode } from '#lib/helpers/colorMode.js';
	import { getStoredTheme, setStoredTheme, removeStoredTheme, STORAGE_KEY_THEME } from '#lib/helpers/storageKeys.js';
	let open = $state(false);
	let mode = $state<ColorMode>(defaultColorMode);
	let ready = $state(false);

	function readPreference() {
		try {
			const stored = getStoredTheme();
			mode = stored === 'light' || stored === 'dark' ? stored : defaultColorMode;
		} catch { mode = defaultColorMode; }
	}

	function applyTheme() {
		const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
		document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
	}

	function rotateTheme() {
		mode = colorModeConfig?.respectPrefersColorScheme
			? mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'
			: mode === 'light' ? 'dark' : 'light';
		try {
			if (mode === 'system') removeStoredTheme();
			else setStoredTheme(mode);
		} catch { /* Switching still works when browser storage is unavailable. */ }
		applyTheme();
	}

	onMount(() => {
		readPreference();
		applyTheme();
		ready = true;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onSystemChange = () => { if (mode === 'system') applyTheme(); };
		const onStorageChange = (event: StorageEvent) => {
			if (event.key === STORAGE_KEY_THEME || event.key === null) { readPreference(); applyTheme(); }
		};
		media.addEventListener('change', onSystemChange);
		window.addEventListener('storage', onStorageChange);
		return () => {
			media.removeEventListener('change', onSystemChange);
			window.removeEventListener('storage', onStorageChange);
		};
	});
</script>

<header class="bx-header">
	<div class="bx-wrap bx-header-inner">
		<a class="bx-brand" href="/" aria-label="Bitsoftex home">
			<img src="/img/bitsoftex-logo.webp" width="36" height="36" alt="" />
			<span>Bitsoftex<span class="brand-period" aria-hidden="true"></span></span>
		</a>
		<div class="bx-header-controls">
		{#if !colorModeConfig?.disableSwitch}
			<button class="bx-theme-switch" onclick={rotateTheme} disabled={!ready} aria-label={`Color theme: ${mode}. Switch to ${colorModeConfig?.respectPrefersColorScheme ? mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system' : mode === 'light' ? 'dark' : 'light'} mode`} title={`Theme: ${mode}`}>
				{#if mode === 'system'}<Monitor size={18} />{:else if mode === 'dark'}<Moon size={18} />{:else}<Sun size={18} />{/if}
				<span>{mode === 'system' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light'}</span>
			</button>
		{/if}
		<button class="bx-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onclick={() => open = !open}>
			{#if open}<X size={24} />{:else}<Menu size={24} />{/if}
		</button>
		</div>
		<nav id="main-navigation" class:open aria-label="Main navigation">
			<a href="/#expertise" onclick={() => open = false}>Expertise</a>
			<a href="/#ai-vulnerabilities" onclick={() => open = false}>AI risks</a>
			<a href="/#approach" onclick={() => open = false}>Our approach</a>
			<a href="/#about" onclick={() => open = false}>About us</a>
			<a class="bx-nav-contact" href="#contact" onclick={() => open = false}>Let’s talk <span class="brand-period" aria-hidden="true"></span></a>
		</nav>
	</div>
</header>
