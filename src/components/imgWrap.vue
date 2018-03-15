<!-- 列表状态提示 -->
<template>
<div class="img-wrap" ref="wrap">
  <img :src="src" alt="" ref="img" v-show="ready">
</div>
</template>
<script type="text/ecmascript-6">
export default {

  //==数据配置===
  data() {
    return {
      ready: false
    }
  },
  props: {
    src: {}
  },
  computed: {

  },
  methods: {
    loadImage(src) {
      return new Promise(resolve => {
        let img = $('<img>').attr('src', src).one('load', e => {
          let {width, height} = e.target
          resolve({width, height})
        })
        if(img.get(0).complete){
          img.trigger('load');
        }
      })
    },
    setImage(wrapSize, imgSize) {
      let wrapRatio = wrapSize.height/wrapSize.width
      let imgRatio = imgSize.height/imgSize.width
      let size = {}
      let offset = {}
      if(wrapRatio < imgRatio) {
        // 超高
        size.width = wrapSize.width
        size.height = size.width * imgRatio
        offset.left = 0
        offset.top = - (size.height - wrapSize.height) / 2
      }
      else {
        // 超宽
        size.height = wrapSize.height
        size.width = size.height / imgRatio
        offset.left = - (size.width - wrapSize.width) / 2
        offset.top = 0
      }
      $(this.$refs.img).css({
        width: size.width,
        height: size.height,
        top: offset.top,
        left: offset.left
      })
      this.ready = true
    }
  },
  mounted() {
    let wrap = $(this.$refs.wrap)
    let wrapSize = {
      width: wrap.width(),
      height: wrap.height()
    }
    this.loadImage(this.src).then(imgSize => {
      this.setImage(wrapSize, imgSize)
    })
  }

}
</script>
<style lang="scss" scoped>

</style>
