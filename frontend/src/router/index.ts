import { createRouter, createWebHashHistory } from "vue-router";

// 无需权限的路由
export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "HomePage",
    hidden: true,
    meta: { notNeedAuth: true },
    component: () => import("@/views/Home.vue"),
  },
  // 匹配所有路径  vue2使用*  vue3使用/:pathMatch(.*)或/:catchAll(.*)
  {
    path: "/404",
    name: "NotFound",
    hidden: true,
    meta: { notNeedAuth: true },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    hidden: true,
    redirect: "/404",
  },
];

// 路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 始终滚动到顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
