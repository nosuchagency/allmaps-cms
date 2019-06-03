import Vue from 'vue';

export default [
    {
        path: '/containers',
        name: 'containers-index',
        component: require('../../views/containers'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('containers.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/containers/:id',
        component: require('../../views/containers/show'),
        name: 'containers-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('containers.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
