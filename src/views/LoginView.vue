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
                    <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">
                      <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control">
                          <input id="email" type="text" class="input" v-model="email" placeholder="Email" />
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
                    <ValidationProvider rules="required" name="Password" v-slot="{ errors, valid }">
                      <div class="field">
                        <label for="password" class="label">Password</label>
                        <div class="control">
                          <input id="password" type="password" class="input" v-model="password" placeholder="Password" />
                        </div>
                        <p class="help" :class="{ 'is-danger': errors[0], 'is-success': valid }">
                          {{ errors[0] }}
                        </p>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>

                <button class="button is-block is-primary is-fullwidth is-medium" @click="handleSubmit(submit)">
                  <span>Login</span>
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
import NetworkManager from "@/network";


export default {
 

  data: () => ({
    email: "",
    password: "",
  }), 
   mounted() {
   
  },
  methods: {
    alertCustom(title, message) {
      this.$buefy.dialog.alert({
        title: title,
        message: message,
        // confirmText: btn,
        type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
      });
    },
    async loginUser() {

      const dataObject = {
        email: this.email,
        password: this.password
      };


      try {
        const response = await NetworkManager.apiRequest(`login`, dataObject, "application/json");

        if (response.success) {

          //this.$store.dispatch('auth/setAuthToken', response.data.token);
      
          this.$store.dispatch('auth/setAuthToken', response.token);
          this.$router.push('/home');
        } else {
          this.alertCustom("Error",'Invalid credentials. Please try again.');

        }

        this.loginData = {
          email: '',
          password: ''
        };
      } catch (error) {
        console.log(error);
        this.alertCustom("Error",'An error occurred during login. Please try again.', 'Retry');
      }

    },
    submit() {
      if (this.$refs.observer.validate()) {
         this.loginUser();
      } else {
        console.log("Form validation failed");
      }
    },
  },
};
</script>
