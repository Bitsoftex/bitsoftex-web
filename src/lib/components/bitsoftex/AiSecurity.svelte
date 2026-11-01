<script lang="ts">
	import { ArrowUpRight, Check, ShieldCheck } from '@lucide/svelte';
	import { aiSecurityRisks } from '#data/ai-security.js';
</script>

<section class="bx-section bx-ai-risks" id="ai-vulnerabilities" aria-labelledby="ai-risks-title">
	<div class="bx-wrap">
		<div class="bx-section-intro">
			<div><p class="bx-eyebrow">AI VULNERABILITIES & DEFENCES</p><h2 id="ai-risks-title">Local AI.<br />Security at every layer.</h2></div>
			<p>Local AI can keep inference on your hardware. Protecting it also means checking what you download, what can connect, and what the AI is allowed to do.</p>
		</div>
		<div class="bx-risk-list">
			{#each aiSecurityRisks as risk}
				<article class="bx-risk-card" aria-labelledby={`ai-risk-${risk.number}`}>
					<div class="bx-risk-heading"><span class="bx-risk-number">{risk.number}</span><div><p class="bx-eyebrow">{risk.layer}</p><h3 id={`ai-risk-${risk.number}`}>{risk.title}</h3></div></div>
					<div class="bx-risk-body">
						<div class="bx-risk-explanation"><h4>How it can go wrong</h4><p>{risk.risk}</p></div>
						<div class="bx-risk-fixes"><h4>How to reduce the risk</h4><ul>{#each risk.fixes as fix}<li><Check size={16} aria-hidden="true" /><span>{fix}</span></li>{/each}</ul></div>
					</div>
				</article>
			{/each}
		</div>
		<aside class="bx-risk-takeaway">
			<ShieldCheck size={28} strokeWidth={1.5} aria-hidden="true" />
			<div><h3>Enforce the boundaries outside the model.</h3><p>Prompts, scans, and benchmarks help, but none guarantees safety. Enforce file access, tool permissions, and network restrictions in software the model cannot override. A tool-capable model does not execute actions by itself: the surrounding application decides what actually runs.</p></div>
		</aside>
		<div class="bx-risk-footer"><p>Inspired by Kai’s “Your Local AI Is Not as Private as You Think”, with each risk checked against the original research. Research demonstrations describe specific setups; they do not mean every local model is compromised.</p><a class="bx-text-link" href="mailto:contact@bitsoftex.eu?subject=AI%20security%20assessment">Discuss your AI security <ArrowUpRight size={18} aria-hidden="true" /></a></div>
	</div>
</section>
