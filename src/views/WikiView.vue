<template>
  <main>
    <div class="wiki_page">
      <div class="wiki_page_selector">
        <input type="number" v-model="wikiPageId">
        <button v-on:click="getPageData()">Get Page</button>
      </div>
      <div class="wiki_formatted_section">
        <h1 v-html="wikiPageTitle"></h1>
        <div v-html="markdownToHtml"></div>
      </div>
    </div>
  </main>
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
  min-width: 30rem;
  width: 80%;
  margin: 2rem auto;
  display: grid;
  grid-template-rows: 10% 90%;
}

.wiki_page_selector {
  display: grid;
  grid-template-columns: auto max-content;
}

.wiki_page_selector :deep(input) {
  padding: 1em 2em;
  margin: 1em 1em 1em 0;
  width: auto;
  border: 0.2em solid var(--color-accent);
  border-radius: 0.8em;
}

.wiki_formatted_section {
  width: 100%;
  max-height: 100%;
  border-radius: 1em;
  padding: 0.6em;
  background: var(--color-background-alternate);
  overflow: auto;
}

.wiki_formatted_section :deep(img) {
  max-width: 100%;
  height: auto;
}

</style>