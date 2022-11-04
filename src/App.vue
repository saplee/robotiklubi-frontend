<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <div id="nav-bar">
      <div class="nav-logo-container">
        <a href='#'>
          <img src="@/assets/rk_logo.png" alt="club logo">
        </a>
      </div>

      <div class="nav-item">
        <p class="nav-item-title" >Teenused</p>
      </div>

      <div class="nav-item">
        <p class="nav-item-title" >Listie</p>
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
          <li><hr></li>
          <li><a href="">2018</a></li>
          <li><a href="">2017</a></li>
        </ul>
      </div>

      <div class="nav-item">
        <p class="nav-item-title" >Ready Views</p>
        <ul class="dropdown">
          <li><RouterLink class="nav-link" to="/">Home</RouterLink></li>
          <li><RouterLink class="nav-link" to="/about">About</RouterLink></li>
          <li><RouterLink class="nav-link" to="/markdown">Markdown</RouterLink></li>
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
  </nav>
  <!--  <header>-->
  <!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

  <!--    <div class="wrapper">-->
  <!--      <HelloWorld msg="You did it!" />-->

  <!--      <nav>-->
  <!--        <RouterLink to="/">Home</RouterLink>-->
  <!--        <RouterLink to="/about">About</RouterLink>-->
  <!--        <RouterLink to="/markdown">Markdown</RouterLink>-->
  <!--        <RouterLink to="/wiki">Wiki</RouterLink>-->
  <!--      </nav>-->
  <!--    </div>-->
  <!--  </header>-->

  <RouterView />
</template>

<style scoped>
/*header {*/
/*  line-height: 1.5;*/
/*  max-height: 100vh;*/
/*}*/

/*.logo {*/
/*  display: block;*/
/*  margin: 0 auto 2rem;*/
/*}*/

/*nav {*/
/*  width: 100%;*/
/*  font-size: 12px;*/
/*  text-align: center;*/
/*  margin-top: 2rem;*/
/*}*/

/*nav a.router-link-exact-active {*/
/*  color: var(--color-text);*/
/*}*/

/*nav a.router-link-exact-active:hover {*/
/*  background-color: transparent;*/
/*}*/

/*nav a {*/
/*  display: inline-block;*/
/*  padding: 0 1rem;*/
/*  border-left: 1px solid rgba(60, 60, 60, 0.29);*/
/*}*/

/*nav a:first-of-type {*/
/*  border: 0;*/
/*}*/

/*@media (min-width: 1024px) {*/
/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(160px / 2);*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/

/*  nav {*/
/*    text-align: left;*/
/*    margin-left: -1rem;*/
/*    font-size: 1rem;*/

/*    padding: 1rem 0;*/
/*    margin-top: 1rem;*/
/*  }*/
/*}*/


#nav-bar {
  display: flex;
  height: 4rem;
  width: 100%;
  background: var(--color-navbar);
}

.nav-logo-container {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.nav-logo-container img {
  height: 100%;
}

#nav-bar p {
  /*float: left;*/
  padding: 1rem 2rem;
  height: 100%;
  font-weight: 600;
  color: var(--color-text);
}

#nav-bar .nav-item:hover {
  background: var(--color-accent);
}

.nav-item {
  position: relative;
  cursor: pointer;
  text-decoration: none;
}

.dropdown {
  visibility: hidden;
  opacity: 0;
  transition: visibility var(--transition-duration), opacity var(--transition-duration);
  background: var(--color-navbar);
  max-width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: auto;
}

.nav-item:hover .dropdown {
  visibility: visible;
  opacity: 1;
  /*padding-bottom: 1rem;*/
}

.nav-item li {
  padding: 0.5rem 1rem;
}

.nav-link {
  display: block;
  text-decoration: none;
  /*padding: 1rem 2rem;*/
  height: 100%;
  color: var(--color-accent);
  /*outline: 2px solid red;*/
}

.dropdown a {
  text-decoration: none;
}

.dropdown li:hover {
  background: var(--color-navbar-dropdown-highlight);
}

.dropdown hr {
  border: 1px solid var(--color-accent);
  width: 100%;
  margin: 0 auto;
}
</style>
