<template>
  <main>
    <div id="wiki-create-container">
      <div class="primary-container shadowed">
        <input v-model="title" id="wiki-create-title" placeholder="Title...">
        <textarea v-model="content" placeholder="There once was a robot..."></textarea>
      </div>
      <div class="primary-container shadowed" id="wiki-create-markdown-input">
        <h1 v-html="title"></h1>
        <hr>
        <MarkdownComponent :content="content"></MarkdownComponent>
      </div>
      <div class="secondary-container shadowed">
        <button>Create</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MarkdownComponent from "@/components/wiki/MarkdownComponent.vue";

export default defineComponent({
  name: "WikiCreateView",
  components: {MarkdownComponent},
  data() {
    return {
      title: "",
      content: ""
    }
  }
})
</script>

<style scoped>

#wiki-create-container {
  width: 95%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  grid-gap: 1rem;
}

.primary-container {
  width: 100%;
  padding: 1rem;
  margin: 0;
  height: fit-content;
}

.secondary-container {
  margin: 0;
  height: fit-content;
}

#wiki-create-markdown-input {
  min-height: 20rem;
}

#wiki-create-title {
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
  resize: none;
  margin-top: 1rem;
  outline: none;
  border: none;
  min-height: 50rem;
  width: 100%;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 8%);
}

button {
  width: 100%;
}

</style>