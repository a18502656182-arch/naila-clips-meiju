/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imagedelivery.net" },
    ],
  },

  // imagedelivery.net (Cloudflare Images) 在国内被墙
  // 通过 Vercel 边缘节点反代，浏览器请求 /cf-img/... 即可
  async rewrites() {
    return [
      {
        source: "/cf-img/:path*",
        destination: "https://imagedelivery.net/:path*",
      },
      // Free Dictionary API 反代，解决国内访问问题
      {
        source: "/dict/:word",
        destination: "https://api.dictionaryapi.dev/api/v2/entries/en/:word",
      },
      // Railway 后端在国内直连不稳定，走 Vercel 边缘节点转发
      // 清空 NEXT_PUBLIC_API_BASE 环境变量后生效
      {
        source: "/api/:path*",
        destination: "https://naila-api-meiju-production.up.railway.app/api/:path*",
      },
      {
        source: "/rsc-api/:path*",
        destination: "https://naila-api-meiju-production.up.railway.app/rsc-api/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=30, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/cf-img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
