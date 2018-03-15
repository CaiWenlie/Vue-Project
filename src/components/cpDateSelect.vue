<template lang="html">
  <div class="cp-date-select c-border-b">
    <span class="left expand" @click="minus"><svg-icon icon="icon-liebiaoyoujianicon-copy"></svg-icon></span>
    <span class="time">{{time | format('yyyy-MM-dd')}}</span>
    <span class="right expand" @click="plus" :class="{disabled: noPlus}"><svg-icon icon="icon-liebiaoyoujianicon"></svg-icon></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date()
    }
  },
  props: {
    value: {

    },
    onchange: {

    }
  },
  computed: {
    time() {
      return this.value
    },
    date() {
      return new Date(this.time).getDate()
    },
    noPlus() {
      let today = Math.floor(this.today.getTime() / 1000 / 3600 / 24)
      let time = Math.floor(this.time.getTime() / 1000 / 3600 / 24)
      return time >= today
    },
    noMinus() {
      return false
    }
  },
  methods: {
    minus() {
      if(this.noMinus){
        return
      }
      let time =  new Date(this.time.setDate(this.date - 1))
      this.change(time)
    },
    plus() {
      if(this.noPlus){
        return
      }
      let time =  new Date(this.time.setDate(this.date + 1))
      this.change(time)
    },
    change(value) {
      this.$emit('input', value)
      this.onchange && this.onchange(value)
    },
    openTimeRange() {
      let date = this.time
      // let start = date.getFullYear()-10;
      let end = this.today;
      let defaultValue = [date.getFullYear(),date.getMonth()+1,date.getDate()];
      this.$root.Plugins.weui.datePicker({
        id: 'securityMessage',
        // start: start,
        end: end,
        defaultValue: defaultValue,
        onChange: result => {
          // console.log(result);
        },
        onConfirm: result => {
          // console.log(result);
          let value = result.map(item => item.value).join('/');
          let date = new Date(value);
          this.change(date)
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.cp-date-select{
  text-align: center;
  line-height: 45px;
}
.time{
  margin: 0 15px;
}
.iconfont{
  color: #6A6A77;
  top: -1px;
}
.disabled .iconfont{
  color: #BDC1C9;
}
</style>
