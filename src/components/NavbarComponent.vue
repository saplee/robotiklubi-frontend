<template>
  <nav>
    <div id="nav-bar" class="navbar-mobile">
      <div id="nav-links-left">
        <div class="nav-logo-container">
          <a href='#'>
            <img src="@/assets/rk_logo.svg" alt="club logo">
          </a>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" v-on:click="GetContainerSize" >Teenused</p>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >L</p>
          <ul class="dropdown">
            <li><a href="">Stuff</a></li>
            <li><a href="">More Stuff</a></li>
            <li><hr></li>
            <li><a href="">Separate Stuff</a></li>
          </ul>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >Listie_2</p>
          <ul class="dropdown">
            <li><a href="">2019</a></li>
            <li><a href="">2018</a></li>
            <li><a href="">2017</a></li>
          </ul>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >Ready Views</p>
          <ul class="dropdown">
            <li><RouterLink class="nav-link" to="/">Home</RouterLink></li>
            <li><RouterLink class="nav-link" to="/markdown">Markdown</RouterLink></li>
            <li><RouterLink class="nav-link" to="/signup">Sign Up</RouterLink></li>
            <li><RouterLink class="nav-link" to="/wiki">Wiki</RouterLink></li>
          </ul>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >Huvilisele</p>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >Wiki</p>
        </div>

        <div class="nav-item">
          <p class="nav-item-title" >Klubist</p>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script lang="ts">
import {defineComponent} from "vue";

function checkNavBarFolding() {
  let navbarContainer = document.getElementById ("nav-bar");
  if (navbarContainer == null) return;
  // console.log(navbarContainer.scrollWidth)
  // console.log(navbarContainer.clientWidth)
  if (navbarContainer.scrollWidth > navbarContainer.clientWidth) {
    // navbarContainer.style.background = "red"
    navbarContainer.className = "navbar-mobile"
  } else {
    // navbarContainer.style.background = "blue"
    navbarContainer.className = "navbar-desktop"
  }
}

document.addEventListener("DOMContentLoaded", function () {checkNavBarFolding()});
window.addEventListener("resize", function() {checkNavBarFolding()})

export default defineComponent({})
</script>

<style scoped>
#nav-bar {
  height: 4rem;
  background: var(--color-background-alternate);
  width: 100%;
  overflow: visible;
}

#nav-links-left {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  width: max-content;
}

.nav-logo-container {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.nav-logo-container img {
  padding: 7px;
  height: 100%;
}

#nav-bar p {
  padding: 1rem 2rem;
  height: 100%;
  font-weight: 600;
  inline-size: max-content;
}

#nav-bar .nav-item:hover {
  background: var(--color-accent);
}

.nav-item {
  position: relative;
  cursor: pointer;
  text-decoration: none;
}

.nav-item:hover p {
  color: #000000;
}

.dropdown {
  visibility: hidden;
  opacity: 0;
  transition: opacity var(--transition-duration);
  background: var(--color-background-alternate);
  max-width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: auto;
  border: 0.15rem solid var(--color-accent);
}

.nav-item:hover .dropdown {
  visibility: visible;
  opacity: 1;
}

.nav-item li {
  padding: 0.5rem 1rem;
}

.nav-link {
  display: block;
  text-decoration: none;
  height: 100%;
  color: var(--color-accent);
}

.dropdown a {
  text-decoration: none;
}

.dropdown li:hover {
  background: var(--color-background-alternate-2);
}

.dropdown hr {
  border: 1px solid var(--color-accent);
  width: 100%;
  margin: 0 auto;
}
</style>