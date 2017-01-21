<template>
  <div class="navi bg-dark" >

    <div class="c-logo">
    <img src="../assets/logoko.png" style="width: 100px;border-radius: 50%">
    </div>
    <div class="line dk"></div>
    <el-menu theme="dark" :default-active="activeindex">
      <!--<div v-for="nav  in navdata">-->
        <!--<el-submenu v-bind:index.prop="nav.path"  v-if="nav.children">-->
          <!--<template  slot="title">{{nav.name}}</template>-->
          <!--<el-menu-item  v-bind:index.prop="cnav.path"  :route="{name:cnav.name}" v-for="cnav in nav.children" > {{cnav.name}}</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item v-bind:index.prop="nav.path"  :route="{name:nav.name}" v-else>{{nav.name}}</el-menu-item>-->
      <!--</div>-->
      <!--<el-menu-item  index="1-0" :route="{name:'个人信息初始化'}">个人信息初始化</el-menu-item>-->
      <router-link :to="{ name: '个人中心' }" tag="span"><el-menu-item  index="1-1" >个人中心</el-menu-item></router-link>
      <router-link :to="{ name: '学员管理' }" tag="span"><el-menu-item index="1-2" >学员管理</el-menu-item></router-link>
      <router-link :to="{ name: '职位搜索' }" tag="span"><el-menu-item index="1-3" >职位搜索</el-menu-item></router-link>
      <router-link :to="{ name: '投递管理' }" tag="span"><el-menu-item index="1-4" >投递管理</el-menu-item></router-link>
      <el-menu-item index="1-5" >对账结算</el-menu-item>
      <!--<el-menu-item index="1-3" :route="{name:'职位列表'}">职位管理</el-menu-item>-->
      <!--<el-menu-item index="1-4" :route="{name:''}">结算中心</el-menu-item>-->
    </el-menu>

  </div>
</template>
<script>
 // import navdata from "./left-nav.json";
  export default {
    name: "",
    data(){
      return {
        router:true,
        activeindex:"1-1"
     //   navdata: navdata
      }
    },
    mounted(){
      this.$watch(function () {
        return this.$route
      },function (newl,old) {
          this.activeindex=newl.meta.index;
      });
        this.activeindex=this.$route.meta.index;
    }

  }
</script>
<style lang="less">
  .bg-dark {
    color: #a6a8b1 !important;
    background-color: #3a3f51;
  }
  .el-menu--dark{
    background: #2e3344 !important;
  }
  .navi {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #2e3344;
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
    color: #fff !important;
    background: #212327;
  }
  .c-logo {
    text-align: center;
  }

  .line {
    width: 100%;
    height: 2px;
    margin: 10px 0 0px;
    overflow: hidden;
    /*font-size: 0;*/
  }

  .bg-dark .dk {
    background-color: #212327;
  }

</style>
