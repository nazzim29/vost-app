import Api from "./api";

export function get(query) {
	return Api.get("/production", { ...query });
}
export function show(id) {
	return Api.get("/production/" + id);
}
export function create(production) {
	return Api.post("/production", production);
}
export function destroy(id) {
	return Api.delete(`/production/${id}`);
}
export function update(production) {
	return Api.patch(`/production/${production.id}`, production);
}
export default {
	get,
	show,
	destroy,
	update,
	create,
};
