import Vue from 'vue';

export default [
    {
        path: '/layouts',
        name: 'layouts-index',
        component: require('../../views/layouts'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('layouts.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
