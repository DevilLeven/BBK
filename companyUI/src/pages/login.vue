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
            <img id="vcode" src="api/sign/verifycode"  @click="changeverifycode"  style="width: 94px;cursor: pointer">
          </el-form-item>
          <el-form-item style="margin-left: -40px">
            <el-button native-type="submit"  type="primary" style="width: 90%;margin: 0 auto">登录</el-button>
          </el-form-item>
          <div class="reg" style="text-align: right;">
          <a style="color: #ff4949;cursor: pointer" @click="dialogpsd=true">重置密码</a>
          </div>
          <!--<div class="reg" style="text-align: right;">-->
            <!--<router-link  :to="{ name: '注册' }" style="color: #2ea0ff"><a>立即注册</a></router-link>-->
          <!--</div>-->
        </el-form>
      </div>
    </el-card>
  </div>
  <el-dialog title="重置密码" v-model="dialogpsd" size="tiny" :close-on-click-modal="false" v-loading.body="dialogpsdloading">
    <p>用户名和用户邮箱任选其一填写,系统将会为您重置密码</p>
    <el-form :model="psdfrom" label-position="top">
      <el-form-item label="用户名" >
        <el-input v-model.trim="psdfrom.userName"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model.trim="psdfrom.email"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model.trim="psdfrom.verify" style="width: 60%;float: left"></el-input>
        <img id="vcodepsd" src="api/sign/verifycode"  @click="changeverifycode"  style="width: 94px;cursor: pointer;margin-left: 10px">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogpsd = false">取 消</el-button>
      <el-button type="primary" @click="changepsd">确 定</el-button>
    </div>
  </el-dialog>
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
    this.$watch("dialogpsd",function (newl,old) {
      if(!newl){
        this.psdfrom={};
      }
    });
  },
  data() {
    return {
      from: {
        username: "",
        password: "",
        Verifycode: "",
        logintype: "PC"
      },
      loading:false,
      dialogpsd:false,
      psdfrom:{},
      dialogpsdloading:false
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
        url:'api/sign/sign-in',
        emulateJSON:true,
        body:{
          'userId':this.from.username.trim(),'password':this.from.password.trim(),
          verify:this.from.Verifycode.trim(),
          type:"2"
        }
      }).then(function (response) {
        this.loading=false;
        let data=response.data;
        if (data.result&&data.result=="success"){
         this.$auth.user(data.resultEntity.login);
          this.$notify({
            title: '成功',
            message: data.resultEntity.message,
            type: 'success'
          });
          route.replace({name: '职位列表'})
        }else if(data.result&&data.resultEntity.error_code==1017){
          this.$notify({
            title: '失败',
            message: data.resultEntity.message,
            type: 'error'
          });
          this.changeverifycode();
        }else if(data.result) {
          this.$notify({
            title: '失败',
            message: "用户名或密码错误",
            type: 'error'
          });
        }
      },function (error) {
        this.loading=false;
      });


    },
    changeverifycode(){
      if (document.getElementById("vcode")){
        document.getElementById("vcode").src=document.getElementById("vcode").src+"?v="
      }
     if(document.getElementById("vcodepsd")){
       document.getElementById("vcodepsd").src=document.getElementById("vcodepsd").src+"?v="
     }
    },
    changepsd(){

      if((!this.psdfrom.userName&&!this.psdfrom.email)||(this.psdfrom.userName==""&&this.psdfrom.email=="")){
        this.$message({
          showClose: true,
          message: '用户名和用户邮箱任选其一填写',
          type: 'warning'
        });
        return false;
      }
      if(!this.psdfrom.verify||this.psdfrom.verify==""){
        this.$message({
          showClose: true,
          message: '请输入验证码',
          type: 'warning'
        });
        return false;
      }
      this.dialogpsdloading=true;
      this.$http({
        method:'post',
        url:'api/sign/resetPassword',
        emulateJSON:true,
        body:{
          userName:this.psdfrom.userName||"",
          email:this.psdfrom.email||"",
          verify:this.psdfrom.verify||""
        }
      }).then(function (response) {
        this.dialogpsd = false;
        this.dialogpsdloading=false;
        let data=response.data;
        if (data.result&&data.result=="success"){
          this.$notify({
            title: '成功',
            message: data.resultEntity.message,
            type: 'success'
          });
        } else if(data.result) {
          this.$notify({
            title: '失败',
            message: data.resultEntity.message,
            type: 'error'
          });
        }
      },function (error) {
        this.dialogpsdloading=false;
      });
    }
  }
}
</script>
