<template>
  <main>
    <div class="primary-container shadowed">
      <h1>
        Robotiklubist
      </h1>
    </div>
    <div class="primary-container shadowed">
      MTÜ TTÜ Robotiklubi on olnud üle 15 aasta turvaline koht inseneeria ja IT tudengitele,
      kus on võimalik õppida mentorite käe all, omale sobival meetodil robootikat ja kõike sellega kaasnevat.
      Sellega parandades oma karjääriväljavaateid, saades lisakogemusi ja suheldes teiste sama mõtteviisiga inimestega.

    </div>
    <div class="primary-container shadowed">

      <EmbedSocialWidget v-bind:ref-id="'34f1d98936ea773c28948cca33461d7e0f2e870c'"/>
    </div>
    <div class="primary-container shadowed map-container">
      <iframe class="round_corners"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.342461414674!2d24.6662913162262!3d59.39399871287759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469295076c02fda1%3A0xb2cefecd8e5de659!2sUniversity%20Robotics%20Club%20NGO!5e0!3m2!1sen!2see!4v1669974480514!5m2!1sen!2see"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Maps"></iframe>
    </div>
  </main>
</template>
<script>
import EmbedSocialWidget from '@/components/EmbedSocialWidget.vue';

export default {
  components: {EmbedSocialWidget}
}
</script>

<style scoped>

.map-container {
  padding: 2rem;
}

iframe {
  display: block;
  border: none;
  width: 100%;
  height: 30rem;
  padding: 0;
}

</style>