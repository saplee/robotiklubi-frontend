<template>
  <main>
    <div id="wiki-create-container">
      <MarkdownEditorComponent ref="markdownEditor" :page-id="-1"></MarkdownEditorComponent>
      <div class="secondary-container shadowed">
        <TagSelectorComponent ref="tagSelector" :page-id="-1"></TagSelectorComponent>
        <button v-on:click="createPage">Create</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import MarkdownEditorComponent from "@/components/wiki/MarkdownEditorComponent.vue";
import TagSelectorComponent from "@/components/wiki/TagSelectorComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "WikiCreateView",
  components: {MarkdownEditorComponent, TagSelectorComponent},
  setup() {
    const tagSelector = ref()
    const markdownEditor = ref()
    return {
      tagSelector,
      markdownEditor
    };
  },
  methods: {
    createPage: function () {
      if (this.markdownEditor.title === "" || this.markdownEditor.content === "") return
      const wikiPage = {
        title: this.markdownEditor.title,
        content: this.markdownEditor.content
      }
      axios.post("/api/wiki/create/", wikiPage)
          .then(r => {
            this.saveTags(r.data)
          })
    },
    saveTags: function (pageId: number) {
      const requestBody = {
        tags: this.tagSelector.getTagsToAdd()
      }
      axios.post("/api/tags/relation/create/many?pageId=" + pageId, requestBody)
          .then(() => {
            window.location.replace("./#/wiki/page?id=" + pageId)
          })
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
  max-width: 100em;
}

.secondary-container {
  margin: 0;
  height: fit-content;
  width: 15rem;
}

button {
  width: 100%;
  margin-bottom: 0;
}

@media (max-width: 70rem) {
  #wiki-create-container {
    grid-template-columns: none;
    grid-template-rows: auto auto;
  }

  .secondary-container {
    width: 100%;
  }
}

</style>