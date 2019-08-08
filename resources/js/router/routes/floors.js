import Vue from 'vue';

export default [
    {
        path: '/places/:placeId/buildings/:buildingId/floors/:id/structures',
        name: 'floors-structures',
        component: require('../../views/floors/floor-structures/show'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('floors.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    },
    {
        path: '/places/:placeId/buildings/:buildingId/floors/:id/locations',
        name: 'floors-locations',
        component: require('../../views/floors/floor-locations/show'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('floors.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
