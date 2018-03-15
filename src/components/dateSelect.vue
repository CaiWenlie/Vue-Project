<!-- 时间年月日选择
    实例： <date-select :is-show.sync="showAreaSelect" :sure="getAreaData"></date-select>
 -->
<template>
    <div>
        <multi-select :is-show.sync="isShow" :is-dynamic="isDynamic" :one="years" :one-index.sync="yearIndex" :two="months" :two-index.sync="monthIndex" :three="days" :three-index.sync="dayIndex" :sure="selectDone"></multi-select>
    </div>
</template>

<script type="text/ecmascript-6">
import multiSelect from './multiSelect.vue'

export default {
    data () {
        return {
            isDynamic: false,
            years: [],
            months: [{name: '1月'}, {name: '2月'}, {name: '3月'}, {name: '4月'}, {name: '5月'}, {name: '6月'}, {name: '7月'}, {name: '8月'}, {name: '9月'}, {name: '10月'}, {name: '11月'}, {name: '12月'}],
            daysTamp: [],
            days: [],
            yearIndex: 0,
            monthIndex: 0,
            dayIndex: 0,
        }
    },
    computed: {
        parentChange () {
            return this.yearIndex + this.monthIndex;
        }
    },
    props: {
        isShow: {
            default: true,
            type: Boolean,
            twoWay: true
        },
        type: {
            default: 0, // 0 为年月日  1为年月
        },
        format: {
            default: 'YYYY-MM-DD',
            type: String
        },
        sure: {
            default: function(){

            },
            type: Function
        }
    },
    created () {
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear(), arr = [];
        for (; nowYear >= 2011; nowYear--) {
            arr.push({type: nowYear, name: nowYear + '年'});
        }
        //初始化年份列表
        this.years = arr;

        let days = [];
        for (let day = 1; day <= 31; day++) {
            days.push({type: day, name: day + '日'});
        }
        this.daysTamp = days;

        //初始化当前日期
        this.yearIndex = 0;
        this.monthIndex = nowDate.getMonth();
        if (this.type == 1) {
            this.days = [];
        } else {
            let dayNum = this.getMonthDays(nowYear, this.monthIndex);
            let copy = this.daysTamp.concat();
            copy.length = dayNum;
            this.days = copy;
            this.dayIndex = nowDate.getDate() - 1;
        }
    },
    watch: {
        'parentChange' () {
            if (this.type == 0) {
                let dayNum = this.getMonthDays(this.years[this.yearIndex].type, this.monthIndex);
                let copy = this.daysTamp.concat();
                copy.length = dayNum;
                this.days = copy;
                this.dayIndex = this.dayIndex > dayNum - 1 ? dayNum - 1 : this.dayIndex;
            } 
        }
    },
    components: {
        multiSelect
    },
    methods: {
        //根据年月返回天数
        getMonthDays (year, month) {
            let monthStartDate = new Date(year, month, 1);    
            let monthEndDate = new Date(year, month + 1, 1);    
            let days = (monthEndDate   -   monthStartDate)/(1000 * 60 * 60 * 24);    
            return   days;    
        },
        formatDate (year, month, day) {
            month = month >= 10 ? month : '0' + month;
            day = day >= 10 ? day: '0' + day;

            return this.format.replace('YYYY', year).replace('MM', month).replace('DD', day); 
        },
    	selectDone () {
            var year = this.years[this.yearIndex].type,
                month = this.monthIndex + 1,
                day = this.dayIndex + 1;

            var format =  this.formatDate(year, month, day);

            var str = this.years[this.yearIndex].name + (this.monthIndex + 1) + '月' + (this.dayIndex + 1) + '日';
            if (this.type == 1) {
                str = this.years[this.yearIndex].name + (this.monthIndex + 1) + '月';
            }
            this.sure({
                year: year,
                month: month,
                day: day,
                format: format,
                str: str
            });
        }
    }
}
</script>
