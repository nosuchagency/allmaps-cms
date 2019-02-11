module.exports = [
    {
        path: '/roles',
        name: 'roles-index',
        component: require('../../views/roles'),
        meta: {
            auth: true
        }
    },
    {
        path: '/roles/:id',
        component: require('../../views/roles/show'),
        name: 'roles-show',
        props: true,
        meta: {
            auth: true
        }
    }
];