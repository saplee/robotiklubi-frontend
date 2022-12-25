<template>
  <main>
    <div id="signup-container" class="primary-container shadowed">
      <h1>Your profile</h1>
      <form onsubmit="return true">
        <label><strong>First Name:</strong></label>
        <input type="text" v-model="firstName" required>
        <label><strong>Last Name:</strong></label>
        <input type="text" v-model="lastName" required>
        <label><strong>Email address:</strong></label>
        <input type="email" v-model="email" id="email" required>
        <label><strong>Phone Number (Optional):</strong></label>
        <input type="tel" v-model="phone">
        <button v-on:click="saveEdit()">Save changes</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";
import {userData} from "@/components/user/userData";

export default defineComponent({
  computed: {
    userData() {
      return userData
    }
  },
  data: function () {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
    }
  },
  methods: {
    saveEdit() {
      let info = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      }
      axios.put("/api/user/update?id=" + userData.id, info).
      then(r => {document.
      getElementById("email").style.outline = ""})
          .catch(e => {
        document.getElementById("email").style.outline = "2px solid red"
      })
    }
  }
})
</script>

<style scoped>

#signup-container {
  max-width: 30em;
}

input {
  width: 100%;
  padding: 1em 2em;
  margin: 0.5em 0;
}

button {
  width: 100%;
  font-size: 1em;
  margin-top: 60px;
  background-color: cadetblue;
}

</style>