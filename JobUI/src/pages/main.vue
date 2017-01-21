<template>
  <div>
  <MYheader></MYheader>
    <!--<keep-alive>-->
    <router-view></router-view>
      <!--</keep-alive>-->
    <MYfooter></MYfooter>
  </div>
</template>
<script>
  import MYheader from "../components/home_header.vue";
  import MYfooter from "../components/footer.vue";

  export default{
    components: {
      MYheader,
      MYfooter
    }
  }
</script>
