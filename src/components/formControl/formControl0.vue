<template lang="html">
  <li v-show="show">
    <dl @click="edit" class="form-control" :class="{'no-line': type=='multiRadio'}">
      <dt class="control-label">
        <slot name="left">
          {{title}}
          <svg-icon icon="icon-shuomingicon" v-if="notice" @click="toast(notice,()=>{},3000)"></svg-icon>
        </slot>
      </dt>
      <dd>
        <slot name="right">
          <span v-if="showValue">{{computedValue}}</span>
          <input ref="input" name="input" class="form-control-input" v-model="value"
            @change="trigger"
            v-if="type=='text'" type="text"
            :maxlength="type=='tel'?11:''"
            :placeholder="placeholder || (required=='false'?'选填':'')"
            v-validate="'required|email'"
            :readonly="!!readonly && readonly!=='false'"
            :disabled="!!disabled && disabled!=='false'"
          >
          <input ref="input" name="input" class="form-control-input" v-model="value"
            @change="trigger"
            v-if="type=='number'" type="number"
            :maxlength="type=='tel'?11:''"
            :placeholder="placeholder || (required=='false'?'选填':'')"
            v-validate="'required|email'"
            :readonly="!!readonly && readonly!=='false'"
            :disabled="!!disabled && disabled!=='false'"
          >
          <input ref="input" name="input" class="form-control-input" v-model="value"
            @change="trigger"
            v-if="type=='tel'" type="tel"
            :maxlength="type=='tel'?11:''"
            :placeholder="placeholder || (required=='false'?'选填':'')"
            v-validate="'required|email'"
            :readonly="!!readonly && readonly!=='false'"
            :disabled="!!disabled && disabled!=='false'"
          >
          <input ref="input" name="input" class="form-control-input" v-model="value"
            @change="trigger"
            v-if="type=='email'" type="email"
            :maxlength="type=='tel'?11:''"
            :placeholder="placeholder || (required=='false'?'选填':'')"
            v-validate="'required|email'"
            :readonly="!!readonly && readonly!=='false'"
            :disabled="!!disabled && disabled!=='false'"
          >
          <span v-if="type=='radio'">
            <label v-for="item in computedOptions" class="radio-item" :class="[value===item.value ? item.activeClass || 'active' : '']" @click="value=item.value">{{item.text}}</label>
          </span>
          <!-- <span class="lighter" v-if="required=='true' && !value && value!==0">必填</span> -->
          <!-- <span class="lighter" v-if="required=='false' && !value && value!==0">选填</span> -->
        </slot>
      </dd>
      <dt v-if="showValue"><svg-icon icon="icon-liebiaoyoujianicon"></svg-icon></dt>
    </dl>
    <slot name="after">
      <div class="textarea-wrap" v-if="type=='textarea'">
        <textarea v-model="value" ref="textarea" :placeholder="placeholder || '请输入（50个字以内）'" maxlength="50"></textarea>
      </div>
      <div class="container-fluid multi-radio-wrap" v-if="type=='multiRadio'">
        <div class="row">
          <div class="col-xs-3" v-for="item in computedOptions">
            <label class="radio-item" :class="[value===item.value ? item.activeClass || 'active' : '']" @click="value=item.value">{{item.text}}</label>
          </div>
        </div>
      </div>
      <!-- <div class="" >

      </span> -->
    </slot>

    <transition name="fade">
      <div ref="select" class="c-select" v-if="type=='select'" v-show="showSelect" @click="showSelect=false">
        <div class="view-fixed-cover">
          <div class="view-fixed-bottom">
            <ul class="cp-dropdown">
              <li v-for="item in computedOptions" @click="value = item.value">{{item.text}}</li>
            </ul>
            <ul class="cp-dropdown cancel">
              <li>取消</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </li>


  <!--
    type = 'select' 当前页面下拉选择
    type = 'singleSelect' 弹窗单选
    type = 'multiSelect' 弹窗多选
    collapse = 'true' 含有折叠选项
  -->
  <!--
    远程获取选项
    source = {
      api,
      path:{
        level: 选项所在的层级 default: 0
        value: 值的键值 default: value
        text: 文字的键值 default: text
      },
      getValue: function(){},
      getText: function(){}
    }
    直接加载选项
    source = [{value,text},{},...]
  -->
  <!-- <form-control title="所属行业"
    key="industryId" v-model="data.industryId"
    :text="data.belongNet" text-key="belongNet" required="true"
    type="singleSelect"
    collapse="true"
    :source="[{value:1,text:'A',items:[{value:1,text:'A'},{value:2,text:'A'}]},{value:2,text:'B',items:[{value:1,text:'A'}]}]">
  </form-control>
  <form-control title="推荐房源"
    key="introHo" v-model="data.introHo"
    :text="data.houseNames" text-key="houseNames"
    type="multiSelect"
    :source="[{value:1,text:'A'},{value:2,text:'B'}]">
  </form-control> -->


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
      type: String
    },
    notice: {
      type: String
    },
    // key: {
    //   type: String
    // },
    value: {

    },
    text: {
      type: String
    },
    textKey: {
      type: String
    },
    required: {
      default: 'false',
      type: String
    },
    placeholder: {
      type: String
    },
    type: {
      default: 'text',
      type: String
    },
    options: {
      // {value:1,text:'text'}
      type: Array
    },
    source: {

    },
    validate: {

    },
    collapse: {
      type: String,
      default: 'false'
    },
    readonly: {

    },
    disabled: {

    },
    show: {
      type: Boolean,
      default: true
    }

  },
  computed:{
    validation () {
      return this.$validation;
    },
    computedValidate () {
      return helper.isString(this.validate) ? [this.validate] : this.validate
    },
    showValue () {
      return [ 'select' , 'singleSelect','multiSelect','date'].indexOf(this.type) >= 0
    },
    showInput () {
      return ['text','number','email','tel'].indexOf(this.type) >= 0
    },
    computedOptions(){
      if(!this.options){
        return [];
      }
      return this.options.map(item=>{
        return (typeof item == 'string') ? {value:item,text:item} : item;
      });
    },
    computedValue(){
      if(this.type=='select'){
        let filter = this.computedOptions.filter(item=>{
          return this.value === item.value;
        });
        return filter.length ? filter[0].text : '';
      }
      else if(this.type=='singleSelect' || this.type=='multiSelect'){
        return this.text;
      }
      else if(this.type=='textarea'){
        return '';
      }
      else if(this.type=='date'){
        return helper.format(this.value,'yyyy-MM-dd');
      }
      else{
        return this.value;
      }
    },
    computedData(){
      return {
        key: this.key,
        value: this.value,
        text: this.text,
        textKey: this.textKey,
        title: this.title,
        source: this.source,
        type: this.type,
        required: this.required,
        validate: this.computedValidate,
        collapse: this.collapse == 'true'
      }
    }
  },
  mounted () {
    if (this.type == 'select') {
      let select = $(this.$refs.select),
          view = select.parents('.view').eq(0);
      select.appendTo(view);
    }
    else if(this.type == 'radio' || this.type == 'multiRadio') {
      if(!this.value && this.value !== 0 && this.computedOptions.length) {
        this.value = this.computedOptions[0].value;
      }
    }

  },
  methods: {
    toast,
    edit() {
      if(!!this.readonly && this.readonly!=='false'){
        // readonly
        return;
      }
      if(!!this.disabled && this.disabled!=='false'){
        // disabled
        return;
      }

      if(this.type == 'select'){
        this.showSelect = true;
      }
      else if(this.type == 'singleSelect'){
        this.$root.go({name: 'gridEdit', params: this.computedData});
      }
      else if(this.type == 'multiSelect'){
        this.$root.go({name: 'gridEdit', params: this.computedData});
      }
      else if(this.type == 'textarea'){
        this.$refs.textarea.focus();
      }
      else if(this.type == 'date'){
        let date = new Date();
        weui.datePicker({
          start: date,
          end: 2030,
          defaultValue: [date.getFullYear(),date.getMonth()+1,date.getDate()],
          onChange: result => {
            // console.log(result);
          },
          onConfirm: result => {
            // console.log(result);
            let value = result.map(item => item.value).join('/'),
                date = new Date(value).getTime();
            this.value = date;
          }
        });
      }
      else if(this.type == 'radio' || this.type == 'multiRadio'){
        // do nothing
      }
      else{
        // this.$root.go({name: 'gridEdit'},this.computedData);
        this.$refs.input && this.$refs.input.focus();
      }
    },
    trigger() {
      this.$emit('input', this.value)
    }
  },
  watch: {
    'value' (value) {
      if(!value && value !== 0 && this.computedOptions.length){
        if(this.type == 'radio' || this.type == 'multiRadio') {
          this.value = this.computedOptions[0].value;
        }
      }
    }
  }
}
</script>
