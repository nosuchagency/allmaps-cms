module.exports = [
    {
        path: '/tokens',
        name: 'tokens-index',
        component: require('../../views/tokens'),
        meta: {
            auth: true
        }
    },
    {
        path: '/tokens/:id',
        component: require('../../views/tokens/show'),
        name: 'tokens-show',
        props: true,
        meta: {
            auth: true
        }
    }
];