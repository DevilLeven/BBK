<template>
  <span class="tip"  @click.stop="selectOptionClick" :class="{'on':itemSelected }">{{currentLabel}}</span>
</template>
<script type="text/babel">
  import until from "../until"
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
    name:"seltipoption",
    componentName:"seltipoption",
    data(){
      return{

      }
    },
    props: {
      value: {
        required: true
      },
      label: [String, Number],
    },
    computed: {
      currentLabel() {
        return this.label || ((typeof this.value === 'string' || typeof this.value === 'number') ? this.value : '');
      },

      currentValue() {
        return this.value || this.label || '';
      },

      parent() {
        let result = this.$parent;
        while (!result.istipSelect) {
          result = result.$parent;
        }
        return result;
      },
      itemSelected() {
        if (!this.parent.multiple) {
          return this.value === this.parent.value;
        } else {
          let optionIndex = -1;
          this.parent.value.forEach((item, index) => {
            if(until.isObject(item)&&until.isObject(this.value)){
              if(item.id&&this.value.id&&item.id==this.value.id){
                optionIndex = index;
              }
            }
            if (item === this.value) {
              optionIndex = index;
            }
          });
          return optionIndex>-1;
        }

      },
    },
    methods:{
      selectOptionClick(){
          this.dispatch('seltiplist', 'handleOptionClick', this.value);
      }
    }
  }

</script>
