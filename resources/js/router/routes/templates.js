import Vue from 'vue';

export default [
    {
        path: '/templates',
        name: 'templates-index',
        component: require('../../views/templates'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('templates.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
