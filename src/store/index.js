import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     auth
//   }
// })


const store = new Vuex.Store({
  modules: {
    auth
  }
});

export default store;