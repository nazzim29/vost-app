import Api from "./api";

export default {
	create(client) {
		return Api.post("/client", client);
	},
	get(query) {
		return Api.get("/client", query);
	},
	show(id) {
		return Api.get("/client/" + id);
	},
	update(client) {
		return Api.patch("/client/" + client.id, client);
	},
	destroy(id) {
		return Api.delete("/client/" + id);
	},
	getTypeClient() {
		return Api.get("/typeClient");
	}
};
