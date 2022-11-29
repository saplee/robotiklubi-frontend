<template>
  <main>
    <div id="wiki-create-container">
      <MarkdownEditorComponent></MarkdownEditorComponent>
      <div class="secondary-container shadowed">
        <TagSelectorComponent ref="tagSelector" :page-id="-1"></TagSelectorComponent>
        <button v-on:click="createPage">Create</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import MarkdownEditorComponent from "@/components/wiki/MarkdownEditorComponent.vue";
import TagSelectorComponent from "@/components/wiki/TagSelectorComponent.vue";

export default defineComponent({
  name: "WikiCreateView",
  components: {MarkdownEditorComponent, TagSelectorComponent},
  setup() {
    const tagSelector = ref()
    return {
      tagSelector,
    };
  },
  data() {
    return {
      title: "",
      content: ""
    }
  },
  methods: {
    createPage: function () {
      console.log()
      console.log("TO ADD")
      const tagsToAdd = this.tagSelector.getTagsToAdd()
      for (let i = 0; i < tagsToAdd.length; i++) {
        console.log(tagsToAdd[i].tag)
      }
      console.log()
      console.log("TO REMOVE")
      const tagsToRemove = this.tagSelector.getTagsToRemove()
      for (let i = 0; i < tagsToRemove.length; i++) {
        console.log(tagsToRemove[i].tag)
      }
      console.log(JSON.parse(JSON.stringify(this.tagSelector.getTagsToAdd())))
      console.log(this.tagSelector.getTagsToAdd())
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
  width: 15rem;
}

button {
  width: 100%;
}

</style>