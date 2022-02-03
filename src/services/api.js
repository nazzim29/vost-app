import axios from "axios";
import store from "@/store";

axios.defaults.port = 2931;
export default {
	post(path, body) {
		return axios.post(`http://localhost:2931${path}`, body, {
			headers: {
				Authorization: `${store.state.jwt || ""}`,
			},
		});
	},
	get(path, params = null) {
		return axios.get(`http://localhost:2931${path}`, {
			headers: {
				Authorization: `${store.state.jwt || ""}`,
			},
			params: params || undefined,
		});
	},
	delete(path) {
		return axios.delete(`http://localhost:2931${path}`, {
			headers: {
				Authorization: `${store.state.jwt || ""}`,
			},
		});
	},
	patch(path, params) {
		return axios.patch(`http://localhost:2931${path}`, params,{
			headers: {
				Authorization: `${store.state.jwt || ""}`,
			}
		});
	}
};
