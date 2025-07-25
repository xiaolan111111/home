/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache",
              },
            },
            // {
            //   urlPattern: /^\/home-image\//, // 排除 /home-image 下的内容
            //   handler: "NetworkOnly", // 完全依赖网络请求
            // },
          ],
        },
        manifest: {
          name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
          short_name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
          description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
          display: "standalone",
          start_url: "/",
          theme_color: "#424242",
          background_color: "#424242",
          icons: [
            {
              src: "/home-image/icon/48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "/home-image/icon/72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "/home-image/icon/96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "/home-image/icon/128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "/home-image/icon/144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "/home-image/icon/192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/home-image/icon/512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      viteCompression(),
    ],
    server: {
      port: "3000",
      open: true,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@use "./src/style/global.scss" as *;`,
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
    },
  });
