<template>
    <div id="app">
        <Nav></Nav>
        <div class="container-fluid">
            <div v-if="error">
                <Alert level="danger" :message="error" />
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Alert from './alert.vue'

    // global styles
    import 'bootstrap/scss/bootstrap.scss'
    import 'styles/style.scss'

    // global scripts
    import 'jquery'
    import 'bootstrap'

    import Nav from './nav.vue'

    @Component({
        components: {
            Alert,
            Nav,
        },
    })
    export default class AppComponent extends Vue {
        public get error(): any {
            return this.$store.state.error
        }
    }
</script>

<style lang="scss">
    #app {
        margin: 1.5rem 0;
    }
</style>
