<!-- 多级联动选择--可以是1级、2级或3级
    使用：<multi-select :is-show.sync="isShow" :one="provinceList" :one-index.sync="provinceIndex" :two="cityList" :two-index.sync="cityIndex" :three="areaList" :three-index.sync="areaIndex" :sure="selectDone"></multi-select>
 -->
<template>
<div class="cp-multiselect" v-show="isShow" transition="down" @click.self="cancelDone">
  <div class="content">
    <div class="btn c-flex-row">
      <div class="item c-text-left" @click="cancelDone">取消</div>
      <div class="item c-text-right" @click="selectDone">确定</div>
    </div>
    <div class="list-wrap">
      <div class="list" v-el:one v-show="one.length" @touchmove.prevent="touchmove($event)" @touchstart="touchstart($event, 0)" @touchend="touchend">
        <ul class="level" :style="{transform:'translate3d(0, '+transY[0]+'px, 0)', 'transition-duration': duration+'ms'}">
          <li v-el:itemx class="item">&nbsp;</li>
          <li class="item">&nbsp;</li>
          <li class="item" v-for="item in one" track-by="$index" :class="{'cur': $index==oneIndex}">{{item.name}}</li>
          <li class="item">&nbsp;</li>
          <li class="item">&nbsp;</li>
        </ul>
      </div>
      <div class="list" v-el:two v-show="two.length" @touchmove.prevent="touchmove($event)" @touchstart="touchstart($event, 1)" @touchend="touchend">
        <ul class="level" :style="{transform:'translate3d(0, '+transY[1]+'px, 0)', 'transition-duration': duration+'ms'}">
          <li class="item">&nbsp;</li>
          <li class="item">&nbsp;</li>
          <li class="item" v-for="item in two" track-by="$index" :class="{'cur': $index==twoIndex}">{{item.name}}</li>
          <li class="item">&nbsp;</li>
          <li class="item">&nbsp;</li>
        </ul>
      </div>
      <div class="list" v-el:three v-show="three.length" @touchmove.prevent="touchmove($event)" @touchstart="touchstart($event, 2)" @touchend="touchend">
        <ul class="level" :style="{transform:'translate3d(0, '+transY[2]+'px, 0)', 'transition-duration': duration+'ms'}">
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
export default {
  data() {
    return {
      last: {
        oneIndex: 0,
        twoIndex: 0,
        threeIndex: 0
      },
      itemHeight: 0,
      state: 0, //状态： 0静止 1拖动 2滚动
      listIndex: 0,
      startY: 0,
      startTime: 0,
      lastTransY: [0, 0, 0],
      transY: [0, 0, 0], //三个列表的偏移量
      duration: 0
    }
  },
  computed: {
    maxDis() {
      var one = Math.max((this.one.length - 1) * this.itemHeight, 0);
      var two = Math.max((this.two.length - 1) * this.itemHeight, 0);
      var three = Math.max((this.three.length - 1) * this.itemHeight, 0);
      return [one, two, three];
    }
  },
  props: {
    isShow: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    isDynamic: { //列表是否动态变化
      default: true,
      type: Boolean
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
      default: function() {

      },
      type: Function
    },
    sure: {
      default: function() {

      },
      type: Function
    }
  },
  watch: {
    'one' (val) {
      if (val.length > 0 && this.isDynamic) {
        this.oneIndex = 0;
        this.transY.$set(0, 0);
      }
    },
    'two' (val) {
      if (val.length > 0 && this.isDynamic) {
        this.twoIndex = 0;
        this.transY.$set(1, 0);
      }
    },
    'three' (val) {
      if (val.length > 0 && this.isDynamic) {
        this.threeIndex = 0;
        this.transY.$set(2, 0);
      }
    },
    'oneIndex' () {
      if (this.itemHeight) {
        this.transY.$set(0, -this.oneIndex * this.itemHeight);
      }
    },
    'twoIndex' () {
      if (this.itemHeight) {
        this.transY.$set(1, -this.twoIndex * this.itemHeight);
      }
    },
    'threeIndex' () {
      if (this.itemHeight) {
        this.transY.$set(2, -this.threeIndex * this.itemHeight);
      }
    },
    'isShow' (val) {
      if (val) { //打开的时候，先保存上一次选择的项
        this.last.oneIndex = this.oneIndex;
        this.last.twoIndex = this.twoIndex;
        this.last.threeIndex = this.threeIndex;
        this.duration = 0;
        this.$nextTick(function() {
          if (!this.itemHeight) {
            this.itemHeight = this.$els.itemx.offsetHeight;
          }
          this.transY.$set(0, -this.oneIndex * this.itemHeight);
          this.transY.$set(1, -this.twoIndex * this.itemHeight);
          this.transY.$set(2, -this.threeIndex * this.itemHeight);
        });
      }
    }
  },
  methods: {
    cancelDone() {
      //点击取消，恢复上一次的数据
      this.oneIndex = this.last.oneIndex;
      this.twoIndex = this.last.twoIndex;
      this.threeIndex = this.last.threeIndex;
      this.isShow = false;
      this.cancel();
    },
    selectDone() {
      this.isShow = false;
      this.sure();
    },
    touchstart(event, index) {
      if (this.state == 2) return;
      this.startTime = new Date();
      //设置为拖动状态
      this.state = 1;
      this.duration = 0;
      this.listIndex = index;
      this.startY = event.touches[0].pageY;
      this.lastTransY.$set(this.listIndex, this.transY[this.listIndex]);
    },
    touchmove(event) {
      if (this.state != 1) return;
      this.transY.$set(this.listIndex, this.lastTransY[this.listIndex] + event.touches[0].pageY - this.startY);
    },
    touchend() {
      if (this.state != 1) return;
      var time = new Date() - this.startTime;
      this.state = 2;
      var m = this.momentum(this.transY[this.listIndex], this.lastTransY[this.listIndex], time, this.maxDis[this.listIndex]);
      this.transY.$set(this.listIndex, m.destination);
      this.duration = m.duration;
      var index = Math.round(Math.abs(m.destination / this.itemHeight)),
        that = this;
      setTimeout(function() {
        if (that.listIndex == 0) {
          that.oneIndex = index;
        } else if (that.listIndex == 1) {
          that.twoIndex = index;
        } else if (that.listIndex == 2) {
          that.threeIndex = index;
        }
        that.state = 0;
      }, m.duration);
    },
    //缓动计算
    /**
     * 根据我们的拖动返回运动的长度与耗时，用于惯性拖动判断
     * @param end 当前鼠标位置
     * @param start touchStart时候记录的Y（可能是X）的开始位置，但是在touchmove时候可能被重写
     * @param time touchstart到手指离开时候经历的时间，同样可能被touchmove重写
     * @param lowerMargin y可移动的最大距离
     * @param deceleration 匀减速
     * @returns {{destination: number, duration: number}}
     */
    momentum(end, start, time, lowerMargin, deceleration) {
      var distance = end - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;
      //减速变量
      deceleration = deceleration === undefined ? 0.0006 : deceleration;
      //减速路程
      destination = end + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
      //持续时间
      duration = speed / deceleration;
      //偏移量为负值，最大滑动距离为正值
      if (destination < -lowerMargin) {
        destination = -lowerMargin;
        distance = Math.abs(destination - end);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = 0;
        distance = Math.abs(end) + destination;
        duration = distance / speed;
      }
      //snap到附近的项
      var plus = Math.abs(destination % this.itemHeight) > this.itemHeight / 2 ? -1 : 0;
      destination = (Math.ceil(destination / this.itemHeight) + plus) * this.itemHeight;

      return {
        destination: destination,
        duration: duration
      };
    },
    resize() {
      var that = this;
      setTimeout(function() {
        if (that.$els.itemx.offsetHeight) {
          that.itemHeight = that.$els.itemx.offsetHeight;
        }
      }, 200);
    },
  }
}
</script>
