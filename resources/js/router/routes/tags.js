import Vue from 'vue';

export default [
    {
        path: '/tags',
        name: 'tags-index',
        component: require('../../views/tags'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('tags.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
