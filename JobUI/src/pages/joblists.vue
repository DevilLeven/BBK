<template>
  <div>
    <div class="content">
      <div class="homesearchbox" style="width: 768px;margin-top: 20px;height: 50px">
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
                    trigger="hover" style="padding: 0;">
                    <seltipoption v-for="oitem in  item.list" :label="oitem.name"
                                  :value="oitem"></seltipoption>
                    <seltipoption  slot="reference" :label="item.name" :value="item"></seltipoption>
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
                  <seltipoption v-for="item in tagelistobj.xl"  :label="item.name" :value="item"></seltipoption>
                </seltiplist>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selctlist">
          <div class="title">行业分类</div>
          <div class="select-box">
            <div class="select-cent">
              <div class="lis">
                <seltiplist :multiple="true" v-model="from.type">
                  <el-popover
                    v-for="lv1 in tagelistobj.type"
                    placement="bottom"
                    width="400"
                    trigger="hover" >
                    <div style="max-height: 150px;overflow-y: auto">
                      <table style="width: 100%">
                        <tr  v-for="lv2 in lv1.level2" style="">
                          <td style="vertical-align: top;width:60px;padding:4px 10px;text-align: right;font-size: 16px;font-weight: bold;">{{lv2.name}}</td>
                          <td style="vertical-align: middle">
                            <seltipoption v-for="lv3 in lv2.level2"  :label="lv3.name" :value="lv3"></seltipoption>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <span class="tip" style="padding: 0" slot="reference">{{lv1.name}}</span>
                  </el-popover>
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
                 <span v-for="item in from.type">{{item.ptype.name}} : {{item.name}}<i class="el-icon-close"
                                                                   @click="removeadress(item,'type')"></i> </span>
                <span v-for="item in from.fl">{{item.name}}<i class="el-icon-close"
                                                              @click="removeadress(item,'fl')"></i> </span>

                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative;width: 100%">
        <div class="jonleft">
          <div class="dfbox">
            <div class="title">搜索结果</div>
            <div class="cont">
              <div class="jl" v-loading.body="tableloading">
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
                        class="requi"><el-popover trigger="hover" placement="bottom">
                        <pre style="font-size: 14px;font-weight: bold">{{item.info}}</pre>
                        <div slot="reference" class="requi">
                          {{item.info}}
                        </div>
                      </el-popover></span>
                    </div>
                    <div class="tips">
                      <span v-if="item.category&&item.category!=''">{{item.category}}</span>
                      <span v-for=" sitem in item.taglistary">{{sitem}}</span>
                    </div>
                  </a>
                </div>
                <div class="noItem" v-if="!joblist.length" style="display: block;text-align: center;margin: 20px">
                  <img src="../assets/nofind.png">
                  <p>暂无符合条件的职位！</p>
                </div>
                <div class="page" style="text-align: center">
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

        </div>
        <div class="jobright">
          <div class="ad">
            <img src="../assets/adr1.png">
          </div>
          <div class="ad">
            <img src="../assets/adr2.png">
          </div>
          <div class="ad">
            <img src="../assets/adr3.png">
          </div>

        </div>
      </div>
    </div>
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
    mounted(){
     let homeval= window.sessionStorage.getItem("homeval");

      this.initdata();
      if(homeval){
        homeval=JSON.parse(homeval);
        if(homeval.type=="type"){
          this.from.type.push(homeval.value)
        }else  if(homeval.type=="input"){
          this.searchinput=homeval.value.input;
          this.searchname=homeval.value.input;
          this.from.searchtype=homeval.value.type;
          this.searchjob();
        }
      }else {
        this.searchjob();
      }

    },
    watch: {
      from: {
        handler: function (val, oldVal) {
          this.handleCurrentChange(1);
        },
        deep: true
      }
    },
    data(){
      return {
        adresslist: [],
        from: {
          searchtype: "1",
          adress: [],
          name: "",
          xz: "",
          fl: [],
          xl: "",
          type:[]
        },
        searchinput: "",
        searchname: "",
        tableloading: false,
        joblist: [],
        tagelistobj: {
          xz: [],
          fl: [],
          xl: [],
          type: []
        },
        jobpage: {
          current: 1,
          pagesize: 10,
          totallist: 0,
        },
      }
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
            types: "0BBK2016BBK1BBK2016BBK2BBK2016BBK5"
          }
        }).then(function (response) {
          var data = response.data;
          if (data.result && data.result == "success") {
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
        this.$http({
          method: 'post',
          url: 'api/common/searchcategory',
          emulateJSON: true,
          body: {}
        }).then(function (response) {
          var data = response.data;
          if (data.result && data.result == "success") {

            var ary=data.resultEntity.data;
            ary.map((val, index)=> {
              var ptype={id:val.id,name:val.name};
              var lv2=val.level2;
              lv2.map((val2,index2)=>{
                var lv3=val2.level2;
                lv3.map((val3,index3)=>{
                  var lv3=val3.level2;
                  val3.ptype=ptype;
                });
              });
            });

            this.tagelistobj.type = ary;
          }

        }, function () {
        });
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
        var adress = "";
        this.from.adress.map((val, index)=> {
          if (index < this.from.adress.length - 1) {
            adress += val.name + until.config().FG;
          } else {
            adress += val.name;
          }
        });
        var fenlei = "";
        this.from.type.map((val, index)=> {
          if (index < this.from.type.length - 1) {
            fenlei += val.id + until.config().FG;
          } else {
            fenlei += val.id;
          }
        });
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/person/searchposition',
          emulateJSON: true,
          body: {
            price: this.from.xz.name || "",
            address: adress,
            education: this.from.xl.name || "",
            name: this.searchname,
            welfare: fl,
            category:fenlei,
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
      removeadress(item, key){
        if (item != "") {
          this.from[key].splice(this.from[key].indexOf(item), 1);
        } else {
          this.from[key] = "";
        }
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
      handleCurrentChange(cur){
        this.jobpage.current = cur;
        this.searchjob();
      },
    },
    destroyed() {
      window.sessionStorage.removeItem("homeval");
    }
  }
</script>
<style lang="less">
  @import "../css/joblists.less";
</style>
