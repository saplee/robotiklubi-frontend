<template>
  <nav>
    <div id="nav-bar" class="shadowed">
      <div class="nav-logo-container">
        <RouterLink to="/" tabindex="9">
          <img src="@/assets/rk_logo.svg" alt="club logo">
        </RouterLink>
      </div>

      <div id="nav-links">

        <div class="nav-links-item" tabindex="10">
          <RouterLink class="dropdown-link" to="/" v-on:click="toggleNavLinks">Home R</RouterLink>
        </div>

        <div class="nav-links-item" tabindex="20">
          <a class="nav-item-title" href="">Home</a>
        </div>

        <div class="nav-links-item" tabindex="30" v-on:click="toggleDropdown('dropdown1')">
          <p class="nav-item-title" >List</p>
          <ul class="dropdown" id="dropdown1">
            <li class="dropdown-link" tabindex="30"><a href="">Stuff</a></li>
            <li class="dropdown-link" tabindex="30"><a href="">More Stuff</a></li>
            <li><hr></li>
            <li class="dropdown-link" tabindex="30"><a href="">Separate Stuff</a></li>
          </ul>
        </div>

        <div class="nav-links-item" tabindex="40" v-on:click="toggleDropdown('dropdown2')">
          <p class="nav-item-title" >Listie_2</p>
          <ul class="dropdown" id="dropdown2">
            <li class="dropdown-link"><a href="">2019</a></li>
            <li class="dropdown-link"><a href="">2018</a></li>
          </ul>
        </div>

        <div class="nav-links-item" tabindex="50" v-on:click="toggleDropdown('dropdown3')">
          <p class="nav-item-title" >Ready Views</p>
          <ul class="dropdown" id="dropdown3">
            <li class="dropdown-link"><RouterLink v-on:click="toggleNavLinks" to="/">Home</RouterLink></li>
            <li class="dropdown-link"><RouterLink v-on:click="toggleNavLinks" to="/markdown">Markdown</RouterLink></li>
            <li class="dropdown-link"><RouterLink v-on:click="toggleNavLinks" to="/signup">Sign Up</RouterLink></li>
            <li class="dropdown-link"><RouterLink v-on:click="toggleNavLinks" to="/wiki">Wiki</RouterLink></li>
          </ul>
        </div>
      </div>

      <div id="hamburger-menu"  tabindex="9" v-on:click="toggleNavLinks">
        <hr>
        <hr>
        <hr>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script lang="ts">

function checkNavLinksVisibility() {
  console.log("resize")
  let navLinks = document.getElementById("nav-links")
  if (navLinks != null) {
    if (window.matchMedia("(min-width: 50rem)").matches) {
      navLinks.style.visibility = "visible"
    } else {
      navLinks.style.visibility = "hidden"
    }
  }
}

window.addEventListener("resize", checkNavLinksVisibility);

export default {
  name: "NavbarComponent",
  methods: {
    toggleNavLinks () {
      if (window.matchMedia("(min-width: 50rem)").matches) return;
      console.log("toggleNavLinks")
      let navLinks = document.getElementById("nav-links")
      if (navLinks != null) {
        if (navLinks.style.visibility !== "visible") {
          navLinks.style.visibility = "visible"
        } else {
          navLinks.style.visibility = "hidden"
        }
      }
    },
    hideAllDropdowns() {
      if (window.matchMedia("(min-width: 50rem)").matches) return;
      console.log("hideAllDropdowns")
      document.querySelectorAll(".dropdown").forEach(menu => {
        (menu as HTMLElement).style.visibility = "hidden";
        (menu as HTMLElement).style.opacity = "0";
        (menu as HTMLElement).style.height = "0";
      })
    },
    toggleDropdown(dropdownElementId: string) {
      if (window.matchMedia("(min-width: 50rem)").matches) return;
      console.log("toggleDropdown")
      let element = document.getElementById(dropdownElementId)
      if (element != null) {
        const visibility = element.style.visibility
        this.hideAllDropdowns()
        if (visibility == "visible") return
        element.style.visibility = "visible"
        element.style.opacity = "1"
        element.style.height = "auto"
      }
    },
  }
}
</script>

<style scoped>

#nav-bar {
  height: var(--navbar-height);
  background: var(--color-background-alternate);
  width: 100%;
  overflow: visible;
  display: grid;
  grid-template-columns: max-content auto max-content;
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
  z-index: 2;
}

@media (min-width: 50rem) {
  .nav-links-item:hover .dropdown {
    visibility: visible;
    opacity: 1;
  }
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
  width: 80%;
  margin: 0 auto;
}

/* MOBILE FORMATTING */

#hamburger-menu {
  visibility: hidden;
  width: var(--navbar-height);
  height: var(--navbar-height);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  cursor: pointer;
  justify-self: end;
}

#hamburger-menu hr {
  width: calc(var(--navbar-height) * 0.7);
  border: 2px solid var(--color-accent);
  border-radius: 2px;
  margin: 0 auto;
}

@media (max-width: 50rem) {

  #hamburger-menu {
    visibility: visible;
  }

  #nav-bar {
    width: 100%;
  }

  #nav-links {
    margin-top: var(--navbar-height);
    visibility: hidden;
    position: absolute;
    display: block;
    height: auto;
    width: 100%;
    background-color: var(--color-background-alternate-2);
    z-index: 1;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .nav-links-item > p, .nav-links-item > a {
    width: 100%;
  }

  .nav-links-item {
    height: auto;
  }

  .dropdown {
    display: block;
    transition: color 0s;
    height: 0;
  }

  .dropdown-link:active .dropdown {
    visibility: hidden;
    opacity: 0;
  }

}

</style>