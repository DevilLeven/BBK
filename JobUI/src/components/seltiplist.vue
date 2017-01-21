<template>
  <div>
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import seltipoption from "./seltipoption.vue";
  import until from "../until"
 // import Emitter from 'element-ui/src/mixins/emitter';
  function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
  }
  var  Emitter= {
    methods: {
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  export default{
    mixins: [Emitter],
    name:"seltiplist",
    componentName:"seltiplist",
    components: {
      seltipoption
    },
    data(){
      return{
        istipSelect: true,
      }
    },
    props: {
      value:{},
      multiple:{
        type: Boolean,
        default: false
      }
    },

    mounted(){
      this.$on('handleOptionClick', this.handleOptionSelect);

    },
    methods:{
      handleOptionSelect(val){
        if(this.multiple){
          let optionIndex = -1;
          this.value.forEach((item, index) => {
            if(until.isObject(item)&&until.isObject(val)){
              if(item.id&&val.id&&item.id==val.id){
                optionIndex = index;
              }
            }
            if (item === this.value) {
              optionIndex = index;
            }
          });
          if(optionIndex<0){
            this.value.push(val);
          }else {
            this.value.splice(optionIndex, 1)
          }
        }else {
          if(val!=this.value){
            this.$emit('input', val);
          }else {
            this.$emit('input', "");
          }
        }

      }
    }
  }
</script>
