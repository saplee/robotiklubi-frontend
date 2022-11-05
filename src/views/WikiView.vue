<template>
  <main>
    <div class="primary_container">
      <div id="wiki_page_selector">
        <input type="number" v-model="wikiPageId">
        <button v-on:click="getPageData()">Get Page</button>
      </div>
      <div class="secondary_container">
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

#wiki_page_selector {
  display: grid;
  grid-template-columns: auto max-content;
}

#wiki_page_selector input {
  padding: 1em 2em;
  margin: 1em 1em 1em 0;
  width: auto;
  border: 0.2em solid var(--color-accent);
  border-radius: 0.8em;
}

</style>