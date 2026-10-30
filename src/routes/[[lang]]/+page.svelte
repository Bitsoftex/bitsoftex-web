<script lang="ts">
	import { ArrowUpRight, ArrowRight, Cpu, ShieldCheck, ScanLine, Check, Fingerprint } from '@lucide/svelte';
	const services = [
		{ number: '01', icon: Cpu, tag: 'BUILD & INTEGRATE', title: 'AI model setup', description: 'Turn an AI idea into a working system. We develop and configure models around your use case, then connect them to the software your team depends on.', details: ['Model selection & configuration', 'Data pipelines & application integration', 'Evaluation & deployment planning'], href: 'AI model setup' },
		{ number: '02', icon: ShieldCheck, tag: 'TEST & STRENGTHEN', title: 'AI model security audits', description: 'Understand how your model behaves under pressure. We examine attack surfaces, test abuse scenarios, and help you address the weaknesses that matter.', details: ['Prompt injection & adversarial testing', 'Sensitive data exposure review', 'Prioritised findings & remediation'], href: 'AI model security audit' },
		{ number: '03', icon: ScanLine, tag: 'REVIEW & PROTECT', title: 'OWASP application reviews', description: 'Look beyond the model. We assess your AI-powered application against relevant OWASP guidance, from user input to the tools and systems it can access.', details: ['OWASP-aligned security assessment', 'Access controls & integration boundaries', 'Actionable fixes & verification'], href: 'OWASP application review' }
	];
	const steps = [
		{ number: '01', title: 'Understand the system', text: 'We start with your goals, architecture, data, and the ways people use your application.' },
		{ number: '02', title: 'Define the scope', text: 'Together, we agree on the systems, threat scenarios, and outcomes that need attention.' },
		{ number: '03', title: 'Build. Test. Challenge.', text: 'We configure, integrate, or assess your system with a focus on real-world behaviour.' },
		{ number: '04', title: 'Make the next step clear', text: 'You get practical recommendations, clear priorities, and a path to a stronger system.' }
	];
</script>

<section class="bx-hero">
	<div class="bx-wrap bx-hero-grid">
		<div class="bx-hero-copy">
			<p class="bx-eyebrow"><span class="bx-status-dot"></span> SOFTWARE ENGINEERING / AI SECURITY</p>
			<h1>Build intelligence.<br />Engineer <span>trust.</span></h1>
			<p class="bx-hero-description">AI opens new possibilities.<br />We help you build them securely.</p>
			<p class="bx-hero-detail">Bitsoftex develops software, creates AI models, and tests the systems around them. From the first integration to a deeper security review.</p>
			<div class="bx-hero-actions"><a class="bx-button" href="mailto:contact@bitsoftex.eu">Discuss your project <ArrowUpRight size={19} /></a><a class="bx-text-link" href="#expertise">Explore our expertise <ArrowRight size={18} /></a></div>
			<div class="bx-hero-note"><ShieldCheck size={17} /><span>Thoughtful engineering. A security-first mindset.</span></div>
		</div>
		<div class="bx-system" aria-label="Illustration of an AI model surrounded by application and security boundaries" role="img">
			<div class="bx-system-heading"><span><span class="bx-status-dot"></span> SYSTEM ARCHITECTURE</span><span>FIG. 01</span></div>
			<div class="bx-system-grid">
				<div class="bx-orbit orbit-outer"></div><div class="bx-orbit orbit-inner"></div>
				<div class="bx-axis axis-x"></div><div class="bx-axis axis-y"></div>
				<div class="bx-orbit-label">SECURITY BOUNDARY</div>
				<div class="bx-model-core"><img src="/img/bitsoftex-logo.webp" width="70" height="70" alt="" /><span>AI MODEL</span><small>Intelligence at the core</small></div>
				<div class="bx-node node-data"><span class="bx-node-icon"><Fingerprint size={19} /></span><span>YOUR DATA<small>Defined access</small></span></div>
				<div class="bx-node node-app"><span class="bx-node-icon"><Cpu size={19} /></span><span>APPLICATION<small>Connected systems</small></span></div>
				<div class="bx-node node-security"><span class="bx-node-icon"><ShieldCheck size={19} /></span><span>SECURITY REVIEW<small>Tested boundaries</small></span></div>
				<span class="bx-coordinate coordinate-one">+ 01</span><span class="bx-coordinate coordinate-two">+ 02</span>
			</div>
			<div class="bx-system-bottom"><span>BUILD</span><i></i><span>ASSESS</span><i></i><span>STRENGTHEN</span></div>
		</div>
	</div>
</section>

<div class="bx-disciplines"><div class="bx-wrap"><span>ENGINEERED WITH PURPOSE</span><p>Software development <span>/</span> AI models <span>/</span> Application security</p></div></div>

<section class="bx-section bx-expertise" id="expertise">
	<div class="bx-wrap">
		<div class="bx-section-intro"><div><p class="bx-eyebrow">01 / OUR EXPERTISE</p><h2>Intelligence is powerful.<br />Confidence is engineered.</h2></div><p>Three connected disciplines. One focus: helping you build AI systems you can understand, operate, and trust.</p></div>
		<div class="bx-services">
			{#each services as service}
				<article class="bx-service">
					<div class="bx-service-top"><service.icon size={29} strokeWidth={1.5} /><span>{service.number}</span></div>
					<p class="bx-eyebrow">{service.tag}</p><h3>{service.title}</h3><p class="bx-service-description">{service.description}</p>
					<ul>{#each service.details as detail}<li><Check size={15} />{detail}</li>{/each}</ul>
					<a href={`mailto:contact@bitsoftex.eu?subject=${encodeURIComponent(service.href)}`}>Let’s discuss your needs <ArrowUpRight size={18} /></a>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bx-about" id="about">
	<div class="bx-wrap bx-about-grid">
		<div class="bx-about-mark" aria-hidden="true"><div class="bx-mark-frame"><img src="/img/bitsoftex-logo.webp" width="150" height="150" alt="" /></div><span>BITSOFTEX / SOFTWARE & AI SECURITY</span></div>
		<div><p class="bx-eyebrow">BUILT BY ENGINEERS. DRIVEN BY CURIOSITY.</p><h2>Good software solves problems.<br />Secure software earns trust.</h2><p>Bitsoftex is a software development company creating AI models and the applications that bring them to life.</p><p>We bring development and security into the same conversation. Because understanding how a system is built is the starting point for understanding how to protect it.</p><a class="bx-text-link" href="mailto:contact@bitsoftex.eu">Meet your next engineering partner <ArrowUpRight size={18} /></a></div>
	</div>
</section>

<section class="bx-section bx-approach" id="approach">
	<div class="bx-wrap">
		<div class="bx-section-intro"><div><p class="bx-eyebrow">02 / HOW WE WORK</p><h2>Clarity at every step.</h2></div><p>No black boxes. A focused process, a shared understanding, and practical outcomes for your team.</p></div>
		<div class="bx-steps">{#each steps as step}<article><span class="bx-step-number">{step.number}<span></span></span><h3>{step.title}</h3><p>{step.text}</p></article>{/each}</div>
	</div>
</section>

<section class="bx-contact" id="contact">
	<div class="bx-wrap bx-contact-inner"><div><p class="bx-eyebrow">LET’S BUILD WITH CONFIDENCE</p><h2>Your next AI project.<br />A stronger foundation.</h2><p>Setting up a model or questioning its security?<br />Tell us what you’re working on.</p></div><a class="bx-button bx-button-light" href="mailto:contact@bitsoftex.eu">Start a conversation <ArrowUpRight size={20} /></a></div>
</section>
