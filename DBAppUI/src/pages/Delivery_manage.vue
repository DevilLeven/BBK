<template>
  <div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">投递管理</div>
      <div class="cont position">
        <div class="slectbar">
          <el-form :inline="true" class="demo-form-inline" @submit.native.prevent="doselect">
            <el-form-item>
              <el-input v-model="from.name" placeholder="学员名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="from.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item style="width: 200px" >
              <el-select v-model="from.school" style="width: 200px" :clearable="true" filterable :remote-method="searchschool"
                         :loading="schooloading"
                         remote placeholder="学校">
                <el-option
                  v-for="item in schoollist"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button native-type="submit" type="primary">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
        <div v-loading.body="tableuserloading">
          <div class="table">
            <el-table
              :data="tabledata"
              border
              style="width: 100%">
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
                label="性别"  align="center">
              </el-table-column>
              <el-table-column
                prop="fromCollege"
                label="来源" align="center">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="联系电话" align="center">
              </el-table-column>
              <el-table-column
                inline-template
                label="创建时间" align="center" min-width="110">
              <span>
                {{datefromat(row.createAt)}}
              </span>
              </el-table-column>
              <el-table-column

                inline-template
                label="投递历史" align="center" >
              <span @click="showpostionlist(row)" style="text-align:center;color: #ff4949;text-decoration: underline;cursor: pointer">
                  {{row.historyCount||0}}
              </span>

              </el-table-column>

            </el-table>
          </div>
          <div class="page">
            <el-pagination
              :currentPage="searchfrom.current"
              @current-change="handleCurrentChange"
              :page-size="searchfrom.pagesize"
              layout="total, prev, pager, next"
              :total="searchfrom.totallist">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="投递历史" custom-class="mydialog"  v-model="dialogTableVisible" :close-on-click-modal="false">
      <div v-loading.body="postionloading">
        <el-table  border :data="dialogfrom.gridData" height="300">
          <el-table-column
            prop="positionName"
            label="职位名称"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="comName"
            label="招聘企业"
            align="center"
          >
          </el-table-column>
          <el-table-column
            inline-template
            label="职位状态"
            align="center" width="110"
          >
            <span style="text-align:center ">
                <span v-if="row.positionStatus==1">
                  在聘
                </span>
                <span v-else>已下架</span>

              </span>
          </el-table-column>
          <el-table-column
            inline-template
            label="投递时间" align="center">
            <span>
                {{datefromat(row.createAt)}}
              </span>
          </el-table-column>
          <el-table-column
            inline-template
            label="反馈状况"
            align="center"
            width="100"
          >
            <span style="text-align: center">
                <span v-if="row.status==1">
                  已读
                </span>
              <span v-if="row.status==2">
                  已拒绝
                </span>
                <span v-if="row.status==0">未读</span>

              </span>
          </el-table-column>
        </el-table>
        <div class="page" style="text-align: center">
          <el-pagination
            :currentPage="dialogfrom.current"
            @current-change="handleCurrentChangedialogfrom"
            :page-size="dialogfrom.pagesize"
            layout="total, prev, pager, next"
            :total="dialogfrom.totallist">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import until from "../until"
  export default{
    data(){
      return {
        from: {
          name: "",
          phone: "",
          school: ""
        },
        dialogTableVisible: false,

        schooloading: false,
        tableuserloading: false,
        postionloading: false,
        schoollist: {},
        tabledata: [],
        searchfrom: {
          name: "",
          phone: "",
          school: "",
          current: 1,
          pagesize: 10,
          totallist: 0,
        },
        dialogfrom: {
          current: 1,
          pagesize: 10,
          totallist: 0,
          userid: null,
          gridData: [],
        }
      }
    },
    mounted(){
      this.searchuserlist();
      this.searchschool("");
      this.$watch("dialogTableVisible", function (newl, old) {
        if (newl) {
          this.dialogfrom = {
            current: 1,
            pagesize: 10,
            totallist: 0,
            userid: null,
            gridData: [],
          }
        }
      })
    },
    methods: {
      searchuserlist(){
        this.from.name = this.searchfrom.name;
        this.from.phone = this.searchfrom.phone;
        this.from.school = this.searchfrom.school;
        this.tableuserloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/pushlist',
          emulateJSON: true,
          body: {
            college: this.searchfrom.school,
            studentName: this.searchfrom.name,
            phone: this.searchfrom.phone,
            page: this.searchfrom.current,
            pageSize: this.searchfrom.pagesize
          }
        }).then(function (response) {
          var data = response.data;
          this.tableuserloading = false;
          if (data.result && data.result == "success") {
            this.tabledata = data.resultEntity.data.list;
            this.searchfrom.totallist = data.resultEntity.data.total
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function () {
          this.tableuserloading = false;
        });
      },
      searchschool(val){

          this.schooloading = true;
          this.$http({
            method: 'post',
            url: 'api/bd/querycollegelist',
            emulateJSON: true,
            body: {
              college: val,
              page: 1,
              pageSize: 20
            }
          }).then(function (response) {
            var data = response.data;
            this.schooloading = false;
            if (data.result && data.result == "success") {

              this.schoollist = data.resultEntity.data.list

            } else if (data.result) {

            }

          }, function () {
            this.schooloading = false;
          });
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      doselect(){
        this.searchfrom.name = this.from.name;
        this.searchfrom.phone = this.from.phone;
        this.searchfrom.school = this.from.school;
        this.searchuserlist();
      },
      handleCurrentChange(val){
        this.searchfrom.current = val;
        this.searchuserlist();
      },
      handleCurrentChangedialogfrom(val){
        this.dialogfrom.current=val;
        this.selectpostionlist();
      },
      showpostionlist(row){
        this.dialogTableVisible = true;
        this.dialogfrom.userid = row.perId;
        this.selectpostionlist();
      },
      selectpostionlist(){
        this.postionloading=true;
        this.$http({
          method: 'post',
          url: 'api/bd/pushhistorylist',
          emulateJSON: true,
          body: {
            perId: this.dialogfrom.userid,
            page: this.dialogfrom.current,
            pageSize: this.dialogfrom.pagesize
          }
        }).then(function (response) {
          var data = response.data;
          this.postionloading = false;
          if (data.result && data.result == "success") {
            this.dialogfrom.gridData = data.resultEntity.data.list;
            this.dialogfrom.totallist = data.resultEntity.data.total
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function () {
          this.postionloading = false;
        });
      }
    }
  }
</script>
