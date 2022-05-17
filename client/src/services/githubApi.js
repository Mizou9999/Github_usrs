import axios from "axios";

export default {
	async getUsers(formdata) {
		let url = `https://api.github.com/users?per_page=${formdata.from}`;
		return await axios.get(url, {
			headers: {
				Authorization: formdata.accessToken,
			},
		});
	},
	async getUser(accessToken, id) {
		return await axios.get(`https://api.github.com/user/${id}`, {
			headers: {
				Authorization: accessToken,
			},
		});
	},
	async getRepos(accessToken, link) {
		return await axios.get(link, {
			headers: {
				Authorization: accessToken,
			},
		});
	},
	async searchUser(accessToken, query) {
		let res = await axios.get(`https://api.github.com/users/${query}`);
		return res.data;
	},
	async getMoreUsers(formdata) {
		let url = `https://api.github.com/users?since=${formdata.from}?per_page=30`;
		return await axios.get(url, {
			headers: {
				Authorization: formdata.accessToken,
			},
		});
	},
};
