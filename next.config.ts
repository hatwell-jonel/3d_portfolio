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
            ],
          },
        ]
    }
};

export default nextConfig;
