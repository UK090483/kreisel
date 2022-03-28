// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://f7fb2a1797a54fd08a23bd1bbe3a9a33@o1118076.ingest.sentry.io/6151856",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  beforeSend(event) {
    const { environment } = event;
    if (environment === "development") return null;
    return event;
  },
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
