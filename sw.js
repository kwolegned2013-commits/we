
const CACHE_NAME = 'we-youth-v1.1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // 성경 구절 생성 API 등 외부 요청은 캐시하지 않음
  if (event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시가 있으면 반환, 없으면 네트워크 요청
      return response || fetch(event.request).then((fetchResponse) => {
        // 유효한 응답인 경우 캐시에 저장 시도 (선택 사항)
        return fetchResponse;
      });
    }).catch(() => {
      // 오프라인 상태에서 에셋이 없는 경우 기본 페이지 반환
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
