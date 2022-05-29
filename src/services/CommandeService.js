import Api from "./api";

export default {
	create(commande) {
		return Api.post("/commande", commande);
	},
	get(query) {
		return Api.get("/commande", query);
	},
	show(id) {
		return Api.get("/commande/" + id);
	},
	update(commande) {
		return Api.put("/commande/" + commande.id, commande);
	},
	destroy(id) {
		return Api.delete("/commande/" + id);
	},
	addProduit(commandeId, product) {
		return Api.post("/commande/" + commandeId + "/produit", product);
	},
	updateProduit(commandeId, product) {
		return Api.patch(
			"/commande/" + commandeId + "/produit/" + product.id,
			product
		);
	},
	downloadBonDeCommande(id) {
		return Api.get("/commande/" + id + "/document", {
			
		}, { ResponseType: "blob" });	
	},
	deleteProduit(commandeId, productId) {
		return Api.delete("/commande/" + commandeId + "/produit/" + productId);
	},
	validate(commandeId) {
		return Api.get(`/commande/${commandeId}/validate`);
	},
	uploadBonDeCommande(id, data) {
		return Api.post(`/commande/${id}/bon-de-commande`, data);
	}
};
