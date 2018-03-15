<template>
    <label :class="classObject" @click.stop="function(){}">
        <span class="vue-switcher__label" v-if="shouldShowLabel">
            <span v-if="label" v-text="label"></span>
            <span v-if="!label && value" v-text="textEnabled"></span>
            <span v-if="!label && !value" v-text="textDisabled"></span>
        </span>

        <input type="checkbox" :disabled="disabled" @change="trigger" :checked="value">

        <div></div>
    </label>
</template>

<script>

/*
  example:
    <switches v-model="show"></switches>
    <switches v-model="show" size="large"></switches>
*/

export default {
    name: 'switches',

    props: {
        size: {
            default: 'normal' // normal/large
        },

        typeBold: {
            default: true
        },

        value: {
            default: false
        },

        disabled: {
            default: false
        },

        label: {
            default: ''
        },

        textEnabled: {
            default: ''
        },

        textDisabled: {
            default: ''
        },

        color: {
            default: 'default'
        },

        theme: {
            default: 'default'
        },

        emitOnMount: {
            default: false
        },

        beforeChange: {

        },
        afterChange: {

        }
    },

    mounted () {
        if(this.emitOnMount) {
            this.$emit('input', this.value)
        }
    },

    methods: {
        trigger (e) {
            if(this.beforeChange && this.beforeChange() === false) {
              e.preventDefault();
              return
            }
            this.$emit('input', e.target.checked);
            this.afterChange && this.afterChange(e.target.checked)
        }
    },

    computed: {
        classObject () {

            const { color, value, theme, typeBold, disabled, size } = this;

            return {
                'vue-switcher' : true,
                ['vue-switcher--unchecked'] : !value,
                ['vue-switcher--disabled'] : disabled,
                ['vue-switcher--bold']: typeBold,
                ['vue-switcher--bold--unchecked']: typeBold && !value,
                [`vue-switcher-theme--${theme}`] : color,
                [`vue-switcher-color--${color}`] : color,
                ['vue-switcher--large']: size=='large',
                ['vue-switcher--large--unchecked']: size=='large' && !value,
            };

        },

        shouldShowLabel () {
            return this.label !== '' || this.textEnabled !== '' || this.textDisabled !== '';
        }
    }
}

</script>


<style lang="scss">
  @import "~@/assets/plugin/switch.scss";
</style>
