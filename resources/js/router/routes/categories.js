module.exports = [
    {
        path: '/categories',
        name: 'categories-index',
        component: require('../../views/categories'),
        meta: {
            auth: true
        }
    }
];