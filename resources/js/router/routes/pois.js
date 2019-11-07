import Vue from 'vue';

export default [
    {
        path: '/pois',
        name: 'pois-index',
        component: require('../../views/pois'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('poi:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
