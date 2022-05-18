/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For local testing we have to add /Automata-Playground after localhost:3000
  // We still need to manually add /Automata-Playground before favicon in index.html after build.
  basePath: "/Automata-Playground",
  assetPrefix: "/Automata-Playground"
}

module.exports = nextConfig
