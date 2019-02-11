module.exports = [
    {
        path: '/login',
        name: 'login',
        component: require('../../views/auth/login'),
        meta: {
            auth: false
        }
    },
    {
        path: '/password/reset',
        name: 'forgot-password',
        component: require('../../views/auth/forgot-password'),
        meta: {
            auth: false
        }
    },
    {
        path: '/password/reset/:token',
        name: 'reset-password',
        component: require('../../views/auth/reset-password'),
        props: true,
        meta: {
            auth: false
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: require('../../views/auth/logout'),
        meta: {
            auth: true
        }
    }
];