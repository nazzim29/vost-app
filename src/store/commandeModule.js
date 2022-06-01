import CommandeService from "@/services/CommandeService";
const defaultState = () => ({
	commandes: [],
	commande: {},
	count: {
		total: 0,
		attente: 0,
	},
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getCommandes(state, commandes) {
			state.commandes = commandes;
		},
		showCommande(state, commande) {
			state.commande = commande;
		},
		setCountCommande(state, count) {
			console.log(count);
			state.count = count;
		},
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
		getCountCommande(context) {
			return CommandeService.count()
				.then((res) => {
					return context.commit("setCountCommande", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showCommande(context, id) {
			if (id == "new") {
				console.log(context);
				context.commit("showCommande", {
					Client: {},
					Produits: [],
					User: context.getters.getCurrentUser,
					etat: "non Enregistré",
					montant: 0,
					Payements: [],
				});
			} else
				return CommandeService.show(id)
					.then((res) => {
						return context.commit("showCommande", res.data);
					})
					.catch((err) =>
						context.dispatch("add-error", err.response.data.message)
					);
		},
		downloadBonDeCommande(context, id) {
			return CommandeService.downloadBonDeCommande(id)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		uploadBonDeCommande(context, { id, formData }) {
			return CommandeService.uploadBonDeCommande(id, formData).then(() => {
				return context.dispatch("showCommande", id);
			});
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
		setCommande(context, commande) {
			return context.commit("showCommande", commande);
		},
		addCommande(context, commande) {
			return CommandeService.create(commande)
				.then(({ data }) => {
					console.log(data);
					return context.commit("showCommande", data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateCommande(context, commande) {
			return CommandeService.update(commande)
				.then((c) => {
					return context.commit("showCommande", c);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		"commande/addProducts"(context, { commandeId, product }) {
			return CommandeService.addProduit(commandeId, product)
				.then(() => {
					return context.dispatch("showCommande", commandeId);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		"commande/updateProduit"(context, { commandeId, product }) {
			return CommandeService.updateProduit(commandeId, product)
				.then(() => {
					return context.dispatch("showCommande", commandeId);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		"commande/deleteProduit"(context, { commandeId, productId }) {
			return CommandeService.deleteProduit(commandeId, productId)
				.then(() => {
					return context.dispatch("showCommande", commandeId);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		"commande/validate"(context, { idCommande, next }) {
			return CommandeService.validate(idCommande)
				.then(() => {
					context.dispatch("getCommandes");
					context.dispatch("getVentes");
					return next.go(-1);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getCommandes: (state) => state.commandes,
		getCommande: (state) => state.commande,
		countCommande: (state) => state.count,
	},
};

export default fonctionsModule;
