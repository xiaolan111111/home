import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// swiper
import "swiper/scss";
import "swiper/scss/pagination";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

// PWA
if ('serviceWorker' in navigator) {
  // 首次加载时不显示更新提示
  let isFirstVisit = !localStorage.getItem('app_visited');
  
  // 记录已访问标记
  localStorage.setItem('app_visited', 'true');
  
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // 只在非首次访问时显示更新提示
    if (!isFirstVisit) {
      console.log("站点已更新，刷新后生效");
      ElMessage("站点已更新，刷新后生效");
    }
  });
}
