import { createRouter, createWebHistory } from "vue-router";
import store from "../store";


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
		component: loadView("user/Login"),
		meta: {
			auth:false,
		}
	},
	{
		path: "/user",
		name: "User",
		component: loadView("user/UsersIndex"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/new",
		name: "NewUser",
		component: loadView("user/NewUser"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/:id",
		name: "UserProfile",
		component: loadView("user/UsersIndex"),
		meta: {
			auth:true,
		}
	},
	{
		path: "/user/edit/:id",
		name: "UserEdit",
		component: loadView("user/NewUser"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/me",
		name: "Profile",
		component: loadView("user/Profile"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/fonction",
		name: "Fonction",
		component: loadView("user/Fonction"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/commandes",
		name: "Commandes",
		component: loadView("commandes/Commandes"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/commandes/:id",
		name: "Commande",
		component: loadView("commandes/CommandeShow"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/produits",
		name: "Produits",
		component: loadView("produits/Produits"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/productions",
		name: "Productions",
		component: loadView("produits/Productions"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/MatierePremiere",
		name: "MatierePremiere",
		component: loadView("produits/MatierePremiere"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/Formules",
		name: "Formules",
		component: loadView("produits/Formules"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/messagerie",
		name: "messagerie",
		component: loadView("Messagerie"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/contact-client",
		name: "ContactClient",
		component: loadView("client/ContactClient"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/Ventes/:id",
		name: "Vente",
		component: loadView("vente/VenteShow"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/Ventes",
		name: "Ventes",
		component: loadView("vente/Ventes"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/clients",
		name: "Clients",
		component: loadView("client/Client"),
		meta: {
			auth: true,
		}
	},
	{
		path: "/clients/:id",
		name: "ClientShow",
		component: loadView("client/ClientShow"),
		meta: {
			auth: true,
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
let interval = null
async function checklogin() {
	if (store.getters.isAuth) {
		if(!interval){
			// interval = setInterval(async () => {
			// 	await store.dispatch("checkAuth")
			// }, 10000 )
		}
		return true
	} else {
		return false
	}
	
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
