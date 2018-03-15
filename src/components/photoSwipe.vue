<template>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="gallery">
  <div class="pswp__bg"></div>
  <div class="pswp__scroll-wrap">
    <div class="pswp__container">
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
    </div>
    <div class="pswp__ui pswp__ui--hidden">
      <div class="pswp__top-bar">
        <div class="pswp__counter"></div>
        <button class="pswp__button pswp__button--close" title="Close (Esc)" @click="gallery.close()"><svg-icon icon="icon-back1"></svg-icon></button>
        <button class="pswp__button pswp__button--share" title="Share"></button>
        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
        <div class="pswp__preloader">
          <div class="pswp__preloader__icn">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
        <div class="pswp__share-tooltip"></div>
      </div>
      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
      </button>
      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
      </button>
      <div class="pswp__caption">
        <div class="pswp__caption__center"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
function requirePhotoSwipe(callback = function(){}) {
  require([
    '@/assets/plugin/photoswipe/photoswipe.min.js',
    '@/assets/plugin/photoswipe/photoswipe-ui-default.min.js',
    '@/assets/plugin/photoswipe/photoswipe.css',
    '@/assets/plugin/photoswipe/default-skin/default-skin.css'
  ], callback);
}

export default {
  data() {
    return {
      gallery: {}
    }
  },
  methods: {
    open(index, items) {
      var pswpElement = this.$refs.gallery;

      // define options (if needed)
      var options = {
        // optionName: 'option value'
        // for example:
        index: index, // start at first slide
        tapToClose: true,
        closeEl: true,
        captionEl: false,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: true,
        arrowEl: false,
        preloaderEl: true,
      };

      requirePhotoSwipe(( {PhotoSwipe}, {PhotoSwipeUI_Default} ) => {
        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        this.gallery = gallery
      })

    }
  }

}
</script>

<style lang="scss">
.pswp{
  display: none;
  .pswp__counter{
    right: 0;
    text-align: center;
    height: px2rem(100px);
    line-height: px2rem(100px);
    font-size: px2rem(34px);
    opacity: 1;
  }
  .pswp__button--close{
    color: white;
    background: none !important;
    position: absolute;
    top: 0;
    left: 0;
    height: px2rem(100px);
    opacity: 1;
    width: auto;
    padding-left: px2rem($baseGap);
  }
}
.app{
  .pswp__top-bar{
    top: px2rem($phoneTop);
  }
}
.android {
  .pswp__top-bar{
    top: 0;
  }
}

</style>
