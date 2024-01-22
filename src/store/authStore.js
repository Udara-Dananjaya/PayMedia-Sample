import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  // Persist all state properties except 'token'
  persist: {
    exclude: ["token"], // Exclude 'token' from persistence
  },

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
});