import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./plugins/registerServiceWorker";
import NavBar from "./components/NavBar.vue";
import AsyncComputed from "vue-async-computed";
createApp(App)
	.use(store)
	.use(router)	
	.use(AsyncComputed)

	.component("NavBar", NavBar)
	.mount("#app");
