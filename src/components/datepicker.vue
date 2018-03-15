<template>
    <span class="c-datepicker-wrap" v-link="{path:'/datepicker', query: {picker: pickerName, from: $route.path, selectdatestr: picker, start: start, end: end}}"><input class="c-inp c-inp-datepicker" type="text" disabled="disabled" v-model="picker" ></span>
</template>

<script type="text/ecmascript-6">
// import {getDatePicker} from '@/vuex/getters'

    export default {
        data () {
            return {

            }
        },
        computed: {
            pickerName () {
                //自动生成随机数防止重名
                return this.picker + Math.random().toFixed(10);
            }
        },
        props: {
            picker: {   //当前选择框对应的字段
                default: '',
                type: String,
                twoWay: true
            },
            format: {   //格式化形式
                default: 'YYYY-MM-DD',
                type: String,
                twoWay: true
            },
            start: {   //格式化形式
                default: '',
                type: String
            },
            end: {   //格式化形式
                default: '',
                type: String
            }
        },
        vuex: {
            getters: {
                // getDatePicker: getDatePicker
            }
        },
        watch: {
            'getDatePicker' (datepicker) {
                if (datepicker.picker == this.pickerName) {
                    this.picker = this.formatDate(datepicker.date);
                }
            }
        },
        ready () {

        },
        methods: {
            formatDate (date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                month = month >= 10 ? month : '0' + month;
                day = day >= 10 ? day: '0' + day;

                return this.format.replace('YYYY', year).replace('MM', month).replace('DD', day);
            }
        }
    }
</script>
