module.exports = [
    {
        path: '/map-components',
        name: 'map-components-index',
        component: require('../../views/map-components'),
        meta: {
            auth: true
        }
    },
    {
        path: '/map-components/:id',
        component: require('../../views/map-components/show'),
        name: 'map-components-show',
        props: true,
        meta: {
            auth: true
        }
    }
];