<template>
  <main>
    <div id="signup_container" class="primary_container shadowed">
      <h1>Sign Up</h1>
      <form onsubmit="return false">
        <label><strong>First Name:</strong></label>
        <input type="text" placeholder="Enter your first name" v-model="firstName" required>
        <label><strong>Last Name:</strong></label>
        <input type="text" placeholder="Enter your last name" v-model="lastName" required>
        <label><strong>Email address:</strong></label>
        <input type="email" placeholder="Enter your email" v-model="email" id="email" required>
        <label><strong>Password:</strong></label>
        <input type="password" placeholder="Enter password" v-model="password" required>
        <label><strong>Phone Number (Optional):</strong></label>
        <input type="tel" placeholder="Enter phone number" v-model="phone">
        <button v-on:click="post()">Create Account</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";
const instance = axios.create({
  baseURL: "http://robotiklubi.hopto.org",
  timeout: 1000,
});
export default defineComponent({
  data: function () {
    return {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phone: ""
    }
  },
  methods: {
    async post() {
      const emailElement = document.getElementById("email");
      let info = {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email,
        phone: this.phone
      }
      if (info.firstName !== "" &&
          info.lastName !== "" &&
          info.password !== "" &&
          info.email !== "" &&
          !emailElement.validity.typeMismatch) {
        console.log(info)
        console.log("Sending post request.");
        try {
          const response = await instance.post('/signup', info)
          if (!response.data.succeeded) document.getElementById("email").style.outline = "2px solid red"
          else document.getElementById("email").style.outline = ""
        } catch (Exception) {
          console.log("Could not send data.")
        }
      }
    }
  },
})
</script>

<style scoped>

#signup_container {
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
}

</style>