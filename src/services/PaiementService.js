import Api from "./api";

export default {
  create(paiement) {
    return Api.post("/paiement", paiement);
  },
  get(query) {
    return Api.get("/paiement", query);
  },
  show(id) {
    return Api.get("/paiement/" + id);
  },
  update(paiement) {
    return Api.put("/paiement/" + paiement.id, paiement);
  },
  destroy(id) {
    return Api.delete("/paiement/" + id);
  },
  addProduit(paiementId, product) {
    return Api.post("/paiement/" + paiementId + "/produit", product);
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
