<template>
  <div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">学员管理</div>
      <div class="cont position">
        <div class="slectbar">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="form.sex" placeholder="性别">
                <el-option label="全部" value=""></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.status" placeholder="状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dosearch">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" @click.native="changestatus(null,1)">有效</el-button>
              <el-button type="primary" @click.native="deleteuser()">删除</el-button>
              <el-upload
                action="api/bd/importstudent"
                :before-upload="beforeupload" :on-success="handleSuccessfile" :show-upload-list="false"
                style="float: left; width: 96px;">
                <el-button style="line-height: 11px;" type="primary" @click.native=""><i style="margin-right: 7px"
                                                                                         class="glyphicon glyphicon-cloud-download"></i>
                  导入
                </el-button>
              </el-upload>
              <router-link :to="{ name: '添加学员' }" tag="span">
                <el-button type="primary" icon="plus"> 添加</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
        <div v-loading.body="tableloading">
          <div class="table">
            <el-table
              :data="tabledata"
              border
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                header-align="center">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别" align="center">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄" align="center">
              </el-table-column>
              <el-table-column
                inline-template
                label="状态" align="center">
                <span style="text-align: center">
                  <span v-if="row.status==1">有效</span>
                  <span v-else>无效</span>
                </span>
              </el-table-column>

              <el-table-column
                inline-template
                label="创建时间" align="center" min-width="100">
                <span>
              {{datefromat(row.createAt)}}
              </span>
              </el-table-column>

              <el-table-column
                inline-template
                label="操作" align="center" width="170">
              <span>
                <router-link :to="{ name: '个人简历', params:{id:row.perId}}" tag="span">
                  <el-button type="text" size="small">查看简历</el-button>
                </router-link>
                <span>
                 <el-button type="text" size="small" @click="changestatus(row)">
                   <span v-if="row.status==1">无效</span>
                   <span v-else>有效</span>
                 </el-button>
                  </span>
                <span>
                <el-button type="text" size="small" @click="deleteuser(row)">删除</el-button>
                  </span>
              </span>

              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              :currentPage="serachfrom.current"
              @current-change="handleCurrentChange"
              :page-size="serachfrom.pagesize"
              layout="total, prev, pager, next"
              :total="serachfrom.totallist">
            </el-pagination>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import until from "../until"
  export default{
    data(){
      return {
        daiyu: [],
        dialogFormVisible: false,
        tableloading: false,
        tableselect: [],
        form: {
          sex: null,
          status: null,
        },
        serachfrom: {
          current: 1,
          pagesize: 10,
          totallist: 0,
          sex: null,
          status: null,
        },
        tabledata: []
      }
    },
    mounted(){
      this.initdata();
    },
    methods: {
      initdata(){
        this.form.name = this.serachfrom.name;
        this.form.sex = this.serachfrom.sex;
        this.form.status = this.serachfrom.status;
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/studentlist',
          emulateJSON: true,
          body: {
            status: this.serachfrom.status || "",
            name: this.serachfrom.name || "",
            sex: this.serachfrom.sex || "",
            page: this.serachfrom.current,
            pageSize: this.serachfrom.pagesize
          }
        }).then(function (response) {
          var data = response.data;
          this.tableloading = false;
          if (data.result && data.result == "success") {
            this.tabledata = data.resultEntity.data.list;
            this.serachfrom.totallist = data.resultEntity.data.total;

          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.tableloading = false;
        });
      },
      dosearch(){
        this.serachfrom.name = this.form.name;
        this.serachfrom.sex = this.form.sex;
        this.serachfrom.status = this.form.status;
        this.initdata();
      },
      handleCurrentChange(cur){
        this.serachfrom.current = cur;
        this.initdata();
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      deleteuser(row){
        if (!row && !this.tableselect.length) {
          this.$message({
            showClose: true,
            message: '请选择学员',
            type: 'warning'
          });
          return;
        }
        var ids = "";
        if (row) {
          ids = row.idNo;
        } else {
          this.tableselect.map((val, index)=> {
            if (index < this.tableselect.length - 1) {
              ids += val.idNo + until.config().FG;
            } else {
              ids += val.idNo;
            }
          })
        }
        ;
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/delstudent',
          emulateJSON: true,
          body: {
            idNos: ids
          }
        }).then(function (response) {
          var data = response.data;
          if (data.result && data.result == "success") {
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
            this.initdata();
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.tableloading = false;
        });
      },
      handleSelectionChange(val){
        this.tableselect = val;
      },
      changestatus(row, status){
        if (!row && !this.tableselect.length) {
          this.$message({
            showClose: true,
            message: '请选择学员',
            type: 'warning'
          });
          return;
        }
        var ids = "";
        var sta = "1";
        if (row) {
          ids = row.idNo;
          if (row.status == 1) {
            sta = "0";
          }
        } else {
          this.tableselect.map((val, index)=> {
            if (index < this.tableselect.length - 1) {
              ids += val.idNo + until.config().FG;
            } else {
              ids += val.idNo;
            }
          })
        }
        ;
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/studentstatus',
          emulateJSON: true,
          body: {
            idNos: ids,
            status: status || sta
          }
        }).then(function (response) {
          var data = response.data;
          if (data.result && data.result == "success") {
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
            this.initdata();
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.tableloading = false;
        });
      },
      beforeupload(file){
        var filetype = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
        if (filetype != ".xls" && filetype != ".xlsx") {
          this.$message({
            showClose: true,
            message: '请选择excel表格文件',
            type: 'error'
          });
          return false
        }
        this.tableloading = true;
      },
      handleSuccessfile(response, file){
        var data = response;
        this.tableloading = false;
        if (data.result && data.result == "success") {
          this.$notify({
            title: '成功',
            message: data.resultEntity.message,
            type: 'success'
          });
          this.serachfrom.current = 1;
          this.initdata();
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
  @import "../css/positionlist.less";
</style>
