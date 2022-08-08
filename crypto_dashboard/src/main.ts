import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootswatch/dist/flatly/bootstrap.min.css";
import bootstraspVue from "bootstrap-vue-3";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

const app = createApp(App);
// app.config.globalProperties.$store = store;
app.provide("store", store);
app.use(router);
app.use(store);
app.use(bootstraspVue);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
