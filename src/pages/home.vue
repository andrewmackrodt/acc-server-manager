<template>
    <div class="container">
        <h2 class="mb-4">Configuration Editor</h2>
        <ul class="nav nav-tabs" id="configTab" role="tablist">
            <li class="nav-item" v-for="(config, name) in configs">
                <a data-toggle="tab" role="tab"
                   :class="['nav-link', name === 'configuration' ? 'active' : '']"
                   :id="`${name}-tab`"
                   :href="`#${name}`"
                   :aria-controls="name"
                   :aria-selected="name === 'configuration' ? 'true' : 'false'"
                >{{ toTitleCase(name) }}</a>
            </li>
        </ul>
        <div class="tab-content" id="configTabContent">
            <div v-for="(config, name) in configs"
                 role="tabpanel"
                 :class="['tab-pane', 'fade', ...(name === 'configuration' ? ['show', 'active'] : [])]"
                 :id="name"
                 :aria-labelledby="`${name}-tab`">
                <config-tab :config="config" :name="name" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { titleCase } from '../helpers/text'

    // config files
    import { ConfigSection } from '../config/ui/ConfigSection'
    import { Configuration } from '../config/Configuration'
    import { Settings } from '../config/Settings'
    import { Event } from '../config/Event'
    import { EventRules } from '../config/EventRules'
    import { AssistRules } from '../config/AssistRules'

    // components
    import ConfigTab from '../components/config-tab.vue'

    @Component({
        components: {
            ConfigTab: ConfigTab,
        },
    })
    export default class HomePage extends Vue {
        protected configs: Record<string, ConfigSection> = {}

        public constructor() {
            super()

            this.configs['configuration'] = new Configuration()
            this.configs['settings'] = new Settings()
            this.configs['event'] = new Event()
            this.configs['eventRules'] = new EventRules()
            this.configs['assistRules'] = new AssistRules()
        }

        protected toTitleCase(text: string): string {
            return titleCase(text)
        }
    }
</script>
