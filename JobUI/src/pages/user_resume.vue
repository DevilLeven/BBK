<template>
  <div>
    <div class="dfbox">
      <div class="title">基本信息</div>
      <div class="cont user">
        <div class="baseinfo">
          <el-upload
            action="//jsonplaceholder.typicode.com/posts/"
            :show-upload-list=false
          >
            <img src="../assets/dfuh.gif">
          </el-upload>

          <div class="lfInBase" style="margin-left: 10px;">

            <div style="font-size: 21px;font-weight: 600;">张子光</div>
            <div style="margin-top: 4px">
              <a style="">男</a>
              <a>| 26</a>
              <a> | 未婚</a>

              <div style="margin-top: 4px">
                <a style="">学历:本科</a>
              </div>

            </div>
          </div>


          <div class="lfInBase">
            <ul>
              <li>
                <i class="glyphicon glyphicon-globe"></i>
                <a>现居住:北京</a>
              </li>
              <li>
                <i class="glyphicon glyphicon-comment"></i>
                <a>邮箱:ziguang.zhang8@gmail.com</a>
              </li>
              <li>
                <i class="glyphicon glyphicon-phone"></i>
                <a>手机:****</a>
              </li>
            </ul>
          </div>
          <div style="clear: both"></div>
          <div class="grjj">个人简介:</div>
          <div style="line-height: 35px">
            相比于传统的新闻客户端，"今日头条"更适合被称为兴趣媒体，因其有着一项强大的技术武器——推荐引擎。在信息爆炸的时代，人们面对的选择越来越多，选择过多，信息超载，也常常会使人无所适从。在这种情况下，推荐引擎便开始展现技术优势，发挥威力。“今日头条”就是一款基于数据挖掘的推荐引擎产品，也是国内唯一使用推荐引擎做出独立产品的公司。它没有采编人员，不生产内容，没有立场和价值观，运转核心是一套由代码搭建而成的算法。“今日头条”搭建的算法模型会记录用户在今日头条上的每一次行为，基于此计算出用户的喜好，推送他最有可能感兴趣的内容。
          </div>
        </div>
        <span class="editbtn">
          <i class="glyphicon glyphicon-edit"></i>
        </span>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">工作经历</div>
      <div class="cont user">
        <span class="addjob"><i class="glyphicon glyphicon-plus-sign"></i> 添加</span>
        <ul class="ant-timeline" style="margin-top: 30px">
          <li class="ant-timeline-item">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <div class="jbled">
                <span><i class="glyphicon glyphicon glyphicon-edit"></i></span>
                <span><i class="glyphicon glyphicon-trash"></i></span>
              </div>
              <div class="jbtl">开发工程师</div>
              <div class="jobcl">

                <div class="lis">
                  <span class="ky">时间:</span> <span class="val">2015-10 到 2016-11</span>
                </div>
                <div class="lis">
                  <span class="ky">公司名称:</span> <span class="val">VIVA畅读</span>
                </div>
                <div class="lis">
                  <span class="ky">月薪:</span> <span class="val">30000</span>
                </div>
                <div class="lis">
                  <span class="ky">部门:</span> <span class="val">开发部</span>
                </div>
                <div class="lis">
                  <span class="ky">职位描述:</span> <span class="val">1、负责移动终端​‌‌及管理后台的需求分析、设计、开发等工作；
2、负责与项目相关人员共同完成模块设计、移动终端与服务器端的通讯设计与开发；
3、按照项目计划,在保证质量的前提下按时完成开发任务；
4、维护和升级现有产品，快速定位并修复软件缺陷；
5、与项目相关管理、测试和需求等人员沟通和合作；</span>
                </div>
              </div>
            </div>
          </li>
          <li class="ant-timeline-item">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <div class="jbled">
                <span><i class="glyphicon glyphicon glyphicon-edit"></i></span>
                <span><i class="glyphicon glyphicon-trash"></i></span>
              </div>
              <div class="jbtl">开发工程师</div>
              <div class="jobcl">

                <div class="lis">
                  <span class="ky">时间:</span> <span class="val">2015-10 到 2016-11</span>
                </div>
                <div class="lis">
                  <span class="ky">公司名称:</span> <span class="val">VIVA畅读</span>
                </div>
                <div class="lis">
                  <span class="ky">月薪:</span> <span class="val">30000</span>
                </div>
                <div class="lis">
                  <span class="ky">部门:</span> <span class="val">开发部</span>
                </div>
                <div class="lis">
                  <span class="ky">职位描述:</span> <span class="val">1、负责移动终端​‌‌及管理后台的需求分析、设计、开发等工作；
2、负责与项目相关人员共同完成模块设计、移动终端与服务器端的通讯设计与开发；
3、按照项目计划,在保证质量的前提下按时完成开发任务；
4、维护和升级现有产品，快速定位并修复软件缺陷；
5、与项目相关管理、测试和需求等人员沟通和合作；</span>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">教育经历</div>
      <div class="cont user">
        <span class="addjob"><i class="glyphicon glyphicon-plus-sign"></i> 添加</span>
        <ul class="ant-timeline" style="margin-top: 30px">
          <li class="ant-timeline-item">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-item-content">
              <div class="jbled">
                <span><i class="glyphicon glyphicon glyphicon-edit"></i></span>
                <span><i class="glyphicon glyphicon-trash"></i></span>
              </div>
              <div class="jbtl">开发工程师</div>
              <div class="jobcl">

                <div class="lis">
                  <span class="ky">时间:</span> <span class="val">2015-10 到 2016-11</span>
                </div>
                <div class="lis">
                  <span class="ky">公司名称:</span> <span class="val">VIVA畅读</span>
                </div>
                <div class="lis">
                  <span class="ky">月薪:</span> <span class="val">30000</span>
                </div>
                <div class="lis">
                  <span class="ky">部门:</span> <span class="val">开发部</span>
                </div>
                <div class="lis">
                  <span class="ky">职位描述:</span> <span class="val">1、负责移动终端​‌‌及管理后台的需求分析、设计、开发等工作；
2、负责与项目相关人员共同完成模块设计、移动终端与服务器端的通讯设计与开发；
3、按照项目计划,在保证质量的前提下按时完成开发任务；
4、维护和升级现有产品，快速定位并修复软件缺陷；
5、与项目相关管理、测试和需求等人员沟通和合作；</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">个人技能</div>
      <div class="cont user">
        <span class="addjob"><i class="glyphicon glyphicon-edit"></i> 编辑</span>
        <div style="margin-top: 25px">
          1、负责移动终端​‌‌及管理后台的需求分析、设计、开发等工作；
          2、负责与项目相关人员共同完成模块设计、移动终端与服务器端的通讯设计与开发；
          3、按照项目计划,在保证质量的前提下按时完成开发任务；
          4、维护和升级现有产品，快速定位并修复软件缺陷；
          5、与项目相关管理、测试和需求等人员沟通和合作；
        </div>
      </div>
    </div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">作品及附加简历</div>
      <div class="cont user">
        <ul>
          <li>
            <div class="filelist">
              <i class="el-icon-document"></i>
              个人简历
              <span class="remfile">  <i class="el-icon-close"></i> </span>
            </div>
          </li>
        </ul>
        <el-upload
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <el-button class="defbtn" style="width: 100%;margin-top: 20px">上传附件</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style lang="less">
  @import "../css/user_resume.less";
</style>
