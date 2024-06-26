import "./style.css";

import "./assets/css/satoshi.css";
import "./assets/css/style.css";
import "jsvectormap/dist/css/jsvectormap.min.css";
import "flatpickr/dist/flatpickr.min.css";

//import './axios'
import { createPinia } from "pinia";
//import router from './router'
import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
//import { Gates } from 'vue-gates';
//import Gate from 'vue-gates';
import VueApexCharts from "vue3-apexcharts";

//import 'vue-toastification/dist/index.css'
import Toast, { POSITION } from "vue-toastification";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import store from "./stores/store";
import VueGates from "vue-gates";
import "vue-toastification/dist/index.css";
const options = {
  timeout: 1500,
  hideProgressBar: true,
  position: POSITION.TOP_RIGHT,
};
const pinia = createPinia();

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

const userName = ref(localStorage.getItem("name") || "");
app.provide("userName", userName);
app.use(store);
app.use(Toast, options);

//app.use(VueGates)
//store.dispatch('fetchUser');
app.mount("#app");
