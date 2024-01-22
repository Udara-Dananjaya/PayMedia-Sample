<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import '@/helpers/validators/validator.js'


import { useAuthStore } from "@/store/authStore";



export default {
  setup(){
    const authStore = useAuthStore()

// Log the state properties when the component is mounted
console.log("Token:", authStore.token);
console.log("Is Token Refreshing:", authStore.isTokenRefreshing);
console.log("WebRTC Internal Link:", authStore.webRTCInternalLink);
// ... log other properties as needed
    return {authStore}
  },
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
