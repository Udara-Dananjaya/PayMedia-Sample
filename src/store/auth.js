// store/index.js
import NetworkManager from "@/network";
import router from '@/router';

const state = {
    authToken: localStorage.getItem('authToken') || null,
};

const getters = {
    authToken: (state) => state.authToken,
};

const mutations = {
    SET_AUTH_TOKEN(state, token) {
        state.authToken = token;
        localStorage.setItem('authToken', token);
    },
};

const actions = {
    setAuthToken({ commit }, token) {
        commit('SET_AUTH_TOKEN', token);
        console.log(token);
    },
    async checkAuthStatus() {
        try {
            const authToken = state.authToken;

            if (router.currentRoute.path === '/login') {
                return Promise.resolve();
            }

            if (!authToken) {
                router.push('/login');
            }

            const response = await NetworkManager.apiRequest('checkToken',{}, 'application/json', true);
            console.log('Response:', response);

            if (response && response.success) {
                return Promise.resolve();
            } else {
                if (response.data && response.data.message === 'Unauthenticated.') {
                    router.push('/login');
                }
                return Promise.reject('Authentication check failed');
            }

        } catch (error) {
            console.error('Error checking auth status:', error);
            return Promise.reject(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};