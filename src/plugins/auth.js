import {createAuth} from "@websanova/vue-auth/src/v3.js";
import driverAuthBearer from "@websanova/vue-auth/src/drivers/auth/bearer.js";
import driverHttpAxios from "@websanova/vue-auth/src/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/src/drivers/router/vue-router.2.x.js";
export default (app) => {
	const auth = createAuth({
		plugins: {
			http: app.axios,
			router: app.router,
		},
		drivers: {
			http: driverHttpAxios,
			auth: driverAuthBearer,
			router: driverRouterVueRouter,
		},
		options: {
			rolesKey: "Profile.Autorisations_",
			notFoundRedirect: { name: "Home" },
			registerData: { url: '/register', method: 'POST', redirect: '/login', autoLogin: false },
			loginData: { url: '/login', method: 'POST', fetchUser: false, staySignedIn: true },
			logoutData: { url: '/logout', method: 'POST', redirect: '/', makeRequest: false },
			fetchData: { url: '/me', method: 'GET', enabled: false },
			refreshData: { url: '/refresh', },
		}
	})
	auth.install(app)
	app.$auth = auth;
	app.auth = auth;
};
