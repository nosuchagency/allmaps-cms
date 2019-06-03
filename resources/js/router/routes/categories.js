import Vue from 'vue';

export default [
    {
        path: '/categories',
        name: 'categories-index',
        component: require('../../views/categories'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('categories.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
