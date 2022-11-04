<template>
  <footer>
    <div class="footer_container">
      <div class="footer_info_vertical">
        <div class="footer_info_horizontal">
          <p>
            MTÜ TTÜ Robotiklubi<br>
            Tallinna Tehnikaülikool<br>
            Ehitajate tee 5<br>
            19086 Tallinn
          </p>
          <p>
            Reg. kood: 80234864<br>
            SEB Pank EE841010220057542019<br>
            robotiklubi@robotiklubi.ee
          </p>
        </div>
        <p>
          Füüsiliselt paikneme TTÜ kuuenda korpuse keldris, ruumis number U06-019.
        </p>
      </div>
      <div class="social_link_container">
        <a class="social_link" href="https://et-ee.facebook.com/Robotiklubi/" target="_blank">
          <img src="../assets/facebook_logo.png" alt="facebook" style="width:50px;height:50px;">
        </a>
        <a class="social_link" href="https://www.instagram.com/robotiklubi/" target="_blank">
          <img src="../assets/instagram_logo.png" alt="instagram" style="width:50px;height:50px; left: 40px">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>

footer {
  background-color: var(--color-background-alternate);
  margin-top: auto;
  width: 100%;
  overflow: auto;
}

.footer_container {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  font-size: 0.8rem;
}

.footer_container p {
  margin: 0.5rem 2rem;
}

.footer_info_vertical {
  display: flex;
  flex-direction: column;
}

.footer_info_horizontal {
  display: flex;
  /*grid-template-columns: max-content max-content;*/
}

.social_link_container {
  margin: auto 0;
  padding: 1rem;
}

.social_link {
  margin: auto auto;
  padding: 1rem;
}

</style>