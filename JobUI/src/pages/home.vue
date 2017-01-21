<template>
  <div class="content">
    <div class="leftbox">

      <div class="sideBox" v-for="lv1 in taglist">
        <div class="sideMen">
          <div class="tit"><a>{{lv1.name}}</a>
          </div>
          <a v-for="lv2 in lv1.level2">{{lv2.name}}</a>
          <i class=" el-icon-arrow-right"></i>
        </div>
        <div class="sideMain">
          <span v-for="lv2 in lv1.level2">
            <div class="tit"><a>{{lv2.name}}</a>
            </div>
            <div class="alink alinkNor">
              <a @click="btnsearch('type',lv1,lv3)" v-for="lv3 in lv2.level2">{{lv3.name}}</a>
            </div>
          </span>

        </div>


      </div>
    </div>
    <div class="rightbox">
      <div class="homesearchbox">
        <el-select v-model="searchtype" placeholder="搜索类别" style="width: 100px;float: left;height: 36px">
          <el-option label="职位" value="1"></el-option>
          <el-option label="企业" value="0"></el-option>
        </el-select>
        <input class="searchinut" @keyup.13="btnsearch('input')" v-model="searchinput" style="width: 518px">
        <button class="searchbtn" @click="btnsearch('input')">搜索</button>
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
      <div class="baner">
        <swipe class="my-slide" :auto="4000" ref="baner">
          <swipe-item class="slide"><img src="../assets/ad1.jpg"></swipe-item>
          <swipe-item class="slide"><img src="../assets/ad2.jpg"></swipe-item>
          <swipe-item class="slide"><img src="../assets/ad3.jpg"></swipe-item>
        </swipe>
        <div class="bar-pre" @click="bar_pre"></div>
        <div class="bar-next" @click="bar_next"></div>
      </div>
      <div class="Advebox">
        <ul>
          <li><img src="../assets/lad1.jpg"></li>
          <li><img src="../assets/lad2.jpg"></li>
          <li><img src="../assets/lad3.jpg"></li>
          <li><img src="../assets/lad4.jpg"></li>
          <li><img src="../assets/lad5.jpg"></li>
          <li><img src="../assets/lad6.jpg"></li>
          <li><img src="../assets/lad7.jpg"></li>
          <li><img src="../assets/lad8.jpg"></li>

        </ul>
      </div>
      <div class="hotjobbox">
        <div class="dfbox">
          <div class="title">最新职位</div>
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
      <div style="clear:both"></div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import Swiper from "../components/Swiper/Swiper.vue"
  import SwiperItem from "../components/Swiper/Swipe-item.vue"
  import until from "../until"
  import route from "../route.config";

  export default{
    components: {
      "swipe": Swiper,
      "swipe-item": SwiperItem
    },

    data(){
      return {
        jobpage: {
          current: 1,
          pagesize: 10,
          totallist: 0,
        },
        searchtype:"1",
        tableloading:false,
        searchinput:"",
        joblist: [],
        taglist: []
      }
    },
    mounted(){
      this.initdata();
      this.searchjob();
    },
    methods: {
      bar_pre(){
        this.$refs.baner.prev();
      },
      bar_next(){
        this.$refs.baner.next();
      },
      initdata(){
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

            this.taglist = ary;
          }

        }, function () {
        });
      },
      handleCurrentChange(val){
        this.jobpage.current=val;
        this.searchjob();
      },
      searchjob(){
        this.tableloading = true;
        this.$http({
          method: 'post',
          url: 'api/person/searchposition',
          emulateJSON: true,
          body: {
            price:  "",
            address: "",
            education:  "",
            name: "",
            welfare: "",
            page: this.jobpage.current,
            pageSize: this.jobpage.pagesize,
            type: "1",
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
      ahref(id){
        return "#/jobinfo/" + id;
      },
      datefromat(str){
        return until.datefromat(new Date(str), "yyyy/MM/dd HH:mm");
      },
      btnsearch(type,lv1,lv3){
        if (type=="type"){
          var json={type:"type",value:lv3}
          window.sessionStorage.setItem("homeval",JSON.stringify(json))
        }else if(type=="input"){
          var json={type:"input",value:{input:this.searchinput,type:this.searchtype}}
          window.sessionStorage.setItem("homeval",JSON.stringify(json))
        }
        route.push({name:"职位列表"});
      }
    }
  }
</script>
<style lang="less">
  @import "../css/home.less";
</style>
