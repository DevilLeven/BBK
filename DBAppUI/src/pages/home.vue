<template>
  <div>


    <div class="leftnav">
      <left></left>
    </div>
    <div class="content">
      <div class="c-header">
        <my-header></my-header>
      </div>
      <div class="content-bottom">
        <!--<transition name="pageInUp">-->
          <router-view></router-view>
        <!--</transition>-->
      </div>
    </div>
  </div>
</template>

<script>
  import left from "./left-nav.vue";
  import Myheader from "./header.vue";
  import until from "../until";
  import router from "../route.config";
  export default {
    components: {
      left,
      "my-header": Myheader
    },
    mounted(){
      until.logincheck(this);
      this.$on("isLogin",function (data) {
        if (!data){
          router.replace({
            name: '登录'
          });
        }
      });
    },
  }
</script>

<style lang="less">
  @import "../css/home.scss";

</style>
