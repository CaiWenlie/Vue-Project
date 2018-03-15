<template>



  <div class="cp-selectTime">
    <div class="selected-area"></div>
    <div class="hours-wrap js-hourBox"
      @touchstart="touchstart($event,'hour')"
      @touchmove="touchmove($event,'hour')"
      @touchend="touchend($event,'hour')">
      <div class="itemWrap">
        <div class="item" v-for=" ( item , index ) in hourDataBox ">{{ item }}</div>
      </div>
    </div>
    <div class="minute-wrap js-minuteBox"
      @touchstart="touchstart($event,'minute')"
      @touchmove="touchmove($event,'minute')"
      @touchend="touchend($event,'minute')">
      <div class="itemWrap">
        <div class="item" v-for=" ( item , index ) in minuteDataBox ">{{ item }}</div>
      </div>
    </div>
  </div>



</template>
<script type="text/ecmascript-6">
export default {
    data(){
      return {
        hourDataBox : [],
        minuteDataBox : [],
        touchStartY : 0,
        wapPosition : { hour : 0 , minute : 0 },
      }
    },
    props : [ 'nowTime' ],
    mounted(){
      let that = this;
      for( let x=0;x<60;x++){
        var str = x<10 ? '0' + x : x;
        var str2 = x*5<10 ? '0' + x*5 : x*5;
        if( x <= 23 ) this.hourDataBox.push( str );
        if( x*5 < 60 ) this.minuteDataBox.push( str2 );
      }
      setTimeout(function(){
        if( that.nowTime == '未设置' ){
          that.setDomAccordingToTime( '00:00' )
        }else if( that.nowTime ){
          that.setDomAccordingToTime( that.nowTime );
        }
      } , 100 )
    },
    methods : {
      touchstart( e , type ){
        let wrap = $('.js-'+ type +'Box .itemWrap');
        e.preventDefault();
        e.stopPropagation();
        this.touchStartY = e.changedTouches[0].pageY;
      },
      touchmove( e , type ){
        let target = $('.js-'+ type +'Box');  //目标
        let wrap = target.find( '.itemWrap' );  //需要滚动的容器
        let targetOffsetTop = target.offset().top;  //目标在页面的位置
        let touchY = e.changedTouches[0].pageY;  //手指当前位置
        let touchMoveY = touchY - this.touchStartY;  //手指滑动的距离(需要滚动的距离)
        let boundaryTop = wrap.find( '.item' ).height() * 2;  //滚动上边界值
        let boundaryBottom = wrap.height() - wrap.find( '.item' ).height() * 3; //滚动下边界值
        let needMovetoY = touchMoveY + this.wapPosition[ type ];  //需要滚动到的位置
        if( needMovetoY > boundaryTop || needMovetoY < -boundaryBottom ) return;  //判断是否越界
        wrap.css({
          transform : 'translate3d(0px,'+ needMovetoY +'px, 0px)',
        })
      },
      touchend( e , type ){
        let dom = $('.js-'+ type +'Box .itemWrap');
        let item = dom.find( '.item' );
        let itemHeight = item.height();
        let styleY = dom.attr( 'style' ).replace( 'transform: translate3d(0px, ' , '' ).replace( 'px, 0px);' , '' ) * 1;
        //位置修正（保证当前选择的值在居中位置）
        var index = Math.round( ( styleY / itemHeight ).toFixed( 1 ) );
        dom.css({
          transform : 'translate3d(0px,'+ index*itemHeight +'px, 0px)',
        })

        let domIndex = 2 - index;
        item.eq( domIndex ).addClass( 'active' ).siblings( '.item' ).removeClass( 'active' );

        this.touchStartY = 0;
        this.wapPosition[ type ] = index*itemHeight;
        this.setTimeAccordingToDom();
      },
      //根据用户的操作更新父组件所获取到的时间
        setTimeAccordingToDom(){
        let time = false;
        let itemHeight = Number(getComputedStyle($('.cp-selectTime .item')[0])['line-height'].replace( 'px' ,'' )).toFixed(0);
        let hour = false;
        let minute = false;
        let hourIndex = false;
        let minuteIndex = false;

        if(  this.wapPosition.hour >= 0 ){
          hourIndex = Math.abs(  this.wapPosition.hour / itemHeight - 2 )
        }else{
          hourIndex = Math.abs(  this.wapPosition.hour / itemHeight  ) + 2
        };
        hour = this.hourDataBox[ hourIndex ];

        if(  this.wapPosition.minute >= 0 ){
          minuteIndex = Math.abs(  this.wapPosition.minute / itemHeight - 2 )
        }else{
          minuteIndex = Math.abs(  this.wapPosition.minute / itemHeight  ) + 2
        };
        minute = this.minuteDataBox[ minuteIndex ];

        time = hour + ':' + minute;

        this.$emit( 'time-is-change' , time );

      },
      //根据时间设置dom（让组件界面展示和某个时间同步）
      setDomAccordingToTime( time ){
        let _time = time == '未设置' ? '00:00' : time;
        let hour = _time.split( ':' )[0];
        let minute = _time.split( ':' )[1];
        let hourStyleY = false;
        let minuteStyleY = false;
        //因为界面隐藏时，获取不到item高度，所以此处只能拿行高
        let itemHeight = Number(getComputedStyle($('.cp-selectTime .item')[0])['line-height'].replace( 'px' ,'' )).toFixed(0);
        for( let x=0; x<this.hourDataBox.length; x++){
          if( String( this.hourDataBox[x] ) == hour ){
            hourStyleY = x <= 2 ?  Math.abs(x-2)*itemHeight : ( x - 2 ) * -itemHeight;
            break;
          }
        };
        for( let v=0; v<this.minuteDataBox.length; v++){
          if( String( this.minuteDataBox[v] ) == minute ){
            minuteStyleY = v <= 2 ?  Math.abs(v-2)*itemHeight : ( v - 2 ) * -itemHeight;
            break;
          }
        };

        if( !hourStyleY || !minuteStyleY ) return false;

        this.wapPosition.hour = hourStyleY;

        this.wapPosition.minute = minuteStyleY;

        $('.cp-selectTime .js-hourBox .itemWrap').css({
          transform : 'translate3d(0px,'+ hourStyleY +'px, 0px)',
        })

        $('.cp-selectTime .js-minuteBox .itemWrap').css({
          transform : 'translate3d(0px,'+ minuteStyleY +'px, 0px)',
        })


      }
    },
    watch : {
      nowTime : function(){
        this.setDomAccordingToTime( this.nowTime );
      }
    }
}
</script>
