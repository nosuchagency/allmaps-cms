import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        redirect: {name: 'dashboard'}
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: require('../views/dashboard/dashboard'),
        meta: {
            auth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: require('../views/profile/show'),
        meta: {
            auth: true
        }
    }
];

let context = require.context('./routes', true, /\.js$/);
context.keys().forEach(key => routes = routes.concat(context(key).default));

export default new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
    routes,
    mode: 'history'
});
