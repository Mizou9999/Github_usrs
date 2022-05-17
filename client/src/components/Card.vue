<template>
	<div class="container">
		<el-row>
			<el-col>
				<el-card
					v-loading="isLoading"
					:body-style="{
						display: 'flex',
						flexDirection: 'column',
						padding: '10px',
					}"
				>
					<img :src="user.avatar_url" class="image" />
					<div class="user__info">
						<div class="info_container">
							<p>
								Name: <span>{{ user.name ? user.name : user.login }}</span>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.email">
								Name: <span>{{ user.name }}</span>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.bio">
								Bio: <span>{{ user.bio }}</span>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.company">
								Blog:
								<a target="_blank" :href="`https://${user.blog}`">{{
									user.company
								}}</a>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.followers">
								Followers:
								<span>{{ user.followers }}</span>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.location">
								Address:
								<span>{{ user.location }}</span>
							</p>
						</div>
						<div class="info_container">
							<p v-if="user.public_repos">
								Repos Total :
								<span>{{ user.public_repos }}</span>
							</p>
						</div>
					</div>
					<div class="btns_container">
						<div class="bottom ">
							<el-button
								type="text"
								class="button"
								@click="handlRepos(user.repos_url)"
								>Get Repos</el-button
							>
						</div>
						<div class="bottom ">
							<el-button type="text" class="button" @click="$emit('close')"
								>Back</el-button
							>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" v-if="isRepos" class="repo_container">
			<el-table
				class="repo_table"
				:default-sort="{ prop: 'name', order: 'descending' }"
				:data="repos"
				style="width: 100%"
			>
				<el-table-column prop="name" label="Name" sortable width="180">
				</el-table-column>
				<el-table-column prop="description" label="Description" width="280">
				</el-table-column>
				<el-table-column prop="language" label="Language" width="120">
				</el-table-column>
				<el-table-column prop="forks_count" label="Forks number" width="120">
				</el-table-column>
				<el-table-column prop="full_name" label="Full name" width="220">
				</el-table-column>
				<el-table-column prop="visibility" label="Visibility" width="120">
				</el-table-column>
				<el-table-column prop="open_issues" label="Open issues" width="120">
				</el-table-column>
			</el-table>
			<div class="btns_container back">
				<div class="bottom ">
					<el-button type="text" class="button" @click="isRepos = false"
						>Back</el-button
					>
				</div>
			</div>
		</el-row>
	</div>
</template>

<script>
export default {
	props: ["user"],

	data() {
		return {
			isRepos: false,
		};
	},
	watch: {
		repos() {
			this.isRepos = true;
		},
	},
	computed: {
		repos() {
			return this.$store.state.repos;
		},
		choosenUser() {
			let me = this.$store.state.choosenUser;
			return me;
		},
	},
	methods: {
		handlRepos(link) {
			this.$store.dispatch("GET_REPOS", link);
		},
	},
	created() {
		!this.user ? (this.isLoading = true) : (this.isLoading = false);
	},
};
</script>

<style scoped>
::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background: #a6afcc;
}

::-webkit-scrollbar-thumb:hover {
	background: #6b7db3;
}
.repo_table {
	padding: 40px 5px;
	height: 93%;
	overflow-y: scroll;
}
.repo_container {
	position: fixed;
	top: 80px;
	bottom: 80px;
	left: 80px;
	right: 80px;
	background: white;
	padding: 20px;
	width: 85%;
}
.btns_container {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.back {
	margin-top: 10px;
}
.btns_container .button {
	color: #6b7db3;
	font-weight: bold;
	padding: 10px 20px;
	border: 1px solid #6b7db3;
}
.user__info {
	padding: 14px;
	width: 460px;
}
.user__info p {
	font-size: 16px;
	margin: 10px 0;
	text-align: left;
	display: block;
}
.user__info a {
	color: #6b7db3;
}
.user__info a,
.user__info span {
	font-weight: bold;
	text-decoration: none;
}

.container {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(15, 15, 15, 0.534);
}

.close-icon {
	align-self: flex-end;
}
</style>
