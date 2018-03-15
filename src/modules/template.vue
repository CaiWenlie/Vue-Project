<template lang="html">
  <!-- 最外层只能有一个元素 -->
  <div class="view-template">
    <cp-header>template</cp-header>
    <div class="view-content">
      
    </div>
  </div>

</template>

<script>
import api from '@/api.js'
import rest from '@/rest'
import helper from '@/helper'
import {toast} from '@/util'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'template',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapMutations([]),
  },
  components: {

  },
  watch: {

  },
  mounted() {
    // DOM ready
  },
  beforeRouteEnter (to, from, next) {
    // 导航进入该组件时调用
    // 不！能！获取组件实例 `this`
    // 因为组件实例还没被创建

    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件时调用
    // 可以访问组件实例 `this`

    // 不要忘了next
    next();
  }
}
</script>

<style lang="scss" scoped>
  
</style>
