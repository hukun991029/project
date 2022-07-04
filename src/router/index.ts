import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import { h, resolveComponent } from 'vue';
// const RouteView = {
//     name: 'RouteView',
//     render: (h) => h('router-view')
// };

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/home/index.vue'),
        children: [
            {
                path: '/personal',
                name: 'Personal',
                component: {
                    render: () => h(resolveComponent('router-view'))
                },
                meta: {
                    title: '个人信息',
                    icon: 'QqOutlined'
                },
                children: [
                    {
                        path: '/personal/info',
                        name: 'PersonalInfo',
                        component: () => import('../views/personal-info/index.vue'),
                        meta: {
                            title: '测试跳转',
                            icon: 'QqOutlined'
                        }
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
// router.beforeEach((to,from,next)=>{
// // console.log(to,from,next);

// })
export default router;
