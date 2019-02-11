module.exports = [
    {
        path: '/containers',
        name: 'containers-index',
        component: require('../../views/containers'),
        meta: {
            auth: true
        }
    },
    {
        path: '/containers/:id',
        component: require('../../views/containers/show'),
        name: 'containers-show',
        props: true,
        meta: {
            auth: true
        }
    }
];