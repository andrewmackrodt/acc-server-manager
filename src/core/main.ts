import './reflect-metadata'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '../components/app.vue'
import routes from '../routes'
import { createStore } from './store'

const store = createStore()

import { default as useResetErrorMiddleware } from '../middleware/reset-error-middleware'

new Vue({
    components: { App },
    el: '#app',
    router: (() => {
        const router = new VueRouter({ routes, mode: 'history' })
        useResetErrorMiddleware(router, store)
        return router
    })(),
    store: store,
    template: `<App />`,
})
