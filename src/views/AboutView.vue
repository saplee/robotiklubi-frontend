
<template>
  <main>
    <div class="primary-container shadowed">
    <h3>
      Tegemist on arenduses oleva Robotiklubi kodulehega, stabiilsuse tagamiseks külasta kas
      <a href="https://www.robotiklubi.ee" target="_blank" rel="noopener">Praegust Kodulehte</a> või
      <a href="http://wiki.robotiklubi.ee" target="_blank" rel="noopener">Wikit</a>.

    </h3>

    MTÜ TTÜ Robotiklubi on olnud üle 15 aasta turvaline koht inseneeria ja IT tudengitele,
    kus on võimalik õppida mentorite käe all, omale sobival meetodil robootikat ja kõike sellega kaasnevat.
    Sellega parandades oma karjääriväljavaateid, saades lisakogemusi ja suheldes teiste sama mõtteviisiga inimestega.

  </div>
  <div class="primary-container shadowed">

    <EmbedSocialWidget v-bind:ref-id="'34f1d98936ea773c28948cca33461d7e0f2e870c'"/>
  </div>
    <p class="primary-container shadowed">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.342461414674!2d24.6662913162262!3d59.39399871287759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469295076c02fda1%3A0xb2cefecd8e5de659!2sUniversity%20Robotics%20Club%20NGO!5e0!3m2!1sen!2see!4v1669974480514!5m2!1sen!2see" width="1000" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Maps"></iframe>
  </p>
  </main>
</template>
<script>
import EmbedSocialWidget from '@/components/EmbedSocialWidget.vue';
export default {
  components: {EmbedSocialWidget}
}
</script>