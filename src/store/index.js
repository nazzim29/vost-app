import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import users from "./usersModule"
import fonctions from "./fonctionModule";
export default createStore({
  plugins: [createPersistedState()],
  modules: {
    users,
    fonctions
  }
})
