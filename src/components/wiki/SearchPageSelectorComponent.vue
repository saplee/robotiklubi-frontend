<template>
  <div id="search-page-selector-container">
    <a class="search-page-button disable-select" @click="$emit('firstPage')">
      <p>&lt&lt</p>
    </a>
    <a class="search-page-button disable-select" @click="$emit('prevPage')">
      <p>&lt</p>
    </a>
    <a class="search-page-button disable-select" id="search-page-number">
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
    resPerPage: Number,
    totalResults: Number
  },
  computed: {
    pageNumber: function () {
      if (this.paginator == undefined || this.resPerPage == undefined || this.totalResults == undefined) return -1
      const current = Math.floor(this.paginator / this.resPerPage) + 1
      const total = Math.ceil(this.totalResults / this.resPerPage)
      return current + "/" + total
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
  min-width: 4rem;
  text-align: center;
  cursor: pointer;
}

#search-page-number {
  cursor: default;
}

#search-page-number:hover {
  background: rgba(0, 0, 0, 15%);
}

@media (max-width: 50rem) {
  p {
    font-size: 1.5em;
  }
}

</style>