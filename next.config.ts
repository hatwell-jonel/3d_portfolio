import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)', // apply to all routes
            headers: [
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
              },
              {
                key: 'X-Frame-Options',
                value: 'DENY',
              },
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
              },
              {
                key: 'Referrer-Policy',
                value: 'no-referrer-when-downgrade',
              },
              {
                key: 'Permissions-Policy',
                value: 'geolocation=(), camera=(), microphone=()',
              },
              {
                key: 'Content-Security-Policy',
                value: `
                  default-src 'self';
                  script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
                  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                  img-src 'self' data:;
                  font-src 'self' https://fonts.gstatic.com;
                  frame-ancestors 'none';
                `.replace(/\s{2,}/g, ' ').trim(),
              },
            ],
          },
        ]
    }
};

export default nextConfig;
