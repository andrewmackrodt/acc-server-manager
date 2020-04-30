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
                } else if (value === 'null' || typeof value === 'boolean') {
                    value = value.toString()
                } else if (typeof value === 'number') {
                    value = value.toString(10)
                } else if (typeof value === 'object') {
                    value = JSON.stringify(value, null, 2)
                }
                this.$set(this.form, field.name, { field, value })
            }
        }

        protected get json(): Record<string, any> {
            const result: Record<string, any> = {}

            for (const [name, input] of Object.entries(this.form)) {
                const field = input.field
                let value: any = input.value

                if (value === '' && ! field.isRequired) {
                    continue
                }

                if (field.isBoolean) {
                    if (value.match(/^(?:true|false)$/)) {
                        value = value === 'true'
                    }
                } else if (field.isNumber) {
                    if (value.match(/^-?\d+(?:\.\d+)?$/)) {
                        value = Number.parseFloat(value)
                    }
                } else if (field.isArray) {
                    try {
                        value = JSON.parse(value)
                    } catch (err) {
                        continue
                    }
                }

                result[name] = value
            }

            return result
        }
    }
</script>
