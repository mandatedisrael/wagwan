/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Force bundling of these packages to handle ESM/CJS interop on serverless runtime
	transpilePackages: ['0g-kit', '@0glabs/0g-serving-broker'],
};

module.exports = nextConfig;

