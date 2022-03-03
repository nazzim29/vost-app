import ClientService from "@/services/ClientService";
const defaultState = () => ({
    clients: [],
    client:{}
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getClients(state, commandes) {
			state.commandes = commandes;
		},
		showClient(state, commande) {
			state.commande = commande;
		},
	},
	actions: {
		getClients(context, query) {
			return ClientService.get(query)
				.then((res) => {
					return context.commit("getClients", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showClient(context, id) {
			return ClientService.show(id)
				.then((res) => {
					return context.commit("showCommande", res.data);
				})
				.catch((err) =>
					context.dispatch("add-error", err.response.data.message)
				);
		},
		deleteClient(context, id) {
			return ClientService.destroy(id)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addClient(context, commande) {
			return ClientService.create(commande)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateClient(context, commande) {
			return ClientService.update(commande)
				.then(() => {
					return context.dispatch("getCommandes", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getClients: (state) => state.commandes,
		getClient: (state) => state.commande,
	},
};

export default fonctionsModule;
