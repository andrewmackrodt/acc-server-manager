<template>
    <div>
        <config-form :config="config" @json="foo" />
        <div class="mt-4">
            <h5>JSON</h5>
            <config-json :config="json" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { ConfigSection } from '../config/ui/ConfigSection'
    import ConfigForm from './config-form.vue'
    import ConfigJson from '../components/config-json.vue'

    @Component({
        components: {
            ConfigForm,
            ConfigJson,
        }
    })
    export default class ConfigTabComponent extends Vue {
        @Prop() protected readonly config!: ConfigSection
        @Prop() protected readonly name!: string
        protected json: Record<string, any> = {}

        protected foo(json: any) {
            this.json = json
        }
    }
</script>
