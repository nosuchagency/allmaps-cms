module.exports = [
    {
        path: '/tags',
        name: 'tags-index',
        component: require('../../views/tags'),
        meta: {
            auth: true
        }
    }
];