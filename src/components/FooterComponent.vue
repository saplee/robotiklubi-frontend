<template>
  <footer class="shadowed-reverse">
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
            <br>
            robotiklubi@robotiklubi.ee
          </p>
        </div>
        <p>
          Füüsiliselt paikneme TTÜ kuuenda korpuse keldris, ruumis number U06-019.
        </p>
      </div>
      <div class="social_links_container">
        <div class="social_link_container">
          <a class="social_link" href="https://et-ee.facebook.com/Robotiklubi/" target="_blank">
            <img src="../assets/facebook_logo.png" alt="facebook" class="shadowed">
          </a>
        </div>
        <div class="social_link_container">
          <a class="social_link" href="https://www.instagram.com/robotiklubi/" target="_blank">
            <img src="../assets/instagram_logo.png" alt="instagram" class="shadowed">
          </a>
        </div>
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
}

.social_links_container {
  margin: auto 0;
  padding: 1rem;
}

.social_link_container {
  display: inline-block;
  padding: 1rem;
}

.social_link {
  display: inline-block;
}

.social_link img {
  width:50px;
  height:50px;
  transition: margin var(--transition-duration);
  display: block;
}

.social_link:hover img, .social_link:focus-within img {
  margin-bottom: 5px;
  margin-top: -5px;
}

</style>