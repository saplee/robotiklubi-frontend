<template>
  <div class="social">
    <ul>
      <a href="https://et-ee.facebook.com/Robotiklubi/" target="_blank" ><img src="../assets/facebook_logo.png" style="width:50px;height:50px;"></a>
      <a href="https://www.instagram.com/robotiklubi/" target="_blank" ><img src="../assets/instagram_logo.png" style="width:50px;height:50px; position: absolute; left: 40px"></a>
    </ul>
    <h4>MTÜ TTÜ Robotiklubi
      Tallinna Tehnikaülikool
      Ehitajate tee 5
      19086 Tallinn
      Reg. kood: 80234864
      SEB Pank EE841010220057542019
      Füüsiliselt paikneme TTÜ kuuenda korpuse keldris, ruumis number U06-019
      robotiklubi@robotiklubi.ee
    </h4>
  </div>
</template>

<script>
export default {
  name: 'SocialMedia',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h4{
  bottom:0;
  position: fixed;
}
ul {
  list-style-type: none;
  padding: 0;
  position: center;

}
a{
  position: center;
}
</style>
