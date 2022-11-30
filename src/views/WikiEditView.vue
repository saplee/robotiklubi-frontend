<template>
  <main>
    <div id="wiki-edit-container">
      <MarkdownEditorComponent ref="markdownEditor" :page-id="parseInt(pageId)"></MarkdownEditorComponent>
      <div id="wiki-edit-options">
        <div class="secondary-container shadowed">
          <TagSelectorComponent ref="tagSelector" :page-id="parseInt(pageId)"></TagSelectorComponent>
          <button v-on:click="savePage" id="wiki-edit-save-button">Save Changes</button>
        </div>
        <div class="secondary-container shadowed">
          <button v-on:click="deletePage" id="wiki-edit-delete-button">Delete Page</button>
        </div>
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
            window.location.replace("./#/wiki/page?id=" + this.pageId)
          })
    },
    deletePage: function () {
      // axios.delete("/api/tags/relation/delete/many?pageId=" + this.pageId, axiosRemoveTags)

      axios.post("/api/wiki/delete?id=" + this.pageId)
          .then(() => {
            // window.location.replace("./#/wiki/" + this.pageId)
            this.$router.replace("/wiki")
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

#wiki-edit-container {
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

#wiki-edit-options {
  display: grid;
  grid-gap: 1rem;
  height: fit-content;
}

#wiki-edit-save-button {
  width: 100%;
  margin-bottom: 0;
}

#wiki-edit-delete-button {
  width: 100%;
  margin: 0;
  background: var(--color-alert);
}

@media (max-width: 50rem) {
  #wiki-edit-container {
    grid-template-columns: none;
    grid-template-rows: auto auto;
  }

  .secondary-container {
    width: 100%;
  }
}

</style>