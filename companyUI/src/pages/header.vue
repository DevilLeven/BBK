<template>
  <div class="o-header">
  <ul class="henav" v-if="$auth.check()">
    <li>
      <a class="user" :class="{open:showusrset}">
        <span class="username"><i class="glyphicon glyphicon-user"></i> {{$auth.user().name}}</span>
      </a>
      <transition name="fadeInRight">
      <ul class="dropdown-menu" v-show="showusrset">
        <li @click="dialogpsd=true">
          <a><i class="el-icon-setting"></i>修改密码</a>
        </li>
        <li @click="logout">
          <a><i class="el-icon-circle-close"></i>退出</a>
        </li>
      </ul>
        </transition>
    </li>
  </ul>
    <el-dialog title="修密码" v-model="dialogpsd" size="tiny" :close-on-click-modal="false" v-loading.body="loading">
      <el-form :model="psdfrom" label-position="top">
        <el-form-item label="原密码" >
          <el-input v-model="psdfrom.psd" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" >
          <el-input v-model="psdfrom.new"  type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码确认" >
          <el-input v-model="psdfrom.newsure"  type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" >
          <el-input v-model="psdfrom.verify"  style="width: 62%;float: left;margin-top: 5px;
"></el-input>
          <img id="vcode" src="api/sign/verifycode"  @click="changeverifycode"  style="width: 94px;cursor: pointer;    margin-left: 5px;">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogpsd = false">取 消</el-button>
        <el-button type="primary" @click="regpsd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
  import { on, off } from 'wind-dom/src/event';
  import router from "../route.config";
  export default {
    name:"MyHeader",
    mounted() {
      if(this.$auth.check()){
      let userbutton=this.$el.getElementsByClassName("user")[0];
      let usersetingbox=this.$el.getElementsByClassName("dropdown-menu")[0];
      on(userbutton,"click",(e) => {
      this.showusrset=!this.showusrset;
      });
      on(document,"click",(e) => {
        if (!userbutton.contains(e.target)&&!usersetingbox.contains(e.target)){
          this.showusrset=false;
        }
      })
      }
      this.$watch(function () {
        return this.$auth.check();
      },function () {
        if(this.$auth.check()){
          let userbutton=this.$el.getElementsByClassName("user")[0];
          let usersetingbox=this.$el.getElementsByClassName("dropdown-menu")[0];
          on(userbutton,"click",(e) => {
            this.showusrset=!this.showusrset;
          });
          on(document,"click",(e) => {
            if (!userbutton.contains(e.target)&&!usersetingbox.contains(e.target)){

              this.showusrset=false;
            }
          })
        }
      });
      this.$watch("dialogpsd",function (newl,old) {
        if(!newl){
          this.psdfrom={
            psd:"",
            new:"",
            newsure:"",
            verify:""
          }
        }else {
          this.changeverifycode();
        }
      });
    },
    data(){
      return{
        showusrset:false,
        dialogpsd:false,
        loading:false,
        psdfrom:{
          psd:"",
          new:"",
          newsure:"",
          verify:""
        }
      }
    },
    methods:{
      logout(){
        this.$http({
          method:'post',
          url:'api/sign/sign-out',
          body:{
          }
        }).then(function (response) {
          let data=response.data;
          if (data.result&&data.result=="success"){
            this.$auth.userout();
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
            router.push({name:"登录"});
          }else if(data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        },function (error) {

        });
      },
      regpsd(){
        if(this.psdfrom.psd.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写原密码',
            type: 'warning'
          });
          return false
        }if(this.psdfrom.new.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写原密码',
            type: 'warning'
          });
          return false
        }if(this.psdfrom.newsure.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写确认密码',
            type: 'warning'
          });
          return false
        }if(this.psdfrom.verify.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写验证码',
            type: 'warning'
          });
          return false
        }if(this.psdfrom.new.trim()!=this.psdfrom.newsure.trim()){
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
          url:'api/sign/changePassword',
          emulateJSON:true,
          body:{
            originPassword:this.psdfrom.psd.trim(),
            password:this.psdfrom.new.trim(),
            passwordComfirm:this.psdfrom.newsure.trim(),
            verify:this.psdfrom.verify.trim(),
          }
        }).then(function (response) {
          this.loading=false;
          this.changeverifycode();
          let data=response.data;
          if (data.result&&data.result=="success"){
            this.dialogpsd = false;
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
          }else if(data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
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
      },
    },
    destroyed() {
      let userbutton=this.$el.getElementsByClassName("user")[0];
      off(document,"click");
      off(userbutton,"click");
    }
  }
</script>
<style lang="less">
  @import "../css/common.less";
.o-header{
  background-color: #fff;
  height: 50px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
}
  .henav{
    float: right;
    li {
      float: left;
      position: relative;
      display: block;
      a{
        padding: 0.5px 10px;
        position: relative;
        display: block;
      }
    }
.user{

  .username{
    display: block;
    float: left;
    padding: 16px 8px;
  }
}
.user:hover{
  background: #f6f8f8;
  cursor: pointer;
}
.user.open{
  background: #f6f8f8;
  height: 56px;
}

  }
.dropdown-menu{

  position: absolute;
  top:51px;
  background: #fff;
  right: 0;
  padding: 10px 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  li {
    float: none;
    width: 150px;
    a{
      padding: 10px 15px;
      i{
        padding-right: 10px;
      }
    }
    a:hover{
      background: #f4f4f4;
      cursor: pointer;
    }
  }
}
  ul{
    -webkit-padding-start: 0px;
  }
.fadeInRight-enter-active {
  animation: fadeInRight .3s;
}
.fadeInRight-leave-active {
  animation: fadeOutRight .3s;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
