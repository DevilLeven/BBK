<template>
  <div v-loading.body="pageloading">
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">招聘管理</div>
      <div class="cont resume">
        <div class="slectbar">
          <main>
            <slot></slot>
          </main>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item style="margin-bottom: 14px;">
              选择职位
            </el-form-item>
            <el-form-item  style="margin-bottom: 14px;">
              <el-select v-model="polistsel" placeholder="选择职位" @change="changepst">
                <el-option-group
                  v-for="group in polist"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="changepst">查询</el-button>-->
            <!--</el-form-item>-->
          </el-form>
          <el-form :inline="true" style="position: absolute;right: 20px;top: 0px;">
            <el-form-item>
              <el-button type="primary" @click="deletepot">删除</el-button>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="success">导出</el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </div>
        <div class="" v-loading.body="loadingpost">
          <div class="jobList">
            <div v-show="postinfo['id']">
              <div class="line">
                <span class="jobtitle">
                  {{postinfo.name}}
                  <span class="local">[ <a v-for="(item, index) in postinfo.addresary">{{item}} <a v-if="index<postinfo.addresary.length-1">, </a></a> ]</span>
                </span>
                <span class="jobdate">{{datefromat(postinfo.createAt)}}</span>
                <span class="jobcmp jianjie">
                  <a>{{postinfo.comName}}</a>
                </span>
              </div>
              <div class="line">
                <span class="money">{{postinfo.price}}</span>
                     <el-popover trigger="hover" placement="bottom" >
                        <pre style="font-size: 14px;font-weight: bold">{{postinfo.info}}</pre>
                        <div slot="reference" class="requi">
                          {{postinfo.info}}
                        </div>
                      </el-popover>
              </div>
              <div class="tips">
                <span v-for=" item in postinfo.taglistary">{{item}}</span>
              </div>
            </div>
            <div v-show="postinfo['id']" style="position: absolute;right: 20px;top: 40px">
              <el-form :inline="true">
                <el-form-item>
                  <el-button type="primary" @click="edidalg">编辑</el-button>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="poststate" style="width: 90px" @change="changestate">
                    <el-option
                      label="在聘"
                      value="1">
                    </el-option>
                    <el-option
                      label="下架"
                      value="0">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
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
                header-align="center"
                >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="age"
                align="center"
                label="年龄">
              </el-table-column>
              <el-table-column
                inline-template
                align="center"
                label="状态">
                <span style="text-align: center">
                  <!--0：未查看,1:已查看，2：已拒绝-->
                  <a v-if="row.status==0">未查看</a>
                  <a v-if="row.status==1">已查看</a>
                  <a v-if="row.status==2">已拒绝</a>
                </span>
              </el-table-column>
              <el-table-column
                inline-template
                align="center"
                label="投递时间" min-width="110">
                <span>{{datefromat(row.createAt)}}</span>
              </el-table-column>
              <el-table-column
                inline-template
                align="center"
                width="110"
                label="操作">
              <span>
                <router-link :to="{ name: '个人简历' ,params:{positionId:postinfo.id,deliveId:row.perId}}" tag="span">
                  <el-button type="text" size="small">查看</el-button>
                </router-link>
                <el-button type="text" size="small" v-if="row.status!=2" @click="jujueresume(row)">拒绝</el-button>
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
        </div>

        <el-dialog title="编辑职位" top="4%"  v-model="edidialog" size="tiny" v-loading.body="ediloading">
          <el-form :model="ediform" label-width="100px" :rules="addfromrute">
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
          <el-form :model="ediform"  label-width="100px" :rules="addfromrute">
            <el-form-item label="地区" prop="diqu">
              <el-select
                v-model="ediform.diqu"
                class="vm"
                multiple
                filterable
                remote
                placeholder="请输入关键词"
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
          <el-form label-width="100px">
            <el-form-item label="职位描述">
              <el-input
                type="textarea" :autosize="{ minRows: 4, maxRows: 4}" :maxlength="1000" v-model="ediform.info"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="edidialog = false">取 消</el-button>
            <el-button type="primary" @click.native="edipotaction">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import until from "../until"
  import route from "../route.config";
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
    props: {
      dfid: [String, Number]
    },
    data(){
      return {
        loadingpost: false,
        tableloading: false,
        loading: false,
        pageinit: true,
        pageloading: false,
        arealist: [],
        polist: [{
          label: '在聘',
          options: [],
        }, {
          label: '下架',
          options: [],
        }],
        polistsel: Number(this.dfid) || null,
        current: 1,
        pagesize: 10,
        totallist: 0,
        poststate: null,
        initstate: true,
        postinfo: {},
        searchposid: this.dfid,
        tabledata: [],
        tableselect:[],
        edidialog: false,
        ediloading: false,
        ediform: {
          daiyu: [],
          diqu: [],
          xueli: "",
          moy: "",
          name: "",
          info: "",
          id: ""
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
        tagelistobj: {
          xz: [],
          fl: [],
          xl: []
        },
      }
    },
    computed: {},
    mounted(){

      this.$watch("edidialog", function (newl, old) {
        if (!newl) {
          this.ediform = {
            daiyu: [],
            diqu: [],
            xueli: "",
            moy: "",
            name: "",
            info: "",
            id: ""
          }
        }
      });
      this.initaction();
      this.initfrom();
      if (this.dfid && this.dfid != "") {
        this.selectpost(this.searchposid)
      }
    },
    methods: {
      initaction(){
        this.selectpostlist();
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
      selectpost(id){
        this.loadingpost = true;
        this.$http({
          method: 'post',
          url: 'api/company/position/querypositionbyid',
          emulateJSON: true,
          body: {
            positionId: id || "",
            page: 1,
            pageSize: 1
          }
        }).then(function (response) {
          this.loadingpost = false;
          let data = response.data;
          if (data.result && data.result == "success") {

            this.postinfo = data.resultEntity.data;
            this.selecttoudi(this.postinfo.id);
            if (this.postinfo.tagList) {
              this.postinfo.taglistary = this.postinfo.tagList.split(until.config().FG)||[];

            }
            if(this.postinfo.addressId){
              this.postinfo.addresary = this.postinfo.addressId.split(until.config().FG)||[]
            }
            if (this.postinfo.status != this.poststate) {
              this.initstate = true;
            }
            if (this.postinfo.status == 0) {
              this.poststate = "0";
            } else {
              this.poststate = "1";
            }

          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.loadingpost = false;
        });
      },
      selectpostlist(){
        this.pageloading = false;
        this.$http({
          method: 'post',
          url: 'api/company/position/querypositiondroplist',
          emulateJSON: true,
          body: {}
        }).then(function (response) {
          this.pageloading = false;
          let data = response.data;

          if (data.result && data.result == "success") {
            this.polist = [{
              label: '在聘',
              options: [],
            }, {
              label: '下架',
              options: [],
            }];
            var ary = data.resultEntity.data;
            ary.map((val, index)=> {
              if (val.status == 1) {
                this.polist[0].options.push(val);
              } else {
                this.polist[1].options.push(val);
              }
            });
            if (this.pageinit && !(this.dfid && this.dfid != "")) {
              this.polistsel = ary[0].id;
              this.pageinit = false;
            }
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.pageloading = false;
        });
      },
      selecttoudi(id){
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/company/position/querypositionbyid',
          emulateJSON: true,
          body: {
            positionId: id || "",
            page: this.current,
            pageSize: this.pagesize
          }
        }).then(function (response) {
          this.tableloading = false;
          let data = response.data;
          if (data.result && data.result == "success") {
            this.tabledata = data.resultEntity.data.pageInfo.list;
            this.totallist = data.resultEntity.data.pageInfo.total;
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.tableloading = false;
        });
      },
      handleCurrentChange(cur){
        this.current = cur;
        this.selecttoudi(this.postinfo.id);
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      edidalg(){
        this.edidialog = true;
        this.ediform = {
          daiyu: this.postinfo.tagList?this.postinfo.tagList.split(until.config().FG):[],
          diqu: this.postinfo.addressId?this.postinfo.addressId.split(until.config().FG):[],
          xueli: this.postinfo.education,
          moy: this.postinfo.price,
          name: this.postinfo.name,
          info: this.postinfo.info,
          id: this.postinfo.id
        };
      },
      edipotaction(){


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
        if (!this.ediform.daiyu.length) {
          this.$message({
            showClose: true,
            message: '请选择福利待遇',
            type: 'warning'
          });
          return;
        }
        if (this.ediform.xueli == "") {
          this.$message({
            showClose: true,
            message: '请选择学历要求',
            type: 'warning'
          });
          return;
        }
        if (!this.ediform.diqu.length) {
          this.$message({
            showClose: true,
            message: '请选择地区',
            type: 'warning'
          });
          return;
        }
        if (this.ediform.info.trim() == "") {
          this.$message({
            showClose: true,
            message: '请填写职位描述',
            type: 'warning'
          });
          return;
        }
        this.ediloading = true;
        var adress = JSON.stringify(this.ediform.diqu).substring(1, JSON.stringify(this.ediform.diqu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
        var tagList = JSON.stringify(this.ediform.daiyu).substring(1, JSON.stringify(this.ediform.daiyu).length - 1).replace(/"/g, "").replace(/,/g, until.config().FG);
//        var obj=JSON.parse(JSON.stringify(this.postinfo))
//        obj.addressId=adress;
//        obj.tagList=tagList;
//        obj.info=this.ediform.info.trim();
//        obj.name=this.ediform.name.trim();
//        obj.price=this.ediform.moy;
//        obj.education=this.ediform.xueli;
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

      edipot(obj){

        this.$http({
          method: 'post',
          url: 'api/company/position/saveposition',
          body: obj
        }).then(function (response) {
          var data = response.data;
          this.loadingpost = false;
          this.ediloading = false;
          if (data.result && data.result == "success") {
            this.edidialog = false;
            this.initaction();
            this.selectpost(this.postinfo.id);
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
          this.ediloading = false;
          this.loadingpost = false;
        })
      },
      changestate(){
        if (!this.initstate) {
          var str = JSON.stringify(this.postinfo);
          var obj = JSON.parse(str);
          console.log(obj.status)
          if (obj.status == 0) {
            obj.status = 1;
            this.loadingpost = false;
            this.edipot(obj);
          } else {
            obj.status = 0;
            this.loadingpost = false;
            this.edipot(obj);
          }
        }
        this.initstate = false;
      },
      deletepot(){
        if(!this.tableselect.length){
          this.$message({
            showClose: true,
            message: '请选择投递简历',
            type: 'warning'
          });
          return;
        }
        this.tableloading = true;
        var delids="";
        this.tableselect.map((val,index)=>{
          if(index<this.tableselect.length-1){
            delids+=val.id+until.config().FG;
          }else {
            delids+=val.id
          }

        });
        this.$http({
          method: 'post',
          url: 'api/company/position/deletepositionpushresume',
          emulateJSON: true,
          body: {
            positionId: this.postinfo.id,
            deliveId:delids
          }
        }).then(function (response) {

          let data = response.data;
          if (data.result && data.result == "success") {
            this.selecttoudi(this.postinfo.id);
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
          } else if (data.result) {
            this.tableloading = false;
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.tableloading = false;
        });


      },
      changepst(){
        this.selectpost(this.polistsel);
        //route.replace({name:'b简历列表',params:{pdid:this.polistsel}});
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
      handleSelectionChange(val) {
        this.tableselect = val;
      },
      jujueresume(row){
        this.$http({
          method: 'post',
          url: 'api/company/position/changepushresume',
          emulateJSON: true,
          body: {
            positionId: this.postinfo.id,
            deliveId:row.id,
            type:0
          }
        }).then(function (response) {

          let data = response.data;
          if (data.result && data.result == "success") {
            this.selecttoudi(this.postinfo.id);
            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
          } else if (data.result) {
            this.tableloading = false;
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.tableloading = false;
        });
      }
    }

  }
</script>
<style lang="less">
  @import "../css/resumelist.less";
</style>
