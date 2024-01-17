// Importing Workbox recipes and strategies
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaching assets: Automatically caches important files during service worker installation
precacheAndRoute(self.__WB_MANIFEST);

// Page caching strategy: Caches pages and uses them for future navigational requests
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Naming the cache for pages
  plugins: [
    new CacheableResponsePlugin({ // Ensures that only requests with certain status codes are cached
      statuses: [0, 200],
    }),
    new ExpirationPlugin({ // Sets expiration for cached entries
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
    }),
  ],
});

// Warming strategy cache: Preloads and caches specified URLs
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to preload and cache
  strategy: pageCache, // Using pageCache strategy defined above
});

// Register route for navigation requests: Uses pageCache strategy for pages navigation
registerRoute(
  ({ request }) => request.mode === 'navigate', // Condition to match navigation requests
  pageCache // Using the pageCache strategy for matched requests
);

// Register route for static assets: Caches different types of assets
registerRoute(
  // Matching criteria for assets
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  
  // StaleWhileRevalidate strategy: Serves cached content while updating the cache in the background
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Naming the cache for assets
    plugins: [
      new CacheableResponsePlugin({ // Ensures that only requests with certain status codes are cached
        statuses: [0, 200],
      }),
    ],
  })
);
