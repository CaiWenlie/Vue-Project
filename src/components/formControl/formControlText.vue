<template lang="html">
  <input ref="input" name="input" class="form-control-input" :value="value"
    @input="updateValue($event.target.value)"
    v-on:blur="blur"
    type="text"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
  >
</template>

<script>
import helper from '@/helper'
import {toast} from '@/util'

export default {
  data(){
    return {

    }
  },
  props:{
    title: {

    },
    type: {

    },
    notice: {

    },
    value: {

    },
    text: {

    },
    textKey: {

    },
    required: {

    },
    placeholder: {

    },
    validate: {

    },
    readonly: {

    },
    disabled: {

    }

  },
  computed:{

  },
  mounted () {

  },
  methods: {
    edit() {
      this.$refs.input && this.$refs.input.focus();
    },
    updateValue(value) {
      this.$emit('input', value)
    },
    blur() {
      this.$emit('blur')
    }
  },
  watch: {

  }
}
</script>
