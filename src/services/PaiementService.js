import Api from "./api";

export default {
  create(paiement) {
    return Api.post("/payement", paiement);
  },
  get(query) {
    return Api.get("/payement", query);
  },
  show(id) {
    return Api.get("/payement/" + id);
  },
  update(paiement) {
    return Api.put("/payement/" + paiement.id, paiement);
  },
  destroy(id) {
    return Api.delete("/payement/" + id);
  },
  addProduit(paiementId, product) {
    return Api.post("/payement/" + paiementId + "/produit", product);
  },
  updateProduit(paiementId, product) {
    return Api.patch(
      "/paiement/" + paiementId + "/produit/" + product.id,
      product
    );
  },
  downloadBonDeCommande(id) {
    return Api.get(
      "/paiement/" + id + "/document",
      {},
      { ResponseType: "blob" }
    );
  },
  deleteProduit(paiementId, productId) {
    return Api.delete("/paiement/" + paiementId + "/produit/" + productId);
  },
  validate(paiementId) {
    return Api.get(`/paiement/${paiementId}/validate`);
  },
  uploadBonDeCommande(id, data) {
    return Api.post(`/paiement/${id}/bon-de-paiement`, data);
  },
};
