<template>
  <a :href="`#/wiki/page?id=${resultData.id}`">
    <div class="search-result-item round_corners">
      <div class="search-result-title">
        <h3>{{resultData.title}}</h3>
      </div>
      <div class="search-result-summary">
        <p>{{resultData.summary}}</p>
      </div>
      <div class="search-result-details">
        <p>Author: {{resultData.author}}</p>
        <p>Created At: {{resultData.createdAt}}</p>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SearchResultComponent",
  props: [
      "resultData"
  ]
})
</script>

<style scoped>

a {
  text-decoration: none;
  color: var(--color-text);
}

.search-result-item {
  background: rgba(0, 0, 0, 5%);
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
}

.search-result-item:hover,
.search-result-item:focus-within {
  background: rgba(0, 0, 0, 10%);
}

.search-result-summary {
  font-size: 0.8em;
}

.search-result-details {
  display: flex;
  font-size: 0.7em;
  justify-content: end;
}

.search-result-details p {
  opacity: 70%;
  margin: 0 1rem 0 0;
}

</style>