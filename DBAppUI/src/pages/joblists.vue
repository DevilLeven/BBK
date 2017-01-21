<template>
  <div>
    <div class="">
      <div class="homesearchbox" style="width: 768px;margin-top: 20px">
        <el-select v-model="from.searchtype" placeholder="搜索类别" style="width: 100px;float: left;height: 36px">
          <el-option label="职位" value="1"></el-option>
          <el-option label="企业" value="0"></el-option>
        </el-select>
        <input class="searchinut" @keyup.13="btnsearch" v-model="searchinput" style="width: 518px">
        <button class="searchbtn" @click="btnsearch">搜索</button>
        <!--<div class="hotsraech">-->
        <!--<a>-->
        <!--<span style="width: 75px;float: left">热门搜索:</span>-->
        <!--<span class="hslist">Java</span>-->
        <!--<span class="hslist">前端开发</span>-->
        <!--<span class="hslist">C++</span>-->
        <!--<span class="hslist">产品经理</span>-->
        <!--<span class="hslist">房地产</span>-->
        <!--</a>-->
        <!--</div>-->
      </div>
      <div class="conditionbox">
        <div class="selctlist">
          <div class="title">地区</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis">
                <seltiplist :multiple="true" v-model="from.adress">
                  <el-popover
                    v-for="item in adresslist"
                    placement="bottom"
                    width="400"
                    trigger="hover">
                    <seltipoption  v-for="oitem in  item.list" :label="oitem.name"
                                  :value="oitem"></seltipoption>
                    <seltipoption slot="reference" :label="item.name" :value="item"></seltipoption>
                  </el-popover>
                </seltiplist>
                <div style="clear: both"></div>
              </div>
              <!--<div class="more">-->
              <!--更多<i class="el-icon-arrow-down"></i>-->
              <!--</div>-->
            </div>
          </div>
        </div>
        <div class="selctlist">
          <div class="title">薪资要求</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis">
                <seltiplist v-model="from.xz">
                  <seltipoption v-for="item in tagelistobj.xz" :label="item.name" :value="item"></seltipoption>
                </seltiplist>

                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selctlist">
          <div class="title">学历要求</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis">
                <seltiplist v-model="from.xl">
                  <seltipoption v-for="item in tagelistobj.xl" :label="item.name" :value="item"></seltipoption>
                </seltiplist>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selctlist">
          <div class="title">福利待遇</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis">
                <seltiplist v-model="from.fl" :multiple="true">
                  <seltipoption v-for="item in tagelistobj.fl" :label="item.name" :value="item"></seltipoption>
                </seltiplist>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: 1px;background: #eee"></div>
        <div class="selctlist">
          <div class="title">已选条件</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis onselect" style="min-height: 28px">

                <span v-for="item in from.adress">{{item.name}}<i class="el-icon-close"
                @click="removeadress(item,'adress')"></i> </span>
<!--<span v-if="from.adress!=''">{{from.adress.name}}<i class="el-icon-close"-->
                                                    <!--@click="removeadress('','adress')"></i> </span>-->
                <span v-if="from.xz!=''">{{from.xz.name}}<i class="el-icon-close"
                                                            @click="removeadress('','xz')"></i> </span>
                <span v-if="from.xl!=''">{{from.xl.name}}<i class="el-icon-close"
                                                            @click="removeadress('','xl')"></i> </span>
                <span v-for="item in from.fl">{{item.name}}<i class="el-icon-close"
                                                              @click="removeadress(item,'fl')"></i> </span>

                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative;width: 100%" v-loading.body="tableloading">
        <div class="jonleft" style="margin: 20px auto;width: 100%">
          <div class="dfbox">
            <div class="title">搜索结果</div>
            <div class="cont" v-loading.body="tableloading">
              <div class="jl">

                <div class="jobList" v-for="item in joblist">
                  <a :href="ahref(item.id)" target="_blank">
                    <div class="line">
                      <span class="jobtitle">{{item.name}}<span class="local">[ <a
                        v-for="(oitem, index) in item.addresary">{{oitem}} <a
                        v-if="index<item.addresary.length-1">, </a></a>]</span></span>
                      <span class="jobdate">{{datefromat(item.createAt)}}</span>
                <span class="jobcmp">
                  <a>{{item.comName}}</a>
                </span>
                    </div>
                    <div class="line">
                      <span class="money">{{item.price}}</span>
                      <span
                        class="requi"><el-popover trigger="hover" placement="bottom" >
                        <pre style="font-size: 14px;font-weight: bold">{{item.info}}</pre>
                        <div slot="reference" class="requi">
                          {{item.info}}
                        </div>
                      </el-popover></span>
                    </div>
                    <div class="tips">
                      <span v-for=" sitem in item.taglistary">{{sitem}}</span>
                    </div>
                  </a>
                  <div class="jobbtngrp">
                    <el-button class="defbtn" @click="showtoudidialog(item)">投递</el-button>
                  </div>
                </div>
                <div class="noItem" v-if="!joblist.length" style="display: block;">
                  <img src="../assets/nofind.png">
                  <p>暂无符合条件的职位！</p>
                </div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              :currentPage="jobpage.current"
              @current-change="handleCurrentChange"
              :page-size="jobpage.pagesize"
              layout="total, prev, pager, next"
              :total="jobpage.totallist">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>

    <el-dialog title="选择投递学员" custom-class="mydialog" v-model="toudidialog" :close-on-click-modal="false">
      <div class="slectbar">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="toudifrom.schoolselect" style="width: 200px;"  clearable filterable :remote-method="searchschool" :loading="schooloading"
                       remote placeholder="学校">
              <el-option
                v-for="item in toudi.schoollist"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="toudifrom.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dosearch()">查询</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div v-loading.body="XYloding">
        <div class="table">
          <el-table
            :data="toudi.tabledata"
            border
            style="width: 100%" @selection-change="handleSelectionChange" height="300">
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
              width="80">
            </el-table-column>

            <el-table-column
              prop="age"
              align="center"
              label="年龄" width="80">
            </el-table-column>
            <el-table-column
              prop="email"
              align="center"
              label="邮箱">
            </el-table-column>
            <el-table-column
              inline-template
              align="center"
              label="加入时间" min-width="110">
              <span style="text-align: center">{{datefromat(row.createAt)}}</span>
            </el-table-column>

          </el-table>
        </div>
        <div class="page" style="text-align: center">
          <el-pagination
            :currentPage="toudi.current"
            @current-change="toudihandleCurrentChange"
            :page-size="toudi.pagesize"
            layout="total, prev, pager, next"
            :total="toudi.totallist">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="toudidialog = false">取 消</el-button>
        <el-button type="primary" @click.native="toudiaction">投 递</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import seltiplist from "../components/seltiplist.vue";
  import seltipoption from "../components/seltipoption.vue";
  import until from "../until"
  export default{
    components: {
      seltiplist,
      seltipoption
    },

    data(){
      return {
        searchinput: "",
        searchname: "",
        adresslist: [],
        adreessolist: {},
        tableloading: false,
        joblist: [],
        tagelistobj: {
          xz: [],
          fl: [],
          xl: []
        },

        from: {
          searchtype: "1",
          adress: [],
          name: "",
          xz: "",
          fl: [],
          xl: "",
        },
        jobpage: {
          current: 1,
          pagesize: 10,
          totallist: 0,
        },
        toudidialog: false,
        schooloading: false,
        XYloding: false,
        toudifrom: {
          schoolselect: "",
          name: ""
        },
        toudi: {
          current: 1,
          pagesize: 10,
          totallist: 0,
          tabledata: [],
          schoollist: [],
          toudiselect: []
        }
      }
    },
    computed: {},
    watch: {
      from: {
        handler: function (val, oldVal) {
          this.handleCurrentChange(1);
        },
        deep: true
      }
    },

    mounted(){
      this.initdata();
      this.searchjob();
      this.$watch("toudidialog", function (val, old) {
        if (!val) {
          this.toudifrom = {
            schoolselect: "",
            name: ""
          };
          this.toudi = {
            current: 1,
            pagesize: 10,
            totallist: 0,
            tabledata: [],
            schoollist: [],
            toudiselect: []
          }
        }
      });
    },
    methods: {

      initdata(){
        this.adresslist = [];
        this.$http({
          method: 'post',
          url: 'api/common/areaall',
          emulateJSON: true,
          body: {}
        }).then(function (response) {
          var data = response.data;

          if (data.result && data.result == "success") {
            this.adresslist = data.resultEntity.sysAreas;
//            this.adresslist=data.resultEntity.sysAreas
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
        });
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
      removeadress(item, key){
        if (item != "") {
          this.from[key].splice(this.from[key].indexOf(item), 1);
        } else {
          this.from[key] = "";
        }
      },
      searchjob(){
        this.searchinput = this.searchname;
        var fl = "";
        this.from.fl.map((val, index)=> {
          if (index < this.from.fl.length - 1) {
            fl += val.name + until.config().FG;
          } else {
            fl += val.name;
          }
        });
        var adress="";
        this.from.adress.map((val, index)=> {
          if (index < this.from.adress.length - 1) {
            adress += val.name + until.config().FG;
          } else {
            adress += val.name;
          }
        });
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/bd/searchposition',
          emulateJSON: true,
          body: {
            price: this.from.xz.name || "",
            address: adress,
            education: this.from.xl.name || "",
            name: this.searchname,
            welfare: fl,
            page: this.jobpage.current,
            pageSize: this.jobpage.pagesize,
            type: this.from.searchtype,
          }
        }).then(function (response) {
          var data = response.data;
          this.tableloading = false;
          if (data.result && data.result == "success") {
            var ary = data.resultEntity.data.list;
            ary.map((val, index)=> {
              if (val.tagList) {
                val.taglistary = val.tagList.split(until.config().FG) || [];
              }
              if (val.addressId) {
                val.addresary = val.addressId.split(until.config().FG) || []
              }
            });

            this.joblist = ary;
            this.jobpage.totallist = data.resultEntity.data.total;
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
      handleCurrentChange(cur){
        this.jobpage.current = cur;
        this.searchjob();
      },
      btnsearch(){
        this.searchname = this.searchinput;
        this.searchjob();
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      ahref(id){
        return "#/jobinfo/" + id;
      },
      //投递接口
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
              if (this.toudidialog) {
                this.toudi.schoollist = data.resultEntity.data.list
              }
            } else if (data.result) {

            }

          }, function () {
            this.schooloading = false;
          });
      },
      selectXYlist(){
        this.XYloding = true;
        this.toudifrom.schoolselect = this.toudi.school;
        this.toudifrom.name = this.toudi.name;
        this.$http({
          method: 'post',
          url: 'api/bd/searchpushlist',
          emulateJSON: true,
          body: {
            college: this.toudi.school || "",
            page: this.toudi.current,
            pageSize: this.toudi.pagesize,
            name: this.toudi.name || "",
            positionId: this.toudi.postionid
          }
        }).then(function (response) {
          var data = response.data;
          this.XYloding = false;
          if (data.result && data.result == "success") {
            if (this.toudidialog) {
              this.toudi.tabledata = data.resultEntity.data.list;
              this.toudi.totallist = data.resultEntity.data.total;
            }
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.XYloding = false;
        });
      },
      toudiaction(){
        if (!this.toudi.toudiselect.length) {
          this.$message({
            showClose: true,
            message: '请选择学员',
            type: 'warning'
          });
          return;
        }
        var ids = "";
        this.toudi.toudiselect.map((val, index)=> {
          if (index < this.toudi.toudiselect.length - 1) {
            ids += val.perId + until.config().FG;
          } else {
            ids += val.perId;
          }
        });
        this.XYloding = true;
        this.$http({
          method: 'post',
          url: 'api/bd/push',
          emulateJSON: true,
          body: {
            perIds: ids,
            positionId: this.toudi.postionid
          }
        }).then(function (response) {
          var data = response.data;
          this.XYloding = false;
          if (data.result && data.result == "success") {
            if(this.toudidialog){
              this.selectXYlist();
            }
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
          this.XYloding = false;
        });
      },
      dosearch(){
        this.toudi.school = this.toudifrom.schoolselect;
        this.toudi.name = this.toudifrom.name;
        this.selectXYlist();
      },
      showtoudidialog(row){
        this.toudi.postionid = row.id;
        this.toudidialog = true;
        this.dosearch();
        this.searchschool("");
      },
      handleSelectionChange(val){
        this.toudi.toudiselect = val;
      },
      toudihandleCurrentChange(val){
        this.toudi.current = val;
        this.selectXYlist();
      },
    }
  }
</script>
<style lang="less">
  @import "../css/joblists.less";
</style>
