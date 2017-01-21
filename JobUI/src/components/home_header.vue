<template>
  <div class="header">
    <!--<div class="topbar">-->
      <!--<a style="cursor: pointer">进入企业版</a>-->
      <!--<div class="rightbox">-->
        <!--<a>登录</a>-->
        <!--<a>|</a>-->
        <!--<a>注册</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="header-conent">
      <div class="headercon">
        <div class="logo">
         <img src="../assets/logo.png" style="height: 100%" >
          <!--<el-popover-->
            <!--ref="popover1"-->
            <!--placement="bottom"-->
            <!--trigger="click">-->
            <!--<div class="logocitylist">-->
              <!--<ul>-->
                <!--<li><a>北京</a></li>-->
                <!--<li><a>上海</a></li>-->
                <!--<li><a>南京</a></li>-->
                <!--<li><a>广州</a></li>-->
                <!--<li><a>河北</a></li>-->
                <!--<li><a>河南</a></li>-->
                <!--<li><a>石家庄</a></li>-->
                <!--<li><a>济南</a></li>-->
              <!--</ul>-->
            <!--</div>-->

          <!--</el-popover>-->
          <div class="title" style="position:absolute;right: 0;top: 8px;">北京<span class="changelocal">[切换城市]</span></div>


        </div>
        <div class="menubox">
          <ul>
            <router-link target="_blank" :to="{ name: '首页' }" tag="li" active-class="active"><a>首页</a></router-link>
            <router-link target="_blank" :to="{ name: '职位列表' }" tag="li" active-class="active"><a>求职</a></router-link>

            <li><a >明星企业</a></li>
            <li><a>关于我们</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods:{

    }

  }
</script>
<style lang="less">
@import "../css/header.less";
</style>
