import Api from "./api";

export default {
	login(creditentials) {
        return Api.post("/login", creditentials);
	},
	checklogin() {
		return Api.get("/checklogin", { });
	},
	getAutorisation(query) {
		return Api.get("/fonction", query);
	},
	getAutorisations(query) {
		return Api.get("/autorisation", query);
	}
};