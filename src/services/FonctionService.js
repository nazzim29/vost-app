import Api from "./api";



export function get(query) {
	return Api.get("/fonction", { params: query });
}
export function create(fonction) {
	return Api.post("/fonction", fonction);
}
export function update(fonction) {
	return Api.post(`/fonction/${fonction.id}`,fonction)
}
export default {
	get,create,update
};
