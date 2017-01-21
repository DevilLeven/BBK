<template>
  <div v-loading.body="pageloading">
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">职位管理</div>
      <div class="cont position">
        <div class="slectbar">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select placeholder="" v-model="pstate">
                <el-option label="全部职位" value=""></el-option>
                <el-option label="在聘" value="1"></el-option>
                <el-option label="已下架" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="initselect">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" icon="plus" @click.native="dialogFormVisible = true"> 添加</el-button>
            </el-form-item>
          </el-form>
        </div>
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
              inline-template
              label="职位名称"
              header-align="center"
              width="180">
              <span style="cursor: pointer;color: #ff4949;text-decoration: underline">
                <router-link :to="{name:'b简历列表',params:{pdid:row.id}}" tag="span">
                  {{row.name}}
                </router-link>
              </span>
            </el-table-column>
            <el-table-column
              inline-template
              label="职位简介"
              header-align="center"
              min-width="140"
              >
              <el-popover trigger="hover" placement="bottom" >
                <pre style="font-size: 14px;font-weight: bold">{{row.info}}</pre>
                <div slot="reference" class="requi" style="max-width: 510px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                  {{row.info}}
                </div>
              </el-popover>
            </el-table-column>
            <el-table-column
              prop="status"
              inline-template
              align="center"
              label="状态" width="80">
              <span>
                <span v-if="row.status==1">
                  在聘
                </span>
                <span v-else>已下架</span>

              </span>
            </el-table-column>
            <el-table-column
              inline-template
              align="center"
              label="创建时间" min-width="110px">
              <span>
              {{datefromat(row.createAt)}}
              </span>
            </el-table-column>

            <el-table-column
              inline-template
              align="center"
              label="未查看简历" width="110">
              <span style="cursor: pointer;color: #ff4949;text-decoration: underline">
                <router-link :to="{name:'b简历列表',params:{pdid:row.id}}" tag="span">
                  {{row.unread||0}}
                </router-link>
              </span>
            </el-table-column>
            <el-table-column
              inline-template
              align="center"
              label="待处理简历" width="110">
              <span style="cursor: pointer;color: #ff4949;text-decoration: underline">
                <router-link :to="{name:'b简历列表',params:{pdid:row.id}}" tag="span">
                  {{row.read||0}}
                </router-link>
              </span>
            </el-table-column>
            <el-table-column
              inline-template
              align="center"
              width="110"
              label="操作">
              <span>
                <el-button type="text" size="small" @click.native="edipos(row)">编辑</el-button>
                <el-button type="text" size="small" v-if="row.status==0" @click.native="chagestate(row)">上架</el-button>
                <el-button type="text" size="small" v-if="row.status==1" @click.native="chagestate(row)">下架</el-button>
              </span>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            :currentPage="current"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="totallist">
          </el-pagination>
        </div>
        <el-dialog top="4%"  title="添加职位" v-model="dialogFormVisible" size="tiny" v-loading.body="addloading">
          <el-form :model="form" :rules="addfromrute" label-width="100px" autocomplete="off">
            <el-form-item label="职位名称" prop="name">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="薪资待遇"  prop="moy">
              <el-select class="vm" v-model="form.moy" placeholder="请选择">
                <el-option v-for="item in tagelistobj.xz" :label="item.name" :value="item.name"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="福利待遇">
              <el-select class="vm" v-model="form.daiyu" multiple placeholder="请选择">
                <el-option v-for="item in tagelistobj.fl" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历限制">
              <el-select class="vm" v-model="form.xueli" placeholder="请选择">
                <el-option v-for="item in tagelistobj.xl" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>


          </el-form>
          <el-form :model="form" :rules="addfromrute" label-width="100px" autocomplete="off">
            <el-form-item label="地区" prop="diqu">
              <el-select
                v-model="form.diqu"
                class="vm"
                multiple
                filterable
                remote
                placeholder="请输入关键词(最多10个城市)"
                :remote-method="selectarealist"
                :loading="loading">
                <el-option
                  v-for="item in arealist"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="form" label-width="100px" autocomplete="off">
            <el-form-item label="职位描述">
              <el-input
                type="textarea" :autosize="{ minRows: 4, maxRows: 4}" :maxlength="1000" v-model="form.info"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click.native="addpot">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog top="4%" title="编辑职位" v-model="edidialog" size="tiny" v-loading.body="ediloading">
          <el-form :model="ediform"  :rules="addfromrute"  label-width="100px">
            <el-form-item label="职位名称" prop="name">
              <el-input v-model="ediform.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="薪资待遇" prop="moy">
              <el-select class="vm" v-model="ediform.moy" placeholder="请选择">
                <el-option v-for="item in tagelistobj.xz" :label="item.name" :value="item.name"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="福利待遇">
              <el-select class="vm" v-model="ediform.daiyu" multiple placeholder="请选择">
                <el-option v-for="item in tagelistobj.fl" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历限制">
              <el-select class="vm" v-model="ediform.xueli" placeholder="请选择">
                <el-option v-for="item in tagelistobj.xl" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <el-form :model="ediform"  :rules="addfromrute"  label-width="100px" autocomplete="off">
            <el-form-item label="地区" prop="diqu">
              <el-select
                v-model="ediform.diqu"
                multiple
                class="vm"
                filterable
                remote
                placeholder="请输入关键词查询"
                :remote-method="selectarealist"
                :loading="loading">
                <el-option
                  v-for="item in arealist"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="form" label-width="100px" autocomplete="off">
            <el-form-item label="职位描述">
              <el-input
                type="textarea" :autosize="{ minRows: 4, maxRows: 4}"  :maxlength="1000" v-model="ediform.info"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click.native="edidialog = false">取 消</el-button>
            <el-button type="primary" @click.native="ediposaction">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import until from "../until"
  var  checkcity = (rule, value, callback) => {
    if (value.length==0) {
      return callback(new Error('请至少选择1个城市'));
    }else if(value.length>10){
      callback(new Error('最多选择10个城市'));
      value.splice(10, 1);
      return ;
    }
    callback();
  };
  export default{
    data(){
      return {
        pageloading: false,
        addloading: false,
        current: 1,
        pagesize: 10,
        totallist: 0,
        pstate: "",
        arealist: [],
        dialogFormVisible: false,
        tagelistobj: {
          xz: [],
          fl: [],
          xl: []
        },
        loading: false,
        form: {
          daiyu: [],
          diqu: [],
          xueli: "",
          moy: "",
          name: "",
          info: ""
        },

        addfromrute: {
          name: [
            {required: true, message: '请输入职位名称', trigger: 'blur'}
          ],
          moy:[
            {required: true, message: '请选择薪资待遇', trigger: 'change'}
          ],
          diqu:[
            {required: true,validator: checkcity, trigger: 'change'}
          ]
        },
        edidialog: false,
        ediloading: false,
        ediform: {
          daiyu: [],
          diqu: [],
          xueli: "",
          moy: "",
          name: "",
          info: ""
        },
        tabledata: []
      }
    },
    mounted() {
      this.$watch("dialogFormVisible", function (newl, old) {
        if (!newl) {
          this.form = {
            daiyu: [],
            diqu: [],
            xueli: "",
            moy: "",
            name: "",
            info: ""
          }
        }
      });
      this.$watch("edidialog", function (newl, old) {
        if (!newl) {
          this.ediform = {
            daiyu: [],
            diqu: [],
            xueli: "",
            moy: "",
            name: "",
            info: ""
          }
        }
      });


      this.initdata();
      this.initfrom();
    },
    methods: {
      initdata(){
        this.pageloading = true;
        this.$http({
          method: 'post',
          url: 'api/company/position/querypositionbystatus',
          emulateJSON: true,
          body: {
            "status": this.pstate || "",
            page: this.current,
            pageSize: this.pagesize
          }
        }).then(function (response) {
          var data = response.data;
          this.pageloading = false;
          if (data.result && data.result == "success") {
            this.tabledata = data.resultEntity.pageInfo.list;
            this.totallist = data.resultEntity.pageInfo.total;

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
      initfrom(){
        this.$http({
          method: 'post',
          url: 'api/common/taglist',
          emulateJSON: true,
          body: {
            types: "0BBK2016BBK1BBK2016BBK2"
          }
        }).then(function (response) {
          var data = response.data;
          if (data.result && data.result == "success") {
            this.tagelistobj = {
              xz: [],
              fl: [],
              xl: []
            };
            var ary = data.resultEntity.data;
            ary.map((val, index)=> {
              if (val.type == 0) {
                this.tagelistobj.xl.push(val);
              } else if (val.type == 1) {
                this.tagelistobj.fl.push(val);
              } else if (val.type == 2) {
                this.tagelistobj.xz.push(val);
              }
            })
          }

        }, function () {
        });
      },
      handleCurrentChange(cur){
        this.current = cur;
        this.initdata();
      },
      addpot(){
        if (this.form.name.trim() == "") {
          this.$message({
            showClose: true,
            message: '请填写职位名称',
            type: 'warning'
          });
          return;
        }
        if (this.form.moy == "") {
          this.$message({
            showClose: true,
            message: '请选择薪资待遇',
            type: 'warning'
          });
          return;
        }
//        if (!this.form.daiyu.length) {
//          this.$message({
//            showClose: true,
//            message: '请选择福利待遇',
//            type: 'warning'
//          });
//          return;
//        }
//        if (this.form.xueli == "") {
//          this.$message({
//            showClose: true,
//            message: '请选择学历要求',
//            type: 'warning'
//          });
//          return;
//        }
        if (!this.form.diqu.length) {
          this.$message({
            showClose: true,
            message: '请选择地区',
            type: 'warning'
          });
          return;
        }
//        if (this.form.info.trim() == "") {
//          this.$message({
//            showClose: true,
//            message: '请填写职位描述',
//            type: 'warning'
//          });
//          return;
//        }
        this.addloading = true;
        var adress = JSON.stringify(this.form.diqu).substring(1, JSON.stringify(this.form.diqu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
        var tagList = JSON.stringify(this.form.daiyu).substring(1, JSON.stringify(this.form.daiyu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
        var obj = {
          addressId: adress,
          tagList: tagList,
          info: this.form.info.trim(),
          name: this.form.name.trim(),
          status: 1,
          price: this.form.moy,
          education: this.form.xueli,
        };
        this.edipot(obj);
      },


      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      edipos(row){
        this.edidialog = true;
        this.ediform = {
          daiyu: row.tagList ? row.tagList.split(until.config().FG) : [],
          diqu: row.addressId ? row.addressId.split(until.config().FG) : [],
          xueli: row.education,
          moy: row.price,
          name: row.name,
          info: row.info,
          id: row.id
        }

      },
      ediposaction(){
        if (this.ediform.name.trim() == "") {
          this.$message({
            showClose: true,
            message: '请填写职位名称',
            type: 'warning'
          });
          return;
        }
        if (this.ediform.moy == "") {
          this.$message({
            showClose: true,
            message: '请选择薪资待遇',
            type: 'warning'
          });
          return;
        }
//        if (!this.ediform.daiyu.length) {
//          this.$message({
//            showClose: true,
//            message: '请选择福利待遇',
//            type: 'warning'
//          });
//          return;
//        }
//        if (this.ediform.xueli == "") {
//          this.$message({
//            showClose: true,
//            message: '请选择学历要求',
//            type: 'warning'
//          });
//          return;
//        }
        if (!this.ediform.diqu.length) {
          this.$message({
            showClose: true,
            message: '请选择地区',
            type: 'warning'
          });
          return;
        }
//        if (this.ediform.info.trim() == "") {
//          this.$message({
//            showClose: true,
//            message: '请填写职位描述',
//            type: 'warning'
//          });
//          return;
//        }
        this.ediloading = true;
        var adress = JSON.stringify(this.ediform.diqu).substring(1, JSON.stringify(this.ediform.diqu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
        var tagList = JSON.stringify(this.ediform.daiyu).substring(1, JSON.stringify(this.ediform.daiyu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
        var obj = {
          addressId: adress,
          tagList: tagList,
          info: this.ediform.info.trim(),
          name: this.ediform.name.trim(),
          price: this.ediform.moy,
          education: this.ediform.xueli,
          id: this.ediform.id
        };
        this.edipot(obj);
      },
      initselect(){
        this.current = 1;
        this.initdata()
      },
      selectarealist(query){
        if (query != "") {
          this.loading = true;
          this.$http({
            method: 'post',
            url: 'api/common/arealist',
            emulateJSON: true,
            body: {
              areaId: "",
              vague: query,
              isCity: 1
            }
          }).then(function (response) {
            this.loading = false;
            let data = response.data;
            if (data.result && data.result == "success") {
              this.arealist = data.resultEntity.sysAreas;
            }
          }, function () {
            this.loading = false;
          });
        }
      },
      chagestate(row){
        var str = JSON.stringify(row);
        var obj = JSON.parse(str);
        if (obj.status == 0) {
          obj.status = 1;
          this.pageloading = false;
          this.edipot(obj);
        } else {
          obj.status = 0;
          this.pageloading = false;
          this.edipot(obj);
        }

      },
      edipot(obj){

        this.$http({
          method: 'post',
          url: 'api/company/position/saveposition',
          body: obj
        }).then(function (response) {
          var data = response.data;
          this.pageloading = false;
          this.addloading = false;
          this.ediloading = false;
          if (data.result == "success") {
            this.dialogFormVisible = false;
            this.edidialog = false;
            this.initdata();
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
          this.addloading = false;
          this.pageloading = false;
          this.ediloading = false;
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../css/positionlist.less";

  .el-select.vm .el-tag {
    margin: 0px 0 0 6px;
  }

  .vm .el-select__input {
    margin: 0px 0 -3px 10px;
  }

  .el-dialog--tiny {
    width: 450px !important;
  }

  .vm .el-select__tags {
    max-width: 100% !important;
  }
</style>
