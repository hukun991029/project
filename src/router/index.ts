import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import defaultRoute from './defaultRoute'
import nprogress from 'nprogress'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    ...defaultRoute
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const whiteRoute = ['/login']
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    nprogress.start()
    if (token) {
        if (to.path !== '/login') {
            next()
        } else {
            next({ path: '/system-management' })
        }
    } else {
        if (whiteRoute.includes(to.path)) {
            next()
        }
    }
    nprogress.done()
})
export default router
