import ProduitService from "@/services/ProduitService";
const defaultState = () => ({
	produits: [],
	couleurs: [],
	type: [],
});
const usersModule = {
	state: defaultState(),
	mutations: {
		getProduits(state, produits) {
			state.produits = produits;
		},
		getCouleurs(state, couleurs) {
			state.couleurs = couleurs;
		},
		getTypeproduits(state, type) {
			state.type = type;
		},
	},
	actions: {
		getCouleurs(context, query) {
			return ProduitService.getCouleurs(query)
				.then((res) => {
					return context.commit("getCouleurs", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getProduits(context, query) {
			return ProduitService.get(query)
				.then((res) => {
					console.log("hey");
					return context.commit("getProduits", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getTypeproduits(context, query) {
			return ProduitService.getTypes(query)
				.then((res) => {
					return context.commit("getTypeproduits", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		deleteProduit(context, id) {
			return ProduitService.destroy(id)
				.then(() => {
					return context.dispatch("getProduits", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addProduit(context, user) {
			return ProduitService.create(user)
				.then(() => {
					return context.dispatch("getProduits");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateProduit(context, user) {
			return ProduitService.update(user)
				.then(() => {
					return context.dispatch("getProduits");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addFormule(context, formule) {
			return ProduitService.addFormule(formule)
				.then(() => {
					return context.dispatch("getProduits");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		removeFormule(context, formule) {
			return ProduitService.removeFormule(formule)
				.then(() => {
					return context.dispatch("getProduits");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getProduits: (state) => state.produits,
		getCouleurs: (state) => state.couleurs,
		getTypeproduits: (state) => state.type,
	},
};

export default usersModule;
