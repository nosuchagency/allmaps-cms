module.exports = [
    {
        path: '/users',
        name: 'users-index',
        component: require('../../views/users'),
        meta: {
            auth: true
        }
    },
    {
        path: '/users/:id',
        component: require('../../views/users/show'),
        name: 'users-show',
        props: true,
        meta: {
            auth: true
        }
    }
];