<template>
    <div class="cp-setTimingAndDay">



      <div class="m-setTing">
        <div class="module-hd" v-if=" !hasSwitchBtn ">
          <span class="label">定时设置</span>
          <span class="content">{{ timing }}</span>
        </div>
        <div class="m-setIng-bd">
          <select-time :now-time=" timing " @time-is-change="timeIsChange"></select-time>
        </div>
      </div>

      <div class="m-switchBtn" v-if=" hasSwitchBtn ">
        <div class="item c-border-b">
          <span class="label">定时开关</span>
          <div class="big" :class="['ios-switch', { active: switchBtnOpenStatus['0']  }]" @click=" toggleSwitchBtnStatus( '0' ) ">
            <div class="round"></div>
          </div>
        </div>
        <div class="item c-border-b">
          <span class="label">设备开关</span>
          <div class="big" :class="['ios-switch', { active: switchBtnOpenStatus['1'] }]" @click=" toggleSwitchBtnStatus( '1' ) ">
            <div class="round"></div>
          </div>
        </div>
        <div class="item"></div>
      </div>

      <div class="m-setDay">
        <div class="module-hd c-border-b">
          <span class="label">重复设置</span>
          <span class="content">{{ getDayAggregateStr( nowSelectDay ) }}</span>
        </div>
        <div class="m-setDat-bd">
          <div class="item"  v-bind:class="{ 'active' : nowSelectDay[0] }" @click="selectThisDay( 0 )">一</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[1] }" @click="selectThisDay( 1 )">二</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[2] }" @click="selectThisDay( 2 )">三</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[3] }" @click="selectThisDay( 3 )">四</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[4] }" @click="selectThisDay( 4 )">五</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[5] }" @click="selectThisDay( 5 )">六</div>
          <div class="item" v-bind:class="{ 'active' : nowSelectDay[6] }" @click="selectThisDay( 6 )">日</div>
        </div>
      </div>



    </div>
</template>
<script type="text/ecmascript-6">
import selectTime from '@/components/selectTime'
export default {
    data() {
      return {
        timing : '未设置',  //格式：00:00
        nowSelectDay : { '0' : false , '1' : false , '2' : false , '3' : false , '4' : false , '5' : false , '6' : false },
        switchBtnOpenStatus : {
          '0' : false,
          '1' : false
        }
      }
    },
    props: [  'initDay' , 'initTiming' , 'hasSwitchBtn' , 'initSwitchStatus' ],
    methods: {
      init(){
        this.timing = this.getTimeAgain( this.initTiming );
        this.nowSelectDay = this.getSelectDayObj( this.initDay );
        this.switchBtnOpenStatus = this.initSwitchStatus;
      },
      toggleSwitchBtnStatus( index ){
        this.switchBtnOpenStatus[ index ] = !this.switchBtnOpenStatus[ index ];
        this.emitChange();
      },
      emitChange(){
        let that = this;
        that.$emit( 'select-is-change' , {
          day : { format1 : that.nowSelectDay , format2 : that.getSelectDayStr( that.nowSelectDay) , format3 : that.getDayAggregateStr( that.nowSelectDay) },
          timIng : { format1 : that.timing , format2 : that.getTiming( that.timing) },
          switchBtnOpenStatus : that.switchBtnOpenStatus
        });
      },
      timeIsChange( data ){
        this.timing = data;
        this.emitChange();
      },
      selectThisDay( index ){
        this.nowSelectDay[ index ] = !this.nowSelectDay[ index ];
        this.emitChange();
      },
      getTimeAgain( timing , isShowStr ){
        if( !timing || timing == '未设置' ) return '未设置';
        if( isShowStr && String( this.sencesData.isTimerOpen ) == '0' ) return '未开启定时';
        let hour = ( timing / 3600 ).toFixed(0);
        let minute = timing % 3600 / 60;
        hour = hour < 10 ? '0' + hour : String( hour );
        minute = minute < 10 ? '0' + minute : String( minute );
        return  hour  + ':' + minute;
      },
      getTiming( timeAgain ){
        if( !/:/g.test( timeAgain ) ) return 0;
        let hour = Number( timeAgain.split( ':' )[0] );
        let minute = Number( timeAgain.split( ':' )[1] );
        return hour*3600 + minute*60;
      },
      getSelectDayObj( period ){
        var defaultObj = {  '0' : false, '1' : false, '2' : false, '3' : false, '4' : false, '5' : false, '6' : false };
        if( !period ) return defaultObj;
        for( let x in defaultObj ){
          defaultObj[x] = period & ( 1 << x )
        }
        return defaultObj;
      },
      getSelectDayStr( obj ){
        var period = 0;
        for( let x in this.nowSelectDay ){
          if( this.nowSelectDay[ x ] ) period = period | ( 1 << x );
        }
        return period;
      },
      getDayAggregateStr( obj ){
        if( !obj || (!obj['0'] && !obj['1'] && !obj['2'] && !obj['3'] && !obj['4'] && !obj['5'] && !obj['6']) ) return '未设置';
        if( !obj['0'] && !obj['1'] && !obj['2'] && !obj['3'] && !obj['4'] && obj['5'] && obj['6'] ) return '周末';
        if( obj['0'] && obj['1'] && obj['2'] && obj['3'] && obj['4'] && !obj['5'] && !obj['6'] ) return '工作日';
        if( obj['0'] && obj['1'] && obj['2'] && obj['3'] && obj['4'] && obj['5'] && obj['6'] ) return '每天';
        let str = '';
        if( obj['0'] ) str += '周一、';
        if( obj['1'] ) str += '周二、';
        if( obj['2'] ) str += '周三、';
        if( obj['3'] ) str += '周四、';
        if( obj['4'] ) str += '周五、';
        if( obj['5'] ) str += '周六、';
        if( obj['6'] ) str += '周日、';
        return str.replace( /、$/ , '' );
      },
      toggleSwitch () {
        this.$emit('update:isOpen', !this.isOpen)
      }
    },
    components: {
      selectTime
    },
    watch : {
      initTiming : function(){ this.init() },
      initDay : function(){ this.init() },
      initSwitchStatus : function(){ this.init() }
    }
}
</script>
