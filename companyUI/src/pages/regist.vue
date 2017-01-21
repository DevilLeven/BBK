<template>
  <div>
    <div>
      <my-header></my-header>
    </div>
    <div style="margin-top: 100px;margin-bottom: 50px">
      <el-card class="box-card" style="width: 450px;margin: 0 auto;">
        <div slot="header" class="clearfix" style="text-align: center; ">
          <span style="line-height: 36px;font-size: 23px">注册</span>
        </div>
        <div style="text-align: center ;" v-loading.body="loading">
          <el-form :model="from" label-width="80px" @submit.native.prevent="regist">
            <el-form-item label="用户名">
              <el-input v-model="from.nickName"></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input type="password" v-model="from.password"></el-input>
            </el-form-item>
            <el-form-item label="密码确认">
              <el-input type="password" v-model="from.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="from.phoneNo"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="from.email"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="from.address"></el-input>
            </el-form-item>
            <el-form-item label="企业介绍">
              <el-input type="textarea" v-model="from.introduction"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: -40px">
              <el-button native-type="submit"   type="primary" style="width: 90%;margin: 0 auto">注册</el-button>
            </el-form-item>
            <div class="reg" style="text-align: left;">
              <router-link  :to="{ name: '登录' }" style="color: #2ea0ff"><a>返回登录</a></router-link>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import Myheader from "./header.vue";
  import route from "../route.config";
  export default{
    components: {
      "my-header": Myheader
    },
    data() {
      return {
        from: {
          "address": "",
          "confirmPassword": "",
          "email": "",
          "extra": "",
          "introduction": "",
          "nickName": "",
          "password": "",
          "phoneNo": ""
        },
        loading:false,
      }
    },
    methods: {
      regist(){
        if(this.from.nickName.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写用户名',
            type: 'warning'
          });
          return false
        }
        if(this.from.password.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写密码',
            type: 'warning'
          });
          return false
        }if(this.from.confirmPassword.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写密码确认',
            type: 'warning'
          });
          return false
        }
        if(this.from.confirmPassword.trim()!=this.from.password.trim()){
          this.$message({
            showClose: true,
            message: '两次密码填写不相同',
            type: 'error'
          });
          return false
        }
        this.loading=true;
        this.$http({
          method:'post',
          url:'/api/sign/sign-up',
          body:this.from
        }).then(function (response) {
          this.loading=false;
          let data=response.data;
          if (data.result=="success"){
//          this.$auth.user(user);
            this.$notify({
              title: '成功',
              message: '注册成功',
              type: 'success'
            });
          } else if(data.result=="fail") {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        },function (error) {
          this.loading=false;
        });
      }
    }
  }

</script>
<style lang="less">

</style>
