import Vue from 'vue';

export default [
    {
        path: '/tokens',
        name: 'tokens-index',
        component: require('../../views/tokens'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('tokens.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/tokens/:id',
        component: require('../../views/tokens/show'),
        name: 'tokens-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('tokens.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
