<template>
  <div id="markdown-editor-wrapper">
    <div class="primary-container shadowed">
      <input v-model="title" placeholder="Title..." @input="limitTitleLength">
      <textarea v-model="content" placeholder="There once was a robot..."></textarea>
    </div>
    <div class="primary-container shadowed">
      <h1 v-html="title"></h1>
      <hr>
      <MarkdownComponent :content="content"></MarkdownComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MarkdownComponent from "@/components/wiki/MarkdownComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "WikiCreateView",
  components: {MarkdownComponent},
  props: {
    pageId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    limitTitleLength: function () {
      if (this.title.length > 50) this.title = this.title.substring(0, 50)
    },
  },
  data() {
    return {
      title: "",
      content: ""
    }
  },
  created() {
    if (this.pageId < 0) return;
    axios.get("/api/wiki/" + this.pageId)
        .then(r => {
          this.title = r.data.title.trim()
          this.content = r.data.content
        })
  }
})
</script>

<style scoped>

#markdown-editor-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

.primary-container {
  width: 100%;
  padding: 1rem;
  margin: 0;
  height: fit-content;
}

input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 8%);
  outline: none;
  border: none;
  font-size: 2em;
  color: var(--color-text);
  font-weight: bold;
}

textarea {
  padding: 0.5rem;
  color: var(--color-text);
  font-size: 1em;
  resize: vertical;
  margin-top: 1rem;
  outline: none;
  border: none;
  height: 50rem;
  width: 100%;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 8%);
}

h1 {
  word-break: break-word;
}

@media (max-width: 70rem) {
  #markdown-editor-wrapper {
    grid-template-columns: none;
    grid-template-rows: auto auto;
  }
}

</style>