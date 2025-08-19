import { useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export default function Home() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function sendMessage(e?: React.FormEvent) {
		e?.preventDefault();
		const text = input.trim();
		if (!text) return;
		setError(null);
		setLoading(true);
		setMessages((prev) => [...prev, { role: 'user', content: text }]);
		setInput('');
		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || 'Request failed');
			setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
		} catch (err: any) {
			setError(err?.message || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div style={{ maxWidth: 720, margin: '40px auto', padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
			<h1 style={{ fontSize: 24, marginBottom: 12 }}>Wagwan Chat</h1>
			<div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, minHeight: 300 }}>
				{messages.length === 0 && (
					<p style={{ color: '#666' }}>Start the conversation below.</p>
				)}
				{messages.map((m, i) => (
					<div key={i} style={{ margin: '8px 0', display: 'flex', gap: 8 }}>
						<strong style={{ minWidth: 80 }}>{m.role === 'user' ? 'You' : 'Bot'}:</strong>
						<div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
					</div>
				))}
				{loading && <div style={{ color: '#666' }}>Thinking…</div>}
			</div>

			<form onSubmit={sendMessage} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type a message…"
					style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc' }}
				/>
				<button type="submit" disabled={loading || !input.trim()} style={{ padding: '10px 16px' }}>
					Send
				</button>
			</form>
			{error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
			<p style={{ color: '#666', marginTop: 12, fontSize: 12 }}>
				Server requires `PRIVATE_KEY` or `ZEROG_PRIVATE_KEY` in environment.
			</p>
		</div>
	);
}

