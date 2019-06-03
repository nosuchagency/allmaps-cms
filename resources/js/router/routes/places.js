import Vue from 'vue';

export default [
    {
        path: '/places',
        name: 'places-index',
        component: require('../../views/places'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('places.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/places/:id',
        component: require('../../views/places/show'),
        name: 'places-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('places.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
