<template>
  <div class="login-page">
    <section class="section">
      <div class="card">
        <div class="list-card-content">
          <b-table :data="data" :debounce-search="1000" striped>

            <b-table-column field="id" label="ID" numeric width="20">
              <template v-slot:header="{ column }">
                <b-tooltip :label="column.label" append-to-body dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              <template v-slot="props">
                {{ props.row.id }}
              </template>
            </b-table-column>

            <b-table-column field="name" label="User Name" centered>

              <template v-slot:header="{ column }">
                <b-tooltip :label="column.label" append-to-body dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              <template v-slot="props">
                {{ props.row.name }}
              </template>
            </b-table-column>

            <b-table-column field="email" label="email" centered>
              <template v-slot:header="{ column }">
                <b-tooltip :label="column.label" append-to-body dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              <template v-slot="props">
                {{ props.row.email }}
              </template>
            </b-table-column>

            <b-table-column field="img" label="Img" centered>
              <template v-slot:header="{ column }">
                <b-tooltip :label="column.label" append-to-body dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              <template v-slot="props">
                <div v-if="props.row.img === '-'">-</div>
                <div v-else> <img :src="`${props.row.img}`" width="70px" height="70px">
                </div>
              </template>
            </b-table-column>

            <b-table-column field="action" label="Action" centered>
              <template v-slot:header="{ column }">
                <b-tooltip :label="column.label" append-to-body dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              <template v-slot="props">

                <span>
                  <a @click.prevent="editUser(props.row.id)">Update</a> |
                  <a @click.prevent="openDeleteConfirmation(props.row.id)">Delete</a>
                </span>

              </template>
            </b-table-column>

          </b-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NetworkManager from "@/network";

export default {
  data() {
    return {
      data: [],
      columns: [
        { field: "id", label: "ID", width: "40", numeric: true, searchable: true },
        { field: "name", label: "Name", searchable: true },
        { field: "email", label: "Email", searchable: true },
        { field: "img", label: "Image" },
        { field: "action", label: "Action", centered: true, sortable: false },
      ],
      deleteUserId: null,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await NetworkManager.apiRequest("list", {}, "application/json");
        this.data = response.data.users.map(this.mapUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    mapUserData(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        img: user.img ? `${process.env.VUE_APP_BASE_URL}${user.img}` : "-",
      };
    },
    openDeleteConfirmation(userId) {
      this.deleteUserId = userId;

      this.$buefy.dialog.confirm({
        title: "Deleting account",
        message: "Are you sure you want to delete this account?",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        onConfirm: this.deleteUser,
        onCancel: this.resetDeleteUserId,
      });
    },
    resetDeleteUserId() {
      this.deleteUserId = null;
    },
    async deleteUser() {
      try {
        if (this.deleteUserId) {
          await NetworkManager.apiRequest(`delete/${this.deleteUserId}`, {}, "DELETE", "application/json");
          this.data = this.data.filter((user) => user.id !== this.deleteUserId);
          this.$buefy.toast.open("Account deleted!");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        this.$buefy.toast.open("Error deleting user");
      } finally {
        this.resetDeleteUserId();
      }
    },
    editUser(userId) {
      console.log("Update user with ID:", userId);
    },
  },
};
</script>
