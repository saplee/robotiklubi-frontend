<template>
  <nav>
    <div id="nav-bar" class="shadowed">
      <div class="nav-logo-container">
        <RouterLink to="/" tabindex="10" v-on:click="hideAllDropdowns(); removeFocus();">
          <img src="@/assets/rk_logo.svg" alt="club logo">
        </RouterLink>
      </div>

      <div id="nav-links" v-on:click="clearNavLinksInlineStyle();">

        <div class="nav-links-item">
          <RouterLink class="big-link" tabindex="20" to="/" v-on:click="toggleNavLinks(); hideAllDropdowns(); removeFocus();">Home</RouterLink>
        </div>

        <div class="nav-links-item">
          <p class="big-link" tabindex="50" v-on:click="toggleDropdown('dropdown1')">Pages</p>
          <ul class="dropdown" id="dropdown1">
            <li class="dropdown-link"><RouterLink tabindex="50" v-on:click="toggleNavLinks(); removeFocus();" to="/markdown">Markdown</RouterLink></li>
            <li class="dropdown-link"><RouterLink tabindex="50" v-on:click="toggleNavLinks(); removeFocus();" to="/wiki">Wiki</RouterLink></li>
            <li><hr></li>
            <li class="dropdown-link"><RouterLink tabindex="50" v-on:click="toggleNavLinks(); removeFocus();" to="/signup">Sign Up</RouterLink></li>
          </ul>
        </div>

        <div class="nav-links-item">
          <RouterLink class="big-link" tabindex="60" to="/search" v-on:click="toggleNavLinks(); hideAllDropdowns(); removeFocus();">Wiki Search</RouterLink>
        </div>

      </div>

      <div id="hamburger-menu" tabindex="11" v-on:click="toggleNavLinks">
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
  let navLinks = document.getElementById("nav-links")
  if (navLinks != null) {
    let navbarMaxWidth = getComputedStyle(document.body).getPropertyValue("--navbar-mode-switch-width")
    if (window.matchMedia("(min-width: " + navbarMaxWidth + ")").matches) {
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
    removeFocus() {
      const element = document.activeElement;
      if (element != null) (element as HTMLElement).blur()
    },
    clearNavLinksInlineStyle() {
      let navbarMaxWidth = getComputedStyle(document.body).getPropertyValue("--navbar-mode-switch-width")
      if (window.matchMedia("(min-width: " + navbarMaxWidth + ")").matches) {
        document.querySelectorAll(".dropdown").forEach(menu => {
          menu.removeAttribute("style")
        })
      }
    },
    toggleNavLinks () {
      let navbarMaxWidth = getComputedStyle(document.body).getPropertyValue("--navbar-mode-switch-width")
      if (window.matchMedia("(min-width: " + navbarMaxWidth + ")").matches) return;
      let navLinks = document.getElementById("nav-links")
      if (navLinks != null) {
        if (navLinks.style.visibility !== "visible") {
          navLinks.style.visibility = "visible"
        } else {
          navLinks.style.visibility = "hidden";
          this.hideAllDropdowns()
        }
      }
    },
    hideAllDropdowns() {
      let navbarMaxWidth = getComputedStyle(document.body).getPropertyValue("--navbar-mode-switch-width")
      if (window.matchMedia("(min-width: " + navbarMaxWidth + ")").matches) return;
      document.querySelectorAll(".dropdown").forEach(menu => {
        (menu as HTMLElement).style.visibility = "hidden";
        (menu as HTMLElement).style.opacity = "0";
        (menu as HTMLElement).style.height = "0";
      })
    },
    toggleDropdown(dropdownElementId: string) {
      let navbarMaxWidth = getComputedStyle(document.body).getPropertyValue("--navbar-mode-switch-width")
      if (window.matchMedia("(min-width: " + navbarMaxWidth + ")").matches) return;
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

nav {
  height: var(--navbar-height);
  z-index: 9000;
}

#nav-bar {
  position: fixed;
  height: var(--navbar-height);
  background: var(--color-background-alternate);
  width: 100%;
  overflow: visible;
  display: grid;
  grid-template-columns: max-content auto max-content;
}

@supports (-webkit-backdrop-filter: blur(var(--blur-magnitude))) or (backdrop-filter: blur(var(--blur-magnitude))) {
  #nav-bar::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(var(--blur-magnitude));
    -webkit-backdrop-filter: blur(var(--blur-magnitude))
  }
  #nav-bar {
    background: var(--color-transp-background-alternate);
  }
}


/* LOGO */


.nav-logo-container {
  height: var(--navbar-height);
  width: var(--navbar-height);
  z-index: 9001;
}

.nav-logo-container a {
  height: 100%;
  display: inline-block;
}

.nav-logo-container img {
  padding: 7px;
  height: 100%;
  transition: transform 2s;
}

.nav-logo-container img:hover {
  transform: rotate(7deg) translateY(0px) translateX(3px);
}


/* NAVIGATION LINKS */


#nav-links {
  display: flex;
  height: var(--navbar-height);
  flex-wrap: nowrap;
  width: max-content;
  z-index: 9010;
}

.big-link {
  display: block;
  cursor: pointer;
  padding: 0 2rem;
  line-height: var(--navbar-height);
  height: 100%;
  width: 100%;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-text);
  transition: color var(--transition-duration-quick);
}

.nav-links-item:hover > p,
.nav-links-item:focus-within > p,
.nav-links-item:hover > a,
.nav-links-item:focus-within > a {
  color: #000000;
  background: var(--color-accent);
}


/* NAVIGATION DROPDOWNS */


@media (min-width: 50rem) {
  .nav-links-item:hover .dropdown, .nav-links-item:focus .dropdown, .nav-links-item:focus-within .dropdown {
    visibility: visible;
    opacity: 1;
  }
}

.dropdown {
  visibility: hidden;
  opacity: 0;
  transition: opacity var(--transition-duration-quick);
  background: var(--color-background-alternate);
  max-width: 100%;
  list-style-type: none;
  padding: 0;
  text-align: center;
  /*border: 0.15rem solid var(--color-accent);*/
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 9020;
}

.dropdown-link p, .dropdown-link a {
  display: block;
  text-decoration: none;
  height: 100%;
  padding: 1rem 2rem;
  font-weight: 600;
  color: var(--color-accent);
}

.dropdown li:hover, .dropdown li:focus {
  background: var(--color-background-alternate-2);
}

.dropdown hr {
  border: 1px solid var(--color-accent);
  width: 80%;
  margin: 0 auto;
}

@supports (-webkit-backdrop-filter: blur(var(--blur-magnitude))) or (backdrop-filter: blur(var(--blur-magnitude))) {
  .dropdown {
    background: var(--color-transp-background-alternate);
    backdrop-filter: blur(var(--blur-magnitude));
    -webkit-backdrop-filter: blur(var(--blur-magnitude));
  }

  .dropdown li:hover, .dropdown li:focus {
    background: rgba(0,0,0,0.1);
  }
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
  z-index: 9002;
}

#hamburger-menu hr {
  width: calc(var(--navbar-height) * 0.7);
  background-color: var(--color-accent);
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
    position: fixed;
    display: block;
    height: auto;
    width: 80%;
    max-width: 500px;
    right: 0;
    background-color: var(--color-background-alternate-2);
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .nav-links-item {
    height: auto;
  }

  .dropdown {
    transition: color 0s;
    height: 0;
    box-shadow: none;
  }

  @supports (-webkit-backdrop-filter: blur(var(--blur-magnitude))) or (backdrop-filter: blur(var(--blur-magnitude))) {
    #nav-links {
      background-color: var(--color-transp-background-alternate);
      backdrop-filter: blur(var(--blur-magnitude));
      -webkit-backdrop-filter: blur(var(--blur-magnitude))
    }

    .dropdown {
      background: rgba(0,0,0,0.1);
    }
  }
}

</style>