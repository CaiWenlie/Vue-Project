<template lang="html">
  <!-- 最外层只能有一个元素 -->
  <div class="view-404 bg-white">
    <cp-header back="true" border="false"></cp-header>
    <div class="view-content">
      <img class="img-404" src="~@/assets/img/404.png" alt="">
      <p class="title">出错啦</p>
      <p class="desc">没有找到相关页面</p>
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
.view-content{
  text-align: center;
}
.img-404{
  width: 81.3%;
  max-width: px2rem(610px);
  margin-top: px2rem(200px);
}
.title{
  color: black;
  font-size: px2rem(34px);
  margin-top: px2rem(60px);
}
.desc{
  color: $light;
  margin-top: px2rem(30px);
}
</style>
