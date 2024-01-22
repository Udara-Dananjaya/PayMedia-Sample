import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {

  state: () => ({
    token: "",
    isTokenRefreshing: false,
    webRTCInternalLink: "",
    iceServers: [],
    loggedInUser: null,
    isSocketInitialized: false,
    kyc_form_id: null,
    reviewOnly: {
      approvedApplicationView: false,
      basicApplicationView: false,
    },
    maxSessionIdleTimeMins: 0,
    tempTime: 2,
  }),
  actions: {
    // Method to sync state with local storage
    syncWithLocalStorage() {
      const authState = JSON.stringify(this.$state);
      localStorage.setItem("authState", authState);
    },

    // Method to load state from local storage
    loadFromLocalStorage() {
      const authState = localStorage.getItem("authState");
      if (authState) {
        const parsedState = JSON.parse(authState);
        this.$state = parsedState;
      }
    },
  },
});