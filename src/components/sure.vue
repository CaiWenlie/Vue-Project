<template>
    <div class="cp-sure" v-if="isShow" transition="down">
        <div class="">
            <!-- 为了不让手机顶部信号条高度影响操作，撑高40px -->
            <div class="cp-topper"></div>
            <div class="cp-inner">
                <span class="cancel" @click="cancel">取消</span><!--v-if-->
                <h1>不通过</h1>
                <span class="sure" @click="sure">确定</span>
            </div>
        </div>
        <slot></slot>
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
        isShow: {
            default: false,
            type: Boolean,
            twoWay: true
        },
        cancel: {
            type: Function
        },
        sure: {
            type: Function
        }
    },
    methods: {

    }
}
</script>




