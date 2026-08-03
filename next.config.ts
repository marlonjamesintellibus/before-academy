import type { NextConfig } from "next";

/**
 * Security headers (docs/engineering/security.md). CSP allows self plus the
 * PostHog ingest host; Next.js hydration requires inline script allowance -
 * 'unsafe-inline' is an accepted risk for the pilot (ADR-043): nonce-based CSP
 * would force every route dynamic and the app renders no user-generated HTML.
 */
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${posthogHost}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      `connect-src 'self' ${posthogHost}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  // No next/image usage anywhere; disabling the optimizer removes the
  // /_next/image endpoint and with it the bundled-sharp attack surface.
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
