<template>
  <div
      class="embedsocial-hashtag" :data-ref="refId">
  </div>
</template>

<script>
export default {
  name: 'EmbedSocialWidget',
  props: ['refId'],
  created() {
    (function (d, s, id) {
      let js;
      console.log(d.getElementById(id))
      js = d.createElement(s);
      js.id = id;
      js.src = "https://embedsocial.com/cdn/ht.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    }(document, "script", "EmbedSocialHashtagScript"));
  }
}
</script>