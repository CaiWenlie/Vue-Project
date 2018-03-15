<template lang="html">
  <li>
    <dl @click="edit" class="form-control">
      <dt class="control-label">
        <slot name="left">
          {{title}}
          <svg-icon icon="icon-shuomingicon" v-if="notice" @click="toast(notice,()=>{},3000)"></svg-icon>
        </slot>
      </dt>
      <dd>
        <slot name="right">
          <form-control-select v-if="type=='select'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-select>
          <form-control-radio v-else-if="type=='radio'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-radio>
          <form-control-region v-else-if="type=='region'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-region>
          <form-control-picker v-else-if="type=='picker'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-picker>
          <form-control-date-picker v-else-if="type=='datePicker'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-date-picker>
          <form-control-star v-else-if="type=='star'" v-bind="computedData" @input="updateValue" ref="formControl"></form-control-star>
          <form-control-text v-else v-bind="computedData" @input="updateValue" ref="formControl" v-on:blur="$emit('blur')"></form-control-text>
        </slot>
      </dd>
      <!-- <dt><svg-icon icon="icon-liebiaoyoujianicon"></svg-icon></dt> -->
    </dl>
  </li>
</template>

<script>
import helper from '@/helper'
import {toast} from '@/util'
import formControlText from './formControlText.vue'
import formControlSelect from './formControlSelect.vue'
import formControlRadio from './formControlRadio.vue'
import formControlRegion from './formControlRegion.vue'
import formControlPicker from './formControlPicker.vue'
import formControlDatePicker from './formControlDatePicker.vue'
import formControlStar from './formControlStar.vue'

export default {
  data(){
    return {
      showSelect: false,
    }
  },
  components: {
    formControlText,
    formControlSelect,
    formControlRadio,
    formControlRegion,
    formControlPicker,
    formControlDatePicker,
    formControlStar
  },
  props:{
    type: {
      default: 'text'
    },
    title: {

    },
    value: {

    },
    placeholder: {

    },
    readonly: {

    },
    disabled: {

    },
    required: {
      default: 'false'
    },
    options: {

    },
    notice: {
      type: String
    },

    // text: {
    //   type: String
    // },
    // textKey: {
    //   type: String
    // },



    // source: {
    //
    // },
    // validate: {
    //
    // },
    // collapse: {
    //   type: String,
    //   default: 'false'
    // },


  },
  computed:{
    computedData(){
      return {
        type: this.type,
        title: this.title,
        value: this.value,
        placeholder: this.placeholder,
        readonly: this.readonly && this.readonly!=='false',
        disabled: this.disabled && this.disabled!=='false',
        required: this.required && this.required!=='false',
        options: this.options,
        // text: this.text,
        // textKey: this.textKey,
        // title: this.title,
        // source: this.source,
        // validate: this.computedValidate,
        // collapse: this.collapse
      }
    }
  },
  mounted () {

  },
  methods: {
    edit() {
      if(this.computedData.readonly || this.computedData.disabled){
        return;
      }
      this.$refs.formControl.edit()
    },
    updateValue(value) {
      this.$emit('input', value)
    }
  },
  watch: {

  }
}
</script>
