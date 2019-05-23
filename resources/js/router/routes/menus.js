module.exports = [
    {
        path: '/menus',
        name: 'menus-index',
        component: require('../../views/menus'),
        meta: {
            auth: true
        }
    },
    {
        path: '/menus/:id',
        component: require('../../views/menus/show'),
        name: 'menus-show',
        props: true,
        meta: {
            auth: true
        }
    }
];