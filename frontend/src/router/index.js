import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import CamisaDetalhe from "../pages/CamisaDetalhe.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/camisa/:slug", component: CamisaDetalhe, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
