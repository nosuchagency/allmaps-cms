import Vue from 'vue';

export default [
    {
        path: '/beacon-providers',
        name: 'beacon-providers-index',
        component: require('../../views/beacon-providers'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('beacon-providers.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
