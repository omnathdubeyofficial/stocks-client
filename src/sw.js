const CACHE_NAME = 'version-1'
const urltocache = [
  './',
  './bundle.js',
  './bundle.js.map',
  'f73801ef9d2a1502c574.png',
]
const self = this

//install sw
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urltocache)
    })
  )
})

//listen for request
self.addEventListener('fetch', (event) => {})

//Activate the SE
self.addEventListener('activate', (event) => {})
