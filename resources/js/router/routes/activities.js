import Vue from 'vue';

export default [
    {
        path: '/activities',
        name: 'activities-index',
        component: require('../../views/activities'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('activity:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
