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
                path: '/system-management/dept-management',
                component: () => import('../views/system-manage/dept-manage/index.vue'),
                meta: {
                    title: '部门管理',
                    icon: 'DeploymentUnitOutlined'
                }
            },
            {
                path: '/system-management/role-management',
                component: () => import('../views/system-manage/role-manage/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'TeamOutlined'
                }
            },
            {
                path: '/system-management/menu-management',
                component: () => import('../views/system-manage/menu-manage/index.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'TeamOutlined'
                }
            },
            {
                path: '/system-management/test-management',
                component: () => import('../views/system-manage/test-manage/index.vue'),
                meta: {
                    title: '测试管理',
                    icon: 'TeamOutlined'
                }
            }
        ]
    }
]
export default defaultRoute
