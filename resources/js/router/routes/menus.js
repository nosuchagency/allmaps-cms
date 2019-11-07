import Vue from 'vue';

export default [
    {
        path: '/menus',
        name: 'menus-index',
        component: require('../../views/menus'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('menu:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/menus/:id',
        component: require('../../views/menus/show'),
        name: 'menus-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('menu:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
