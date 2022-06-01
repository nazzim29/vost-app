import PaiementService from "@/services/PaiementService";
const defaultState = () => ({
  paiements: [],
  paiement:{}
});
const usersModule = {
	state: defaultState(),
	mutations: {
		setPaiements(state, paiements) {
			console.log(paiements);
			state.paiements = paiements;
		},
		setPaiement(state, paiement) {
			console.log(paiement);
			state.paiement = paiement;
		},
	},
	actions: {
		getPaiements(context, query) {
			console.log(query);
			return PaiementService.get(query)
				.then((res) => {
					console.log(res);
					return context.commit("setPaiements", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showPaiement(context, id) {
			return PaiementService.show(id)
				.then((res) => {
					return context.commit("setPaiement", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		//update paiement
		updatePaiement(context, paiement) {
			return PaiementService.update(paiement)
				.then(() => {
					return context.dispatch("getPaiements", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		//delete paiement
		deletePaiement(context, id) {
			return PaiementService.destroy(id)
				.then(() => {
					return context.dispatch("getPaiements", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		addPaiement(context, paiement) {
			return PaiementService.create(paiement)
				.then(() => {
					return context.dispatch("getPaiements", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		arrivagePaiements(context, paiements) {
			return PaiementService.arrivage(paiements)
				.then(() => {
					return context.dispatch("getPaiements", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
	},
	getters: {
		getPaiements: (state) => state.paiements,
		getPaiement: (state) => state.paiement,
	},
};

export default usersModule;
