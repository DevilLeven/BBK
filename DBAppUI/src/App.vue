<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import until from "./until"
export default {
  name: 'app',
  mounted(){
   // console.log(this);
  }
}
</script>

<style>
  a:-webkit-any-link {
    color: #fff;
    text-decoration: none;
    cursor: auto;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
