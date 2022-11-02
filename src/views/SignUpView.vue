<template>
  <div className="signup">
    <h1>SIGN UP</h1>
    <label for="firstN"><b>First Name</b></label>
    <input type="text" placeholder="Enter your first name" id="firstN" name="firstName" v-model="firstName" required>
    <label for="lastN"><b>Last Name</b></label>
    <input type="text" placeholder="Enter your last name" id="lastN" name="lastName" v-model="lastName" required>
    <label for="user"><b>Username</b></label>
    <input type="text" placeholder="Username" id="user" name="userName" v-model="userName" required>
    <label for="email">Email address</label>
    <input type="email" placeholder="Enter your email" id="email" v-model="email" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="psw" name="password" v-model="password" required>
    <label for="phone"><b>Phone number</b></label>
    <input type="tel" placeholder="Enter phone number" id="telNr" name="phone" v-model="phone" required>
    <button @click="post">Sign Up</button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

let firstName = ref('');
let lastName = ref('');
let userName = ref('');
let password = ref('');
let email = ref('');
let phone = ref('');


const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

async function post() {
  let data = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    password: password.value,
    email: email.value,
    phone: phone.value,
    isAdmin: false

  }
  console.log("sending post request!");
  const response = await instance.post('/signup', data);
  console.log("response:", response);

}
</script>


<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Full-width input fields */
input[type=text], input[type=password], input[type=email], input[type=tel] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

h1 {
  bottom: 10px;
  font-weight: bold;
}

/* Set a style for all buttons */
button {
  background-color: #0a5dde;
  color: white;
  padding: 14px 20px;
  margin: 20px 0;
  border: black;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
}

button:hover {
  opacity: 0.8;
}


span.psw {
  float: right;
  padding-top: 16px;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0)
  }
  to {
    -webkit-transform: scale(1)
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>