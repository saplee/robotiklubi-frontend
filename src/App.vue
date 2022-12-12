<script setup lang="ts">
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <NavbarComponent></NavbarComponent>

  <FooterComponent></FooterComponent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {userData} from "@/components/user/userData";

export default defineComponent({
  created() {
    let accessToken = localStorage.accessToken
    let refreshToken = localStorage.refreshToken
    if (accessToken !== undefined && accessToken !== "" && refreshToken !== undefined && refreshToken !== "") {
      userData.logIn(accessToken, refreshToken)
    }
  }
})
</script>
