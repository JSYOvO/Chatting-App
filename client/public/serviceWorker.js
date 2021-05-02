const CACHE_NAME = 'CACHE_V1';
const URLSTOCACHE = ['index.html', 'offline.html'];
const self = this;

// 서비스 워커는 다음과 같이 3단계의 생명 주기를 갖는다.
// 등록(Registration) => index.html
// 설치(Installation) => 브라우저가 새로운 서비스 워커를 감지할 때마다 호출된다. 우리의 목표는 모든 정적 에셋을 검색하기 위해 캐시 API를 호출하는 것이다.
// 활성화(Activation)

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(URLSTOCACHE);
            })
    )
});

// Listen for requests
// 서비스 워커에서는 등록된 이벤트에 응답하는 방법을 결정할 수 있다. 이를 위해서 respondWith() 메서드를 호출한다.
// 우리의 경우, 캐시가 처음 생성된 것인지 여부를 체크한 다음 네트워크에서 캐시를 패치할 것이다.

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(async () => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});