<template>
<div>
  <!-- 发现新版本提示框 -->
  <confirm :is-show.sync="isShowUpdateDialog" class="updateContainer">
    <div class="title" slot="title">
      <!-- <div class="icon"><img src="/assets/images/logo.png"></div> -->
      <span>V {{remoteVersion}}</span>
    </div>
    <div slot="content">
      <span v-html="changelog"></span>
    </div>
    <span slot="btn" class="cp-confirm-cancel btn touch-item" v-on:click="cancelUpdate">取消</span>
    <span slot="btn" class="cp-confirm-ok btn touch-item" v-on:click="update">下载更新</span>
  </confirm>

  <!-- 开发环境：显示当前版本 -->
  <span v-if="showVersion" v-show=" false " id="dev-logger" style="padding: 2px 25px; color: white; background: rgba(0, 0, 0, .5); position: fixed; bottom: 70px; right: 15px; z-index: 999">当前版本：{{localVersion}}, 远程版本：{{remoteVersion}}</span>
</div>
</template>
<script type="text/ecmascript-6">
import {toast} from '@/util'

let checking = false
export default {

  //==数据配置===
  data() {
    return {
      showVersion: process.env.NODE_ENV == 'development',
      isShowUpdateDialog: false,
      lastTime: null,
      checking: null,
      remotepkg: {
        url: process.env.INFO, // 远程版本信息json
        pkg: process.env.PKG // 远程包
      },
      localVersion: process.env.VERSION,
      remoteVersion: '',
      changelog: '',
    }
  },
  props: {

  },
  mounted() {
    console.log(this.localVersion);
    this.$root.localVersion = this.localVersion;
    var _this = this;
    //======cordova初始化====
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      _this.$root.isApp = true;
      // 检测App是否有更新
      // Update.downloadAppContent(function(success) {
      //   if (!!Number(success)) {
      //     // success = 1 App需要更新，隐藏H5更新弹窗
      //     _this.isShowUpdateDialog = false;
      //   } else { // success = 0 App不需要更新
      //     // 获取远程版本信息
      //     _this.checkUpdate();
      //   }
      // }, function(error) {});
      _this.checkUpdate();
    }
  },
  methods: {
    checkUpdate() {
      if(checking) return
      checking = true

      this.checking = $.Deferred()
      this.lastTime = moment()

      var _this = this;
      return $.get(_this.remotepkg.url + '?v=' + Math.random()).done(function(res) {
        // 远程版本
        _this.remoteVersion = res.version;
        _this.$root.remoteVersion = res.version;
        // 远程版本更新信息
        _this.changelog = res.changelog;
        // 本地和远程版本不一致
        if (_this.localVersion != _this.remoteVersion) {
          // 显示H5更新弹窗
          _this.isShowUpdateDialog = true;
        } else {
          // 隐藏H5更新弹窗
          _this.isShowUpdateDialog = false;
        }
      }).fail(xhr=>{
        // toast('网络连接失败')
      }).always(() => {
        checking = false
        this.checking.resolve()
      })
    },
    dailyCheck() {
      // 超过一天
      if(!this.lastTime || this.lastTime.diff(moment(), 'days') < 0) {
        this.checkUpdate()
      }
      return this.checking
    },
    update() {
      var _this = this;
      _this.isShowUpdateDialog = false;
      // 更新H5
      Update.downloadWebContent(this.remotepkg.pkg, function(success) {
        toast('更新成功', function() {
          location.reload();
        });
      }, function(error) {
        toast('更新失败');
      });
    },
    showUpdate(){
      this.isShowUpdateDialog = true;
    },
    cancelUpdate() {
      this.isShowUpdateDialog = false;
    }
  },

}
</script>

<style lang="scss" scoped>
.title{
  padding-top: 1.5rem;
  color: black;
}

</style>
