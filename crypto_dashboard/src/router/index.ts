import store from "@/store";
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
	{
		path: "/login",
		name: "Login",
		component: () => import("@/components/Login.vue"),
	},
	{
		path: "/signup",
		name: "SignUp",
		component: () => import("@/components/SignUp.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

router.beforeEach((to, from, next) => {
	console.log(to.fullPath);
	if (to.fullPath === "/" || to.fullPath === "/crypto/new") {
		console.log("aaaaaaaaaaaa");
		if (!store.state.token) {
			next("/login");
		}
	}
	if (to.fullPath === "/login" || to.fullPath === "/signup") {
		if (store.state.token) {
			next("/");
		}
	}
	next();
});

export default router;
