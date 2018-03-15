<template>
    <div class="header">
		    <!-- 为了不让手机顶部信号条高度影响操作，撑高40px -->
		    <!-- <div class="cp-topper"></div> -->
		    <div class="cp-inner">
		        <span class="back" @click="$root.back('')" v-if="showBack">返回</span>
		        <h1>{{$root.dynamicTitle || $route.title}}</h1>
		        <span v-if="showRightBtn || showSearch || showAdd" class="right">
              <i v-if="showSearch" class="c-icon40 c-icon-search-white"></i>
              <a v-if="showAdd" v-link="{ path: '/developer/new' }" class="c-icon40 c-icon-add-white"></a>
            </span>
		    </div>
		</div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        props: {

        },
        computed: {
        	showHeader () {
              return !this.$route.wedgets || this.$route.wedgets.header != false
          },
          showBack () {
              return !this.$route.wedgets || this.$route.wedgets.back != false
          },
          showRightBtn () {
              return this.$route.wedgets && this.$route.wedgets.rightBtn
          },
          showAdd() {
            return this.$route.wedgets && this.$route.wedgets.showAdd
          }
        },
        methods: {

        }
    }
</script>
