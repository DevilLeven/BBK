<template>
  <div>
    <div class="dfbox" style="margin-top: 20px">
      <div class="title">招聘管理</div>
      <div class="cont resume">
        <div class="slectbar">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-select placeholder="选择职位">
                <el-option-group
                  label="在聘">
                  <el-option
                    label="职位1"
                    value="职位1">
                  </el-option>
                  <el-option
                    label="职位2"
                    value="职位2">
                  </el-option>
                  <el-option
                    label="职位3"
                    value="职位3">
                  </el-option>
                </el-option-group>
                <el-option-group
                  label="下架">
                  <el-option
                    label="职位4"
                    value="职位4">
                  </el-option>
                  <el-option
                    label="职位5"
                    value="职位5">
                  </el-option>
                  <el-option
                    label="职位6"
                    value="职位6">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
          <el-form :inline="true"  style="position: absolute;right: 20px;top: 0px;">
            <el-form-item>
              <el-button type="primary">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="">
          <div class="jobList">
              <div class="line">
                <span class="jobtitle">销售代表<span class="local">[北京]</span></span>
                <span class="jobdate">今天</span>
                <span class="jobcmp jianjie">
                  <a>泰康人寿保险股份有限公司北京分公司泰康人寿保险股份有限公司北京分公司泰康人寿保险股份有限公司北京分公司泰康人寿保险股份有限公司北京分公司泰康人寿保险股份有限公司北京分公司泰康人寿保险股份有限公司北京分公司</a>
                </span>
              </div>
              <div class="line">
                <span class="money">8000-12000</span>
                      <span
                        class="requi"> 1、负责审计过程中与相关部门的协调和沟通； 2、依据公司内部控制的要求及内部控制审计的结果，对业务提出优化或改正的建议，起到支持业务发展的作用；</span>
              </div>
              <div class="tips">
                <span>年底双薪</span>
                <span>带薪年假</span>
                <span>包吃住</span>
              </div>
            <div style="position: absolute;right: 20px;top: 40px">
              <el-form :inline="true">
                <el-form-item>
                  <el-button type="primary">编辑</el-button>
                </el-form-item>
                <el-form-item>
                  <el-select style="width: 90px" >
                    <el-option
                      label="在聘"
                      value="在聘">
                    </el-option>
                    <el-option
                      label="下架"
                      value="下架">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
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
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="der"
              label="性别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="date"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="date"
              label="投递时间">
            </el-table-column>
            <el-table-column
              inline-template
              :context="_self"
              label="操作">
              <span>

                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small" >拒绝</el-button>
              </span>

            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tabledata: [{
          name: '张子光',
          der: '男',
          state: "在聘",
          date: "2016-11-15",
          age: 34
        },{
          name: '张子光',
          der: '男',
          state: "在聘",
          date: "2016-11-15",
          age: 34
        },{
          name: '张子光',
          der: '男',
          state: "在聘",
          date: "2016-11-15",
          age: 34
        },{
          name: '张子光',
          der: '男',
          state: "在聘",
          date: "2016-11-15",
          age: 34
        },{
          name: '张子光',
          der: '男',
          state: "在聘",
          date: "2016-11-15",
          age: 34
        },
        ]
      }
    }
  }
</script>
<style lang="less">
  @import "../css/resumelist.less";
</style>
