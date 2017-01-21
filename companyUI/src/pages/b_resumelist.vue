<template>
<div>

  <resume :dfid="$route.params.pdid">
    <el-button  class="goback" @click.prevent="goback" style="margin-top:5px;margin-right: 10px;float: left;"> << 返回 </el-button>
  </resume>
</div>
</template>
<script>
  import resume from "./resumelist.vue";
  export default{
    components:{
      resume
    },
    methods:{
      goback(){
        window.history.go(-1)
      }
    }
  }
</script>
