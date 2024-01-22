// Import Font Awesome styles
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import { createPinia } from 'pinia';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './css/styles.css';

import App from './App.vue';
import router from './router';
import store from './store';
import Vuex from 'vuex';


import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const pinia = createPinia();
Vue.use(pinia);

// Use Buefy with defaultIconPack set to 'fa'
Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
