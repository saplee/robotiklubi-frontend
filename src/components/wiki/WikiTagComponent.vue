<template>
<p class="wiki-tag" @click="$emit('tag', id)">{{tag}}</p>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "WikiTagComponent",
  props: {
    id: Number,
    tag: String
  }
})
</script>

<style scoped>

.wiki-tag {
  display: inline-flex;
  border-radius: 1rem;
  margin: 0 0.2rem 0 0.2rem;
  padding: 0 0.5rem 0 0.5rem;
  background: var(--color-accent-soft);
  color: var(--col-light-text-1);
  font-size: 0.8em;
  font-weight: bold;
}

</style>