<script lang="ts">
	import SecurityDiagram from '#components/bitsoftex/SecurityDiagram.svelte';
	import AiSecurity from '#components/bitsoftex/AiSecurity.svelte';
	import { ArrowUpRight, ArrowRight, Cpu, ShieldCheck, ScanLine, Check, Fingerprint, Mail } from '@lucide/svelte';
	const services = [
		{ number: '01', icon: Cpu, tag: 'BUILD & INTEGRATE', title: 'AI model setup', description: 'Turn an AI idea into a working system. We develop and configure models around your use case, then connect them to the software your team depends on.', details: ['Model selection & configuration', 'Data pipelines & application integration', 'Custom engineering & bug fixes'], href: 'AI model setup' },
		{ number: '02', icon: ShieldCheck, tag: 'TEST & STRENGTHEN', title: 'AI model security audits', description: 'Understand how your model behaves under pressure. We examine attack surfaces, test abuse scenarios, and help you address the weaknesses that matter.', details: ['Prompt injection & adversarial testing', 'Sensitive data exposure review', 'Prioritised findings & remediation'], href: 'AI model security audit' },
		{ number: '03', icon: ScanLine, tag: 'REVIEW & PROTECT', title: 'OWASP application reviews', description: 'Look beyond the model. We assess your AI-powered application against relevant OWASP guidance, from user input to the tools and systems it can access.', details: ['OWASP-aligned security assessment', 'Authentication, authorization & API testing', 'Actionable fixes & verification'], href: 'OWASP application review' }
	];
	const testingApproaches = [
		{ number: '01', title: 'White-box testing', text: 'You provide source code, system architecture, API specifications, and test credentials. We trace how the system works internally, reviewing transaction signing, cryptographic key handling, authentication, and business logic. This helps us find weaknesses that may be difficult to observe from the outside.' },
		{ number: '02', title: 'Black-box testing', text: 'You provide only the application URL. We test what an external attacker could discover and access, including exposed endpoints, login flows, and unintended data exposure. This shows how your application behaves when the tester has no internal knowledge or supplied account.' },
		{ number: '03', title: 'Gray-box testing', text: 'You provide a user account and API documentation, without source code. We test authorization—what each user is allowed to do—alongside transaction handling and privilege escalation: whether someone can gain access or powers beyond their assigned role.' }
	];
	const steps = [
		{ number: '01', title: 'Set the boundaries', text: 'We agree on what we can test, the access we need, and how to protect your live services. Every test starts with your permission.' },
		{ number: '02', title: 'Think like an attacker', text: 'We explore entry points, challenge login and access controls, and test whether AI can be tricked into revealing data or misusing connected tools.' },
		{ number: '03', title: 'Show the real impact', text: 'We carefully validate weaknesses and show what they could allow, such as viewing another user’s records or changing a transaction. You get evidence and clear priorities.' },
		{ number: '04', title: 'Fix it. Test it again.', text: 'We help your team close the gaps or implement fixes ourselves. Then we repeat the tests to check that the original weakness has been resolved.' }
	];
</script>

<section class="bx-hero">
	<div class="bx-wrap bx-hero-grid">
		<div class="bx-hero-copy">
			<p class="bx-eyebrow"><span class="bx-status-dot" aria-hidden="true"></span> SOFTWARE ENGINEERING / AI SECURITY</p>
			<h1>Build intelligence.<br />Engineer <span>trust.</span></h1>
			<p class="bx-hero-description">AI opens new possibilities.<br />We help you build them securely.</p>
			<p class="bx-hero-detail">Bitsoftex develops software, creates AI models, and tests the systems around them. We combine AI engineering, penetration testing, and reverse engineering to find weaknesses, fix bugs, and deliver custom solutions.</p>
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
		<div class="bx-section-intro"><div><p class="bx-eyebrow">01 / OUR EXPERTISE</p><h2>Intelligence is powerful.<br />Confidence is engineered.</h2></div><p>AI engineering and hands-on security testing, from model behaviour to application code, APIs, and the systems they connect to.</p></div>
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

<section class="bx-section" id="penetration-testing">
	<div class="bx-wrap">
		<div class="bx-section-intro"><div><p class="bx-eyebrow">PENETRATION TESTING</p><h2>Three ways to examine<br />your security.</h2></div><p>We perform white-box, black-box, and gray-box testing. Each approach gives us a different level of access to simulate attacks and identify weaknesses within an agreed scope.</p></div>
		<SecurityDiagram />
		<div class="bx-services">
			{#each testingApproaches as approach}
				<article class="bx-service">
					<div class="bx-service-top"><ShieldCheck size={29} strokeWidth={1.5} /><span>{approach.number}</span></div>
					<h3>{approach.title}</h3><p class="bx-service-description">{approach.text}</p>
				</article>
			{/each}
		</div>
		<aside class="bx-ai-testing" aria-labelledby="ai-testing-title">
			<div class="bx-ai-testing-intro">
				<Cpu size={25} strokeWidth={1.5} aria-hidden="true" />
				<p class="bx-eyebrow">AI SECURITY IN PRACTICE</p>
				<h3 id="ai-testing-title">What if someone tries to trick your AI?</h3>
				<p>We test the model and the permissions around it, using realistic misuse scenarios.</p>
			</div>
			<ul class="bx-ai-testing-checks">
				<li><Check size={17} aria-hidden="true" /><div><h4>Challenge its instructions</h4><p>Test prompt injection: attempts to make the AI ignore its rules through crafted messages or documents.</p></div></li>
				<li><Check size={17} aria-hidden="true" /><div><h4>Check what it reveals</h4><p>Look for private information in responses and test whether one user can retrieve another user’s data.</p></div></li>
				<li><Check size={17} aria-hidden="true" /><div><h4>Test what it can do</h4><p>Check whether connected tools can access records or perform actions beyond the user’s permissions.</p></div></li>
			</ul>
		</aside>
	</div>
</section>

<AiSecurity />

<section class="bx-about" id="about">
	<div class="bx-wrap bx-about-grid">
		<div class="bx-about-mark" aria-hidden="true"><div class="bx-mark-frame"><img src="/img/bitsoftex-logo.webp" width="150" height="150" alt="" /></div><span>BITSOFTEX / SOFTWARE & AI SECURITY</span></div>
		<div><p class="bx-eyebrow">BUILT BY ENGINEERS. DRIVEN BY CURIOSITY.</p><h2>Good software solves problems.<br />Secure software earns trust.</h2><p>Bitsoftex is a software development company creating AI models and the applications that bring them to life.</p><p>We also use reverse engineering to understand existing software when source code or documentation is incomplete. By analysing application behaviour, binaries, and communication protocols, we trace the causes of bugs, investigate compatibility issues, and develop targeted fixes and custom integrations. Our work connects diagnosis with practical engineering, including specialised tasks for AI systems and legacy applications.</p><a class="bx-text-link" href="mailto:contact@bitsoftex.eu">Meet your next engineering partner <ArrowUpRight size={18} /></a></div>
	</div>
</section>

<section class="bx-section bx-approach" id="approach">
	<div class="bx-wrap">
		<div class="bx-section-intro"><div><p class="bx-eyebrow">02 / HOW WE WORK</p><h2>An ethical hacker’s approach.</h2></div><p>With your permission, we investigate how someone could misuse your system. Then we turn those findings into practical fixes.</p></div>
		<div class="bx-steps">{#each steps as step}<article><span class="bx-step-number">{step.number}<span></span></span><h3>{step.title}</h3><p>{step.text}</p></article>{/each}</div>
	</div>
</section>

<section class="bx-contact" id="contact">
	<div class="bx-wrap bx-contact-inner"><div><p class="bx-eyebrow">LET’S BUILD WITH CONFIDENCE</p><h2>Your next AI project.<br />A stronger foundation.</h2><p>Building an AI system, planning a penetration test, or tracking down a difficult bug?<br />Tell us what you’re working on.</p></div><a class="bx-button bx-button-light" href="mailto:contact@bitsoftex.eu">Compose Email <Mail size={20} aria-hidden="true" /></a></div>
</section>
