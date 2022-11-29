<template>
<div v-html="processMarkdown" class="markdown"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {marked} from 'marked';
import highlight from 'highlight.js'
import 'highlight.js/styles/nord.css'

export default defineComponent({
  name: "MarkdownComponent",
  computed: {
    processMarkdown() {
      return marked(
          this.content, {
            highlight(md) {
              return highlight.highlightAuto(md).value
            }
          }
      );
    }
  },
  props: [
      'content'
  ]
})
</script>

<style scoped>

</style>