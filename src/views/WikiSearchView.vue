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
        <form id="wiki-search-settings">
          <label for="search-title">Search in title:</label>
          <input type="search" v-model="titleSearch" placeholder=". . ." id="search-title">
          <label for="search-content">Search in content:</label>
          <input type="search" v-model="contentSearch" placeholder=". . ." id="search-content">
          <label>Sorting Direction:</label>

          <div id="search-sorting-direction">
            <div class="sorting-selector">
              <input type="radio" name="direction" id="sort-asc" checked="checked">
              <label for="sort-asc" id="sort-asc-label">
                <span>ASC</span>
              </label>
            </div>
            <div class="sorting-selector">
              <input type="radio" name="direction" id="sort-desc">
              <label for="sort-desc" id="sort-desc-label">
                <span>DESC</span>
              </label>
            </div>
          </div>

          <label>Sorting By:</label>

          <div id="search-sorting-type">
            <div class="sorting-selector">
              <input type="radio" name="sort-type" id="sort-title" checked="checked">
              <label for="sort-title" id="sort-title-label">
                <span>Title</span>
              </label>
            </div>
            <div class="sorting-selector">
              <input type="radio" name="sort-type" id="sort-created">
              <label for="sort-created" id="sort-created-label">
                <span>Creation Date</span>
              </label>
            </div>
            <div class="sorting-selector">
              <input type="radio" name="sort-type" id="sort-edited">
              <label for="sort-edited" id="sort-edited-label">
                <span>Editing Date</span>
              </label>
            </div>
          </div>

          <input type="submit" v-on:click="updateCriteriaAndSearch()" style="display: none">
          <button v-on:click="updateCriteriaAndSearch()">Search</button>
        </form>
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
    updateCriteriaAndSearch: function () {
      const sortAsc = document.getElementById("sort-asc") as HTMLInputElement
      const sortTitle = document.getElementById("sort-title") as HTMLInputElement
      const sortCreatedAt = document.getElementById("sort-created") as HTMLInputElement
      const sortEditedAt = document.getElementById("sort-edited") as HTMLInputElement
      this.sortAscending = sortAsc.checked;
      this.sortByTitle = sortTitle.checked;
      this.sortByCreation = sortCreatedAt.checked;
      this.sortByEdited = sortEditedAt.checked;
      this.searchCriteria = {
        titleSearch: this.titleSearch,
        contentSearch: this.contentSearch,
        sortAscending: this.sortAscending,
        sortByTitle: this.sortByTitle,
        sortByCreationDate: this.sortByCreation,
        sortByEditDate: this.sortByEdited
      }
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

#wiki-search-settings {
  display: grid;
  font-weight: bold;
}

#wiki-search-settings > label {
  margin: 0.2rem 0 0.2rem 0;
}

#wiki-search-settings input[type="search"] {
  margin: 0.2rem 0 0.2rem 0;
  border-radius: 1rem;
  outline: none;
  font-size: 0.8em;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  background: var(--color-accent);
  border: none;
}

#search-sorting-direction {
  display: grid;
  grid-template-columns: 50% 50%;
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

input[type="radio"]:checked ~ label {
  background-color: rgba(0, 0, 0, 50%);
}

.sorting-selector label {
  display: inline-grid;
  background-color: rgba(0, 0, 0, 25%);
  /*height: 100%;*/
  width: 100%;
  cursor: pointer;
  justify-content: center;
  padding: 0.5rem;
  font-weight: bold;
}

#sort-asc-label {
  border-radius: 0.7rem 0 0 0.7rem;
}

#sort-desc-label {
  border-radius: 0 0.7rem 0.7rem 0;
}

#sort-title-label {
  border-radius: 0.7rem 0.7rem 0 0;
}

#sort-edited-label {
  border-radius: 0 0 0.7rem 0.7rem;
}

button {
  margin-bottom: 0;
  font-size: 1em;
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