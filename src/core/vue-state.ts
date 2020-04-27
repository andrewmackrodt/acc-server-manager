import Vue, { ComponentOptions } from 'vue'
import { persistenceStore } from './store'

interface StateComponentOptions extends ComponentOptions<Vue> {
    stateKey? : string
}

export default class VueState extends Vue {
    protected readonly stateKey: string

    public constructor(options?: StateComponentOptions) {
        super(options)

        this.stateKey = options?.stateKey || this.constructor.name

        if ( ! persistenceStore.state.hasOwnProperty(this.stateKey)) {
            persistenceStore.commit('merge', {
                [this.stateKey]: {},
            })
        }
    }

    protected getStates(props: { [key: string]: any }): { [key: string]: any } {
        for (const [k, v] of Object.entries(props)) {
            props[k] = this.getState(k, v)
        }

        return props
    }

    protected watchState(property: string, cb?: (value: any) => void) {
        const state = persistenceStore.state[this.stateKey]

        if (state.hasOwnProperty(property)) {
            (this as any)[property] = state[property]

            if (cb) {
                cb(state[property])
            }
        }

        this.$watch(property, (value: any) => {
            this.setState(property, value)

            if (cb) {
                cb(value)
            }
        })
    }

    protected getState<T>(property?: string, value?: T): T {
        const state = persistenceStore.state[this.stateKey]

        if (typeof property !== 'undefined') {
            return state.hasOwnProperty(property)
                ? state[property]
                : value
        }

        return state
    }

    protected setState(property: string, value: any) {
        persistenceStore.commit('merge', {
            [this.stateKey]: {
                [property]: value,
            },
        })
    }
}
