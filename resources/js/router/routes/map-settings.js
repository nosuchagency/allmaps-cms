import Vue from 'vue';

export default [
    {
        path: '/map-settings',
        name: 'map-settings',
        component: require('../../views/map-settings'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('map-setting:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
