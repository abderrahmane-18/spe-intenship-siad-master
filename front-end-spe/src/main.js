import './style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'
//import './axios'
import { createPinia } from 'pinia'
//import router from './router'
import { createApp, ref  } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import VueApexCharts from 'vue3-apexcharts'

const pinia =createPinia();
const app = createApp(App);
app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VueApexCharts)
const userName = ref(localStorage.getItem('name') || '');
app.provide('userName', userName);


app.mount('#app')
