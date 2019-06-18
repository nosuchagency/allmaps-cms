import Vue from 'vue';

export default [
    {
        path: '/skins',
        name: 'skins-index',
        component: require('../../views/skins'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('skins.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
