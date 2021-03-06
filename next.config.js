/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: "custom",
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
