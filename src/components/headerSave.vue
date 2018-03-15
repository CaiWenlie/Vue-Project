<template>
    <div class="header">
            <!-- 为了不让手机顶部信号条高度影响操作，撑高40px -->
            <div class="cp-topper"></div>
            <div class="cp-inner">
                <!--<span class="cancel" v-on:click="$root.back('')">取消</span>-->
                <span class="cancel" v-on:click="back">取消</span>
                <h1>{{$root.dynamicTitle || $route.title}}</h1>
                <i class="sure" v-on:click="save">保存</i>
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
    props: {
        save: {
            type: Function
        },
        back: {
            type: Function
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>




