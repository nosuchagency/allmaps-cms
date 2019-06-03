import Vue from 'vue';

export default [
    {
        path: '/searchables',
        name: 'searchables-index',
        component: require('../../views/searchables'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('searchables.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/searchables/:id',
        component: require('../../views/searchables/show'),
        name: 'searchables-show',
        props: true,
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('searchables.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
