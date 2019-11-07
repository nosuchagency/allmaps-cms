import Vue from 'vue';

export default [
    {
        path: '/users',
        name: 'users-index',
        component: require('../../views/users'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('user:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/users/:id',
        component: require('../../views/users/show'),
        name: 'users-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('user:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
