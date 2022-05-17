<template>
	<div class="container">
		<div class="login__navbar">
			<h3 class="login__navbar-logo">Github users</h3>

			<div class="login__navbar-btns">
				<el-button v-if="!$auth.isAuthenticated" @click="loginGithub">
					Github Login
				</el-button>
				<el-button v-if="$auth.isAuthenticated" @click="logout"
					>Logout</el-button
				>
			</div>
		</div>
		<Cards v-if="$auth.isAuthenticated" />
		<div v-else class="notLogged">
			<h1>Please login to access to the app</h1>
		</div>
	</div>
</template>
<script>
import Cards from "./Cards";
export default {
	components: {
		Cards,
	},
	data() {
		return {};
	},
	computed: {
		token() {
			return this.$store.getters.token;
		},
	},
	watch: {
		"$auth.isAuthenticated": async function(val) {
			if (val) {
				this.$auth.getTokenSilently().then((userToken) => {
					this.$store.dispatch("GET_USERS", {
						token: userToken,
						from: 30,
					});
				});
			}
		},
	},
	methods: {
		logout() {
			this.$auth.logout();
		},
		loginGithub() {
			this.$auth.loginWithPopup();
		},
	},
};
</script>

<style>
.container {
	width: 100%;
	height: 100%;
}
.logged,
.notLogged {
	display: flex;
	justify-content: center;
	padding: 20px;
}
.login__navbar-logo {
	color: white;
	font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
		"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
	font-size: 20px;
}
.login__navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	background-color: #6b7db3;
	padding: 10px 50px;
}
</style>
