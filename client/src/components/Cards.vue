<template>
	<div class="container">
		<h1>List of github users</h1>
		<div class="search_container" v-if="$auth.isAuthenticated">
			<el-input large placeholder="Please input" v-model="searchQuery">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<el-row
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="busy"
			infinite-scroll-distance="10"
			infinite-scroll-throttle-delay="1000"
		>
			<el-col
				v-for="(user, index) in filtredUsers"
				:key="index"
				class="card-column"
			>
				<el-card>
					<div class="card_container">
						<div class="avatar_container" @click="openCard(user.id)">
							<el-image
								style="width:200px;height:200px; border-radius:10px"
								:src="user.avatar_url"
							></el-image>
							<h4>
								{{ user.login }}
							</h4>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<transition name="el-fade-in-linear">
			<Card
				v-if="isUserChoosen"
				@close="isUserChoosen = false"
				:user="choosenUser"
			/>
		</transition>
	</div>
</template>

<script>
import Card from "./Card.vue";
import { mapState } from "vuex";
export default {
	components: {
		Card,
	},

	data() {
		return {
			isDetails: false,
			isUserChoosen: false,
			searchQuery: "",
			busy: true,
		};
	},
	mounted() {
		setTimeout(() => {
			this.busy = false;
		}, 2000);
	},

	computed: {
		...mapState({
			users: (state) => state.users,
			token: (state) => state.token,
			choosenUser: (state) => state.choosenUser,
		}),
		filtredUsers() {
			return this.users.filter((user) => {
				let small = user.login
					.toLowerCase()
					.includes(this.searchQuery.toLowerCase());
				return small;
			});
		},
	},
	watch: {
		choosenUser() {
			this.isUserChoosen = true;
		},
	},
	methods: {
		loadMore() {
			this.busy = false;
			!this.busy && this.$store.dispatch("GET_MORE_USERS", this.users.length);
		},
		openCard(userId) {
			this.$auth.getTokenSilently().then((userToken) => {
				this.$store.dispatch("GET_USER", { token: userToken, id: userId });
			});
		},
	},
};
</script>
<style scoped>
.search_container {
	margin: 20px;
}
.card-column {
	width: 260px;
	margin: 20px;
}
.container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.avatar_container {
	cursor: pointer;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	margin: 10px 0;
	width: 100%;
	align-items: center;
	justify-content: center;
}

.avatar_container h4 {
	margin-top: 10px;
	font-weight: bold;
	text-align: center;
}
</style>
