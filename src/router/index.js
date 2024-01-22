// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/list',
    name: 'User List',
    component: () => import('../views/ListView.vue'), // Corrected the import
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/ListView.vue'), // Corrected the import
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];


const router = new VueRouter({
  mode: 'history', // This is where you specify history mode
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // If the user is navigating to the login route, allow the navigation
  if (to.name === 'Login') {
    next();
    return;
  }

  try {
    // Check the authentication status asynchronously
    await store.dispatch('auth/checkAuthStatus');

    // If the route requires authentication and there is no token, redirect to login
    if (requiresAuth && !store.getters['auth/authToken']) {
      next('/login');
    } else {
      // Continue with the navigation
      next();
    }
  } catch (error) {
    // Log any errors during the authentication status check and redirect to login
    console.error('Error checking auth status:', error);
    next('/login');
  }
});


export default router;
