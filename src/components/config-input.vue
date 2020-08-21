<template>
    <div class="form-group row mb-4">
        <label class="col-6 col-form-label">
            <p class="font-weight-bold" :title="field.name">{{ title }}</p>
            <p class="description small">{{ field.description }}</p>
        </label>
        <div class="col-1"></div>
        <div class="col-5">
            <select v-if="isSelect" class="form-control" v-model="inputValue">
                <option v-for="option of options" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <div v-else-if="isCheckbox" class="custom-control custom-switch">
                <input type="checkbox" :id="`check-${field.name}`" class="custom-control-input mx-auto" v-model="inputValue" />
                <label class="custom-control-label" :for="`check-${field.name}`"></label>
            </div>
            <textarea v-else-if="field.isArray" class="form-control" rows="23" v-model="inputValue" />
            <input v-else :type="type" :min="field.min" :max="field.max" :step="step" class="form-control" v-model="inputValue" />
        </div>
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
    import { titleCase } from '../helpers/text'

    @Component
    export default class ConfigInputComponent extends Vue {
        @Prop() protected readonly field!: ConfigField

        @Prop({ type: [String, Number, Boolean, Array] })
        protected readonly value!: any

        protected inputValue: any = ''

        public created() {
            this.inputValue = this.field.isArray
                ? JSON.stringify(this.value, null, 2)
                : this.value

            this.$watch('inputValue', this.onChange)
        }

        protected get step(): string {
            if ( ! this.field.decimals) {
                return '1'
            }
            /*
            const decimals = Math.min(this.field.decimals, 15)
            return (1.0 / Math.pow(10, decimals)).toString(10)
             */
            return '0.1'
        }

        protected get title(): string {
            return titleCase(this.field.name)
        }

        protected get isCheckbox(): boolean {
            return this.field.isBoolean || this.field.isNumberBoolean
        }

        protected get isSelect(): boolean {
            return this.field.isEnum
        }

        protected get options(): { text: string, value: string }[] {
            return Object.entries(this.field.enum || {})
                .filter(([k]) => ! k.match(/^\d+$/))
                .map(([text, value]) => {
                    text = titleCase(text.replace(/_/g, ' '))
                        .replace(/Gt(\d+)/g, 'GT$1')

                    return { text, value }
                })
        }

        protected get type(): string {
            if (this.field.isNumber) {
                return 'number'
            }
            return 'text'
        }

        protected onChange(value: any) {
            if ( ! this.field.isRequired && value === '') {
                value = undefined
            } else if (this.field.isNumberBoolean) {
                value = value ? 1 : 0
            } else if (this.field.isNumber) {
                value = Number.parseFloat(value)

                if (Number.isNaN(value)) {
                    console.error(`Not a number: ${this.field.name} = ${value}`)
                    value = undefined
                }
            } else if (this.field.isArray) {
                try {
                    let json = JSON.parse(value)
                    if ( ! Array.isArray(json)) {
                        console.error(`Not an array: ${this.field.name} = ${value}`)
                        json = undefined
                    }
                    value = json
                } catch (e) {
                    console.error(`Invalid json: ${this.field.name}`, e)
                    value = undefined
                }
            }

            this.$emit('change', value)
        }
    }
</script>
