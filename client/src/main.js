import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { domain, clientId, audience } from "../auth_config.json";
import store from "./store/store";
import { Auth0Plugin } from "./auth";
import cors from "core-js";
import infiniteScroll from "vue-infinite-scroll";

Vue.use(vuex);
Vue.use(cors);
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.use(Auth0Plugin, {
	domain,
	clientId,
	audience,
	onRedirectCallback: (appState) => {
		router.push(
			appState && appState.targetUrl
				? appState.targetUrl
				: window.location.pathname
		);
	},
});
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
