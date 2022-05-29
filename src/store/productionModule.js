import ProductionService from "@/services/ProductionService";
const defaultState = () => ({
    productions: [],
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getProductions(state, productions) {
			state.productions = productions;
		},
	},
	actions: {
		getProductions(context, query) {
			return ProductionService.get(query)
				.then((res) => {
					return context.commit("getProductions", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		deleteProduction(context, id) {
			return ProductionService.destroy(id)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addProduction(context, production) {
			return ProductionService.create(production)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateProduction(context, commande) {
			return ProductionService.update(commande)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getTypeProductions(context) {
			return ProductionService.getTypeProduction()
				.then((res) => {
					return context.commit("getTypeProductions", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getProductions: (state) => state.productions,
	},
};

export default fonctionsModule;
