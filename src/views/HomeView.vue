<template>
	
  <div class="home">
	<b-navbar>

<template #end>
	<b-navbar-item tag="div">
		<div class="buttons">


			

			<a class="button is-dark">
				<router-link to="/create">Insert User</router-link>

			</a>
			<a class="button is-light" :to="{ path: '/logout' }">
				<router-link to="/logout">Log Out</router-link>
			</a>
		</div>
	</b-navbar-item>
</template>
</b-navbar>
    <TableComp :columns="columns" :data="users" @edit-user="handleEditUser" @delete-user="handleDeleteUser"></TableComp>
  </div>
</template>

<script>
import TableComp from '@/components/TableComp.vue';
import { BuefyHelper } from '@/helpers/buefyHelper';
import NetworkManager from "@/network";

export default {
  data() {
    return {
      users: [],
      columns: [
        { field: "id", label: "ID", width: "40", numeric: true, searchable: true },
        { field: "name", label: "Name", searchable: true },
        { field: "email", label: "Email", searchable: true },
        { field: "img", label: "Image" },
        { field: "action", label: "Action", centered: true, sortable: false },
      ]
    };
  },
  components: {
    TableComp
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await NetworkManager.apiRequest("list");
        console.log(response);
        this.users = response.data.users.map(user => ({
          ...user,
          img: user.img ? `${process.env.VUE_APP_BASE_URL}${user.img}` : null,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }, handleEditUser(id) {
      console.log('Edit user with ID:', id);
      this.$router.push({ name: 'edit', params: { id: id } })
    },
    async handleDeleteUser(id) {
      const isConfirm = await BuefyHelper.showConfirmAlert('Confirm Action', 'Are you sure you want to proceed?', 'Yes');
      if (isConfirm) {
        try {
          await NetworkManager.apiRequest(
            `delete/${id}`,
            {},
            true,
            "application/json"
          );
          this.fetchUserData();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }

    }
  }
};
</script>
