<template>
  <div>
    <textarea v-model="markdown"></textarea>
    <div v-html="markdownToHtml"></div>
  </div>
</template>
<script>
import {marked} from 'marked';
export default {
  name: "Markdown",
  data() {
    return {
      markdown: " # hello world ",
    };
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.markdown);
    },
  }
};
</script>
<style>
</style>