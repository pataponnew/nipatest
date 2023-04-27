import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import addTicket from "../views/addTicket.vue";
import table from "../views/table.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/addticket",
    name: "addticket",
    component: addTicket,
  },
  {
    path: "/table",
    name: "table",
    component: table,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
