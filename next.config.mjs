/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // XSS Protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Clickjacking Protection
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy - disable unnecessary browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Strict Transport Security (HSTS) - force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://sdk.cashfree.com https://api.cashfree.com https://sandbox.cashfree.com https://payments.cashfree.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://sdk.cashfree.com https://payments.cashfree.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://www.google-analytics.com https://sdk.cashfree.com https://cashfree-static.s3.amazonaws.com https://payments.cashfree.com",
              "connect-src 'self' https://firestore.googleapis.com https://www.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://api.cashfree.com https://sandbox.cashfree.com https://sdk.cashfree.com https://payments.cashfree.com",
              "frame-src 'self' https://www.google.com https://api.cashfree.com https://sandbox.cashfree.com https://sdk.cashfree.com https://payments.cashfree.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://payments.cashfree.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
