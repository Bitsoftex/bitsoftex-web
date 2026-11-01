export const aiSecurityRisks = [
	{
		number: '01', layer: 'FILES & DOWNLOADS', title: 'A trusted-looking download can carry malware.',
		risk: 'A fake model repository or installer can look legitimate while its setup script steals passwords, tokens, or wallet data. Download counts and a matching checksum do not establish who you are trusting.',
		fixes: ['Verify the publisher and use official download channels. Pin reviewed model and dependency revisions.', 'Review loaders and install scripts before running them. Keep remote-code loading disabled unless reviewed.', 'Check hashes or signatures against a trusted source, then test new artifacts in isolation without credentials.'],
		source: 'https://www.hiddenlayer.com/research/malware-found-in-trending-hugging-face-repository-open-oss-privacy-filter', sourceLabel: 'HiddenLayer: malicious model repository'
	},
	{
		number: '02', layer: 'CHAT TEMPLATES', title: 'Hidden instructions can change the answer.',
		risk: 'Chat templates format the messages a model sees. A tampered template can quietly add instructions that produce false answers or attacker-controlled links when a trigger appears, even without changing the model weights.',
		fixes: ['Extract and compare the shipped template with a reviewed original. Treat template changes as code changes.', 'Review conditional logic and role markers. Use a patched, sandboxed template renderer.', 'Test adversarial inputs and check important outputs against trusted records. Passing a malware scan is only one check.'],
		source: 'https://www.pillar.security/blog/from-discovery-to-large-scale-validation-chat-template-backdoors-across-18-models-and-4-engines', sourceLabel: 'Pillar Security: template backdoor research'
	},
	{
		number: '03', layer: 'RUNNERS & UPDATES', title: 'The software running the model can leak data.',
		risk: 'A malformed model file can exploit bugs in its loader or inference engine. Bleeding Llama demonstrated how an Ollama memory-read flaw could expose data held by the running process.',
		fixes: ['Keep the runner, model loaders, and dependencies on supported patched releases. Verify updates come from the vendor.', 'Run inference as a dedicated, unprivileged account with minimal files, secrets, and network access.', 'Restrict model upload, creation, and publishing APIs. If exposure is suspected, investigate and revoke affected credentials.'],
		source: 'https://www.cyera.com/blog/bleeding-llama-a-critical-memory-leak-in-the-worlds-most-popular-local-ai-platform', sourceLabel: 'Cyera: Bleeding Llama advisory'
	},
	{
		number: '04', layer: 'NETWORK & BROWSER ACCESS', title: 'A local service can become an open door.',
		risk: 'Listening on every network interface can expose an AI API beyond your computer. In vulnerable configurations, DNS rebinding lets a malicious webpage use your browser to reach a local service and alter its model settings.',
		fixes: ['Bind host services to loopback where possible. Verify container port publishing, firewall rules, and actual reachability.', 'For remote access, use authenticated encrypted access, restrict routes, and separate inference from model-management permissions.', 'Keep Host and Origin validation enabled and patched. CORS and a private network alone are not authorization controls.'],
		source: 'https://www.cyera.com/research/nemoclaw-one-website-visit-to-hijack-your-ai-agent', sourceLabel: 'Cyera: browser-based agent hijacking'
	},
	{
		number: '05', layer: 'MODEL BEHAVIOUR & TOOLS', title: 'A model’s suggestion can become a harmful action.',
		risk: 'A backdoored model can behave normally until a trigger makes it request a dangerous tool call. In ProjectDiscovery’s controlled demonstration, an agent executed a model-requested script that sent dummy project credentials to a remote collector.',
		fixes: ['Use reviewed model sources and revisions. Evaluate tool behaviour, while recognising that ordinary tests cannot rule out hidden triggers.', 'Keep production .env files, SSH keys, and cloud credentials outside the agent’s readable workspace. Enforce access in the tool layer.', 'Separate shell execution from unrestricted network access. Validate tool arguments, require approval for sensitive actions, and audit transfers without logging secrets.'],
		source: 'https://projectdiscovery.io/research/how-abliterated-models-can-get-you-pwned', sourceLabel: 'ProjectDiscovery: controlled model backdoor demonstration'
	}
];
