<template>
  <label for="search-tags">Included Tags:</label>
  <div id="search-tags">
    <WikiTagComponent v-for="Tag in includedTags" :tag="Tag.tag" :id="Tag.id" @tag="moveTag($event)"></WikiTagComponent>
  </div>

  <label for="all-tags">Available Tags:</label>
  <div id="all-tags">
    <WikiTagComponent v-for="Tag in allTags" :tag="Tag.tag" :id="Tag.id" @tag="moveTag($event)"></WikiTagComponent>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import WikiTagComponent from "@/components/wiki/WikiTagComponent.vue";

export default defineComponent({
  name: "TagSelectorComponent",
  components: {WikiTagComponent},
  data: function () {
    return {
      allTags: [] as Array<any>,
      includedTags: [] as Array<any>,
      tagsToAdd: [] as Array<any>,
      tagsToRemove: [] as Array<any>,
    }
  },
  methods: {
    moveTag: function (id: number) {
      for (let i = 0; i < this.allTags.length; i++) {
        if (this.allTags[i].id == id) {
          this.includedTags.push(this.allTags.splice(i, 1)[0])
          return
        }
      }
      for (let i = 0; i < this.includedTags.length; i++) {
        if (this.includedTags[i].id == id) {
          this.allTags.push(this.includedTags.splice(i, 1)[0])
          return
        }
      }
    }
  }
})
</script>

<style scoped>

</style>