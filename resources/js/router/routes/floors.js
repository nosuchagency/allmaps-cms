module.exports = [
    {
        path: '/places/:placeId/buildings/:buildingId/floors/:id/plan',
        name: 'floors-plan',
        component: require('../../views/floors/floor-plan/show'),
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