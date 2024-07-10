import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import MainHeader from "./components/Header.vue";
import MainFooter from "./components/Footer.vue";
import Groups from "./router/Groups.vue";
import Schedule from "./router/Schedule.vue";
import Leaderboard from "./router/Leaderboard.vue";
import NotFound from "./router/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/schedule", component: Schedule, alias: "/" },
    { path: "/groups", component: Groups },
    { path: "/leaderboard", component: Leaderboard },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

const app = createApp(App);

app.provide("apiURL", "http://localhost:3001/");

app.use(router);

app.component("main-header", MainHeader);
app.component("main-footer", MainFooter);

app.mount("#app");
