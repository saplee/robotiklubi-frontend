<template>
  <form id="wiki-search-settings">
    <label for="search-title">Search in title:</label>
    <input type="search" v-model="titleSearch" placeholder=". . ." id="search-title">
    <label for="search-content">Search in content:</label>
    <input type="search" v-model="contentSearch" placeholder=". . ." id="search-content">
    <label>Sorting Direction:</label>

    <div id="search-sorting-direction">
      <div class="sorting-selector">
        <input type="radio" v-model="sortAscending" value="true" id="sort-asc">
        <label for="sort-asc" id="sort-asc-label">
          <span>ASC</span>
        </label>
      </div>
      <div class="sorting-selector">
        <input type="radio" v-model="sortAscending" value="false" id="sort-desc">
        <label for="sort-desc" id="sort-desc-label">
          <span>DESC</span>
        </label>
      </div>
    </div>

    <label>Sorting By:</label>

    <div id="search-sorting-type">
      <div class="sorting-selector">
        <input type="radio" v-model="sortType" value="title" id="sort-title">
        <label for="sort-title" id="sort-title-label">
          <span>Title</span>
        </label>
      </div>
      <div class="sorting-selector">
        <input type="radio" v-model="sortType" value="created" id="sort-created">
        <label for="sort-created" id="sort-created-label">
          <span>Creation Date</span>
        </label>
      </div>
      <div class="sorting-selector">
        <input type="radio" v-model="sortType" value="edited" id="sort-edited">
        <label for="sort-edited" id="sort-edited-label">
          <span>Editing Date</span>
        </label>
      </div>
    </div>

    <label for="search-tags">Included Tags:</label>
    <div id="search-tags">
      <WikiTagComponent v-for="Tag in includedTags" :tag="Tag.tag" :id="Tag.id"
                        @tag="switchTag($event)"></WikiTagComponent>
    </div>

    <label for="all-tags">Available Tags:</label>
    <div id="all-tags">
      <WikiTagComponent v-for="Tag in allTags" :tag="Tag.tag" :id="Tag.id" @tag="switchTag($event)"></WikiTagComponent>
    </div>

    <label for="pagination-counter">Results per Page:</label>
    <div id="wiki-search-pagination-container">
      <input type="range" min="1" max="50" class="slider" id="pagination-slider" v-model="paginationAmount">
      <input class="counter" id="pagination-counter" v-model="paginationAmount" @input="checkCounter">
    </div>

    <button v-on:click="submit">Search</button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import WikiTagComponent from "@/components/wiki/WikiTagComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "SearchSettingsComponent",
  components: {WikiTagComponent},
  data: function () {
    return {
      titleSearch: "",
      contentSearch: "",
      sortAscending: false,
      sortType: "title",
      paginationAmount: "5",
      searchCriteria: {},
      includedTags: [] as Array<any>,
      allTags: [] as Array<any>
    }
  },
  methods: {
    submit(e: any) {
      e.preventDefault()
      this.saveCriteria()
    },
    saveCriteria: function () {
      this.searchCriteria = {
        titleSearch: this.titleSearch,
        contentSearch: this.contentSearch,
        sortAscending: this.sortAscending,
        sortByTitle: this.sortType === "title",
        sortByCreationDate: this.sortType === "created",
        sortByEditDate: this.sortType === "edited",
        resultsPerPage: parseInt(this.paginationAmount),
        firstResult: 0,
        tags: this.includedTags.map(t => t.id)
      }
      this.$emit('search', this.searchCriteria)
    },
    checkCounter: function () {
      let value = parseInt(this.paginationAmount)
      this.paginationAmount = value.toString();
      let max = 50
      let min = 1
      if (value > max) this.paginationAmount = "50"
      if (value < min) this.paginationAmount = "1"
      if (isNaN(value)) this.paginationAmount = "5"
    },
    switchTag: function (id: number) {
      for (let i = 0; i < this.allTags.length; i++) {
        if (this.allTags[i].id == id) {
          this.includedTags.push(this.allTags.splice(i, 1)[0])
          return
        }
      }
      for (let i = 0; i < this.includedTags.length; i++) {
        if (this.includedTags[i].id == id) {
          this.allTags.push(this.includedTags.splice(i, 1)[0])
          return
        }
      }
    }
  },
  created() {
    axios.get("/api/tags/all")
        .then(r => {
          this.allTags = r.data
          this.saveCriteria()
        })
        .catch(e => {
          this.allTags = []
          console.log(e)
        })
  }
})
</script>

<style scoped>

#wiki-search-settings {
  display: grid;
  font-weight: bold;
}

#wiki-search-settings > label {
  margin: 0.2rem 0 0.2rem 0;
}

#wiki-search-settings input[type="search"] {
  width: 100%;
  margin: 0.2rem 0 0.2rem 0;
  border-radius: 1rem;
  outline: none;
  font-size: 0.8em;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  background: var(--color-accent);
  border: none;
}

#wiki-search-settings input[type="search"]:focus-within {
  outline: solid var(--color-accent-soft) 3px;
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
  background-color: rgba(0, 0, 0, 40%);
}

.sorting-selector label {
  display: inline-grid;
  background-color: rgba(0, 0, 0, 20%);
  width: 100%;
  cursor: pointer;
  justify-content: center;
  padding: 0.5rem;
  font-weight: bold;
}

.sorting-selector:hover label {
  background-color: rgba(0, 0, 0, 30%);
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

#wiki-search-pagination-container {
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
}

.counter {
  margin-left: 0.5rem;
}

.slider {
  width: 100%;
}

button {
  margin-bottom: 0;
  font-size: 1em;
}

.wiki-tag {
  cursor: pointer;
}

.wiki-tag:hover {
  background: var(--color-accent);
}

</style>