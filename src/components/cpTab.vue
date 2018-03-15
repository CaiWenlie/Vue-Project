<template>
  <div class="c-tab">
    <div class="item" :class="{'active':tabIndex==index}" @click="switchTab(index)" v-for="(tab,index) in tabs">{{tab.text || tab}}</div>
    <div class="tab-line" v-if="!hide" :style="'transform:translateX('+offset+');width:'+width"></div>
  </div>
</template>

<script type="text/ecmascript-6">

/*
  example:
    <cp-tab :tabs="[1,2]" v-model="tabIndex" :change="callback" track-by="item"></cp-tab>

  注:
    v-model始终等于tabIndex(索引值)
    callback的参数根据trackBy取得
    trackBy(string)可以是 item, index or any keys
    例如: tabs=[{id: 1,text: 'a'}]
      trackBy=item, value={id: 1,text: 'a'}
      trackBy=index, value=0
      trackBy=text, value='a'
*/

export default {
  data() {
    return {

    }
  },
  props: {
    value: {
      default: 0
    },
    tabs: {
      default: [1,2],
      type: Array
    },
    change: {
      type: Function
    },
    trackBy: {
      // item, index or any keys
      default: 'index'
    },
    hide: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    tabIndex() {
      return this.value
    },
    width() {
      return 1 / this.tabs.length * 100 + '%';
    },
    offset() {
      return this.tabIndex * 100 + '%';
    }
  },
  methods: {
    getValue(index) {
      if(this.trackBy == 'item') {
        return this.tabs[index]
      }
      else if(this.trackBy == 'index') {
        return index
      }
      else {
        return this.tabs[index][this.trackBy]
      }
    },
    switchTab(index) {
      // this.tabIndex = index; tabindex changes with value
      this.change && this.change(this.getValue(index));
      this.$emit('input', index);
    }
  },

}
</script>
