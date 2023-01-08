// import { h, resolveComponent } from 'vue';
const defaultRoute = [
    {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '测试跳转',
            icon: 'QqOutlined'
        },
        children: [
            {
                path: '/home/personal',
                component: () => import('../views/personal-info/index.vue'),
                meta: {
                    title: '测试跳转',
                    icon: 'QqOutlined'
                }
            }
        ]
    }
];
export default defaultRoute;
