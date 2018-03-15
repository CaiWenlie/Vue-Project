<template>
  <div class="c-tab2">
    <div class="item" :class="{'active':tabIndex==index}" @click="switchTab(index)" v-for="(tab,index) in tabs">{{tab}}</div>
    <!-- <div class="tab-line" :style="'transform:translateX('+offset+');width:'+width"></div> -->
  </div>
</template>

<script type="text/ecmascript-6">

/*
  example:
    <cp-tab :tabs="[1,2]" v-model="tabIndex" :change="callback"></cp-tab>
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
    switchTab(index) {
      // this.tabIndex = index; tabindex changes with value
      this.change && this.change(index);
      this.$emit('input', index);
    }
  },

}
</script>
