<!-- 多级联动选择--可以是1级、2级或3级
    使用：<multi-select :is-show.sync="isShow" :one="provinceList" :one-index.sync="provinceIndex" :two="cityList" :two-index.sync="cityIndex" :three="areaList" :three-index.sync="areaIndex" :sure="selectDone"></multi-select>
 -->
<template>
    <div class="cp-multiselect" v-show="isShow" transition="down" @click.self="cancelDone" @touchmove.prevent>
        <div class="content">
                <div class="btn c-flex-row">
                    <div class="item c-text-left" @click="cancelDone">取消</div>
                    <div class="item c-text-right" @click="selectDone">确定</div>
                </div>
                <div class="list-wrap">
                    <div class="list" v-el:one v-show="one.length">
                        <ul class="level">
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                            <li class="item" v-for="item in one" track-by="$index" :class="{'cur': $index==oneIndex}">{{item.name}}</li>
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                        </ul>
                    </div>
                    <div class="list" v-el:two v-show="two.length">
                        <ul class="level">
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                            <li class="item" v-for="item in two" track-by="$index" :class="{'cur': $index==twoIndex}">{{item.name}}</li>
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                        </ul>
                    </div>
                    <div class="list" v-el:three v-show="three.length">
                        <ul class="level">
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                            <li class="item" v-for="item in three" track-by="$index" :class="{'cur': $index==threeIndex}">{{item.name}}</li>
                            <li class="item">&nbsp;</li>
                            <li class="item">&nbsp;</li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
var staticData = {
    scrollOne: {},
    scrollTwo: {},
    scrollThree: {}
};
    export default {
        data () {
            return {
                opt: {
                    mouseWheel: false,
                    bounce: false,
                    preventDefault: true,
                    snap: '.item'
                },
                last: {
                    oneIndex: 0,
                    twoIndex: 0,
                    threeIndex: 0
                }
            }
        },
        props: {
            isShow: {
                default: false,
                type: Boolean,
                twoWay: true
            },
            one: {
                default () {
                    return []
                },
                type: Array
            },
            oneIndex: {
                default: 0,
                twoWay: true
            },
            two: {
                default () {
                    return []
                },
                type: Array
            },
            twoIndex: {
                default: 0,
                twoWay: true
            },
            three: {
                default () {
                    return []
                },
                type: Array
            },
            threeIndex: {
                default: 0,
                twoWay: true
            },
            cancel: {
                default: function () {

                },
                type: Function
            },
            sure: {
                default: function () {

                },
                type: Function
            }
        },
        watch: {
            'one' (val) {
                 if (val.length > 0) {
                    this.oneIndex = 0;
                    this.$nextTick(function(){
                        this.createScrollOne();
                    });
                 }
            },
            'two' (val) {
                if (val.length > 0) {
                    this.twoIndex = 0;
                    this.$nextTick(function(){
                        this.createScrollTwo();
                    });
                }
            },
            'three' (val) {
                if (val.length > 0) {
                    this.threeIndex = 0;
                    this.$nextTick(function(){
                        this.createScrollThree();
                    });
                }
            },
            'isShow' (val) {
                if (val) {  //打开的时候，先保存上一次选择的项
                    this.last.oneIndex = this.oneIndex;
                    this.last.twoIndex = this.twoIndex;
                    this.last.threeIndex = this.threeIndex;
                    this.one.length > 0 && this.createScrollOne();
                    this.two.length > 0 && this.createScrollTwo();
                    this.three.length > 0 && this.createScrollThree();
                    this.$nextTick(function(){
                        this.one.length > 0 && staticData.scrollOne.goToPage(0, this.oneIndex, 0);
                        this.two.length > 0 && staticData.scrollTwo.goToPage(0, this.twoIndex, 0);
                        this.three.length > 0 && staticData.scrollThree.goToPage(0, this.threeIndex, 0);
                    });
                }
            }
        },
        methods: {
            cancelDone () {
                //点击取消，恢复上一次的数据
                this.oneIndex = this.last.oneIndex;
                this.twoIndex = this.last.twoIndex;
                this.threeIndex = this.last.threeIndex;
                this.isShow = false;
                this.cancel();
            },
            selectDone () {
                this.isShow = false;
                this.sure();
            },
            createScrollOne () {
                staticData.scrollOne.destroy && staticData.scrollOne.destroy();
                staticData.scrollOne = new IScroll(this.$els.one, this.opt);
                var _this = this;
                staticData.scrollOne.on('scrollEnd', function() {
                    _this.oneIndex = this.currentPage.pageY;
                });
            },
            createScrollTwo () {
                staticData.scrollTwo.destroy && staticData.scrollTwo.destroy();
                staticData.scrollTwo = new IScroll(this.$els.two, this.opt);
                var _this = this;
                staticData.scrollTwo.on('scrollEnd', function() {
                    _this.twoIndex = this.currentPage.pageY;
                });
            },
            createScrollThree () {
                staticData.scrollThree.destroy && staticData.scrollThree.destroy();
                staticData.scrollThree = new IScroll(this.$els.three, this.opt);
                var _this = this;
                staticData.scrollThree.on('scrollEnd', function() {
                    _this.threeIndex = this.currentPage.pageY;
                });
            }
        }
    }
</script>
