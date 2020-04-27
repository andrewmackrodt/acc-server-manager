import {RouteConfig} from 'vue-router'

import Alert from './components/alert.vue'
import Home from './pages/home.vue'

const routes: RouteConfig[] = [
    {
        name: 'home',
        path: '/(home)?',
        component: Home,
        meta: {
            requiresAuth: true,
            showInNav: false,
            title: 'Dashboard',
        },
    },
    {
        name: '404',
        path: '*',
        component: Alert,
        props: { message: 'Not Found', level: 'danger' },
    },
]

export default routes
