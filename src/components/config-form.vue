<template>
    <div>
        <div v-for="(input, name) in form" class="mt-4">
            <config-input :field="input.field" :value="input.value" @change="(value) => onChange(input, value)" />
            <hr />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { ConfigField } from '../config/ui/ConfigField'
    import { ConfigSection } from '../config/ui/ConfigSection'
    import ConfigInput from './config-input.vue'

    @Component({
        components: {
            ConfigInput,
        }
    })
    export default class ConfigFormComponent extends Vue {
        @Prop() protected readonly config!: ConfigSection

        protected form: Record<string, { field: ConfigField, value: string }> = {}

        protected onChange(input: any, value: any) {
            input.value = value

            this.$emit('json', this.json)
        }

        public created() {
            for (const field of Object.values(this.config.fields())) {
                const name = field.name as keyof ConfigSection

                this.$set(this.form, field.name, { field, value: this.config[name] })
            }

            this.$emit('json', this.json)
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
