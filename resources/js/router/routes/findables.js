module.exports = [
    {
        path: '/findables',
        name: 'findables-index',
        component: require('../../views/findables'),
        meta: {
            auth: true
        }
    },
    {
        path: '/findables/:id',
        component: require('../../views/findables/show'),
        name: 'findables-show',
        props: true,
    }
];