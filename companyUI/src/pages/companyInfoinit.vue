<template>
  <div v-loading.body="pageloading">
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">完成企业信息</div>
      <div class="cont cominfo">
        <!--<div style="text-align: center;margin-top: 10px;padding-left: 200px;margin-bottom: 10px;overflow: hidden;" >-->
        <!--<el-steps :space="300" :active="active" finish-status="success" >-->
        <!--<el-step title="企业基础信息"></el-step>-->
        <!--<el-step title="企业认证信息"></el-step>-->
        <!--<el-step title="企业宣传图"></el-step>-->
        <!--</el-steps>-->
        <!--</div>-->
        <!--<div class="line-boder"></div>-->
        <div class="forms" style="margin: 40px auto">
          <div style="width: 500px;margin: 0 auto">
            <el-form label-width="100px">
              <el-form-item label="企业名称">
                <el-input v-model="compInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="企业负责人">
                <el-input v-model="compInfo.legal"></el-input>
              </el-form-item>
              <el-form-item label="企业电话">
                <el-input v-model="compInfo.mobile"></el-input>

              </el-form-item>
              <el-form-item label="企业座机">
                <el-input v-model="compInfo.telephone"></el-input>

              </el-form-item>
              <el-form-item label="电子邮件">
                <el-input v-model="compInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="企业网站">
                <el-input v-model="compInfo.web"></el-input>
              </el-form-item>
            </el-form>


            <el-form label-width="118px">
              <el-form-item label="唯一信用代码">
                <el-input v-model="compInfo.creditCode"></el-input>
              </el-form-item>
              <el-form-item label="组织结构代码">
                <el-input v-model="compInfo.organizationCode"></el-input>
              </el-form-item>
              <el-form-item label="工商执照">
                <el-input v-model="compInfo.license"></el-input>

              </el-form-item>
              <el-form-item label="税务登记号">
                <el-input v-model="compInfo.taxRegistration"></el-input>

              </el-form-item>
              <el-form-item label="企业logo">
                <el-row :gutter="20">
                  <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                  <el-upload
                    action="api/file/upload"
                    type="drag"
                    :show-upload-list="false"
                    :thumbnail-mode="true"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :default-file-list="fileList"
                    :on-success="logosuccess"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-row>

              </el-form-item>

            </el-form>

          </div>
        </div>
        <div class="" style="text-align: center">
          <el-button type="primary" @click="next">提交</el-button>
        </div>
        <a href="" id="topic" target="_blank"></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        active: 0,
        pageloading: false,
        compInfo: {},
        formAlignRight: {},
        fileList: []
      }
    },
    mounted() {
      this.initdata();
    },
    methods: {
      next(){

        if (this.compInfo.id) {
          this.pageloading = true;

          this.$http({
            method: 'post',
            url: 'api/company/changecompanyinfo',
            body: this.compInfo
          }).then(function (response) {
            this.pageloading = false;
            let data = response.data;
            if (data.result && data.result == "success") {
              this.$notify({
                title: '成功',
                message: data.resultEntity.message,
                type: 'success'
              });
            } else if (data.result) {
              this.$notify({
                title: '失败',
                message: data.resultEntity.message,
                type: 'error'
              });
            }
          }, function () {
            this.pageloading = false;
          });
        }
      },
      initdata(){
        this.pageloading = true;
        this.$http({
          method: 'post',
          url: 'api/company/querycompanyinfo',
          emulateJSON: true,
          body: {
            compId: 0
          }
        }).then(function (response) {
          this.pageloading = false;
          let data = response.data;
          if (data.result && data.result == "success") {
            this.compInfo = data.resultEntity.compInfo;
            var map = {
              name: "logo",
              url: this.compInfo.logo
            };
            this.fileList = [map];
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function () {
          this.pageloading = false;
        });
      },
      handlePreview(file) {
        console.log(file);
        document.getElementById("topic").href=this.compInfo.logo;
        document.getElementById("topic").click();
      },
      handleRemove(){
        this.compInfo.logo="";
      },
      logosuccess(response, file, fileList){
        console.log(response)
        let data = response;
        if (data.result && data.result == "success") {
          this.compInfo.logo = data.resultEntity.download_url;
          var map = {
            name: "logo",
            url: this.compInfo.logo
          };
          this.fileList = [map];
        } else if (data.result) {
          this.$notify({
            title: '失败',
            message: data.resultEntity.message,
            type: 'error'
          });
        }
      }
    }
  }
</script>
<style lang="less">
  .el-dragger__cover img{
    height: 100% !important;
  }
</style>
