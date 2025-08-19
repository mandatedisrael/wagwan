import type { NextApiRequest, NextApiResponse } from 'next';

// Use dynamic import to avoid ESM/CJS interop issues during build
async function runChat(prompt: string) {
	const mod = await import('0g-kit');
	return await mod.chat(prompt);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}
	const { message } = req.body || {};
	if (!message || typeof message !== 'string') {
		return res.status(400).json({ error: 'Missing message' });
	}
	if (!process.env.PRIVATE_KEY && !process.env.ZEROG_PRIVATE_KEY) {
		return res.status(500).json({ error: 'Missing PRIVATE_KEY or ZEROG_PRIVATE_KEY on server' });
	}
	try {
		const reply = await runChat(message);
		return res.status(200).json({ reply });
	} catch (e: any) {
		return res.status(500).json({ error: e?.message || 'Chat failed' });
	}
}

