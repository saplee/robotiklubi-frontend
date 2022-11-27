<template>
  <main>
    <div id="wiki-search-container">
      <div class="primary-container shadowed">
        <div id="wiki-search-results-container">
          <div id="wiki-search-no-matches">
            <p>No matching pages found.</p>
          </div>
          <div v-html="htmlSearchResults" class="search-result-container"></div>
        </div>
      </div>
      <div class="secondary-container shadowed">
        <SearchSettingsComponent @search="updateCriteriaAndSearch($event)"></SearchSettingsComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SearchSettingsComponent from "@/components/SearchSettingsComponent.vue";
import axios from "axios";

export default defineComponent({
  components: {SearchSettingsComponent},
  data: function () {
    return {
      titleSearch: "",
      contentSearch: "",
      sortAscending: false,
      sortByTitle: false,
      sortByCreation: false,
      sortByEdited: false,
      totalResults: 0,
      htmlSearchResults: "",
      searchCriteria: {}
    }
  },
  methods : {
    updateCriteriaAndSearch: function (searchCriteria: any) {
      this.searchCriteria = searchCriteria
      this.search()
    },
    search: function () {
      axios.post("/api/wiki/search/", this.searchCriteria)
          .then(r => {
            this.totalResults = r.data.numberOfResults
            this.showResults(r.data.results)
          })
          .catch(e => this.handleSearchError(e))
    },
    handleSearchError: function (e: any) {
      if (e != null && e.response.status != 404) console.log(e)
      this.noResultsFound()
    },
    noResultsFound: function () {
      this.htmlSearchResults = ""
      let noResults = document.getElementById("wiki-search-no-matches")
      if (noResults === null) return;
      noResults.style.display = "grid"
    },
    showResults: function (res: any) {
      let noResults = document.getElementById("wiki-search-no-matches")
      if (noResults === null) return;
      noResults.style.display = "none"
      let results = ""
      for (const r in res) {
        let id = res[r].id
        let author = res[r].author
        let createdAt = res[r].createdAt
        if (author == null) author = "Unknown"
        if (createdAt == null) createdAt = "Unknown"
        else {
          const d = new Date(Date.parse(createdAt))
          createdAt = d.toLocaleString()
        }
        results += "<a href='#/wiki?id=" + id + "'>" +
            "         <div class=\"search-result-item round_corners\">\n" +
            "           <div class=\"search-result-title\">\n" +
            "             <h3>" + res[r].title + "</h3>\n" +
            "           </div>\n" +
            "           <div class=\"search-result-summary\">\n" +
            "             <p>" + res[r].summary + "</p>\n" +
            "           </div>\n" +
            "           <div class=\"search-result-details\">\n" +
            "             <p>Author: " + author + "</p>\n" +
            "             <p>Created At: " + createdAt + "</p>\n" +
            "           </div>\n" +
            "         </div>\n" +
            "       <\a>\n"
      }
      this.htmlSearchResults = results
    }
  }
})
</script>

<style scoped>

#wiki-search-container {
  width: 95%;
  display: flex;
  margin: auto;
  max-width: 100em;
}

.primary-container {
  width: 95%;
  padding: 2rem 1rem 1rem 1rem;
}

.secondary-container {
  width: 25%;
  margin: 2rem 0 2rem 2rem;
  height: max-content;
}

#wiki-search-no-matches {
  display: none;
  font-size: 2rem;
  font-weight: bold;
  justify-content: center;
}

.search-result-container :deep(a) {
  text-decoration: none;
  color: var(--color-text);
}

:deep(.search-result-item) {
  background: rgba(0, 0, 0, 5%);
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
}

:deep(.search-result-item:hover),
:deep(.search-result-item:focus-within) {
  background: rgba(0, 0, 0, 10%);
}

:deep(.search-result-summary) {
  font-size: 0.8em;
}

:deep(.search-result-details) {
  display: flex;
  font-size: 0.7em;
  justify-content: end;
}

:deep(.search-result-details p) {
  opacity: 70%;
  margin: 0 1rem 0 0;
}

@media (max-width: 60rem) {
  #wiki-search-container {
    flex-direction: column-reverse;
  }

  .secondary-container {
    margin: 2rem auto 0 auto;
    width: 95%;
    max-width: 95%;
  }
}

</style>