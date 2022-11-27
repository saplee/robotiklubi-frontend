<template>
  <div id="search-page-selector-container">
    <a class="search-page-button disable-select" @click="$emit('firstPage')">
      <p>&lt&lt</p>
    </a>
    <a class="search-page-button disable-select" @click="$emit('prevPage')">
      <p>&lt</p>
    </a>
    <a class="search-page-button disable-select">
      <p>{{pageNumber}}</p>
    </a>
    <a class="search-page-button disable-select" @click="$emit('nextPage')">
      <p>&gt</p>
    </a>
    <a class="search-page-button disable-select" @click="$emit('lastPage')">
      <p>&gt&gt</p>
    </a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SearchPageSelectorComponent",
  props: {
    paginator: Number,
    resPerPage: Number
  },
  computed: {
    pageNumber: function () {
      if (this.paginator == undefined || this.resPerPage == undefined) return -1
      return Math.floor(this.paginator / this.resPerPage) + 1
    }
  }
})
</script>

<style scoped>

#search-page-selector-container {
  display: grid;
  grid-template-columns: max-content max-content max-content max-content max-content;
}

a {
  text-decoration: none;
  color: var(--color-accent-mute);
  font-weight: bold;
}

.search-page-button:hover {
  background: rgba(0, 0, 0, 20%);
}

.search-page-button {
  background: rgba(0, 0, 0, 15%);
  border-radius: 1rem;
  padding: 0.8rem 1rem 1rem 1rem;
  margin: 0.1rem;
  width: max-content;
  text-align: center;
  /*display: inline-grid;*/
  /*align-content: center;*/
  cursor: pointer;
}

</style>