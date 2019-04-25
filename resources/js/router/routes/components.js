module.exports = [
    {
        path: '/components',
        name: 'components-index',
        component: require('../../views/components'),
        meta: {
            auth: true
        }
    },
    {
        path: '/components/:id',
        component: require('../../views/components/show'),
        name: 'components-show',
        props: true,
        meta: {
            auth: true
        }
    }
];