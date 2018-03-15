<template>
<div class="view-search">

  <cp-header>
    <div slot="inner">
      <div class="c-table-row" style="padding: 0 1em">
        <div class="c-btn-group item" @click="focus" style="width:100%">
          <i class="c-icon c-icon-searchbox-search"></i>
          <i class="c-icon c-icon-searchbox-close" @click="clear" v-show="keyword"></i>
          <form action="" @submit.prevent="">
            <input v-el:search id='customer-search' type="search" name="search" @keyup="search | debounce(500)" v-model="keyword" :placeholder="'请输入'+data.title+'名称'">
          </form>
        </div>
        <span style="padding-left: 1em" @click="$root.back()">取消</span>
      </div>
    </div>
  </cp-header>

  <div class="view-content">

    <ul class="list-border-bottom list-line touch-list">
      <li v-for="item in searchResult" @click="data.jump(item)">
        {{item[data.key] | highlight keyword}}<i class="arrow c-arrow-right"></i>
      </li>
    </ul>

    <list-state :page-control="pageControl" >
      <div slot="noData">
        <i class="c-icon c-icon-no-data-customer-search"></i>
        <p>未找到相关{{data.title}}</p>
      </div>
      <div slot="defaultState">
        <i class="c-icon c-icon-no-data-customer-search-default"></i>
        <p>搜索{{data.title}}</p>
      </div>
      <div slot="noMore"></div>
    </list-state>

  </div>

</div>
</template>

<script type="text/ecmascript-6">
import api from '@/api'
import rest from '@/rest'
import helper from '@/helper'
import {toast} from '@/util'
import cpHeader from '@/components/cpHeader'
import listState from '@/components/listState.vue'
import PageControl from '@/components/control/pageControl'

export default {
  name: 'search',
  //==数据配置===
  data() {
    return {
      data: {},
      keyword: '',
      from: '',
      parkId: helper.get('parkId'),
      pageControl: {},
    }
  },
  computed: {
    searchResult() {
      return this.pageControl.dataList || [];
    },

  },
  //==路由配置===
  route: {
    data(transition) {
      if (!transition.from.name) {
        this.$root.back();
        return;
      }

      this.data = this.$root.getRouteData();

      // this.data = {
      //   pageControl: {
      //     // pageControl settings
      //   },
      //   jump: function(){
      //     // jump to ...
      //   },
      //   key: 'name',
      //   title: '客户'
      // }

      if(this.pageControl.initialized){
        this.clear();
      }
      this.data.pageControl.getParams = () => {
        return {searchValue: this.keyword}
      }
      this.pageControl = new PageControl(this.data.pageControl);

      this.$root.pageJumper.on('afterEnter',() => {
        this.focus();
      })

    },
    deactivate() {

    }
  },

  //==状态管理配置===
  vuex: {

  },
  components: {
    cpHeader,
    listState
  },
  created() {

  },
  ready() {

  },
  methods: {
    search() {
      if (this.keyword === '') {
        this.pageControl.reset();
        return;
      }
      this.pageControl.refresh();
    },
    focus() {
      if(!this.$root.isIos){
        this.$els.search.focus();
      }
    },
    clear() {
      this.keyword = '';
      this.pageControl.reset();
    }

  }
}
</script>
