/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: true
      },
    output: "export"
}

module.exports = nextConfig
