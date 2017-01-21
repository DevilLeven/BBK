<template>
  <div>
    <div>
      <my-header></my-header>
    </div>
    <div style="margin-top: 100px">
      <el-card class="box-card" style="width: 450px;margin: 0 auto;">
        <div slot="header" class="clearfix" style="text-align: center; ">
          <span style="line-height: 36px;font-size: 23px">登录</span>
        </div>
        <div style="text-align: center"  v-loading.body="loading">
          <el-form :model="from" label-width="80px" @submit.native.prevent="login">
            <el-form-item label="用户名">
              <el-input v-model="from.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="from.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="from.Verifycode" style="width: 62%;float: left"></el-input>
              <img id="vcode" src="/SIMS/Verify_code.html"  @click="changeverifycode"  style="width: 94px;cursor: pointer">
            </el-form-item>
            <el-form-item style="margin-left: -40px">
              <el-button native-type="submit"  type="primary" style="width: 90%;margin: 0 auto">登录</el-button>
            </el-form-item>
            <!--<div class="reg" style="text-align: right;">-->
            <!--<router-link  :to="{ name: '注册' }" style="color: #2ea0ff"><a>立即注册</a></router-link>-->
            <!--</div>-->
          </el-form>

          <el-button @click="actionother">测试其他</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style>
  .el-input__inner {
    font-size: 14px;
  }
</style>
<script>
  import Myheader from "./header.vue";
  import route from "../route.config";
  // import {card,button,form,formItem,input} from "element-ui"
  export default {
    components: {
      "my-header": Myheader
    },
    mounted(){

    },
    data() {
      return {
        from: {
          username: "",
          password: "",
          Verifycode: "",
          logintype: "PC"
        },
        loading:false
      }
    },
    methods: {
      login() {

        if(this.from.username.trim()==""){
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
        }
        if(this.from.Verifycode.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写验证码',
            type: 'warning'
          });
          return false
        }

        this.loading=true;

        this.$http({
          method:'post',
          url:'/SIMS/login.html',
          emulateJSON:true,
          body:{
            'username':this.from.username.trim(),'password':this.from.password.trim(),
            Verifycode:this.from.Verifycode.trim(),
            logintype:"PC"
          }
        }).then(function (response) {
          this.loading=false;
          let data=response.data;
          if (data.result=="success"){
            this.$auth.user(data.resultEntity.login);
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
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

//      this.$http({
//        method:'post',
//        url:'/api/sign/sign-in',
//        emulateJSON:true,
//        body:{
//          'userId':this.from.username.trim(),'password':this.from.password.trim(),
//          verify:this.from.Verifycode.trim(),
//          type:"2"
//        }
//      }).then(function (response) {
//        this.loading=false;
//        let data=response.data;
//        if (data.result=="success"){
//         this.$auth.user(data.resultEntity.login);
//          this.$notify({
//            title: '成功',
//            message: data.resultEntity.message,
//            type: 'success'
//          });
//          route.replace({
//        name: '职位列表'
//      })
//        } else if(data.result=="fail") {
//          this.$notify({
//            title: '失败',
//            message: data.resultEntity.message,
//            type: 'error'
//          });
//
//        }
//      },function (error) {
//        this.loading=false;
//      });

//      route.replace({
//        path: '/companyinfoinit'
//      })

//      this.$auth.user({
//        userid: "1233",
//        email: "wwww",
//        roles: ["admin", "chart", "about"]
//      });
//      // console.log(this.$route)
//      //route.push({ path: '/chart' })
//
//      if (this.$auth.check(["chart"])) {
//
//      }

      },
      changeverifycode(){
        document.getElementById("vcode").src=document.getElementById("vcode").src+"?v="
      },
      actionother(){
        this.$http({
          method:'post',
          url:'/SIMS/findUserFoot.html',
          emulateJSON:true,
          body:{
            'opertype':'YK-CRE',
            'logtype':0,
            pageCount:1,
            logintype:"PC"
          }
        }).then(function (response) {

        })
      }
    }
  }
</script>
