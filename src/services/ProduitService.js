import Api from "./api";

export function get(query) {
	return Api.get("/produit", { ...query });
}
export function getCouleurs(query) {
    return Api.get("/couleur", { ...query });
}
export function getTypes(query) {
    return Api.get("/typeProduit", { ...query });
}	
export function show(id) {
	return Api.get("/produit/" + id);
}
export function create(produit) {
	return Api.post("/produit", produit);
}
export function destroy(id) {
	return Api.delete(`/produit/${id}`);
}
export function update(produit) {
	return Api.patch(`/produit/${produit.id}`, produit);
}
export default {
	get,
	show,
	destroy,
	update,
	create,
    getCouleurs,
    getTypes
};
