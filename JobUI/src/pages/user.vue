<template>
  <div>
    <div class="content">
      <div class="leftbox user" style="position: relative;float: left">
        <div class="menu">
          <ul>
            <router-link  :to="{ name: '个人简历' }" tag="li" active-class="active"><i class="el-icon-document" ></i>我的简历</router-link>

            <router-link  :to="{ name: '投递反馈' }" tag="li" active-class="active"><i class="el-icon-message"></i> 我的投递</router-link>
            <li><i class="el-icon-star-off"></i>收藏记录</li>
            <li><i class="glyphicon glyphicon-cloud-upload"></i>职位推送</li>
            <li><i class="el-icon-setting"></i> 账号设置</li>
          </ul>
        </div>
      </div>

      <div class="rightbox" style="position: initial;margin-left: 256px">
        <router-view></router-view>
      </div>
      <div style="clear: both"></div>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return{
        userid:""
      }
    },
    methods:{

    },
    mounted(){

      this.userid=this.$route.id
    }

  }
</script>
<style lang="less">
  @import "../css/user.less";
</style>
