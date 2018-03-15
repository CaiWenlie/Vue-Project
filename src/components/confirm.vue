<template>
  <transition name="scale">
    <div v-show="isShow" class="cp-confirm-box js-common-confirm">
        <div class="cp-cover"></div>
        <div class="cp-confirm-flex" >
            <div class="cp-confirm-con">
                <div class="cp-confirm-title">
                    <slot name="title"></slot>
                </div>
                <div class="cp-confirm-body">
                    <slot name="content"></slot>
                </div>
                <div class="cp-confirm-btn">
                    <slot name="btn"></slot>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        props: {
            isShow: {
                default: false,
                type: Boolean,
                twoWay: true
            }
        },
        methods: {

        }
    }
</script>
