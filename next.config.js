/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // for local testing we have to add /Automata-Playground after localhost:3000
  basePath: "/Automata-Playground",
  assetPrefix: "/Automata-Playground"
}

module.exports = nextConfig
