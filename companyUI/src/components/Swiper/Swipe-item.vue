<template>
  <div class="mint-swipe-item">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted() {
      this.$parent && this.$parent.swipeItemCreated(this);
    },

    destroyed() {
      this.$parent && this.$parent.swipeItemDestroyed(this);
    }
  };
</script>
