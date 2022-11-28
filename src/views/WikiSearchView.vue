<template>
  <main>
    <div id="wiki-search-container">
      <div class="primary-container shadowed" id="wiki-search-result-pane">
        <div id="wiki-search-results-container">
          <div v-show="doShowNoResults" id="wiki-search-no-matches">
            <p>No matching pages found.</p>
          </div>
          <SearchResultComponent v-for="Result in searchResults" :resultData="Result"></SearchResultComponent>
        </div>
        <div v-show="doShowResults" id="wiki-search-results-page-selector">
          <SearchPageSelectorComponent
              :paginator="currentPage"
              :res-per-page="resultsPerPage"
              :total-results="totalResults"
              @firstPage="goToFirstPage"
              @prevPage="goToPrevPage"
              @nextPage="goToNextPage"
              @lastPage="goToLastPage"
          ></SearchPageSelectorComponent>
        </div>
      </div>
      <div class="secondary-container shadowed" id="wiki-search-settings-pane">
        <SearchSettingsComponent @search="updateCriteriaAndSearch($event)"></SearchSettingsComponent>
      </div>
      <div v-show="doShowResults" class="secondary-container shadowed" id="wiki-search-stats-pane">
        <p>{{searchStats}}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SearchSettingsComponent from "@/components/wiki/SearchSettingsComponent.vue";
import SearchResultComponent from "@/components/wiki/SearchResultComponent.vue";
import SearchPageSelectorComponent from "@/components/wiki/SearchPageSelectorComponent.vue";
import axios from "axios";

export default defineComponent({
  components: {SearchPageSelectorComponent, SearchSettingsComponent, SearchResultComponent},
  data: function () {
    return {
      doShowResults: false,
      doShowNoResults: false,
      totalResults: 0,
      resultsPerPage: 1,
      prevPage: -1,
      currentPage: -1,
      nextPage: -1,
      searchCriteria: {} as any,
      searchResults: [] as Array<any>,
      searchStats: "No results."
    }
  },
  methods : {
    updateCriteriaAndSearch: function (searchCriteria: any) {
      this.searchCriteria = searchCriteria
      this.resultsPerPage = searchCriteria.resultsPerPage
      this.prevPage = 0
      this.currentPage = 0
      this.nextPage = 0
      this.search()
    },
    search: function () {
      this.currentPage = this.searchCriteria.firstResult
      axios.post("/api/wiki/search/", this.searchCriteria)
          .then(r => {
            this.totalResults = r.data.totalResults
            this.prevPage = r.data.prevPage
            this.nextPage = r.data.nextPage
            this.searchStats = "Found " + r.data.totalResults + " results in " + r.data.timeTaken + "ms."
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
      this.doShowResults = false
      this.doShowNoResults = true
    },
    showResults: function (res: any) {
      this.searchResults = []
      this.doShowResults = true
      this.doShowNoResults = false
      for (const r in res) {
        if (res[r].author == null) res[r].author = "Unknown"
        if (res[r].createdAt == null) res[r].createdAt = "Unknown"
        else {
          const d = new Date(Date.parse(res[r].createdAt))
          res[r].createdAt = d.toLocaleString()
        }
        this.searchResults.push(res[r])
      }
    },
    goToFirstPage: function () {
      if (this.currentPage === 0) return
      this.searchCriteria.firstResult = 0
      this.search()
    },
    goToPrevPage: function () {
      if (this.prevPage < 0) return
      this.searchCriteria.firstResult = this.prevPage
      this.search()
    },
    goToNextPage: function () {
      if (this.nextPage < 0) return
      this.searchCriteria.firstResult = this.nextPage
      this.search()
    },
    goToLastPage: function () {
      const old = this.searchCriteria.firstResult
      if (this.totalResults % this.searchCriteria.resultsPerPage == 0) this.searchCriteria.firstResult = this.totalResults - this.searchCriteria.resultsPerPage
      else this.searchCriteria.firstResult = Math.floor(this.totalResults / this.searchCriteria.resultsPerPage) * this.searchCriteria.resultsPerPage
      if (old === this.searchCriteria.firstResult) return;
      this.search()
    }
  }
})
</script>

<style scoped>

#wiki-search-container {
  width: 95%;
  display: grid;
  grid-gap: 2rem;
  grid-template-areas:
            "content settings"
            "content stats";
  grid-template-columns: auto 20rem;
  grid-template-rows: auto 1fr;
  margin: 2rem auto;
  max-width: 100em;
}

#wiki-search-result-pane {
  grid-template-rows: min-content min-content;
  grid-area: content;
  height: fit-content;
}

#wiki-search-settings-pane {
  grid-area: settings;
}

#wiki-search-stats-pane {
  grid-area: stats;
  width: 100%;
  height: max-content;
}

#wiki-search-results-container {
  height: fit-content;
}

.primary-container {
  width: 100%;
  display: grid;
  justify-items: center;
  padding: 2rem 1rem 1rem 1rem;
  margin: 0;
}

#wiki-search-no-matches {
  display: grid;
  font-size: 2rem;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 1rem;
}

#wiki-search-results-page-selector {
  height: fit-content;
  align-self: end;
}

@media (max-width: 50rem) {
  #wiki-search-container {
    grid-template-areas:
            "settings"
            "content"
            "stats";
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
  }
}

</style>