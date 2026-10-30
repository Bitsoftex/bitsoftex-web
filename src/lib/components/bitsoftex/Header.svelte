<script lang="ts">
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	let open = $state(false);
</script>

<header class="bx-header">
	<div class="bx-wrap bx-header-inner">
		<a class="bx-brand" href="/" aria-label="Bitsoftex home">
			<img src="/img/bitsoftex-logo.webp" width="36" height="36" alt="" />
			<span>Bitsoftex<span class="brand-period">.</span></span>
		</a>
		<button class="bx-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onclick={() => open = !open}>
			{#if open}<X size={24} />{:else}<Menu size={24} />{/if}
		</button>
		<nav id="main-navigation" class:open aria-label="Main navigation">
			<a href="/#expertise" onclick={() => open = false}>Expertise</a>
			<a href="/#approach" onclick={() => open = false}>Our approach</a>
			<a href="/#about" onclick={() => open = false}>About us</a>
			<a class="bx-nav-contact" href="mailto:contact@bitsoftex.eu">Let’s talk <ArrowUpRight size={17} /></a>
		</nav>
	</div>
</header>
