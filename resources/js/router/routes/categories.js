import Vue from 'vue';

export default [
    {
        path: '/categories',
        name: 'categories-index',
        component: require('../../views/categories'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('category:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
