import Vue from "vue";
import VueRouter from "vue-router";
import GetContext from "../components/GetContext.vue"
import ImportCSVFile from "../components/ImportCSVFile.vue"

Vue.use(VueRouter);

const routes = [
     {
          name: "getContext",
          path: "/getContext",
          component: GetContext
     },
     {
          name: "importCSVFile",
          path: "/importCSVFile",
          component: ImportCSVFile
     },
]

const router = new VueRouter({
     mode: "history",
     routes
});

router.beforeEach((to, from, next) => {
     next()
});

export default router;
