const CACHE_NAME = 'abdo-nasef-cache-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/script.js',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// مرحلة التثبيت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('تم تخزين الملفات في الكاش');
        return cache.addAll(ASSETS);
      })
      .catch((err) => {
        console.error('فشل التخزين:', err);
      })
  );
});

// مرحلة التنشيط
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('حذف الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// معالجة الطلبات
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // إرجاع النسخة المخزنة إذا وجدت
        if (cachedResponse) {
          console.log('تم الاسترجاع من الكاش:', event.request.url);
          return cachedResponse;
        }

        // إذا لم توجد، جلبها من الشبث
        return fetch(event.request)
          .then((response) => {
            // تخزين الاستجابة الجديدة
            return caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, response.clone());
                console.log('تم تخزين جديد:', event.request.url);
                return response;
              });
          })
          .catch(() => {
            // صفحة بديلة عند فشل الاتصال
            return new Response('<h1>عذراً، أنت غير متصل بالإنترنت</h1>', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});
