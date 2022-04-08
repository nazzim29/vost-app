import AuthService from "@/services/AuthServices";
import UserService from "@/services/UserService";
const defaultState = () => ({
	jwt: "",
	user: null,
	authenticated: false,
	users: [],
});
const usersModule = {
	state: defaultState(),
	mutations: {
		login(state, { user, token }) {
			state.jwt = token;
			state.user = user;
			state.authenticated = true;
		},
		logout(state) {
			/* eslint-disable-next-line */
			state = defaultState();
		},
		getUsers(state, users) {
			state.users = users;
		},
	},
	actions: {
		login(context, credidentials) {
			return AuthService.login(credidentials)
				.then((res) => {
					context.commit("login", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		checkAuth(context) {
			return AuthService.checklogin(context.state.jwt)
				.then(() => {
				})
				.catch(() => {
					context.commit("logout");
				});
		},
		logout(context) {
			return AuthService.logout()
				.then(() => {
					context.commit("logout");
				})
				.catch(() => {
					context.commit("logout");
				});
		},
		getUsers(context, query) {
			return UserService.get(query)
				.then((res) => {
					return context.commit("getUsers", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		deleteUser(context, id) {
			return UserService.destroy(id)
				.then(() => {
					return context.dispatch("getUsers", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addUser(context, user) {
			return UserService.create(user)
				.then(() => {
					return context.dispatch("getUsers");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		isAuth: (state) => state.authenticated,
		getCurrentUser: (state) => state.user,
		getUsers: (state) => state.users,
		getJwt: (state) => state.jwt,
	},
};

export default usersModule;
