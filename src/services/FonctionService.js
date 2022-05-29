import Api from "./api";



export function get(query) {
	return Api.get("/fonction", { ...query });
}
export function create(fonction) {
	return Api.post("/fonction", fonction,{});
}
export function update(fonction) {
	return Api.post(`/fonction/${fonction.id}`,fonction,{})
}
export function destroy(id) {
	return Api.delete(`/fonction/${id}`)
}
export default {
	get,create,update,destroy
};
