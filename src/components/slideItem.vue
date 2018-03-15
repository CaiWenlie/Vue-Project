<template>
  <li ref="li"
    @touchstart="touchstart($event)"
    @touchmove="touchmove($event)"
    @touchend="touchend($event)"
    @blur="cancel">
    <slot name="content"></slot>
    <div class="slide-btn-wrap" ref="button">
      <slot name="btn"></slot>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">

/*
  example:
    <slide-item>
      <dl slot="content">
        <dt>上海</dt>
        <dd></dd>
      </dl>
      <div slot="btn" class="slide-btn">删除</div>
    </slide-item>
*/

export default {
  data() {
    return {
      target: null,
      content: null,
      button: null,
      offset: 0,
      startOffset: 0,
      maxOffset: 0,
      startDot: null,
    }
  },
  props: {
    disabled: {

    }
  },
  computed: {
    isDisabled() {
      return this.disabled && this.disabled!=='false'
    }
  },
  methods: {
    touchstart( e ){
      if( this.isDisabled ) return false;

      this.content.removeClass('animation')
      this.startOffset = this.offset

      var touches = event.touches[0];
      this.startDot = {
          lastX : e.changedTouches[0].pageX,
          x : touches.pageX, // 横坐标
          y : touches.pageY  // 纵坐标
      }

    },
    touchmove( e ){
      if( this.isDisabled ) return false;

      var touches = event.touches[0];
      var delta = {
          x : touches.pageX - this.startDot.x,
          y : touches.pageY - this.startDot.y
      }
      // 横向位移大于纵向位移，阻止纵向滚动
      if( Math.abs(delta.x) > Math.abs(delta.y) ){
          event.preventDefault();
          if( delta.x < 0 ){
            this.setOffset(delta.x + this.startOffset)
          }
          if( delta.x > 0 && this.offset < 0) {
            this.setOffset(delta.x + this.startOffset)
          }
      }
    },
    touchend( e ){
      if( this.isDisabled ) return false;

      var diffX = e.changedTouches[0].pageX - this.startDot.lastX;
      if( diffX < this.maxOffset/2 ){
          this.setOffset(this.maxOffset, true)
          $('body').one('touchstart', event => {
            let target = this.$root.getTouchedItem(event.target, 'li')
            if(! target.is(this.target)) {
              this.setOffset(0, true)
            }
          })
      }else{
        this.setOffset(0, true)
      }
    },
    setOffset(offset, animation) {
      if(animation) {
        this.content.addClass('animation')
        this.content.width()
      }
      this.offset = offset
      this.content.css({
        'webkitTransform' : `translate(${offset}px, 0)`,
        'transform' : `translate(${offset}px, 0)`,
      })
      // this.content.css({ left : offset })
    },
    cancel() {
      this.setOffset(0, true)
    }
  },
  mounted() {
    this.target = $(this.$refs.li)
    this.content = this.target.children('dl')
    this.button = $(this.$refs.button)
    this.maxOffset = -this.button.width()
  }

}
</script>
