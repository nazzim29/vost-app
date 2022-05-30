import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

function loadView(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadView("Home"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/parametres",
    name: "Parametres",
    component: loadView("Parametres"),
    meta: {
      auth: true,
      role: "admin",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: loadView("user/Login"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/user",
    name: "User",
    component: loadView("user/UsersIndex"),
    meta: {
      auth: true,
      autorisation: "read-utilisateur",
    },
  },
  // {
  // 	path: "/user/new",
  // 	name: "NewUser",
  // 	component: loadView("user/NewUser"),
  // 	meta: {
  // 		auth: true,

  // 	}
  // },
  // {
  // 	path: "/user/:id",
  // 	name: "UserProfile",
  // 	component: loadView("user/UsersIndex"),
  // 	meta: {
  // 		auth:true,
  // 	}
  // },
  // {
  // 	path: "/user/edit/:id",
  // 	name: "UserEdit",
  // 	component: loadView("user/NewUser"),
  // 	meta: {
  // 		auth: true,
  // 	}
  // },
  // {
  // 	path: "/me",
  // 	name: "Profile",
  // 	component: loadView("user/Profile"),
  // 	meta: {
  // 		auth: true,
  // 	}
  // },
  {
    path: "/fonction",
    name: "Fonction",
    component: loadView("user/Fonction"),
    meta: {
      auth: true,
      role: "admin",
    },
  },
  {
    path: "/commandes",
    name: "Commandes",
    component: loadView("commandes/Commandes"),
    meta: {
      auth: true,
      autorisation: "read-commande",
    },
  },
  {
    path: "/commandes/:id",
    name: "Commande",
    component: loadView("commandes/CommandeShow"),
    meta: {
      auth: true,
      autorisation: "read-commande",
    },
  },
  {
    path: "/produits",
    name: "Produits",
    component: loadView("produits/Produits"),
    meta: {
      auth: true,
      autorisation: "read-produit",
    },
  },
  {
    path: "/productions",
    name: "Productions",
    component: loadView("produits/Productions"),
    meta: {
      auth: true,
      autorisation: "read-production",
    },
  },
  {
    path: "/MatierePremiere",
    name: "MatierePremiere",
    component: loadView("produits/MatierePremiere"),
    meta: {
      auth: true,
      autorisation: "read-matiere",
    },
  },
  // {
  // 	path: "/Formules",
  // 	name: "Formules",
  // 	component: loadView("produits/Formules"),
  // 	meta: {
  // 		auth: true,

  // 	}
  // },
  // {
  // 	path: "/messagerie",
  // 	name: "messagerie",
  // 	component: loadView("Messagerie"),
  // 	meta: {
  // 		auth: true,
  // 	}
  // },
  {
    path: "/contact-client",
    name: "ContactClient",
    component: loadView("client/ContactClient"),
    meta: {
      auth: true,
      autorisation: "read-contactclient",
    },
  },
  {
    path: "/Ventes/:id",
    name: "Vente",
    component: loadView("vente/VenteShow"),
    meta: {
      auth: true,
      autorisation: "read-vente",
    },
  },
  {
    path: "/Ventes",
    name: "Ventes",
    component: loadView("vente/Ventes"),
    meta: {
      auth: true,
      autorisation: "read-vente",
    },
  },
  {
    path: "/clients",
    name: "Clients",
    component: loadView("client/Client"),
    meta: {
      auth: true,
      autorisation: "read-client",
    },
  },
  {
    path: "/clients/:id",
    name: "ClientShow",
    component: loadView("client/ClientShow"),
    meta: {
      auth: true,
      autorisation: "read-client",
    },
  },
  {
    path: "/paiements",
    name: "Paiements",
    component: loadView("paiement/index"),
    meta: {
      auth: true,
      //   autorisation: "read-paiement",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
let interval = null;
async function checklogin() {
  if (store.getters.isAuth) {
    if (!interval) {
      interval = setInterval(async () => {
        await store.dispatch("checkAuth");
      }, 5000);
    }
    return true;
  } else {
    return false;
  }
}
router.beforeEach(async function (to, from, next) {
  console.log();
  let isLogged = await checklogin();
  //if to.auth is true and user is not logged in
  if (to.meta.auth && !isLogged) {
    console.log("not logged in");
    return next({
      name: "Login",
    });
  } else if (to.meta.auth && isLogged) {
    console.log("logged in");
    if (to.meta.role) {
      if (store.getters.getCurrentUser.Profile.nom === to.meta.role) {
        return next();
      } else {
        console.log("not authorized (role)");
        return next("/");
      }
    } else if (to.meta.autorisation) {
      if (
        store.getters.getCurrentUser.Profile.Autorisations.find(
          (el) => el.nom == to.meta.autorisation
        )
      ) {
        return next();
      } else {
        console.log("not authorized (autorisation)");
        return next("/");
      }
    }
  }
  return next();
  // if (
  // 	to.meta.auth === true
  // ) {
  // 	if (isLogged && (to.meta.role == store.getters.getCurrentUser.Profile.nom ||
  // 		store.getters.getCurrentUser.Profile.Autorisations.find(
  // 			(el) => el.nom == to.meta.autorisation
  // 		))) next();
  // 	else next("/");
  // } else if (to.meta.auth === false) {
  // 	if (isLogged) next(from);
  // 	else next();
  // }
});
export default function (app) {
  app.router = router;
  app.use(router);
}
