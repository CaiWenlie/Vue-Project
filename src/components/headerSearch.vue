<template>
    <div class="header">
        <!-- 为了不让手机顶部信号条高度影响操作，撑高40px -->
        <div class="cp-topper"></div>
        <div class="cp-inner">
            <div class="search">
                <i class="c-icon40 c-icon-search"></i>
                <input type="text" id="search" :placeholder="placeholder" v-on:input="search" v-model="q"></input>
            </div>
            <span class="s-cancel" @click="$root.back('')">取消</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {

  //==数据配置===
    data() {
      return {

      }
    },
    props: ['placeholder', 'q'],
    computed: {

    },
    methods: {
        search(){
            this.$dispatch('search-q', this.q);
        }
    }
}
</script>




