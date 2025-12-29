/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.prod.website-files.com', // ✅ allow your image domain
      'bymemet.vercel.app',
      'static.wixstatic.com',
      'i.vimeocdn.com',
      'images.unsplash.com',
      'alfred.nl',
      'img.waimaoniu.net'
    ],
  },
}

export default nextConfig;
