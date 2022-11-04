<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>


  <div class="greetings">
    <h1 class="blue">{{ msg }}</h1>
    <h3>
      Tegemist on arenduses oleva Robotiklubi kodulehega, stabiilsuse tagamiseks külasta kas
      <a href="http://wiki.robotiklubi.ee" target="_blank" rel="noopener">Wikit</a> või
      <a href="https://www.robotiklubi.ee" target="_blank" rel="noopener">Kodulehte</a>
    </h3>
  </div>


</template>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: 0;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
