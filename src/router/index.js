import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{requiresAuth:true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/UserView.vue'),
    props: true,
    meta:{requiresAuth:true}
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/UserView.vue'),
    meta:{requiresAuth:true}
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (to.name === 'login') {
    next();
    return;
  }

  try {
    await store.dispatch('auth/checkAuthStatus');

    if (requiresAuth && !store.getters['auth/authToken']) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    next('/login');
  }
});
export default router
