<template>
  <main>
    <div id="signup_container">
      <h1>Sign Up</h1>
      <form onsubmit="return false">
        <label for="firstN"><strong>First Name</strong></label>
        <input type="text" placeholder="Enter your first name" id="firstN" name="firstName" v-model="firstName" required>
        <label for="lastN"><strong>Last Name</strong></label>
        <input type="text" placeholder="Enter your last name" id="lastN" name="lastName" v-model="lastName" required>
        <label for="email"><strong>Email address</strong></label>
        <input type="email" placeholder="Enter your email" id="email" v-model="email" required>
        <label for="psw"><strong>Password</strong></label>
        <input type="password" placeholder="Enter password" id="psw" name="password" v-model="password" required>
        <label for="phone"><strong>Phone Number (Optional)</strong></label>
        <input type="tel" placeholder="Enter phone number" id="telNr" name="phone" v-model="phone">
        <button v-on:click="post()">Create Account</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";
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
  instance: axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000,
  }),
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
        console.log("Sending post request.");
        try {
          const response = await info.instance.post('/signup', info)
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
  max-width: 20em;
  width: 80%;
  margin: 2rem auto;
}

input[type=text], input[type=password], input[type=email], input[type=tel] {
  width: 100%;
  padding: 1em 2em;
  margin: 0.5em 0;
}

h1 {
  bottom: 1em;
  font-weight: bold;
}

button {
  width: 100%;
  font-size: 1em;
}

</style>