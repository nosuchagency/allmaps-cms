let menuItems = {
    computed: {
        menuItems() {
            return [
                {
                    title: this.$t('menu.dashboard'),
                    children: null,
                    icon: 'tachometer-alt',
                    route: 'dashboard',
                    border: true
                },
                {
                    title: this.$t('menu.map'),
                    icon: 'map',
                    border: true,
                    children: [
                        {
                            title: this.$t('menu.places'),
                            icon: 'map-marked-alt',
                            route: 'places',
                        },
                        {
                            title: this.$t('menu.components'),
                            icon: 'map-signs',
                            route: 'components'
                        },
                        {
                            title: this.$t('menu.menus'),
                            icon: 'bars',
                            route: 'menus',
                        },
                        {
                            title: this.$t('menu.searchables'),
                            icon: 'search-location',
                            route: 'searchables'
                        },
                    ],
                },
                {
                    title: this.$t('menu.locations'),
                    icon: 'map-pin',
                    border: true,
                    children: [
                        {
                            title: this.$t('menu.beacons'),
                            icon: 'wifi',
                            route: 'beacons'
                        },
                        {
                            title: this.$t('menu.pois'),
                            icon: 'map-marker-alt',
                            route: 'pois'
                        },
                        {
                            title: this.$t('menu.fixtures'),
                            icon: 'couch',
                            route: 'fixtures'
                        },
                    ]
                },
                {
                    title: this.$t('menu.containers'),
                    icon: 'archive',
                    route: 'containers',
                    border: true
                },
                {
                    title: this.$t('menu.user_management'),
                    icon: 'users-cog',
                    border: true,
                    children: [
                        {
                            title: this.$t('menu.users'),
                            icon: 'users',
                            route: 'users'
                        },
                        {
                            title: this.$t('menu.roles'),
                            icon: 'id-badge',
                            route: 'roles'
                        },
                        {
                            title: this.$t('menu.tokens'),
                            icon: 'key',
                            route: 'tokens'
                        }
                    ]
                },
                {
                    title: this.$t('menu.settings'),
                    icon: 'cogs',
                    border: true,
                    children: [
                        {
                            title: this.$t('menu.categories'),
                            icon: 'cat',
                            route: 'categories'
                        },
                        {
                            title: this.$t('menu.tags'),
                            icon: 'tags',
                            route: 'tags'
                        },
                        {
                            title: this.$t('menu.skins'),
                            icon: 'palette',
                            route: 'skins'
                        },
                        // {
                        //     title: this.$t('menu.map-settings'),
                        //     children: null,
                        //     icon: 'map',
                        //     route: 'map-settings'
                        // },
                        {
                            title: this.$t('menu.email_layouts'),
                            icon: 'pen-fancy',
                            route: 'layouts'
                        },
                        {
                            title: this.$t('menu.email_templates'),
                            icon: 'mail-bulk',
                            route: 'templates'
                        }
                    ]
                },
                {
                    title: this.$t('menu.account'),
                    icon: 'user',
                    children: [
                        {
                            title: this.$t('menu.profile'),
                            icon: 'id-card',
                            route: 'profile'
                        },
                        {
                            title: this.$t('menu.log_out'),
                            icon: 'sign-out-alt',
                            route: 'logout'
                        }
                    ]
                }
            ]
        }
    }
};

export default menuItems;