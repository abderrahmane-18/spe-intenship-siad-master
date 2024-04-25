import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import HelloWorld from "../components/HelloWorld.vue";


const routes = [
  { path: "/", name: "HelloWorld", component: HelloWorld },
  {
    path: '/login',
    name: "Login",
    component: ()=>import("../components/Login.vue"),
  },
  {
    path: '/admin',
    name: "Admin",
    component: ()=>import("../views/Admin.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
