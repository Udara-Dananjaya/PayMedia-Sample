<!-- components/EditUser.vue -->
<template>
      <section class="section">
        <div class="container">
            <h1 class="title is-2">Login</h1>
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">

                  <div class="field">
                    <div class="control">
                      <ValidationProvider rules="required" name="Name" v-slot="{ errors, valid }">
                        <div class="field">
                          <label for="name" class="label">Name</label>
                          <div class="control">
                            <input id="name" type="text" class="input" v-model="localUserData.name" placeholder="Name" />
                          </div>
                          <p class="help" :class="{ 'is-danger': errors[0], 'is-success': valid }">
                            {{ errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <ValidationProvider rules="required" name="Email" v-slot="{ errors, valid }">
                        <div class="field">
                          <label for="email" class="label">Email</label>
                          <div class="control">
                            <input id="email" type="text" class="input" v-model="localUserData.email" placeholder="Email" />
                          </div>
                          <p class="help" :class="{ 'is-danger': errors[0], 'is-success': valid }">
                            {{ errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <ValidationProvider rules="image" name="Image" v-slot="{ errors, valid }">
                        <div class="field">
                          <label for="image" class="label">Image</label>
                          <div class="control">
                            <input type="file" accept="image/*" @change="handleFileChange" class="form-control-file"
                              id="image" />
                          </div>
                          <div class="border p-2 mt-3">
                            <p>Preview Here:</p>
                            <img :src="isEditingImg ? localUserData.img : imgurl" class="img-fluid" width="100px" />
                          </div>
                          <p class="help" :class="{ 'is-danger': errors[0], 'is-success': valid }">
                            {{ errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="field" v-if="!isEditing">
                    <div class="control">
                      <ValidationProvider rules="required" name="Password" v-slot="{ errors, valid }">
                        <div class="field">
                          <label for="password" class="label">Password</label>
                          <div class="control">
                            <input id="password" type="password" class="input" v-model="localUserData.password"
                              placeholder="Password" />
                          </div>
                          <p class="help" :class="{ 'is-danger': errors[0], 'is-success': valid }">
                            {{ errors[0] }}
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <button class="button is-block is-primary is-fullwidth is-medium" @click="handleSubmit(submit)">
                    <span> {{ isEditing ? 'Update User' : 'Add User' }}</span>
                  </button>
                  <br />
                </ValidationObserver>          
        </div>
      </section>
  </template>
  
  <script>
  import NetworkManager from "@/network";
  import '@/helpers/validators';

  export default {
    data() {
      return {
        isEditing:false,
        isEditingImg: null,
        imgurl: null, // Add imgurl to data
        localUserData: {
          id: null,
          name: "",
          email: "",
          img: null,
        },
      };
    },
    mounted() {
      const userId = this.$route.params.id;
      this.fetchUserDataById(userId);
    },
    methods: {
      async fetchUserDataById(userId) {
    try {
      const response = await NetworkManager.apiRequest(`list/${userId}`, {}, true, "application/json");
      
      if (response.success) {
        const userData = response.data.user;
  
        this.localUserData = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          img: userData.img ? `${process.env.VUE_APP_BASE_URL}${userData.img}` : null,
        };

        this.isEditing=true;
      } else {
        console.error("Error fetching user data:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
      async updateUser() {
        try {
          const formData = new FormData();
          formData.append("id", this.localUserData.id);
          formData.append("name", this.localUserData.name);
          formData.append("email", this.localUserData.email);
          if (this.localUserData.img) {
            formData.append("img", this.localUserData.img);
          }
  
          await NetworkManager.apiRequest(
            `update/${this.localUserData.id}`,
            formData,
            true,
            "multipart/form-data"
          );
  
         
        } catch (error) {
          console.error("Error updating user:", error);
        }
      },
      async addUser() {
      try {
        const formData = new FormData();
        formData.append("name", this.localUserData.name);
        formData.append("email", this.localUserData.email);
        formData.append("password", this.localUserData.password);
        if (this.localUserData.img) {
          formData.append("img", this.localUserData.img);
        }
        await NetworkManager.apiRequest(
            `create`,
            formData,
            true,
            "multipart/form-data"
          );


      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
      cancelEdit() {
        this.$router.push({ name: 'UserList' });
      },
      handleFileChange(event) {
        const file = event.target.files[0];
      console.log('File changed:', file);
      this.localUserData.img = file;
      this.imgurl = URL.createObjectURL(file);
      this.isEditingImg = false;
      
      },
      submit() {
      if (this.$refs.observer.validate()) {
        if (this.isEditing) {
          this.updateUser();

        } else {
          this.addUser();
        }

      } else {
        console.log("Form validation failed");
      }
    },
    },
  };
  </script>