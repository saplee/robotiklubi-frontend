<template>
  <nav>
    <div id="nav-bar" class="shadowed">
      <div class="nav-logo-container">
        <RouterLink to="/">
          <img src="@/assets/rk_logo.svg" alt="club logo">
        </RouterLink>
      </div>
      <div id="nav-links">

        <div class="nav-links-item">
          <RouterLink class="dropdown-link" to="/">Home R</RouterLink>
        </div>

        <div class="nav-links-item">
          <a class="nav-item-title" href="">Home</a>
        </div>

        <div class="nav-links-item">
          <p class="nav-item-title" >L</p>
          <ul class="dropdown">
            <li class="dropdown-link"><a href="">Stuff</a></li>
            <li class="dropdown-link"><a href="">More Stuff</a></li>
            <li><hr></li>
            <li class="dropdown-link"><a href="">Separate Stuff</a></li>
          </ul>
        </div>

        <div class="nav-links-item">
          <p class="nav-item-title" >Listie_2</p>
          <ul class="dropdown">
            <li class="dropdown-link"><a href="">2019</a></li>
            <li class="dropdown-link"><a href="">2018</a></li>
            <li class="dropdown-link"><a href="">2017</a></li>
          </ul>
        </div>

        <div class="nav-links-item">
          <p class="nav-item-title" >Ready Views</p>
          <ul class="dropdown">
            <li class="dropdown-link"><RouterLink to="/">Home</RouterLink></li>
            <li class="dropdown-link"><RouterLink to="/markdown">Markdown</RouterLink></li>
            <li class="dropdown-link"><RouterLink to="/signup">Sign Up</RouterLink></li>
            <li class="dropdown-link"><RouterLink to="/wiki">Wiki</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

#nav-bar {
  height: var(--navbar-height);
  background: var(--color-background-alternate);
  width: 100%;
  overflow: visible;
  display: grid;
  grid-template-columns: max-content auto;
}

/* LOGO */

.nav-logo-container {
  justify-content: center;
  align-items: center;
  height: var(--navbar-height);
  width: var(--navbar-height);
}

.nav-logo-container img {
  padding: 7px;
  height: 100%;
}

/* NAVIGATION LINKS */

#nav-links {
  display: flex;
  height: var(--navbar-height);
  flex-wrap: nowrap;
  width: max-content;
}

.nav-links-item {
  position: relative;
  cursor: pointer;
  text-decoration: none;
  height: var(--navbar-height);
}

.nav-links-item:hover {
  background: var(--color-accent);
}

.nav-links-item > p, .nav-links-item > a {
  display: block;
  padding: 1rem 2rem;
  height: 100%;
  font-weight: 600;
  inline-size: max-content;
  text-decoration: none;
  color: var(--color-text);
  transition: color var(--transition-duration-quick);
}

.nav-links-item:hover > p, .nav-links-item:hover > a {
  color: #000000;
}

/* NAVIGATION DROPDOWNS */

.dropdown {
  visibility: hidden;
  opacity: 0;
  transition: opacity var(--transition-duration-quick);
  background: var(--color-background-alternate);
  max-width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: auto;
  /*border: 0.15rem solid var(--color-accent);*/
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.nav-links-item:hover .dropdown {
  visibility: visible;
  opacity: 1;
}

.dropdown-link p, .dropdown-link a {
  display: block;
  text-decoration: none;
  height: 100%;
  padding: 1rem 2rem;
  font-weight: 600;
  color: var(--color-accent);
}

.dropdown li:hover {
  background: var(--color-background-alternate-2);
}

.dropdown hr {
  border: 1px solid var(--color-accent);
  width: 100%;
  margin: 0 auto;
}

/* MOBILE FORMATTING */

@media (max-width: 50rem) {

  #nav-links {
    display: none;
    visibility: hidden;
  }

}

</style>