import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootswatch/dist/lux/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$store = store;
app.mount("#app");
