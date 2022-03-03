import CommandeService from "@/services/CommandeService";
const defaultState = () => ({
	commandes: [],
	commande:{},
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getCommandes(state, commandes) {
			state.commandes = commandes;
		},
		showCommande(state, commande) {
			state.commande = commande
		}
	},
	actions: {
		getCommandes(context, query) {
			return CommandeService.get(query)
				.then((res) => {
					return context.commit("getCommandes", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showCommande(context, id) {
			return CommandeService.show(id)
			.then((res) => {
					return context.commit("showCommande",res.data)
				})
				.catch((err) => context.dispatch("add-error", err.response.data.message))	
		},
		deleteCommande(context, id) {
			return CommandeService.destroy(id)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addCommande(context, commande) {
			return CommandeService.create(commande)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateCommande(context, commande) {
			return CommandeService.update(commande)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getCommandes: (state) => state.commandes,
		getCommande: (state) => state.commande
	},
};

export default fonctionsModule;
