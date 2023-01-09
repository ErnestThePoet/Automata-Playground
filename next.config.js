/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For local testing we have to add /Automata-Playground after localhost:3000
  // We still need to manually add /Automata-Playground for favicon in index.html after build,
  // or add it to _document.js before build.
  // Also, don't forget to copy .nojekyll to export folder after build.
  basePath: "/automata-playground",
  assetPrefix: "/automata-playground"
}

module.exports = nextConfig
