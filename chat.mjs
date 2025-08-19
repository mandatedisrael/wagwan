import 'dotenv/config';
import { chat } from '0g-kit';

async function main() {
	const message = process.argv.slice(2).join(' ') || 'Say wagwan!';
	if (!process.env.PRIVATE_KEY && !process.env.ZEROG_PRIVATE_KEY) {
		console.error('Missing PRIVATE_KEY or ZEROG_PRIVATE_KEY in environment. Create a .env file.');
		process.exit(1);
	}
	try {
		const reply = await chat(message);
		console.log(reply);
	} catch (err) {
		console.error('Chat failed:', err?.message || err);
		process.exit(1);
	}
}

main();

