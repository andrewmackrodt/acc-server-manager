import VueRouter from 'vue-router'
import {Store} from 'vuex'

export default function(router: VueRouter, store: Store<any>) {
    router.beforeEach(async (to, from, next) => {
        store.commit('set', { error: null })

        next()
    })
}
