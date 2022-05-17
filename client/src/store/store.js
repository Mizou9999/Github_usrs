import Vue from "vue";
import Vuex from "vuex";
import githubApi from "../services/githubApi";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: null,
		users: [],
		choosenUser: "",
		repos: "",
	},
	actions: {
		GET_USERS({ commit }, formData) {
			githubApi.getUsers(formData).then((response) => {
				commit("USERS_HANDLE", { data: response.data, formData });
				return response.data;
			});
		},
		GET_MORE_USERS({ commit }, from) {
			githubApi
				.getMoreUsers({ token: this.state.token, from })
				.then((response) => {
					commit("GET_MORE_USERS", response.data);
				});
		},
		GET_USER({ commit }, payload) {
			githubApi.getUser(payload.token, payload.id).then((response) => {
				commit("USER_HANDLE", response.data);
			});
		},
		GET_REPOS({ commit }, link) {
			githubApi.getRepos(this.state.payload, link).then((response) => {
				commit("GET_REPOS", response.data);
			});
		},
		SEARCH_HANDLE({ commit }, query) {
			let fullName = query.split(" ").join("");
			githubApi.searchUser(this.state.token, fullName).then((response) => {
				commit("SEARCH_HANDLE", response.data);
			});
		},
	},
	mutations: {
		GET_MORE_USERS(state, payload) {
			state.users = [...state.users, ...payload];
		},
		USERS_HANDLE(state, payload) {
			state.token = payload.token;

			payload.data.forEach((user) => {
				state.users.push(user);
			});
		},
		USER_HANDLE(state, payload) {
			state.choosenUser = payload;
		},
		GET_REPOS(state, payload) {
			state.repos = payload;
		},
		// SEARCH_HANDLE(state, payload) {
		// 	console.log("SEARCh_HANDLE", payload);
		// },
	},
	getters: {
		getToken: function(state) {
			return state.token;
		},
		getUsers: function(state) {
			return state.users;
		},
		getRepos: function(state) {
			return state.repos;
		},
	},
});
export default store;
