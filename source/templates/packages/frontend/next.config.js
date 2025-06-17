const { i18nConfig } = require("./next-i18next.config.cjs");

const nextConfig = {
  i18n: i18nConfig.i18n,

  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['s3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // experimental: {
  //   swcPlugins: [["next-superjson-plugin", {}]],
  // },

  publicRuntimeConfig: {
    NEXT_PUBLIC_LIFE_API_URL: process.env.NEXT_PUBLIC_LIFE_API_URL,
    GENETICA_WEB_API_URL: process.env.GENETICA_WEB_API_URL,
    IMGPROXY_URL: process.env.IMGPROXY_URL,
    WEBSITE_PROTOCOL: process.env.WEBSITE_PROTOCOL,
    WEBSITE_URL: process.env.WEBSITE_URL,
    WEBSITE_PORT: process.env.WEBSITE_PORT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SITEMAP_ENABLED: process.env.SITEMAP_ENABLED,
    ECOMMERCE_ENABLED: process.env.ECOMMERCE_ENABLED,
    NEXT_PUBLIC_DEBUG_ENABLED: process.env.NEXT_PUBLIC_DEBUG_ENABLED,
    GA_TRACKING_ENABLED: process.env.GA_TRACKING_ENABLED,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GTM_CONTAINER_ID: process.env.GTM_CONTAINER_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    REASON_TO_JOIN_1: process.env.REASON_TO_JOIN_1,
    REASON_TO_JOIN_2: process.env.REASON_TO_JOIN_2,
    REASON_TO_JOIN_3: process.env.REASON_TO_JOIN_3,
  },

  webpack(config, { dev }) {
    if (config.cache && !dev) {
      // eslint-disable-next-line no-param-reassign
      config.cache = Object.freeze({
        type: 'memory',
      })
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      exclude: /-img\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.svg$/,
      include: /-img\.svg$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: "genetica",
    project: "life-ai-mini-app-affiliate-frontend-local",
    sentryUrl: "https://sentry.genetica.asia/",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
