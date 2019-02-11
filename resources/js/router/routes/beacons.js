module.exports = [
    {
        path: '/beacons',
        name: 'beacons-index',
        component: require('../../views/beacons'),
        meta: {
            auth: true
        }
    },
    {
        path: '/beacons/:id',
        component: require('../../views/beacons/show'),
        name: 'beacons-show',
        props: true,
        meta: {
            auth: true
        }
    }
];