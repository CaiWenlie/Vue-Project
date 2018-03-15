<template lang="html">
  <div>
    <span v-if="computedValue">{{computedValue}}</span>
    <span v-else class="lighter">{{placeholder}}</span>

  </div>

</template>

<script>
import helper from '@/helper'
import {toast} from '@/util'

export default {
  data(){
    return {
      showSelect: false,
    }
  },
  props:{
    title: {

    },
    type: {

    },
    notice: {

    },
    value: {

    },
    text: {

    },
    textKey: {

    },
    required: {

    },
    placeholder: {

    },
    validate: {

    },
    readonly: {

    },
    disabled: {

    },
    options: {
      // [{value:1,text:'text'}...] [1,2,3]
      type: Array
    },

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
    edit() {
      this.$root.$refs.select.open({
        value: this.value,
        options: this.options
      }).done((value, item) => {
        this.updateValue(value)
      })
    },
    updateValue(value) {
      this.$emit('input', value)
    }
  },
  watch: {

  }
}
</script>
