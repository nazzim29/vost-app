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
    }
}