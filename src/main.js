import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-select/dist/vue-select.css";
import "./assets/tailwind.css";

import "@vueup/vue-quill/dist/vue-quill.snow.css"
import "./plugins/registerServiceWorker";
import NavBar from "./components/NavBar.vue";
import vSelect from "vue-select";
createApp(App)
	.use(store)
	.use(router)
	.component('v-select',vSelect)
	.component("NavBar", NavBar)
	.mount("#app");
