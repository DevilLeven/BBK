<template>
  <div v-loading.body="pageloading">
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">企业信息
        <router-link :to="{name:'企业信息初始化'}" tag="span">
      <el-button style="float: right;margin-right: 40px;margin-top: 7px" icon="edit" type="primary" size="mini"></el-button>
          </router-link>
      </div>
      <div class="cont cominfo">


        <div class="table" style="width: 90%;margin: 0 auto">
          <div
            class="el-table el-table--fit el-table--border  el-table--enable-row-transition"
            style="width: 100%;">

            <div class="el-table__header-wrapper">
            </div>
            <div class="el-table__body-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%">

                <tbody>
                <tr>
                  <td class="el-table_1_column_23" style="width:150px;text-align: right;background: #EFF2F7">
                    <div class="cell">公司名称</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{compInfo.name}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">公司地址</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{compInfo.address}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">企业负责人</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{compInfo.legal}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">联系电话</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.mobile}} <span style="margin-right: 10px;margin-left: 10px">|</span>  {{compInfo.telephone}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">电子邮箱</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.email}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">企业网站</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.web}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">唯一信用代码</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.creditCode}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">组织结构代码</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.organizationCode}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">工商执照</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.license}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">税务登记号</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">{{compInfo.taxRegistration}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="text-align: right;background: #EFF2F7">
                    <div class="cell">企业logo</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"><img style="height: 170px;" v-if="compInfo.logo&&compInfo.logo!=''" class="pic" :src="compInfo.logo"></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        pageloading:false,
        compInfo:{}
      }
    },
    mounted() {
      this.initdata();
    },
    methods: {
      initdata(){

        this.pageloading=true;
        this.$http({
          method:'post',
          url:'api/company/querycompanyinfo',
          emulateJSON:true,
          body:{
            compId:0
          }
        }).then(function (response) {
          this.pageloading=false;
          let data=response.data;
          if (data.result&&data.result=="success"){
            this.compInfo=data.resultEntity.compInfo;
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
@import "../css/companyinfo.less";
</style>
