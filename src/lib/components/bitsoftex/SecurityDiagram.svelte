<script lang="ts">
	import { Code2, Globe, KeyRound, Cpu, ShieldCheck, Fingerprint, ScanLine, Pause, Play } from '@lucide/svelte';
	let paused = $state(false);
	const inputs = [
		{ icon: Code2, title: 'White-box', text: 'Source code & architecture' },
		{ icon: Globe, title: 'Black-box', text: 'External attack surface' },
		{ icon: KeyRound, title: 'Gray-box', text: 'User accounts & APIs' }
	];
	const checks = [
		{ icon: Fingerprint, title: 'Access controls', text: 'Who can reach what?' },
		{ icon: ScanLine, title: 'AI behaviour', text: 'What can be manipulated?' },
		{ icon: ShieldCheck, title: 'Verified fixes', text: 'Test. Repair. Retest.' }
	];
</script>

<figure class="bx-security-visual security-diagram" class:paused>
	<div class="diagram-heading"><span class="bx-eyebrow">SECURITY ASSESSMENT / FIG. 02</span><button onclick={() => paused = !paused} aria-label={paused ? 'Play security diagram animation' : 'Pause security diagram animation'} aria-pressed={paused}>{#if paused}<Play size={14} />{:else}<Pause size={14} />{/if}<span>{paused ? 'Play' : 'Pause'}</span></button></div>
	<div class="diagram-stage" role="img" aria-label="Three testing approaches examine an AI application: white-box reviews source code, black-box examines external access, and gray-box tests user accounts and APIs. The assessment checks access controls, AI behaviour, and verifies fixes.">
		<svg class="diagram-paths" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
			{#each ['M 220 72 H 330 L 440 200', 'M 220 200 H 440', 'M 220 328 H 330 L 440 200', 'M 560 200 L 670 72 H 780', 'M 560 200 H 780', 'M 560 200 L 670 328 H 780'] as path, i}
				<path class="path-base" d={path} /><path class="path-signal" d={path} style={`--delay: ${i * -.7}s`} />
			{/each}
		</svg>
		<div class="diagram-nodes" aria-hidden="true">{#each inputs as node}<div class="diagram-node"><node.icon size={21} strokeWidth={1.5} /><div><strong>{node.title}</strong><small>{node.text}</small></div></div>{/each}</div>
		<div class="diagram-center" aria-hidden="true">
			<div class="diagram-ring ring-one"></div><div class="diagram-ring ring-two"></div>
			<span class="diagram-boundary">SECURITY BOUNDARY</span>
			<div class="diagram-core"><Cpu size={32} strokeWidth={1.3} /><strong>AI APPLICATION</strong><small>Model + code + tools</small><span class="diagram-scan"></span></div>
			<span class="diagram-center-note">PROBE / OBSERVE / VERIFY</span>
		</div>
		<div class="diagram-nodes diagram-results" aria-hidden="true">{#each checks as node}<div class="diagram-node"><node.icon size={21} strokeWidth={1.5} /><div><strong>{node.title}</strong><small>{node.text}</small></div></div>{/each}</div>
	</div>
	<figcaption><span class="bx-eyebrow">EXAMINE THE WHOLE SYSTEM</span><span>Application code. User access. AI behaviour.</span></figcaption>
</figure>

<style>
	.security-diagram { --diagram-surface: #f3f7fd; --diagram-node: #ffffffed; --diagram-stroke: #aac1df; --diagram-grid: #b8cce3; background: var(--diagram-surface); }
	:global(.dark) .security-diagram { --diagram-surface: #152235; --diagram-node: #1b2d44f2; --diagram-stroke: #4e6b90; --diagram-grid: #526b89; }
	.diagram-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 26px; border-bottom: 1px solid var(--bx-line); }
	.diagram-heading button { display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--bx-muted); border: 1px solid var(--bx-line); border-radius: 4px; padding: 7px 10px; font: 11px monospace; }
	.diagram-stage { position: relative; isolation: isolate; display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 44px; align-items: center; padding: 30px; min-height: 400px; background-image: radial-gradient(var(--diagram-grid) .65px, transparent .65px); background-size: 20px 20px; }
	.diagram-paths { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; fill: none; stroke-width: 1; }
	.path-base { stroke: var(--diagram-stroke); }
	.path-signal { stroke: var(--bx-blue); stroke-width: 2; stroke-dasharray: 14 380; animation: signal-flow 7s linear infinite; animation-delay: var(--delay); }
	.diagram-nodes { display: grid; gap: 34px; }
	.diagram-node { display: flex; align-items: center; gap: 12px; min-height: 72px; padding: 16px; border: 1px solid var(--diagram-stroke); border-radius: 5px; background: var(--diagram-node); box-shadow: 0 5px 18px #102d530a; }
	.diagram-node :global(svg) { color: var(--bx-blue); flex-shrink: 0; }
	.diagram-node strong, .diagram-core strong { display: block; font: 11px monospace; letter-spacing: .7px; text-transform: uppercase; color: var(--bx-ink); }
	.diagram-node small, .diagram-core small { display: block; margin-top: 7px; color: var(--bx-muted); font: 10px monospace; line-height: 1.6; }
	.diagram-center { position: relative; display: flex; justify-content: center; align-items: center; height: 320px; }
	.diagram-ring { position: absolute; width: 280px; height: 280px; border: 1px dashed var(--diagram-stroke); border-radius: 50%; }
	.ring-one { animation: orbit-turn 60s linear infinite; }
	.ring-two { width: 224px; height: 224px; border-style: solid; background: #1766d908; }
	.diagram-boundary, .diagram-center-note { position: absolute; font: 8px monospace; letter-spacing: 1.5px; color: var(--bx-muted); background: var(--diagram-surface); padding: 4px 8px; white-space: nowrap; z-index: 1; }
	.diagram-boundary { top: 15px; }
	.diagram-center-note { bottom: 12px; }
	.diagram-core { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-direction: column; width: 174px; height: 154px; gap: 12px; background: var(--diagram-node); border: 1px solid var(--diagram-stroke); border-radius: 18px; box-shadow: 0 0 0 8px #1766d90a, 0 15px 40px #102d5310; }
	.diagram-core :global(svg) { color: var(--bx-blue); }
	.diagram-core small { margin-top: -6px; }
	.diagram-scan { position: absolute; left: 0; right: 0; height: 36px; top: -36px; background: linear-gradient(transparent, #438cff18); border-bottom: 1px solid #438cff80; animation: scan-pass 6s ease-in-out infinite; }
	.paused .path-signal, .paused .ring-one, .paused .diagram-scan { animation-play-state: paused; }
	@keyframes signal-flow { to { stroke-dashoffset: -788; } }
	@keyframes orbit-turn { to { transform: rotate(360deg); } }
	@keyframes scan-pass { 70%, 100% { transform: translateY(190px); } }
	@media (max-width: 1050px) { .diagram-stage { gap: 20px; padding: 24px; } .diagram-node { gap: 9px; padding: 12px; } .diagram-ring { width: 238px; height: 238px; } .ring-two { width: 200px; height: 200px; } .diagram-boundary { top: 35px; } .diagram-center-note { bottom: 32px; } }
	@media (max-width: 760px) {
		.diagram-heading { padding: 16px; } .diagram-heading .bx-eyebrow { font-size: 8px; letter-spacing: 1px; }
		.diagram-stage { grid-template-columns: 1fr; gap: 0; padding: 24px; }
		.diagram-paths { display: none; } .diagram-nodes { gap: 10px; } .diagram-node { min-height: 64px; padding: 14px; }
		.diagram-center { height: 285px; } .diagram-boundary { top: 15px; } .diagram-center-note { bottom: 14px; }
		.diagram-ring { width: 250px; height: 250px; } .ring-two { width: 204px; height: 204px; }
	}
	@media (prefers-reduced-motion: reduce) { .path-signal, .ring-one, .diagram-scan { animation: none; } .diagram-scan, .diagram-heading button { display: none; } }
</style>
