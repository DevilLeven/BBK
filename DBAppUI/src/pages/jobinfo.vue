<template>
  <div v-loading.body="pageloading">
    <div class="">
      <div class="jonleft jobinfo">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">{{info.name}}</span>
            <div><span class="money">{{info.priceLow}}-{{info.priceHigh}}</span> <span class="date">{{datefromat(info.createAt)}}</span></div>

            <div class="titbtn">
              <el-button class="defbtn" @click="toudidialog=true">我要应聘</el-button>
            </div>
          </div>
          <div class="baseinfo">


            <div class="box">
              <span class="tl">公司名称:</span>
              <span class="intex"><span v-if="info.comInfo">{{info.comInfo.name}}</span></span>
            </div>
            <div class="box">
              <span class="tl">学历要求:</span>
              <span class="intex">{{info.education}}</span>
            </div>
            <div class="box">
              <span class="tl">招聘地区:</span>
              <span class="intex">
                <div class="tips">
                  <span v-for="item in info.addresary">{{item}}</span>

                </div>
              </span>
            </div>

            <div class="box">
              <div class="tl">福利待遇:</div>
              <div class="intex">
                <div class="tips">
                  <span v-for="item in info.taglistary">{{item}}</span>
                </div>
              </div>
            </div>
            <!--<div class="box">-->
              <!--<div class="tl">招聘人数:</div>-->
              <!--<div class="intex">5人</div>-->
            <!--</div>-->
            <!--<div class="box">-->
              <!--<div class="tl">联系人:</div>-->
              <!--<div class="intex">阿伟</div>-->
            <!--</div>-->
            <!--<div class="box">-->
              <!--<div class="tl">联系电话:</div>-->
              <!--<div class="intex"><span class="phone">1582123****</span></div>-->
            <!--</div>-->
          </div>
          <div>
            <div class="detil">
              <div class="tit">职位描述</div>
              <div class="opt">
                <span class="shoucang"><i class="el-icon-star-off"></i>收藏</span>

              </div>

            </div>
            <div class="infotext">
              <pre>{{info.info}}</pre>
            </div>
          </div>
        </el-card>
      </div>
      <div class="jobright jobinfocom" style="top: 40px;left: 800px">
        <el-card class="box-card">
          <div class="company-logo">
            <div v-if="info.comInfo"  :style="{'background-image':'url('+info.comInfo.logo+')' }" ></div>
            <!--<img  :src="info.comInfo.logo" style="width: 100%;height: 190px">-->
          </div>
          <h3><span v-if="info.comInfo">{{info.comInfo.name}}</span></h3>
          <a>注册时间:<span v-if="info.comInfo">{{datefromat(info.comInfo.createAt)}}</span></a>
          <div class="poster-common-header">
            <div class="line"></div>
            <div class="head">公司介绍</div>
            <div class="cmtext">
              <span v-if="info.comInfo">
              {{info.comInfo.info}}
                </span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="选择投递学员" custom-class="mydialog"   v-model="toudidialog" :close-on-click-modal="false">
      <div class="slectbar">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="toudifrom.schoolselect" style="width: 200px;" clearable filterable :remote-method="searchschool" :loading="schooloading" remote placeholder="学校">
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
          style="width: 100%" height="300" @selection-change="handleSelectionChange">
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
            align="center"
            label="性别" width="80">
          </el-table-column>

          <el-table-column
            prop="age"
            label="年龄" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱" align="center">
          </el-table-column>
          <el-table-column
            inline-template
            align="center"
            label="加入时间" min-width="110">
            <span>{{datefromat(row.createAt)}}</span>
          </el-table-column>

        </el-table>
      </div>
      <div class="page" style="text-align: center">
        <el-pagination
          :currentPage="toudi.current"
          @current-change="handleCurrentChange"
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
  import until from "../until";
  export default{
    data(){
      return{
        pageloading:false,
        info:{},
        toudidialog:false,
        schooloading:false,
        XYloding:false,
        toudifrom:{
          schoolselect:"",
          name:""
        },
        toudi:{
          current: 1,
          pagesize: 10,
          totallist: 0,
          tabledata:[],
          schoollist:[],
          toudiselect:[]
        }
      }
    },
    mounted() {
      this.initdata();
      this.$watch("toudidialog",function (val,old) {
        if(val){
          this.toudifrom={
            schoolselect:"",
              name:""
          };
          this.toudi={
            current: 1,
              pagesize: 10,
              totallist: 0,
              tabledata:[],
              schoollist:[],
              toudiselect:[]
          };
          this.dosearch();
          this.searchschool("");
        }
      });
    },
    methods:{
      initdata(){
        this.pageloading=true;
        this.$http({
          method: 'post',
          url: 'api/bd/positionscan',
          emulateJSON: true,
          body: {
            positionId:this.$route.params.id
          }
        }).then(function (response) {
          var data = response.data;
          this.pageloading=false;
          if (data.result && data.result == "success") {
            this.info=data.resultEntity.data;
            if (this.info.tagList) {
              this.info.taglistary = this.info.tagList.split(until.config().FG)||[];

            }
            if(this.info.addressId){
              this.info.addresary = this.info.addressId.split(until.config().FG)||[]
            }
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.pageloading=false;
        });
      },
      handleCurrentChange(val){
        this.toudi.current=val;
        this.selectXYlist();
      },
      handleSelectionChange(val){
        this.toudi.toudiselect=val;
      },
      searchschool(val){

          this.schooloading=true;
          this.$http({
            method: 'post',
            url: 'api/bd/querycollegelist',
            emulateJSON: true,
            body: {
              college:val,
              page:1,
              pageSize:20
            }
          }).then(function (response) {
            var data = response.data;
            this.schooloading=false;
            if (data.result && data.result == "success") {
              this.toudi.schoollist=data.resultEntity.data.list
            } else if (data.result) {

            }

          }, function () {
            this.schooloading=false;
          });
      },
      selectXYlist(){
        this.XYloding=true;
        this.toudifrom.schoolselect= this.toudi.school;
        this.toudifrom.name=this.toudi.name;
        this.$http({
          method: 'post',
          url: 'api/bd/searchpushlist',
          emulateJSON: true,
          body: {
            college:this.toudi.school||"",
            page:this.toudi.current,
            pageSize:this.toudi.pagesize,
            name:this.toudi.name||"",
            positionId:this.$route.params.id
          }
        }).then(function (response) {
          var data = response.data;
          this.XYloding=false;
          if (data.result && data.result == "success") {
            this.toudi.tabledata=data.resultEntity.data.list;
            this.toudi.totallist=data.resultEntity.data.total;
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }

        }, function () {
          this.XYloding=false;
        });
      },
      toudiaction(){
        if (!this.toudi.toudiselect.length){
          this.$message({
            showClose: true,
            message: '请选择学员',
            type: 'warning'
          });
          return;
        }
        var ids="";
        this.toudi.toudiselect.map((val,index)=>{
          if(index<this.toudi.toudiselect.length-1){
            ids+=val.perId+until.config().FG;
          }else {
            ids+=val.perId;
          }
        });
        this.XYloding=true;
        this.$http({
          method: 'post',
          url: 'api/bd/push',
          emulateJSON: true,
          body: {
            perIds:ids,
            positionId:this.$route.params.id
          }
        }).then(function (response) {
          var data = response.data;
          this.XYloding=false;
          if (data.result && data.result == "success") {
            this.selectXYlist();
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
          this.XYloding=false;
        });
      },
      dosearch(){
        this.toudi.school=this.toudifrom.schoolselect;
        this.toudi.name=this.toudifrom.name;
        this.selectXYlist();
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      goback(){
        window.history.go(-1)
      }
    }
  }
</script>
<style lang="less">
  @import "../css/jobinfo.less";
  .company-logo{
    div{
      width: 100%;height: 190px;background-position: center center;background-size: 100% auto;background-repeat: no-repeat;
      /*background-image: ;*/
    }
  }
</style>
