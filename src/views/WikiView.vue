<template>
  <div class="wiki_page">
    <div class="page_selector">
      <input type="number" v-model="wikiPageId">
      <button v-on:click="getPageData()">Get Page</button>
    </div>
    <div class="formatted_content_section">
      <h1 v-html="wikiPageTitle"></h1>
      <div v-html="markdownToHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {marked} from 'marked';
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Wiki",
  methods: {
    getPageData: function () {
      axios.get("/api/wiki/" + String(this.wikiPageId))
          .then((response => {
            this.wikiPageTitle = response.data.title
            this.wikiPageContent = response.data.content
          }))
    }
  },
  data: function () {
    return {
      wikiPageTitle: "Please select a wiki page.",
      wikiPageContent: "",
      wikiPageId: 84682,
    }
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.wikiPageContent);
    },
  }
})
</script>

<style scoped>

.wiki_page {
  max-height: 80vh;
  min-width: 500px;
  display: grid;
  grid-template-rows: 10% 90%;
}
.page_selector {
  align-self: end;
  padding-bottom: 10px;
}
.page_selector :deep(input) {
  display: inline;
  /*max-width: 100%;*/
  padding: 12px 20px;
  margin: 8px 8px 8px 0;
  border: 2px solid #00bd7e;
  border-radius: 8px;
  /*box-sizing: border-box;*/
  width: 80%;
}
.page_selector:deep(button):hover {
  background-color: #00db91;
}
.page_selector :deep(button) {
  display: inline;
  width: 18%;
  padding: 12px 20px;
  border-radius: 8px;
  border: 0;
  background-color: #04AA6D;
}
.formatted_content_section {
  width: 100%;
  max-height: 100%;
  border-radius: 10px;
  padding: 10px;
  background: rgb(84, 98, 93);
  overflow: auto;
}

.formatted_content_section :deep(img) {
  max-width: 100%;
  height: auto;
}
.formatted_content_section :deep(strong) {
  font-weight: bold;
}
.formatted_content_section :deep(blockquote) {
  background: rgb(65, 75, 71);
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
}
.formatted_content_section :deep(code) {
  background: rgb(62, 68, 66);
  color: #e0e0e0;
  font-family: "Courier New", "Lucida Console", monospace;
  padding: 5px;
  border-radius: 5px;
}
.formatted_content_section :deep(hr) {
  border: 1px solid #1f946e;
  margin: 10px 0;
}
</style>