module.exports = [
    {
        path: '/containers/:containerId/folders/:id',
        component: require('../../views/folders/show'),
        name: 'folders-show',
        props: true,
        meta: {
            auth: true
        }
    }
];