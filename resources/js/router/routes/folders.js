import Vue from 'vue';

export default [
    {
        path: '/containers/:containerId/folders/:id',
        component: require('../../views/folders/show'),
        name: 'folders-show',
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('folders.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
