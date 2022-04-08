import Api from "./api";

export function get(query) {
	return Api.get("/matiere", { ...query });
}
export function show(id) {
	return Api.get("/matiere/" + id);
}
export function create(matiere) {
	return Api.post("/matiere", matiere);
}
export function destroy(id) {
	return Api.delete(`/matiere/${id}`);
}
export function update(matiere) {
	return Api.patch(`/matiere/${matiere.id}`, matiere);
}
export function arrivage(matieres){
    return Api.post("/matiere/arrivage", matieres);
}
export default {
	get,
	show,
	destroy,
	update,
    create,
    arrivage
};
