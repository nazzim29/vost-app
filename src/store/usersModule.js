import AuthService from "@/services/AuthServices";
import UserService from "@/services/UserService";
const defaultState = () => ({
	jwt: "",
	user: null,
	authenticated: false,
	users: [],
	count:0,
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
			// state = {...defaultState()};
			Object.assign(state, defaultState());
			console.log(state);
		},
		getUsers(state, users) {
			state.users = users;
		},
		refresh(state, { user }) {
			state.user = user;
		},
		setCount(state, count) {
			state.count = count;
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
		getCountUser(context) {
			return UserService.getCount()
				.then((res) => {
					return context.commit("setCount", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		checkAuth(context) {
			return AuthService.checklogin(context.state.jwt)
				.then((res) => {
					context.commit("refresh", res.data);
				})
				.catch(() => {
					context.commit("logout");
				});
		},
		logout(context) {
			context.commit("logout");
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
		updateUser(context, user) {
			return UserService.update(user)
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
		countUsers: (state) => state.count,
	},
};

export default usersModule;
