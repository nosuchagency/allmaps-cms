module.exports = [
    {
        path: '/places/:placeId/buildings/:buildingId/floors/:id/structures',
        name: 'floors-structures',
        component: require('../../views/floors/floor-structures/show'),
        props: true,
        meta: {
            auth: true
        }
    },
    {
        path: '/places/:placeId/buildings/:buildingId/floors/:id/locations',
        name: 'floors-locations',
        component: require('../../views/floors/floor-locations/show'),
        props: true,
        meta: {
            auth: true
        }
    }
];