<template>
<section class="header">
  <!-- 为了不让手机顶部信号条高度影响操作，撑高40px -->
  <div class="cp-topper"></div>
  <div class="cp-inner" :class="{'bottom-line': border=='true'}">
    <slot name="inner">
      <span class="back">
        <slot name="left">
          <!-- <span class="expand" @click="backAction" v-if="back=='true'">
            <svg-icon icon="icon-dibufanhuiicon1"></svg-icon>
          </span> -->
          <span class="expand" @click="backAction" v-if="back=='true'">
            <svg-icon icon="icon-back1"></svg-icon>
          </span>
        </slot>
      </span>
      <slot name="center">
        <h1><slot></slot></h1>
      </slot>
      <span class="right">
        <slot name="right"></slot>
      </span>
    </slot>
  </div>
</section>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    back: {
      default: 'false',
      type: String
    },
    backMethod: {
      type: Function
    },
    border: {
      default: 'true',
      type: String
    }

  },
  computed: {

  },
  methods: {
    backAction() {
      if(this.backMethod) {
        this.backMethod()
      }
      else {
        this.$root.back()
      }
    }
  }
}
</script>
