import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "cryptos",
		component: () => import("@/components/CryptoList.vue"),
	},
	{
		path: "/crypto/new",
		name: "CryptoForm",
		component: () => import("@/components/CryptoForm.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
