import FonctionService from "@/services/FonctionService";
const defaultState = () => ({
	fonctions: [],
	autorisations: [],
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getFonctions(state, fonctions) {
			state.fonctions = fonctions;
		},
	},
	actions: {
		getFonctions(context, query) {
			return FonctionService.get(query)
				.then((res) => {
					return context.commit("getFonctions", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		deleteFonction(context, id) {
			return FonctionService.destroy(id)
				.then(() => {
					return context.dispatch("getFonctions", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addFonction(context, user) {
			return FonctionService.create(user)
				.then(() => {
					return context.dispatch("getFonctions", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getFonctions: (state) => state.fonctions,
		getAutorisations: (state) => state.autorisations,
	},
};

export default fonctionsModule;
