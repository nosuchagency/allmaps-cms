import Vue from 'vue';

export default [
    {
        path: '/tags',
        name: 'tags-index',
        component: require('../../views/tags'),
        props: true,
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('tag:read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
