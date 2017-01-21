<template>
  <div v-loading.body="pageloading">
    <el-button class="goback" style="margin-top: 21px" @click.prevent="goback"> << 返回</el-button>
    <div class="dfbox">
      <div class="title">基本信息
        <span style="float: right;margin-right: 40px;">

        <el-button  type="primary" size="mini" @click.prevent="goback">暂不处理</el-button>
          <el-button  v-if="userinfo.perPush&&userinfo.perPush.status!=2" type="primary" @click="jujueresume" size="mini" style="width: 59px">拒绝</el-button>
          </span>
      </div>
      <div class="cont user">
        <div class="baseinfo">

          <img src="../assets/dfuh.gif">


          <div class="lfInBase" style="margin-left: 10px;">

            <div style="font-size: 21px;font-weight: 600;">{{userinfo.name}}</div>
            <div style="margin-top: 4px">
              <a style="">{{userinfo.sex}}</a>
              <a v-if="userinfo.age">| {{userinfo.age}}</a>
              <a v-if="userinfo.marriage"> | {{userinfo.marriage}}</a>

              <div style="margin-top: 4px" v-if="educationList.length">
                <a style="">学历:{{educationList[educationList.length-1].level}}</a>
              </div>

            </div>
          </div>


          <div class="lfInBase">
            <ul>
              <li v-if="userinfo.address&&userinfo.address!=''">
                <i class="glyphicon glyphicon-globe"></i>
                <a>现居住:{{userinfo.address}}</a>
              </li>
              <li v-if="userinfo.email&&userinfo.email!=''">
                <i class="glyphicon glyphicon-comment"></i>
                <a>邮箱:{{userinfo.email}}</a>
              </li>
              <li v-if="userinfo.mobile&&userinfo.mobile!=''">
                <i class="glyphicon glyphicon-signal"></i>
                <a>手机:{{userinfo.mobile}}</a>
              </li>
              <li v-if="userinfo.qq&&userinfo.qq!=''">
                <i class="glyphicon glyphicon-phone"></i>
                <a>QQ:{{userinfo.qq}}</a>
              </li>
              <li v-if="userinfo.wechat&&userinfo.wechat!=''">
                <i class="glyphicon glyphicon-comment"></i>
                <a>微信:{{userinfo.wechat}}</a>
              </li>
            </ul>
          </div>
          <div style="clear: both"></div>
          <!--<div class="grjj">个人简介:</div>-->
          <!--<div style="line-height: 35px">-->
          <!--{{userinfo.info}}-->
          <!--</div>-->
        </div>
        <!--<span class="editbtn">-->
        <!--<i class="glyphicon glyphicon-edit"></i>-->
        <!--</span>-->
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">工作经历</div>
      <div class="cont user">
        <!--<span class="addjob"><i class="glyphicon glyphicon-plus-sign"></i> 添加</span>-->
        <ul class="ant-timeline" style="margin-top: 30px">
          <li class="ant-timeline-item" v-for="item in workList">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <!--<div class="jbled">-->
              <!--<span><i class="glyphicon glyphicon glyphicon-edit"></i></span>-->
              <!--<span><i class="glyphicon glyphicon-trash"></i></span>-->
              <!--</div>-->
              <div class="jbtl">{{item.position}}</div>
              <div class="jobcl">

                <div class="lis">
                  <span class="ky">时间:</span> <span class="val"> {{datefromat(item.beginAt)}} 到 {{datefromat(item.endAt)}}</span>
                </div>
                <div class="lis">
                  <span class="ky">公司名称:</span> <span class="val">{{item.name}}</span>
                </div>
                <!--<div class="lis">-->
                <!--<span class="ky">月薪:</span> <span class="val">30000</span>-->
                <!--</div>-->
                <!--<div class="lis">-->
                <!--<span class="ky">部门:</span> <span class="val">开发部</span>-->
                <!--</div>-->
                <!--<div class="lis">-->
                <!--<span class="ky">职位描述:</span> <span class="val">1、负责移动终端​‌‌及管理后台的需求分析、设计、开发等工作；-->
                <!--2、负责与项目相关人员共同完成模块设计、移动终端与服务器端的通讯设计与开发；-->
                <!--3、按照项目计划,在保证质量的前提下按时完成开发任务；-->
                <!--4、维护和升级现有产品，快速定位并修复软件缺陷；-->
                <!--5、与项目相关管理、测试和需求等人员沟通和合作；</span>-->
                <!--</div>-->
              </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">教育经历</div>
      <div class="cont user">
        <!--<span class="addjob"><i class="glyphicon glyphicon-plus-sign"></i> 添加</span>-->
        <ul class="ant-timeline" style="margin-top: 30px">
          <li class="ant-timeline-item" v-for="item in educationList">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <!--<div class="jbled">-->
              <!--<span><i class="glyphicon glyphicon glyphicon-edit"></i></span>-->
              <!--<span><i class="glyphicon glyphicon-trash"></i></span>-->
              <!--</div>-->
              <div class="jbtl">{{item.name}}</div>
              <div class="jobcl">

                <div class="lis">
                  <span class="ky">时间:</span> <span class="val">{{datefromat(item.beginAt)}} 到 {{datefromat(item.endAt)}}</span>
                </div>
                <div class="lis">
                  <span class="ky">学历:</span> <span class="val">{{item.level}}</span>
                </div>
                <div class="lis">
                  <span class="ky">在籍年数:</span> <span class="val">{{item.duration}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">资质证书</div>
      <div class="cont user">
        <!--<span class="addjob"><i class="glyphicon glyphicon-edit"></i> 编辑</span>-->
        <ul class="ant-timeline" style="margin-top: 30px">
          <li class="ant-timeline-item" v-for="item in skillList">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <!--<div class="jbled">-->
              <!--<span><i class="glyphicon glyphicon glyphicon-edit"></i></span>-->
              <!--<span><i class="glyphicon glyphicon-trash"></i></span>-->
              <!--</div>-->
              <div class="jbtl">{{item.name}}</div>
              <div class="jobcl">
                <div class="lis">
                  <span class="ky">证书等级:</span> <span class="val">{{item.level}}</span>
                </div>
                <div class="lis">
                  <span class="ky">资质编号:</span> <span class="val">{{item.skillNumber}}</span>
                </div>
                <div class="lis">
                  <span class="ky">发证日期:</span> <span class="val">{{datefromat(item.beginAt)}}</span>
                </div>
                <div class="lis">
                  <span class="ky">到期日期:</span> <span class="val">{{datefromat(item.endAt)}}</span>
                </div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import until from "../until"
  export default{

    data(){
      return {
        userinfo: {},
        educationList: [],
        skillList: [],
        workList: [],
        pageloading: false
      }
    },
    mounted(){
      this.initdata()
    },
    methods: {
      initdata(){
        this.pageloading = true;
        this.$http({
          method: 'post',
          url: 'api/company/position/resumescan',
          emulateJSON: true,
          body: {
            positionId: this.$route.params.positionId,
            perId: this.$route.params.deliveId,
          }
        }).then(function (response) {
          this.pageloading = false;
          let data = response.data;
          if (data.result && data.result == "success") {
            this.userinfo = data.resultEntity.data;
            this.educationList = data.resultEntity.data.educationList;
            this.skillList = data.resultEntity.data.skillList;
            this.workList = data.resultEntity.data.workList;

          } else if (data.result) {
            this.tableloading = false;
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
      jujueresume(row){
        this.pageloading=true;
        this.$http({
          method: 'post',
          url: 'api/company/position/changepushresume',
          emulateJSON: true,
          body: {
            positionId: this.userinfo.perPush.postionId,
            deliveId:this.userinfo.perPush.id,
            type:0
          }
        }).then(function (response) {
          this.pageloading=false;
          let data = response.data;
          if (data.result && data.result == "success") {

            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
            this.goback();
            this.pageloading=false;
          } else if (data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        }, function (error) {
          this.pageloading=false;
        });
      },
      goback(){
        window.history.go(-1)
      },
      datefromat(str){
        if (!str || str == "") {
          return "";
        }
        return until.datefromat(new Date(str), "yyyy-MM-dd");
      },
    }
  }
</script>
<style lang="less">
  @import "../css/user_resume.less";
</style>
