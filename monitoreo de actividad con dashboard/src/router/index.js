import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import PrimeVue from 'primevue/config';

Vue.use(VueRouter);
Vue.use(PrimeVue);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

export default router;
