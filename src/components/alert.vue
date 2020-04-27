<template>
    <p :class="['alert', `alert-${level}`]" role="alert" :style="{ display: alertDisplayStyle }">{{ message }}</p>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class AlertComponent extends Vue {
        @Prop() protected readonly level!: string
        @Prop() protected readonly message!: string

        public get alertDisplayStyle(): string {
            return this.message ? 'block' : 'none'
        }
    }
</script>
