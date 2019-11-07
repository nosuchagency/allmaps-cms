import Vue from 'vue';

export default [
    {
        path: '/searchables',
        name: 'searchables-index',
        component: require('../../views/searchables'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('searchable:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
