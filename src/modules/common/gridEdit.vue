<template>
<div class="view-grid-edit">
  <cp-header back="true" :backMethod="backFn">
    {{data.title}}
    <span v-if="data.type=='multiSelect'" slot="right" @click="confirm" :class="{'c-disabled':required}">确定</span>
    <span v-if="data.type!='multiSelect' && data.type!='singleSelect'" class="primary" slot="right" @click="save" :class="{'c-disabled':invalid || required}">保存</span>
  </cp-header>

  <div class="view-content" v-if="data.type=='singleSelect' || data.type=='multiSelect'">
    <ul class="c-collapse-list touch-list" v-if="data.collapse">


      <li v-for="item in source" :class="{'open': item.open}">

        <dl class="c-table-row item" @click="expand(item)">
          <dd>{{getText(item)}}</dd>
          <dt class="pull-down">
            <i class="c-icon-updown" :class="{'open': item.open}"></i>
          </dt>
        </dl>
        <ul class="sub-list" v-show="item.open" transition="fade">
          <li v-for="subItem in item.items">
            <dl class="c-table-row sub-item" @click="select(subItem)">
              <dt>
                <div class="checkbox" v-if="data.type=='singleSelect'">
                  <i class="c-icon c-icon-selected" v-if="selected.indexOf(getValue(subItem))>=0"></i>
                  <i class="c-icon c-icon-unselected" v-else></i>
                </div>
                <div class="checkbox" v-if="data.type=='multiSelect'">

                  <svg class="icon icon-liebiaogouxuan1" aria-hidden="true" v-if="selected.indexOf(getValue(subItem))>=0">
                    <use xlink:href="#icon-liebiaogouxuan1"></use>
                  </svg>

                  <svg class="icon icon-quanxuan" aria-hidden="true" v-else>
                    <use xlink:href="#icon-quanxuan"></use>
                  </svg>

                  <!--<i class="c-icon c-icon-checked" ></i>-->
                  <!--<i class="c-icon c-icon-unchecked" ></i>-->
                </div>
              </dt>
              <dd>{{getText(subItem)}}</dd>
            </dl>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="c-collapse-list touch-list" v-else>
      <li v-for="item in source" :class="{'open': item.open}" v-show=" item.deviceType !== 6 ">
        <dl class="c-table-row item" @click="select(item)">
          <dd>{{source.getText ? source.getText(item) : getText(item)}}</dd>
          <dt>
            <div class="checkbox" v-if="data.type=='singleSelect'">
              <i class="c-icon c-icon-selected" v-if="selected.indexOf(getValue(item))>=0"></i>
              <i class="c-icon c-icon-unselected" v-else></i>
            </div>
            <div class="checkbox" v-if="data.type=='multiSelect'">

              <svg class="icon icon-liebiaogouxuan1" aria-hidden="true" v-if="selected.indexOf(getValue(item))>=0">
                <use xlink:href="#icon-liebiaogouxuan1"></use>
              </svg>

              <svg class="icon icon-quanxuan" aria-hidden="true" v-else>
                <use xlink:href="#icon-quanxuan"></use>
              </svg>
              <!---->
              <!--<i class="c-icon c-icon-checked" v-if="selected.indexOf(getValue(item))>=0"></i>-->
              <!--<i class="c-icon c-icon-unchecked" v-else></i>-->
            </div>
          </dt>
        </dl>
      </li>
    </ul>
  </div>

  <div class="view-content" v-else>
    <form action="" @submit.prevent="save">
      <div class="field-box">
        <input v-if="data.type=='text'"   type="text"   :placeholder="data.title" v-model="data.value" ref="input" v-validate:value="data.validate" initial="off">
        <input v-if="data.type=='number'" type="number" :placeholder="data.title" v-model="data.value" ref="input" v-validate:value="data.validate" initial="off">
        <input v-if="data.type=='tel'"    type="tel"    :placeholder="data.title" v-model="data.value" ref="input" v-validate:value="data.validate" initial="off">
        <input v-if="data.type=='email'"  type="email"  :placeholder="data.title" v-model="data.value" ref="input" v-validate:value="data.validate" initial="off">
      </div>
      <!-- <div class="container-fluid">
        <p v-show="invalid">
          <small class="text-danger">{{$validation.errors[0].message}}</small>
        </p>
      </div> -->
    </form>
  </div>

</div>

</template>

<script type="text/ecmascript-6">
import api from '@/api'
import rest from '@/rest'
import helper from '@/helper'
import {toast} from '@/util'
import cpHeader from '@/components/cpHeader'
export default {
  name: 'gridEdit',
  //==数据配置===
  data() {
    return {
      data: {},
      source: [],
      path: {},
      selected: [],
      selectedText: [],
      selectedData: [],
      beforeSelectedData : [],  //已经选择的设备数据（有可能是其他类型）
      currentItem: null,
      enterFn : false
    }
  },
  computed: {
    validation() {
      return this.$validation;
    },
    invalid() {
      let value = this.data.value;
      if(!value){
        return false;
      }
      if(this.$validation && this.data.validate){
        return this.$validation.invalid;
      }
      else{
        return false;
      }
    },
    required() {
      let value = this.data.value;
      if(typeof value == 'string'){
        value = value.trim();
      }
      return this.data.required==='true' && !value && value !== 0
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(!from.name){
        vm.$root.back();
        return;
      }
      vm.data = vm.$route.params;
      vm.enterFn = vm.data.enterFn ? vm.data.enterFn : false;
      vm.categoryType = vm.data.categoryType ? vm.data.categoryType : false;
      vm.data.type = vm.data.type || 'text';

      if(vm.data.type == 'singleSelect'){
        vm.selected = [vm.data.value];
        vm.selectedText = [vm.data.text];
        // vm.selectedData = [vm.data];
      }
      else if(vm.data.type == 'multiSelect'){
        if(helper.isArray(vm.data.value)){
          vm.selected = [];
          vm.data.value.forEach( item => {
            vm.beforeSelectedData.push( item );
            vm.selected.push( item.id );
          })
        }else{
          vm.selected = vm.data.value ? vm.data.value.split(',').map(item=>Number(item)) : [];
        }
        vm.selectedText = vm.data.text ? vm.data.text.split(',') : [];
      }
      else{
        vm.focus();
      }

      if(vm.data.source){
        vm.getSourceData();
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$resetValidation && this.$resetValidation();
    next()
  },

  //==状态管理配置===
  vuex: {

  },
  components: {
    cpHeader
  },
  created() {

  },
  ready() {

  },
  methods: {
    backFn() {
      if(this.enterFn) {
        this.enterFn('cancelSelect')
      }
      else {
        this.$root.back()
      }
    },
    getSourceData () {
      let mark = (data) => {
        if(this.data.collapse){
          return data.map(item => {
            item.open = false;
            item.items.map(subItem => {
              subItem.selected = this.selected.indexOf(this.getValue(subItem))>=0;
              if(subItem.selected){
                item.open = true;
                this.currentItem = item;
              }
              return subItem;
            });
            return item;
          });
        }
        else {
          return data.map(item => {
            item.selected = this.selected.indexOf(this.getValue(item))>=0;
            return item;
          })
        }
      }

      if(helper.isArray(this.data.source)){
        let data = this.data.source.map(item => {
          return $.extend({},item);
        })
        this.source = mark(data);
        this.path = {
          value: 'value',
          text: 'text'
        };
      }
      else {
        this.source = [];
        this.path = this.data.source.path;
        this.$root.loading = true;
        rest.get(this.data.source.api).done(res=>{
          let data = res.data || [],
              level = this.path.level || 0;
          for (let i = 0; i < level; i++) {
            data = data[0] || {};
            data = data.items || [];
          }
          this.source = mark(data);

        }).always(() => {
          this.$root.loading = false;
        });
      }

    },
    save() {
      if(this.required){
        toast(this.data.title + '不能为空');
      }
      else if(this.invalid){
        toast(this.$validation.errors[0].message);
      }
      else{
        this.$root.back(this.data);
      }
    },
    focus() {
      if(!this.$root.isIos){
        this.$els.input.focus();
      }
    },
    expand(item) {
      if(this.currentItem && this.currentItem != item && this.data.type == 'singleSelect'){
        this.currentItem.open = false;
      }
      this.currentItem = item;
      item.open = !item.open;
    },
    select(subItem) {

      if(this.data.type == 'singleSelect'){
        this.selected = [this.getValue(subItem)];
        this.selectedText = [this.getText(subItem)];
        this.selectedData = [subItem];
        this.confirm();
      }
      else if(this.data.type == 'multiSelect'){
        let index = this.selected.indexOf(this.getValue(subItem))
        if(index>=0){
          this.selected.splice(index,1);
          this.selectedText.splice(index,1);
        }
        else{
          this.selected.push(this.getValue(subItem));
          this.selectedText.push(this.getText(subItem));
        }
      }
    },
    confirm() {
      if(this.data.type == 'singleSelect'){
        this.data.value = this.selected[0];
        this.data.text = this.selectedText[0];
        this.data.selectedData = this.selectedData[0] || {};
      }
      if(this.data.type == 'multiSelect'){
        this.data.value = this.selected.join();
        this.data.text = this.selectedText.join();
      }

      let allSelectDevicesData = [];  //之前选择的设备和当前类型设备数据的集合
      this.source.forEach( a => {
        allSelectDevicesData.push( a );
      })
      this.beforeSelectedData.forEach( b => {
        allSelectDevicesData.push( b );
      })


      if( this.enterFn ) return this.enterFn( this.data , allSelectDevicesData );
      this.save();
    },
    getValue(item) {
      return this.data.source.getValue ? this.data.source.getValue(item) : item[this.path.value]
    },
    getText(item) {
      return this.data.source.getText ? this.data.source.getText(item) : item[this.path.text]
    },
  }
}
</script>

<style lang="scss" scoped>
  .view-grid-edit{
    .c-collapse-list{
      padding-left: 1.42857rem;
      padding-right: 1.42857rem;
    }
    .c-grid dl{
      line-height: rem(59.5px);
    }
    .c-table-row{
      padding-left: 0;
      padding-right: 0;
    }

  }
</style>
