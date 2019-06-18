import Vue from 'vue';

export default [
    {
        path: '/fixtures',
        name: 'fixtures-index',
        component: require('../../views/fixtures'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('fixtures.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
