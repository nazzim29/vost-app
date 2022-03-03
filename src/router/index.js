import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import AuthServices from '@/services/AuthServices';


function loadView(view){
	return () => import(`../views/${view}.vue`);
}

const routes = [
	{
		path: "/",
		name: "Home",
		component: loadView("Home"),
		meta: {
			auth:true
		}
	},
	{
		path: "/login",
		name: "Login",
		component: loadView("Login"),
		meta: {
			auth:false,
		}
	},
	{
		path: "/user",
		name: "User",
		component: loadView("UsersIndex"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/new",
		name: "NewUser",
		component: loadView("NewUser"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/:id",
		name: "UserProfile",
		component: loadView("UsersIndex"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/edit/:id",
		name: "UserEdit",
		component: loadView("NewUser"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/me",
		name: "Profile",
		component: loadView("Profile"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/fonction",
		name: "Fonction",
		component: loadView("Fonction"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/commandes",
		name: "Commandes",
		component: loadView("Commandes"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/commandes/:id",
		name: "Commande",
		component: loadView("CommandeShow"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/produits",
		name: "Produits",
		component: loadView("Produits"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/clients",
		name: "Clients",
		component: loadView("Produits"),
		meta: {
			auth: true,
		}
	}
	{
		path: "/clients/:id",
		name: "ClientShow",
		component: loadView("ClientShow"),
		meta: {
			auth: true,
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
async function checklogin() {
	if(store.getters.isAuth) return true
	AuthServices.checklogin(store.getters.getJwt).then(() => {
		return true
	}).catch(() => {
		return false
	})
}
router.beforeEach(async function (to, from, next) {
	let isLogged = await checklogin();
	if (to.meta.auth === true) {
		if (isLogged) next();
		else next("/login");
	} else if (to.meta.auth === false) {
		if (isLogged) next(from)
		else next();
	}
});
export default function (app) {
	app.router = router;
	app.use(router);
}
