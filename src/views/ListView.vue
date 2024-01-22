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
                <div v-else>
                  <img :src="`${props.row.img}`" width="70px" height="70px">
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
                  <a @click.prevent="editUser(props.row)">Update</a> |
                  <a @click.prevent="openDeleteConfirmation(props.row.id)">Delete</a>
                </span>
              </template>
            </b-table-column>
          </b-table>

          <!-- UserForm Component for Creating/Updating Users -->
          <UserForm
            v-if="showAddForm || showEditForm"
            :is-editing="showEditForm"
            :user-data="showEditForm ? editedUser : newUser"
            @form-submitted="handleFormSubmitted"
            @form-canceled="cancelForm"
          />
        </div>
      </div>
      <button @click="toggleAddForm">Add New User</button>
    </section>
  </div>
</template>

<script>
import NetworkManager from "@/network";
import UserForm from "@/components/UserForm.vue";

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
      showUserForm: false,
      selectedUser: null,
      showEditForm: false,
      editedUser: {
        id: null,
        name: "",
        email: "",
        img: null,
      },
      showAddForm: false,
      newUser: {
        name: "",
        email: "",
        pass: "",
        img: null,
      },
    };
  },
  components: {
    UserForm,
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
    editUser(user) {
  console.log("Update user with ID:", user);
  this.editedUser = { ...user };
  this.selectedUser = user;
  this.showEditForm = true; // Corrected line
},
    cancelEdit() {
      this.showEditForm = false;
      this.editedUser = {
        id: null,
        name: "",
        email: "",
        img: null,
      };
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.editedUser.img = file;
    },
    async updateUser(submittedFormData) {
      try {
        console.log(submittedFormData);
        await NetworkManager.apiRequest(
          `update/${this.editedUser.id}`,
          submittedFormData,
          true,
          "multipart/form-data"
        );

        this.showEditForm = false;
        this.fetchUserData();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    toggleAddForm() {
      this.showAddForm = true;
    },
    cancelAdd() {
      this.showAddForm = false;
      this.newUser = {
        name: "",
        email: "",
        img: null,
      };
    },
    handleNewFileChange(event) {
      const file = event.target.files[0];
      this.newUser.img = file;
    },
    async addUser(submittedFormData) {
      try {
        await NetworkManager.apiRequest(`create`, submittedFormData, true, "multipart/form-data");
        this.showAddForm = false;
        this.fetchUserData();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    handleFormSubmitted({ action, data }) {
      console.log("data Get" + data + " AC " + (action === 'update'));
      if (action === 'add') {
        // Handle data for add action
        this.addUser(data);
        console.log(data);
      } else if (action === 'update') {
        // Handle data for update action
        this.updateUser(data);
      }
    },
    cancelForm() {
      this.showAddForm = false;
      this.showEditForm = false;
    },
  },
};
</script>
