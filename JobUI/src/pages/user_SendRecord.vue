<template>
  <div>
    <div class="dfbox" >
      <div class="title">我的投递</div>
      <div class="cont send">
        <el-tabs type="border-card" >
          <el-tab-pane label="全部状态">
            <div class="list">
              <div class="jobList">
                <a href="#/jobinfo">
                  <div class="line">
                    <span class="jobtitle">销售代表<span class="local">[北京]</span></span>
                    <span class="jobdate">今天</span>
                <span class="jobcmp">
                  <a>泰康人寿保险股份有限公司北京分公司</a>
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
                </a>
                <div class="state" style="text-align: right;padding-left: 30px">
                  待审核
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="投递成功">
            <div class="noItem" style="display: block;">
              <img src="../assets/nofind.png">
              <p>暂无符合条件的投递记录！</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已查看">角色管理</el-tab-pane>
          <el-tab-pane label="被驳回">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style lang="less">
  @import "../css/user_SendRecord.less";
</style>
