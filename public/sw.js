if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),f={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/242-0c64dd6509665b09.js",revision:"0c64dd6509665b09"},{url:"/_next/static/chunks/926-0e3877969cd6a99a.js",revision:"0e3877969cd6a99a"},{url:"/_next/static/chunks/framework-5429a50ba5373c56.js",revision:"5429a50ba5373c56"},{url:"/_next/static/chunks/main-34caf24b4a8068b9.js",revision:"34caf24b4a8068b9"},{url:"/_next/static/chunks/pages/_app-14b1246e02cb1946.js",revision:"14b1246e02cb1946"},{url:"/_next/static/chunks/pages/_error-b6491f42fb2263bb.js",revision:"b6491f42fb2263bb"},{url:"/_next/static/chunks/pages/index-45c1150841feb502.js",revision:"45c1150841feb502"},{url:"/_next/static/chunks/pages/layout-39b01e0ecec673bc.js",revision:"39b01e0ecec673bc"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2df7a8d27de1794c.js",revision:"2df7a8d27de1794c"},{url:"/_next/static/css/34a38ca8a35af3cf.css",revision:"34a38ca8a35af3cf"},{url:"/_next/static/css/58a10f05311846c2.css",revision:"58a10f05311846c2"},{url:"/_next/static/css/fe23e8fd0bc5bfe8.css",revision:"fe23e8fd0bc5bfe8"},{url:"/_next/static/hBkRN6ykZ7mjnlYkS2S56/_buildManifest.js",revision:"edf3f44dc060248035f0c7e417a0ff8d"},{url:"/_next/static/hBkRN6ykZ7mjnlYkS2S56/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/153cddd40fc006c4-s.woff2",revision:"9d99ca6a18e165bdeb8a4be91d93c2e7"},{url:"/_next/static/media/1de9c871cd3a3669-s.p.woff2",revision:"7d04d43d1467cd4e3f5644f46ffbf944"},{url:"/_next/static/media/514c0c92c2b02e86-s.woff2",revision:"4e91dc08d2ecabdd96f723c634a6b473"},{url:"/_next/static/media/523eb9f0d422b825-s.woff2",revision:"4662afaa79cfdf9deef74fa143350630"},{url:"/_next/static/media/8e7550267a9c8154-s.woff2",revision:"f4e7906f75099cace6b388a1e901ac8b"},{url:"/_next/static/media/93780db435bead85-s.woff2",revision:"f35fdfb6ccadffe64da1dd43aaf37882"},{url:"/_next/static/media/b68e601d8a0cfc1f-s.woff2",revision:"f3403a9eeb7611280a54f37a77353d4a"},{url:"/_next/static/media/c811b3fc1b41c454-s.p.woff2",revision:"32acf295f6b03606251b8d050466e9c9"},{url:"/_next/static/media/d3b7f0fd603bcea3-s.woff2",revision:"af33fc745bd57a784dda29278c1584ea"},{url:"/_next/static/media/dc1104cda2e8d423-s.woff2",revision:"96c222d4f63845a83b45ce53afdb86bb"},{url:"/_next/static/media/f42bb2e19a5d3aff-s.woff2",revision:"4c90c0dd27f8f540d1199385be0cf90d"},{url:"/favicon.ico",revision:"c0f234ce4e752c47af71915b6cc60aeb"},{url:"/icon-192x192.png",revision:"b243b40d9a52bac133d65bceb741ad2a"},{url:"/icon-256x256.png",revision:"632eb3189968deabf99f6d30fdcce075"},{url:"/icon-384x384.png",revision:"a9b22dbed287ae688649992947f377d1"},{url:"/icon-512x512.png",revision:"f61ef42b6b367068ecbd78f710e2a66c"},{url:"/icon.png",revision:"0dcc0330654c60b57b8e1c587133a8fb"},{url:"/manifest.json",revision:"574e2c9241928a1eed936c571b5decce"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
