if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>n(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Kreisel_Logo.png",revision:"97af1e1e3ebc4833bdcbf3cf56ec8753"},{url:"/_next/static/chunks/0c428ae2-86725b765ad0e769.js",revision:"86725b765ad0e769"},{url:"/_next/static/chunks/240.06b135f93c6fa813.js",revision:"06b135f93c6fa813"},{url:"/_next/static/chunks/371.dd496da3f7f42b8e.js",revision:"dd496da3f7f42b8e"},{url:"/_next/static/chunks/507.4626e4c2843695c1.js",revision:"4626e4c2843695c1"},{url:"/_next/static/chunks/536-4f945c4251097791.js",revision:"4f945c4251097791"},{url:"/_next/static/chunks/728cfa9a.4baadeddd768c716.js",revision:"4baadeddd768c716"},{url:"/_next/static/chunks/891-412a62ef1140a64f.js",revision:"412a62ef1140a64f"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-d8d243da07e36dfd.js",revision:"d8d243da07e36dfd"},{url:"/_next/static/chunks/pages/%5B%5B...slug%5D%5D-2ad9903530aecdc1.js",revision:"2ad9903530aecdc1"},{url:"/_next/static/chunks/pages/_app-40f065f2d4c9a939.js",revision:"40f065f2d4c9a939"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/auth/login-32cefdab4fb650a0.js",revision:"32cefdab4fb650a0"},{url:"/_next/static/chunks/pages/auth/new-user-74ed576d2cca95ab.js",revision:"74ed576d2cca95ab"},{url:"/_next/static/chunks/pages/auth/verify-request-eea2737b6e003a67.js",revision:"eea2737b6e003a67"},{url:"/_next/static/chunks/pages/profile-c148142bb5590535.js",revision:"c148142bb5590535"},{url:"/_next/static/chunks/pages/style-4d74a9577656961e.js",revision:"4d74a9577656961e"},{url:"/_next/static/chunks/pages/tester-0a325a4295c3ddc9.js",revision:"0a325a4295c3ddc9"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-7600dea330d99a1f.js",revision:"7600dea330d99a1f"},{url:"/_next/static/css/8db213b50ca3d04c.css",revision:"8db213b50ca3d04c"},{url:"/_next/static/m4XNRzpJHiU3ocdSGt5Mp/_buildManifest.js",revision:"c95b7538a73d9e9b0ca9b12e1967ebb2"},{url:"/_next/static/m4XNRzpJHiU3ocdSGt5Mp/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/GT Zirkon Bold.9055c259.otf",revision:"9055c259"},{url:"/dummy.pdf",revision:"0fa67c1a5280041b42d9bd4883abf1f5"},{url:"/favicon-32x32.png",revision:"c722d50383187404c82119352a2ece8f"},{url:"/fonts/GTZirkon-Bold.eot",revision:"6ba67fa97bacaec58c46459a4c6440d1"},{url:"/fonts/GTZirkon-Bold.ttf",revision:"103ae5bcad9631c747ecf70a282c969d"},{url:"/fonts/GTZirkon-Bold.woff",revision:"c4e0d063f63e47dda68dbcb0db234047"},{url:"/fonts/GTZirkon-Bold.woff2",revision:"d7b0e3683861a1eacd32f7e3e9bcc738"},{url:"/fonts/GTZirkon-Book.ttf",revision:"4486e488123f220c6136d8e3422266d1"},{url:"/fonts/GTZirkon/GT Zirkon Black Italic.otf",revision:"2f6cc1300ba12f5a4511d22b0f220379"},{url:"/fonts/GTZirkon/GT Zirkon Black.otf",revision:"50e40f0227e5b6dffe68a8d543c5982c"},{url:"/fonts/GTZirkon/GT Zirkon Bold Italic.otf",revision:"797837fccf705ecf98e42acd143f3a6d"},{url:"/fonts/GTZirkon/GT Zirkon Bold.otf",revision:"20aea9b618feb3956c0fe03c0c49a9bf"},{url:"/fonts/GTZirkon/GT Zirkon Book Italic.otf",revision:"8060bbdadcfd950eee064c4318e9867e"},{url:"/fonts/GTZirkon/GT Zirkon Book.otf",revision:"52b5a272634930e23c925eb897b0fc46"},{url:"/fonts/GTZirkon/GT Zirkon Light Italic.otf",revision:"8f68a5a4b25b72ac2c4feaebbbee4cdf"},{url:"/fonts/GTZirkon/GT Zirkon Light.otf",revision:"cef02f919d8a4da3f9f21c7749c58645"},{url:"/fonts/GTZirkon/GT Zirkon Medium Italic.otf",revision:"5ada1b924380bf387323d3a5d5321b36"},{url:"/fonts/GTZirkon/GT Zirkon Medium.otf",revision:"64bf2aa59b64f732f533113412a2fb32"},{url:"/fonts/GTZirkon/GT Zirkon Regular Italic.otf",revision:"3ac7565e2d5b9cb0e3ed11f49045ff79"},{url:"/fonts/GTZirkon/GT Zirkon Regular.otf",revision:"39c9eaac9b461d5e807fd91dc8a02f70"},{url:"/fonts/GTZirkon/GT Zirkon Thin Italic.otf",revision:"232d91b058cbe2d66d5842807b309798"},{url:"/fonts/GTZirkon/GT Zirkon Thin.otf",revision:"97b1e9b50c25275ed495caf019251d43"},{url:"/fonts/GTZirkon/GT Zirkon UltraLight Italic.otf",revision:"ede478362a2eb241e8b4dbc63b6069a8"},{url:"/fonts/GTZirkon/GT Zirkon UltraLight.otf",revision:"13e9c75fccc3489bfe1e931f250884a8"},{url:"/fonts/GTZirkon/GT Zirkon.pdf",revision:"00973715dd257fce0d7015f65e92beaf"},{url:"/icon-192x192.png",revision:"025b16427285acd721f7d2dd5eb0cb18"},{url:"/icon-256x256.png",revision:"0cd244a4391655cda232a756fc8a567b"},{url:"/icon-384x384.png",revision:"596d0983987f97ae2d5251af62e9a50f"},{url:"/icon-512x512.png",revision:"e9fa4a28190b28a26aa26f39c194cfec"},{url:"/logo-hm.svg",revision:"a52258904eb2b85a0eef8c500321c1f6"},{url:"/manifest.json",revision:"d92013fa4611796ddd142ac5ce6db7bc"},{url:"/robots.txt",revision:"9152d7f1724ed8fbcd2e0c87029f193c"},{url:"/underline/underline.svg",revision:"78d3fa135a3fea56df29ff3e4e140340"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
