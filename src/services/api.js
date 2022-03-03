import axios from "axios";
import store from "@/store";

axios.defaults.port = 2931;
export default {
	post(path, body) {
		return axios.post(`http://localhost:2931${path}`, body, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			},
		});
	},
	get(path, params = null) {
		return axios.get(`http://localhost:2931${path}`, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			},
			params: params || undefined,
		});
	},
	delete(path) {
		return axios.delete(`http://localhost:2931${path}`, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			},
		});
	},
	patch(path, params) {
		return axios.patch(`http://localhost:2931${path}`, params,{
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			}
		});
	}
};
