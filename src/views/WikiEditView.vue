<template>
  <main>
    <div id="wiki-create-container">
      <MarkdownEditorComponent ref="markdownEditor" :page-id="parseInt(pageId)"></MarkdownEditorComponent>
      <div class="secondary-container shadowed">
        <TagSelectorComponent ref="tagSelector" :page-id="parseInt(pageId)"></TagSelectorComponent>
        <button v-on:click="savePage">Save</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import MarkdownEditorComponent from "@/components/wiki/MarkdownEditorComponent.vue";
import TagSelectorComponent from "@/components/wiki/TagSelectorComponent.vue";
import {defineComponent, ref} from "vue";
import axios from "axios";

export default defineComponent({
  name: "WikiEditView",
  components: {MarkdownEditorComponent, TagSelectorComponent},
  data() {
    return {
      pageId: "-1"
    }
  },
  setup() {
    const tagSelector = ref()
    const markdownEditor = ref()
    return {
      tagSelector,
      markdownEditor
    };
  },
  methods: {
    savePage: function () {
      if (this.markdownEditor.title === "" || this.markdownEditor.content === "") return
      const wikiPage = {
        title: this.markdownEditor.title,
        content: this.markdownEditor.content
      }
      // axios.put("/api/wiki/update?id=" + this.pageId, wikiPage)
      axios.post("/api/wiki/update?id=" + this.pageId, wikiPage)
          .then(() => {
            this.addTags()
          })
    },
    addTags: function () {
      const tagsToAdd = {
        tags: this.tagSelector.getTagsToAdd()
      }
      axios.post("/api/tags/relation/create/many?pageId=" + this.pageId, tagsToAdd)
          .then(() => {
            this.removeTags()
          })
    },
    removeTags: function () {
      const tagsToRemove = {
        tags: this.tagSelector.getTagsToRemove()
      }
      // const axiosRemoveTags = {
      //   data: {
      //     tags: this.tagSelector.getTagsToRemove()
      //   }
      // }
      // axios.delete("/api/tags/relation/delete/many?pageId=" + this.pageId, axiosRemoveTags)

      axios.post("/api/tags/relation/delete/many?pageId=" + this.pageId, tagsToRemove)
          .then(() => {
            window.location.replace("./#/wiki?id=" + this.pageId)
          })
    }
  },
  created() {
    const pageId = this.$route.query.pageId
    if (pageId === null) return
    this.pageId = String(pageId)
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
  width: 15rem;
}

button {
  width: 100%;
  margin-bottom: 0;
}

</style>