import axios from "axios";
import store from "@/store";

const api_url = process.env.VUE_APP_API_URL;
axios.defaults.port = 2931;
export default {
	post(path, body, { ContentType } = {}) {
		return axios.post(`${api_url}${path}`, body, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
				"Content-Type": ContentType,
			},
		});
	},
	get(path, params = null, config) {
		return axios.get(`${api_url}${path}`, {
			...config,
			...{
				headers: {
					Authorization: `Bearer ${store.state.users.jwt || ""}`,
				},
			},
			params: params,
		});
	},
	delete(path) {
		return axios.delete(`${api_url}${path}`, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			},
		});
	},
	patch(path, params) {
		return axios.patch(`${api_url}${path}`, params, {
			headers: {
				Authorization: `Bearer ${store.state.users.jwt || ""}`,
			},
		});
	},
};
