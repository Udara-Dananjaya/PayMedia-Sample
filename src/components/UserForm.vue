<template>
  <div class="login-page">
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <!-- <div class="column is-half"> .// -->
          <div class="card">
            <div class="login-card-content">
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
                <small><em>Enter your login username and password</em></small>
              </ValidationObserver>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '@/helpers/validators/validator.js'

export default {
  props: {
    isEditing: Boolean,
    userData: Object,
  },
  data() {
    return {
      localUserData: { ...this.userData },
      isEditingImg: { ...this.userData.img },
      imgurl: null, // Add imgurl to data
      valid: false,

    };
  },
  methods: {
    async addUser() {
      try {
        const formData = new FormData();
        formData.append("name", this.localUserData.name);
        formData.append("email", this.localUserData.email);
        formData.append("password", this.localUserData.password);
        if (this.localUserData.img) {
          formData.append("img", this.localUserData.img);
        }
        console.log('User added successfully');
        //this.$emit('submit', { ...this.formData });
        this.$emit('form-submitted', { action: 'add', data: formData });

      } catch (error) {
        console.error('Error adding user:', error);
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
        console.log('User updated successfully');
        this.$emit('form-submitted', { action: 'update', data: formData });

      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    cancelForm() {
      console.log('Form canceled');
      this.$emit('form-canceled');
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
  watch: {
    userData: {
      handler(newVal) {
        console.log('userData changed:', newVal);
        this.localUserData = { ...newVal };
      },
      immediate: true,
    },
  },
};
</script>