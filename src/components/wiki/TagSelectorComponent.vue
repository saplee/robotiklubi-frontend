<template>
  <label for="search-tags">Included Tags:</label>
  <div id="search-tags">
    <WikiTagComponent v-for="Tag in newTags" :tag="Tag.tag" :id="Tag.id" @tag="moveTag($event)"></WikiTagComponent>
  </div>

  <label for="all-tags">Available Tags:</label>
  <div id="all-tags">
    <WikiTagComponent v-for="Tag in allTags" :tag="Tag.tag" :id="Tag.id" @tag="moveTag($event)"></WikiTagComponent>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import WikiTagComponent from "@/components/wiki/WikiTagComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "TagSelectorComponent",
  components: {WikiTagComponent},
  props: {
    pageId: Number
  },
  data: function () {
    return {
      allTags: [] as Array<any>,
      oldTags: [] as Array<any>,
      newTags: [] as Array<any>,
    }
  },
  methods: {
    moveTag: function (id: number) {
      for (let i = 0; i < this.allTags.length; i++) {
        if (this.allTags[i].id == id) {
          this.newTags.push(this.allTags.splice(i, 1)[0])
          return
        }
      }
      for (let i = 0; i < this.newTags.length; i++) {
        if (this.newTags[i].id == id) {
          this.allTags.push(this.newTags.splice(i, 1)[0])
          return
        }
      }
    },
    getTagsToRemove: function () {
      const newIds = this.newTags.map(t => t.id)
      return this.oldTags.filter(t => !newIds.includes(t.id))
    },
    getTagsToAdd: function () {
      const oldIds = this.oldTags.map(t => t.id)
      return this.newTags.filter(t => !oldIds.includes(t.id))
    }
  },
  created() {
    axios.get("/api/tags/all")
        .then(r => {
          this.allTags = r.data
        })
    if (this.pageId == undefined || this.pageId < 0) return
    axios.get("/api/wiki/tags/" + String(this.pageId))
        .then(t => {
          this.oldTags = t.data
          this.newTags = JSON.parse(JSON.stringify(t.data));
          const currentIds = this.oldTags.map(t => t.id)
          this.allTags = this.allTags.filter(t => !currentIds.includes(t.id))
        })
  }
})
</script>

<style scoped>

.wiki-tag {
  cursor: pointer;
}

.wiki-tag:hover {
  background: var(--color-accent);
}

</style>