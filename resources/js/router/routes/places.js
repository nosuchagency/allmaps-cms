module.exports = [
    {
        path: '/places',
        name: 'places-index',
        component: require('../../views/places'),
        meta: {
            auth: true
        }
    },
    {
        path: '/places/:id',
        component: require('../../views/places/show'),
        name: 'places-show',
        props: true,
        meta: {
            auth: true
        }
    }
];