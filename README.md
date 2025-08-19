## Simple 0g-kit Chat

Minimal Next.js app with a chat UI and an API route that calls `0g-kit` on the server.

### Setup
- Install dependencies:
```bash
pnpm install
```
- Set env on the server (Vercel): `PRIVATE_KEY` or `ZEROG_PRIVATE_KEY`.

### Local dev
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### CLI (optional)
```bash
pnpm chat "Hello there"
```
If no message is provided, it defaults to `Say wagwan!`.

# wagwan
