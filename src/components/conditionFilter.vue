<template>
    <div class="view-fixed-cover not-cover-header show-nav" v-show="filter.show" transition="fade" @click.self="filter.show=false">
        <div class="cp-filter-select">
            <ul class="selected">
                <li v-show="preSelected[$index]!=0" v-for="tab in filter.tab"><p>{{tab}}</p>{{filter.list[$index][preSelected[$index]].text}}</li>
            </ul>
            <div class="bd">
                <div class="side">
                    <ul class="tab">
                      <li :class="{'cur': tabIndex==$index}" @click="tabIndex=$index" v-for="item in filter.tab">{{item}}</li>
                    </ul>
                </div>
                <div class="right">
                    <ul v-for="(listIndex, list) in filter.list" class="tab" v-show="tabIndex==listIndex">
                      <li v-for="item in list" @click="choose(listIndex, $index)"><i class="c-icon60" :class="{'c-icon-radio': $index!=preSelected[listIndex], 'c-icon-radio-checked': $index==preSelected[listIndex]}"></i>{{item.text}}</li>
                    </ul>
                </div>
            </div>
            <div class="bottom c-flex-row">
                  <div class="item c-text-left" @click="resetFitler">重置</div>
                  <div class="item">&nbsp;</div>
                  <div class="item">&nbsp;</div>
                  <div class="item c-text-right" @click="confirm">确定</div>
            </div>
        </div>
        <div class="view-scroll-through" @click="filter.show=false"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
            tabIndex: 0,
               preSelected: []
            }
        },
        props: {
            filter: {
                twoWay: true,
                default () {
                    return {
                        selected: [],
                        show: false,
                        tab: [],
                        list: []
                    }
                }
            },
            sure: {
                type: Function
            },
            cancel: {
                type: Function
            }
        },
        created () {
             this.preSelected = this.filter.selected.concat();
        },
        watch: {
            'filter.show' (val) {
                if (!!val) {
                     this.preSelected = this.filter.selected.concat();
                }
            }
        },
        methods: {
            choose(listIndex, itemIndex) {
                this.preSelected.$set(listIndex, itemIndex);
            },
            resetFitler () {
                this.preSelected = this.preSelected.map(function () {
                    return 0;
                });
                this.confirm();
            },
            confirm () {
                this.filter.selected = this.preSelected.concat();
                this.filter.show = false;
                var that = this;
                var arr = this.filter.selected.map(function(n, i){
                    return that.filter.list[i][n].type;
                })
                this.sure(arr);
            }
        }
    }
</script>
