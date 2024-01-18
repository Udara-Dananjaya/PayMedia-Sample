// Importing Vue library and required components and plugins
import Vue from 'vue'
import App from './App.vue' // Importing the main App component
import router from './router' // Importing Vue Router for navigation
import store from './store' // Importing Vuex store for state management
import Buefy from 'buefy' // Importing Buefy for UI components
import 'buefy/dist/buefy.css' // Importing Buefy styles
import { ValidationObserver, ValidationProvider } from 'vee-validate'; // Importing VeeValidate for form validation

// Importing custom CSS files
import './css/styles.css'

// Configuring Vue to not show production tip in the console
Vue.config.productionTip = false

// Using Buefy as a Vue plugin
Vue.use(Buefy)

// Registering VeeValidate components globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Creating a new Vue instance
new Vue({
  router, // Using the imported router for navigation
  store, // Using the imported Vuex store for state management
  render: h => h(App) // Rendering the main App component
}).$mount('#app') // Mounting the Vue instance to the '#app' element in the HTML
