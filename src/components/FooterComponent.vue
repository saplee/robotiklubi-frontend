<template>
  <footer>
    <h1>Footer</h1>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>

footer {
  background-color: var(--color-navbar);
  position: absolute;
  /*flex-shrink: 0;*/
  /*height: 4rem;*/
  /*padding-top: 4rem;*/
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
}

</style>