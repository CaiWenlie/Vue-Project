<template>
    <div class="cp-shortcut" v-show="isShow" transition="fade">
        <ul class="list">
          <li v-show="isShow" transition="down3n" class="item" @click="go({path: '/developer/new'}, '', {reset: true})"><i class="c-icon c-icon-developer"></i><p>新建开发商</p></li>
          <li v-show="isShow" transition="down3n" class="item" @click="go({path: '/contacts/new'}, '', {from: 'add'})"><i class="c-icon c-icon-contacts"></i><p>新建联系人</p></li>
          <li v-show="isShow" transition="down3n" class="item" @click="go({path: '/project/new'}, '', {reset: true})"><i class="c-icon c-icon-project"></i><p>新建项目</p></li>
          <li v-show="isShow" transition="down3n" class="item" @click="go({path: '/landnew'}, '', {reset: true})"><i class="c-icon c-icon-land"></i><p>新建土地</p></li>
        </ul>
		    <div class="bt"><a class="close" @click="isShow=false"><i class="c-icon60 c-icon-add-green" :class="{'rotate-enter' : !isShow}"></i></a></div>
		</div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              
            }
        },
        props: {
          isShow: {
            default: false,
            type: Boolean,
            twoWay: true
          }
        },
        computed: {
        	
        },
        watch: {
          'isShow' (val) {
            if (val) {
              var that = this;
              
            }
          }
        },
        methods: {
          go (route, transName, routeData) {
            this.isShow = false;
            this.$root.go(route, transName, routeData);
          }
        }
    }
</script>
