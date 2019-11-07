import Vue from 'vue';

export default [
    {
        path: '/roles',
        name: 'roles-index',
        component: require('../../views/roles'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('role:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/roles/:id',
        component: require('../../views/roles/show'),
        name: 'roles-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('role:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
