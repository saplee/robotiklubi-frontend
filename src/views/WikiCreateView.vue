<template>
  <main>
    <div id="wiki-create-container">
      <MarkdownEditorComponent></MarkdownEditorComponent>
      <div class="secondary-container shadowed">
        <TagSelectorComponent></TagSelectorComponent>
        <button>Create</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MarkdownEditorComponent from "@/components/wiki/MarkdownEditorComponent.vue";
import TagSelectorComponent from "@/components/wiki/TagSelectorComponent.vue";

export default defineComponent({
  name: "WikiCreateView",
  components: {MarkdownEditorComponent, TagSelectorComponent},
  data() {
    return {
      title: "",
      content: ""
    }
  }
})
</script>

<style scoped>

#wiki-create-container {
  width: 95%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
}

.secondary-container {
  margin: 0;
  height: fit-content;
  width: fit-content;
}

button {
  width: 100%;
}

</style>