<template lang="html">
  <transition name="fade">
    <div ref="select" class="c-select" v-show="showSelect" @click="close">
      <transition name="down">
        <div class="wrap" v-show="showSelect">
          <ul class="cp-dropdown">
            <li v-for="item in computedOptions" :class="{active: item.value == value}" @click="updateValue(item.value, item)">{{item.text}}</li>
          </ul>
          <ul class="cp-dropdown cancel">
            <li>取消</li>
          </ul>
        </div>
      </transition>
    </div>
  </transition>

</template>

<script>
import helper from '@/helper'
import {toast} from '@/util'

export default {
  data(){
    return {
      defer: null,
      showSelect: false,
      value: '',
      options: []
    }
  },
  props:{

  },
  computed:{
    computedOptions(){
      if(!this.options){
        return [];
      }
      return this.options.map(item=>{
        return (typeof item == 'object') ? item : {value:item,text:item};
      });
    },
    computedValue(){
      let filter = this.computedOptions.filter(item=>{
        return this.value === item.value;
      });
      return filter.length ? filter[0].text : '';
    }
  },
  methods: {
    open(setting) {
      this.defer = $.Deferred()
      this.options = setting.options
      this.value = setting.value
      this.showSelect = true;
      return this.defer.promise()
    },
    updateValue(value, item) {
      this.$emit('input', value, item)
      this.defer.resolve(value, item)
    },
    close() {
      this.showSelect=false
      if(this.defer.state() != 'resolved') {
        this.defer.reject()
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.c-select{
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
}
.wrap{
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
}
.active{
  color: $primary;
}
</style>
