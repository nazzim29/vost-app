import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import users from "./usersModule";
import fonctions from "./fonctionModule";
import produits from "./produitModule";
import commandes from "./commandeModule";
import clients from "./clientModule";
import vente from "./venteModule";
import matiere from "./matiereModule";
import production from "./productionModule";
import paiement from "./paiementModule";
export default createStore({
  plugins: [
    createPersistedState({
      paths: ["users.jwt", "users.authenticated", "users.user"],
    }),
  ],
  modules: {
    users,
    fonctions,
    produits,
    commandes,
    clients,
    vente,
    matiere,
    production,
    paiement,
  },
});
