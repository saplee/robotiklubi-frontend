<template>
  <main>
    <div id="signup-container" class="primary-container shadowed">
      <h1>Sign Up</h1>
      <form onsubmit="return false">
        <label><strong>First Name:</strong></label>
        <input type="text" placeholder="Enter your first name" v-model="firstName" required>
        <label><strong>Last Name:</strong></label>
        <input type="text" placeholder="Enter your last name" v-model="lastName" required>
        <label><strong>Email address:</strong></label>
        <input type="email" placeholder="Enter your email" v-model="email" id="email" required>
        <p id="alert"></p>
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
export default defineComponent({
  data: function () {
    return {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phone: "",
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
        try {
          const response = await axios.post('api/user/signup', info)
          if (response.data.emailError){ document.getElementById("email").style.outline = "2px solid red"
            document.getElementById("alert").innerText="This email address is already in use!"}
          else{ document.getElementById("email").style.outline = ""
            document.getElementById("alert").innerText=""}
          if (response.data.succeeded) this.$router.replace("/login")
        } catch (Exception) {
          console.log(Exception.response.data)
          console.log("Could not send data.")
        }
      }
    }
  },
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
}
#alert{
  color: red;
  font-size: 1em;
}

</style>