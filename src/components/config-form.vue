<template>
    <div>
        <div v-for="(input, name) in form" class="mt-4">
            <config-input :field="input.field" :value="input.value" @change="(value) => { input.value = value }" />
            <hr />
        </div>
        <div class="mt-4">
            <h5>JSON</h5>
            <config-json :config="json" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { ConfigField } from '../config/ui/ConfigField'
    import { ConfigSection } from '../config/ui/ConfigSection'
    import ConfigJson from '../components/config-json.vue'
    import ConfigInput from './config-input.vue'

    @Component({
        components: {
            ConfigInput,
            ConfigJson,
        }
    })
    export default class ConfigFormComponent extends Vue {
        @Prop() protected readonly config!: ConfigSection & Record<string, any>
        @Prop() protected readonly name!: string

        protected form: Record<string, { field: ConfigField, value: string }> = {}

        public created() {
            for (const field of Object.values(this.config.fields())) {
                let value = this.config[field.name]

                if (typeof value === 'undefined') {
                    value = ''
                }

                this.$set(this.form, field.name, { field, value: this.config[field.name] })
            }
        }

        protected get json(): Record<string, any> {
            const result: Record<string, any> = {}

            for (const [name, input] of Object.entries(this.form)) {
                result[name] = input.value
            }

            return result
        }
    }
</script>
