<template>
  <main>
    <div id="wiki-search-container">
      <div class="primary-container shadowed">
        <div id="wiki-search-results-container">
          <div id="wiki-search-no-matches">
            <p>No matching pages found.</p>
          </div>
          <SearchResultComponent v-for="Result in searchResults" :resultData="Result"></SearchResultComponent>
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
import SearchResultComponent from "@/components/SearchResultComponent.vue";
import axios from "axios";

export default defineComponent({
  components: {SearchSettingsComponent, SearchResultComponent},
  data: function () {
    return {
      titleSearch: "",
      contentSearch: "",
      sortAscending: false,
      sortByTitle: false,
      sortByCreation: false,
      sortByEdited: false,
      totalResults: 0,
      searchCriteria: {},
      searchResults: [] as Array<any>,
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
      this.searchResults = []
      let noResults = document.getElementById("wiki-search-no-matches")
      if (noResults === null) return;
      noResults.style.display = "grid"
    },
    showResults: function (res: any) {
      this.searchResults = []
      let noResults = document.getElementById("wiki-search-no-matches")
      if (noResults === null) return;
      noResults.style.display = "none"
      for (const r in res) {
        if (res[r].author == null) res[r].author = "Unknown"
        if (res[r].createdAt == null) res[r].createdAt = "Unknown"
        else {
          const d = new Date(Date.parse(res[r].createdAt))
          res[r].createdAt = d.toLocaleString()
        }
        this.searchResults.push(res[r])
      }
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