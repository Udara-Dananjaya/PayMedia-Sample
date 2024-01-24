<template>
	<div></div>
  </template>
  
  <script>
  import NetworkManager from "@/network";
  
  export default {
	async mounted() {
		await this.logOutUser();
	},
	methods: {
		async logOutUser() {
			try {
				await NetworkManager.apiRequest('logout');
				this.$store.dispatch('auth/delAuthToken'); // Pass null or an empty string if needed
				this.$router.push('/login');
			} catch (error) {
				console.error('Error during logout:', error);
			}
		},
	},
  };
  </script>
  