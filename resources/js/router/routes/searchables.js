module.exports = [
    {
        path: '/searchables',
        name: 'searchables-index',
        component: require('../../views/searchables'),
        meta: {
            auth: true
        }
    },
    {
        path: '/searchables/:id',
        component: require('../../views/searchables/show'),
        name: 'searchables-show',
        props: true,
    }
];