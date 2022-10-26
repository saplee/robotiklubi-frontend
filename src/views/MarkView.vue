<template>
  <div class="markdown_example">
    <div class="markdown_input">
      <h2>Write some <span style="color: #00bd7e">Markdown</span> and see it <span style="color: #00bd7e">Formatted</span>:</h2>
      <textarea v-model="markdown" rows="15" cols="80" class="text_box"></textarea>
    </div>
    <div class="formatted_section">
      <div v-html="markdownToHtml"></div>
    </div>
  </div>
</template>
<script>
import {marked} from 'marked';
export default {
  name: "Markdown",
  data() {
    return {
      markdown: "Marked - Markdown Parser\n" +
          "========================\n" +
          "\n" +
          "[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n" +
          "\n" +
          "How To Use The Demo\n" +
          "-------------------\n" +
          "\n" +
          "1. Type in stuff on the left.\n" +
          "2. See the live updates on the right.\n" +
          "\n" +
          "That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n" +
          "\n" +
          "- **Preview:**  A live display of the generated HTML as it would render in a browser.\n" +
          "- **HTML Source:**  The generated HTML before your browser makes it pretty.\n" +
          "- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n" +
          "- **Quick Reference:**  A brief run-down of how to format things using markdown.\n" +
          "\n" +
          "Why Markdown?\n" +
          "-------------\n" +
          "\n" +
          "It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n" +
          "\n" +
          "> The overriding design goal for Markdown's\n" +
          "> formatting syntax is to make it as readable\n" +
          "> as possible. The idea is that a\n" +
          "> Markdown-formatted document should be\n" +
          "> publishable as-is, as plain text, without\n" +
          "> looking like it's been marked up with tags\n" +
          "> or formatting instructions.\n" +
          "\n" +
          "Ready to start writing?  Either start changing stuff on the left or\n" +
          "[clear everything](/demo/?text=) with a simple click.\n" +
          "\n" +
          "[Marked]: https://github.com/markedjs/marked/\n" +
          "[Markdown]: http://daringfireball.net/projects/markdown/\n" +
          "\n" +
          "# More stuff\n" +
          "This is a code segment:\n" +
          "\n" +
          "    npm run serve\n" +
          "\n" +
          "This is a line:\n" +
          "\n" +
          "***\n" +
          "\n" +
          "This is *emphasis* and this is **bold**.\n" +
          "\n" +
          "You can use `code` inline.\n" +
          "\n" +
          "This is an image:\n" +
          "![Example image](http://robotiklubi.hopto.org/static/img/wasd.png)",
    };
  },
  computed: {
    markdownToHtml() {
      // console.log(marked.parse(this.markdown))
      return marked.parse(this.markdown);
    },
  }
};
</script>
<style scoped>
.formatted_section :deep(img) {
  max-width: 100%;
  height: auto;
}
:deep(strong) {
  font-weight: bold;
}
:deep(blockquote) {
  background: rgb(65, 75, 71);
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
}
:deep(code) {
  background: rgb(62, 68, 66);
  color: #e0e0e0;
  font-family: "Courier New", "Lucida Console", monospace;
  padding: 5px;
  border-radius: 5px;
}
:deep(hr) {
  border: 1px solid #1f946e;
  margin: 10px 0;
}
@media {
  .markdown_example {
    max-height: 80vh;
    min-width: 500px;
    display: grid;
    grid-template-rows: 50% 50%;
  }
  .markdown_input {
    align-self: end;
    padding-bottom: 10px;
  }
  .text_box {
    resize: none;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
    border: 2px solid rgb(84, 112, 102);
    background: rgb(84, 112, 102);
    color: #e0e0e0;
  }
  .formatted_section {
    width: 100%;
    max-height: 100%;
    border-radius: 10px;
    padding: 10px;
    background: rgb(84, 98, 93);
    overflow: auto;
  }
}
</style>