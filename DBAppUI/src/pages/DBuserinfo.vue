<template>
  <div>
    <div class="dfbox" style="margin-top: 20px" v-loading.body="pageloading">

      <div class="title">个人信息
        <router-link :to="{name:'个人信息初始化'}" tag="span">
          <el-button style="float: right;margin-right: 40px;margin-top: 7px" icon="edit" type="primary"
                     size="mini"></el-button>
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
                  <td class="el-table_1_column_23" style="width: 113px;text-align: right;background: #EFF2F7">
                    <div class="cell">用户昵称</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{userinfo.name}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="width: 113px;text-align: right;background: #EFF2F7">
                    <div class="cell">地址</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{userinfo.address}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="width: 113px;text-align: right;background: #EFF2F7">
                    <div class="cell">联系电话</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell">   {{userinfo.mobile}} <span style="margin-right: 10px;margin-left: 10px">|</span> {{userinfo.telephone}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="width: 113px;text-align: right;background: #EFF2F7">
                    <div class="cell">电子邮箱</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{userinfo.email}}</div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table_1_column_23" style="width: 113px;text-align: right;background: #EFF2F7">
                    <div class="cell">DB信息</div>
                  </td>
                  <td class="el-table_1_column_24 ">
                    <div class="cell"> {{userinfo.info}}</div>
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
      return {
        userinfo: {},
        pageloading: false
      }
    },
    mounted(){
      this.initdata();
    },
    methods: {
      initdata(){
        this.pageloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/getbdinfo',
          emulateJSON: true,
          body: {}
        }).then(function (response) {
          this.pageloading = false;
          let data = response.data;
          if (data.result && data.result == "success") {
            this.userinfo = data.resultEntity.data;
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
    }
  }

</script>
<style lang="less">
  @import "../css/companyinfo.less";
</style>
