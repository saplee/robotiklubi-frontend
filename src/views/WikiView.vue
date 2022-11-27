<template>
  <main>
    <div id="wiki-content-container">
      <div class="primary-container shadowed">
        <h1 v-html="wikiPageTitle"></h1>
        <hr>
        <div v-html="markdownToHtml" class="markdown"></div>
      </div>
      <div class="secondary-container shadowed">
        <p><strong>Author:</strong></p>
        <p v-text="wikiPageAuthor"></p>
        <p><strong>Created At:</strong></p>
        <p v-text="wikiPageCreationDate"></p>
        <p><strong>Last Edited By:</strong></p>
        <p v-text="wikiPageEditedBy"></p>
        <p><strong>Last Edited At:</strong></p>
        <p v-text="wikiPageEditDate"></p>
        <p><strong>Tags:</strong></p>
        <div v-html="wikiPageTags" class="wiki-tag-container">
        </div>
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
    loadPage() {
      if (!this.$router.currentRoute.value.query.hasOwnProperty("id")) return this.setPageNotFound()
      const pageId = this.$router.currentRoute.value.query.id
      if (typeof pageId != "string" || pageId === this.wikiPageId) return
      this.getPageData(pageId);
    },
    getPageData: function (id: string) {
      this.wikiPageId = id
      axios.get("/api/wiki/" + String(id))
          .then(this.setPageData)
          .catch(this.handleError)
    },
    handleError(e: any) {
      if (e != null && e.response.status != 404) console.log(e)
      this.setPageNotFound()
    },
    setPageData: function (r: any) {
      this.wikiPageTitle = r.data.title
      this.wikiPageContent = r.data.content
      this.wikiPageAuthor = r.data.author
      this.wikiPageEditedBy = r.data.lastEditedBy
      this.wikiPageCreationDate = r.data.createdAt
      this.wikiPageEditDate = r.data.lastEdited
      if (this.wikiPageAuthor == null) this.wikiPageAuthor = "Unknown"
      if (this.wikiPageEditedBy == null) this.wikiPageEditedBy = "Unknown"
      if (!(this.wikiPageCreationDate == null)) {
        const d = new Date(Date.parse(this.wikiPageCreationDate))
        this.wikiPageCreationDate = d.toLocaleString()
      } else this.wikiPageCreationDate = "Unknown"
      if (!(this.wikiPageEditDate == null)) {
        const d = new Date(Date.parse(this.wikiPageEditDate))
        this.wikiPageEditDate = d.toLocaleString()
      } else this.wikiPageEditDate = "Unknown"
      this.getPageTags()
    },
    getPageTags: function () {
      axios.get("/api/wiki/tags/" + String(this.wikiPageId))
          .then(this.setPageTags)
    },
    setPageTags: function (tags: any) {
      tags = tags.data
      this.wikiPageTags = ""
      for (const tag in tags) {
        this.wikiPageTags += "<p class=\"wiki-tag\">" + tags[tag].tag.trim() + "</p>\n"
        console.log(tags[tag].tag)
      }
      if (!tags) this.wikiPageTags = "None"
    },
    setPageNotFound: function () {
      this.wikiPageId = ""
      this.wikiPageTitle = "Wiki Page Not Found."
      this.wikiPageContent = ""
      this.wikiPageAuthor = ""
      this.wikiPageCreationDate = ""
      this.wikiPageEditedBy = ""
      this.wikiPageEditDate = ""
      this.wikiPageTags = ""
    },
  },
  data: function () {
    return {
      wikiPageId: "",
      wikiPageTitle: "Wiki Page Not Found.",
      wikiPageContent: "",
      wikiPageAuthor: "",
      wikiPageCreationDate: "",
      wikiPageEditedBy: "",
      wikiPageEditDate: "",
      wikiPageTags: "",
    }
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.wikiPageContent);
    }
  },
  beforeMount: function () {
    this.loadPage()
  },
  beforeUpdate() {
    this.loadPage()
  }
})
</script>

<style scoped>

#wiki-content-container {
  width: 95%;
  display: flex;
  margin: auto;
  max-width: 100em;
}

.primary-container {
  width: 95%;
}

.secondary-container {
  width: 25%;
  margin: 2rem 0 2rem 2rem;
  height: max-content;
}

.wiki-tag-container :deep(.wiki-tag) {
  display: inline-flex;
  border-radius: 1rem;
  margin: 0 0.2rem 0 0.2rem;
  padding: 0 0.5rem 0 0.5rem;
  background: var(--color-accent-soft);
  color: var(--col-light-text-1);
  font-size: 0.8em;
  font-weight: bold;
}

@media (max-width: 60rem) {
  #wiki-content-container {
    flex-direction: column;
  }

  .secondary-container {
    margin: 0 auto 2rem auto;
    width: 95%;
  }
}

</style>