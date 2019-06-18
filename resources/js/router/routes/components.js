import Vue from 'vue';

export default [
    {
        path: '/components',
        name: 'components-index',
        component: require('../../views/components'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('components.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/components/:id',
        component: require('../../views/components/show'),
        name: 'components-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('components.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
