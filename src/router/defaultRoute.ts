// import { h, resolveComponent } from 'vue';
const defaultRoute = [
    {
        path: '/system-management',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/system-management/user-management',
        meta: {
            title: '系统管理',
            icon: 'SettingOutlined'
        },
        children: [
            {
                path: '/system-management/user-management',
                component: () => import('../views/system-manage/user-manage/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'UserOutlined'
                }
            },
            {
                path: '/dept-management/user-management',
                component: () => import('../views/system-manage/dept-manage/index.vue'),
                meta: {
                    title: '部门管理',
                    icon: 'DeploymentUnitOutlined'
                }
            }
        ]
    }
];
export default defaultRoute;
