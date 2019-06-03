export default [
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
        name: 'password-forgot',
        component: require('../../views/auth/password-forgot'),
        meta: {
            auth: false
        }
    },
    {
        path: '/password/reset/:token',
        name: 'password-reset',
        component: require('../../views/auth/password-reset'),
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
