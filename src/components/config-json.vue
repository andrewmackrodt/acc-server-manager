<template>
    <pre>{{ config }}</pre>
</template>

<style type="text/scss" scoped>
    .description {
        white-space: pre-line;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { ConfigSection } from '../config/ui/ConfigSection'

    @Component
    export default class ConfigJsonComponent extends Vue {
        @Prop() protected readonly config!: Record<keyof ConfigSection, string>
    }
</script>
