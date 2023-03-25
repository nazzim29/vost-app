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
	const data = new FormData();
	for (let key in produit) {
		// if (typeof produit[key] === "object") {
		// 	data.append(key, JSON.stringify(produit[key]));
		// 	console.log(JSON.stringify(produit[key]));
		// 	continue;
		// }
		data.append(key, produit[key]);
	}
	return Api.post("/produit",data , { ContentType: "multipart/form-data" });
}
export function destroy(id) {
	return Api.delete(`/produit/${id}`);
}
export function update(produit) {
	const data = new FormData();
	for (let key in produit) {
		console.log({ key: produit[key] });
		// if (typeof produit[key] === "object") {
		// 	data.append(key, JSON.stringify(produit[key]));
		// 	console.log(JSON.stringify(produit[key]));
		// 	continue;
		// }
		data.append(key, produit[key]);
	}
	console.log(data.values())
	return Api.post(`/produit/${produit.id}`, data, {
		ContentType: "multipart/form-data",
	});
}
export function addFormule(formule) {
	return Api.post(`/produit/${formule.ProduitId}/formule`, formule);
}
export function removeFormule(formule) {
	return Api.delete(`/produit/${formule.ProduitId}/formule/${formule.MatiereId}`);
}
export default {
	get,
	show,
	destroy,
	update,
	create,
	getCouleurs,
	getTypes,
	addFormule,
	removeFormule,
};
