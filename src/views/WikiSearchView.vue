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
        <p>Side container</p>
        <p>Search in title:</p>
        <input type="text" v-model="searchCriteria.titleSearch">
        <p>Search in content:</p>
        <input type="text" v-model="searchCriteria.contentSearch">
        <button v-on:click="search()">Search</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
  data: function () {
    return {
      searchCriteria: {
        titleSearch: "",
        contentSearch: ""
      },
      totalResults: 0,
      htmlSearchResults: ""
    }
  },
  methods : {
    search: function () {
      // const searchCriteria = {
      //       titleSearch: "arduino"
      // }
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
        console.log(res[r])
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

.search-result-container >>> a {
  text-decoration: none;
  color: var(--color-text);
}

.search-result-container >>> .search-result-item {
  background: rgba(0, 0, 0, 5%);
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
}

.search-result-container >>> .search-result-item:hover,
.search-result-container >>> .search-result-item:focus-within {
  background: rgba(0, 0, 0, 10%);
}

.search-result-container >>> .search-result-summary {
  font-size: 0.8em;
}

.search-result-container >>> .search-result-details {
  display: flex;
  font-size: 0.7em;
  justify-content: end;
}

.search-result-container >>> .search-result-details p {
  opacity: 70%;
  margin: 0 1rem 0 0;
}

@media (max-width: 60rem) {
  #wiki-search-container {
    flex-direction: column;
  }

  .secondary-container {
    margin: 0 auto 2rem auto;
    width: auto;
    max-width: 95%;
  }
}

</style>