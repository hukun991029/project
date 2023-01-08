import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import defaultRoute from './defaultRoute';
// const RouteView = {
//     name: 'RouteView',
//     render: (h) => h('router-view')
// };

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
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
// router.beforeEach((to,from,next)=>{
// // console.log(to,from,next);

// })
export default router;
