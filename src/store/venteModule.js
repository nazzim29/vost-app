import VenteServices from "@/services/VenteServices";
const defaultState = () => ({
	ventes: [],
	vente: {},
	count:0,
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getVentes(state, ventes) {
			state.ventes = ventes;
		},
		showVente(state, vente) {
			state.vente = vente;
		},
		setCountVentes(state, count) {
			state.count = count;
		}

	},
	actions: {
		getVentes(context, query) {
			return VenteServices.get(query)
				.then((res) => {
					return context.commit("getVentes", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getCountVentes(context) {
			return VenteServices.getCount()
				.then((res) => {
					return context.commit("setCountVentes", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showVente(context, id) {
			return VenteServices.show(id)
				.then((res) => {
					return context.commit("showVente", res.data);
				})
				.catch((err) =>
					context.dispatch("add-error", err.response.data.message)
				);
		},
		deleteVente(context, id) {
			return VenteServices.destroy(id)
				.then(() => {
					return context.dispatch("getVentes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addVente(context, commande) {
			return VenteServices.create(commande)
				.then(() => {
					return context.dispatch("getVentes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateVente(context, commande) {
			return VenteServices.update(commande)
				.then(() => {
					return context.dispatch("getVentes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		"vente/addProducts"(context, { commandeId, products }) {
			return VenteServices.addProduit(commandeId, products)
				.then(() => {
					return context.dispatch("getVentes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getVentes: (state) => state.ventes,
		getVente: (state) => state.vente,
		countVentes: (state) => state.count,
	},
};

export default fonctionsModule;
