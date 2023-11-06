import ClientService from "@/services/ClientService";
import moment from "moment";
const defaultState = () => ({
	clients: [],
	client: {},
	typeClient: [],
	feedbacks: [],
	count: 0,
});
const fonctionsModule = {
	state: defaultState(),
	mutations: {
		getClients(state, commandes) {
			state.clients = commandes;
		},
		showClient(state, commande) {
			state.client = commande;
		},
		getTypeClients(state, typeClient) {
			state.typeClient = typeClient;
		},
		getFeedbacks(state, feedbacks) {
			state.feedbacks = feedbacks;
		},
		setCountClient(state, count) {
			console.log(count);
			state.count = count;
		},
		setClientStats(state, stats) {
			state.client.stats = stats;
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
		getCountClient(context) {
			return ClientService.count()
				.then((res) => {
					return context.commit("setCountClient", res.data.count);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		showClient(context, id) {
			return ClientService.show(id)
				.then((res) => {
					console.log(res.data);

					let startDate = moment().startOf("M").toISOString();
					let endDate = moment().endOf("M").toISOString();
					context.dispatch("fetchStat", {id, startDate, endDate});
					return context.commit("showClient", res.data.client);
				})
				.catch((err) => {
					console.log(err);
					context.dispatch("add-error", err.response.data.message);
				});
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
				.then((res) => {
					context.dispatch("getClients", {});
					return res;
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		updateClient(context, commande) {
			return ClientService.update(commande)
				.then(() => {
					return context.dispatch("getClients", {});
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getTypeClients(context) {
			return ClientService.getTypeClient()
				.then((res) => {
					return context.commit("getTypeClients", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		getFeedbacks(context, query) {
			return ClientService.getFeedbacks(query)
				.then((res) => {
					return context.commit("getFeedbacks", res.data);
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		validerFeedback(context, feedback) {
			return ClientService.updateFeedback(feedback)
				.then(() => {
					return context.dispatch("getFeedbacks");
				})
				.catch((err) => {
					return context.dispatch("add-error", err.response.data.message);
				});
		},
		fetchStat(context, {id, startDate, endDate}) {
			console.log({
				startDate,
				endDate,
			});
			return ClientService.stats(id,{debut:startDate,fin:endDate}).then((res) => {
				return context.commit("setClientStats", res.data);
			});
		},
	},
	getters: {
		getClients: (state) => state.clients,
		getClient: (state) => state.client,
		getTypeClients: (state) => state.typeClient,
		getFeedbacks: (state) => state.feedbacks,
		countClient: (state) => state.count,
	},
};

export default fonctionsModule;
