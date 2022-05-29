import Api from "./api";

export default {
	create(vente) {
		return Api.post("/vente", vente);
	},
	get(query) {
		return Api.get("/vente", query);
	},
	show(id) {
		return Api.get("/vente/" + id);
	},
	update(vente) {
		return Api.put("/vente/" + vente.id, vente);
	},
	destroy(id) {
		return Api.delete("/vente/" + id);
	},
	addProduit(venteId, products) {
		return Api.post(
			"/vente/" + venteId + "/produit",
			products.map((el) => ({
				id: el.id,
				quantite: el.produits_vente.quantite,
				prix: el.produits_vente.prix,
			}))
		);
	},
};
