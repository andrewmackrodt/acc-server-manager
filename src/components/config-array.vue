<template>
    <div class="list-group">
        <config-form v-for="(item, index) in items" :key="index" :config="item" class="list-group-item" @json="onJsonChange" />
    </div>
</template>

<style type="text/scss" scoped>
    @import "styles/custom-switch";

    .description {
        text-align: justify;
        white-space: pre-line;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { ConfigField } from '../config/ui/ConfigField'
    import { ConfigSection } from '../config/ui/ConfigSection'
    import ConfigForm from '../components/config-form.vue'

    @Component({
        components: {
            ConfigForm,
        },
    })
    export default class ConfigArrayComponent extends Vue {
        @Prop() protected readonly field!: ConfigField
        @Prop() protected readonly items!: ConfigSection[]

        // public beforeCreate() {
        //     // cannot be defined in @Component as recursive component
        //     this.$options.components!.ConfigForm = require('./config-form.vue').default
        // }

        public onJsonChange(json: any) {
            this.$emit('json', json)
        }
    }
</script>
