import Vue from 'vue';

export default [
    {
        path: '/beacons',
        name: 'beacons-index',
        component: require('../../views/beacons'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('beacons.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/beacons/:id',
        component: require('../../views/beacons/show'),
        name: 'beacons-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('beacons.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
