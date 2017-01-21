<template>
  <div>
    <div class="dfbox dbinfo" style="margin-top: 20px">
      <div class="title">完成个人信息</div>
      <div class="cont cominfo">
        <div class="forms" style="margin: 40px auto">
          <div  style="width: 500px;margin: 0 auto">
          <el-form :model="userinfo" label-width="100px" >
            <el-form-item label="昵称">
              <el-input v-model.trim="userinfo.name"></el-input>
            </el-form-item>
            <!--<el-form-item label="企业负责人">-->
              <!--<el-input v-model="formAlignRight.people"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="手机">
              <el-input v-model.trim="userinfo.mobile"></el-input>

            </el-form-item>
            <el-form-item label="座机">
              <el-input v-model.trim="userinfo.telephone"></el-input>

            </el-form-item>
            <el-form-item label="电子邮件">
              <el-input v-model.trim="userinfo.email"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model.trim="userinfo.address"></el-input>
            </el-form-item>
            <el-form-item label="DB信息">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="userinfo.info"></el-input>
            </el-form-item>
          </el-form>
          </div>

        </div>
        <div class="" style="text-align: center">
          <el-button type="primary" @click="next">提交</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        userinfo:{},
        pageloading:false
      }
    },
    mounted(){
      this.initdata();

    },
    methods:{
      initdata(){
        this.pageloading=true;
        this.$http({
          method:'post',
          url:'api/bd/getbdinfo',
          emulateJSON:true,
          body:{
          }
        }).then(function (response) {
          this.pageloading=false;
          let data=response.data;
          if (data.result&&data.result=="success"){
            this.userinfo=data.resultEntity.data;
          } else if(data.result){
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        },function () {
          this.pageloading=false;
        });
      },
      next(){
        this.pageloading=true;
        this.$http({
          method:'post',
          url:'api/bd/editinfo',
          body:this.userinfo
        }).then(function (response) {
          this.pageloading=false;
          let data=response.data;
          if (data.result&&data.result=="success"){
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
          } else if(data.result){
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        },function () {
          this.pageloading=false;
        });
      }
    }
  }
</script>
<style lang="less">
  .dbinfo{
  .el-form-item__content{
    line-height: 38px;
  }
  }

</style>
