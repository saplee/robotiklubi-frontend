<template>
  <main>
    <div id="login_container" class="primary-container shadowed">
      <div id="login_form">
        <h1>Login</h1>
        <form>
          <label><strong>Email address:</strong></label>
          <input type="email" placeholder="Enter your email" v-model="email" id="email" required>
          <label><strong>Password:</strong></label>
          <input type="password" placeholder="Enter password" v-model="password" required>
          <button v-on:click="post()">Login</button>
        </form>
      </div>
      <h6> or </h6>
      <div id="signup_link">
        <RouterLink class="button round_corners" to="/signup">Sign Up</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  data: function () {
    return {
      email: "",
      password: "",
      instance: axios.create({
        baseURL: "http://robotiklubi.hopto.org/",
        timeout: 1000,
      }),
    }
  },
  methods: {
    async post() {
      const emailElement = document.getElementById("email");
      let info = {
        password: this.password,
        email: this.email
      }
      if (info.password !== "" &&
          info.email !== "" &&
          !emailElement.validity.typeMismatch) {
        console.log(info)
        console.log("Sending post request.");
        try {
          const response = await axios.post("api/user/login", info)
          console.log(response)
          if (response.data.succeeded) {
            localStorage.accssesToken = response.data.accssesToken
            localStorage.refreshToken = response.data.refreshToken
          } else {
            console.log("Can't login")
          }
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

#login_container {
  max-width: 30em;
  display: flex;
  flex-direction: column;
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

#signup_link {
  margin: 2rem auto;
}

.button {
  font-size: 0.5em;
  padding: 1em 4em;
  font-weight: bold;
  background-color: #3efa3e;
  color: #282828;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

h6 {
  text-align: center;
}

</style>