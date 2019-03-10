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
                    title: this.$t('menu.places'),
                    children: null,
                    icon: 'map-marked-alt',
                    route: 'places',
                    border: true
                },
                {
                    title: this.$t('menu.containers'),
                    icon: 'archive',
                    route: 'containers',
                    border: true
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
                    title: this.$t('menu.user_management'),
                    icon: 'users-cog',
                    border: true,
                    children: [
                        {
                            title: this.$t('menu.users'),
                            children: null,
                            icon: 'users',
                            route: 'users'
                        },
                        {
                            title: this.$t('menu.roles'),
                            children: null,
                            icon: 'id-badge',
                            route: 'roles'
                        },
                        {
                            title: this.$t('menu.tokens'),
                            children: null,
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
                            children: null,
                            icon: 'cat',
                            route: 'categories'
                        },
                        {
                            title: this.$t('menu.tags'),
                            children: null,
                            icon: 'tags',
                            route: 'tags'
                        },
                        {
                            title: this.$t('menu.map_components'),
                            children: null,
                            icon: 'map-signs',
                            route: 'map-components'
                        },
                        {
                            title: this.$t('menu.searchables'),
                            icon: 'search-location',
                            route: 'searchables'
                        },
                        // {
                        //     title: this.$t('menu.map-settings'),
                        //     children: null,
                        //     icon: 'map',
                        //     route: 'map-settings'
                        // },
                        {
                            title: this.$t('menu.email_layouts'),
                            children: null,
                            icon: 'pen-fancy',
                            route: 'layouts'
                        },
                        {
                            title: this.$t('menu.email_templates'),
                            children: null,
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
                            children: null,
                            icon: 'id-card',
                            route: 'profile'
                        },
                        {
                            title: this.$t('menu.log_out'),
                            children: null,
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