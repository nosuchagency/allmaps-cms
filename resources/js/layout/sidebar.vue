<template>
    <el-scrollbar wrap-class="scrollbar-wrapper"
                  :class="{'is-collapsed' : !sidebar.opened}"
                  class="sidebar-container">
        <ul class="sidebar">
            <li class="sidebar-top-item">
                <span class="sidebar-top-title"
                      v-if="sidebar.opened">
                    AllMaps
                </span>
                <hamburger :toggleClick="toggleSideBar"
                           :isActive="sidebar.opened">
                </hamburger>
            </li>
            <template v-for="item in menuItems">
                <sidebar-item :key="item.route"
                              :item="item"
                              :current-route="route">
                </sidebar-item>
            </template>
        </ul>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex';
    import hamburger from './hamburger';
    import sidebarItem from './sidebar-item.vue';
    import scrollBar from '../components/scrollbar';
    import menuItems from './menu-items';

    export default {
        mixins: [menuItems],
        components: {
            sidebarItem,
            hamburger,
            scrollBar
        },
        data() {
            return {
                route: ''
            }
        },
        created() {
            this.route = this.$route.path;
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar');
            }
        },
        watch: {
            '$route'(to) {
                this.route = to.path;
            }
        },
        computed: {
            ...mapGetters(['sidebar'])
        }
    };
</script>

<style lang="scss" scoped>
    .sidebar-container {
        background-color: #304156;

        &.is-collapsed {
            .sidebar-top-item {
                padding: 0;
                justify-content: center;
            }

            /deep/ .el-scrollbar__bar {
                display: none;
            }
        }

        /deep/ .scrollbar-wrapper {
            overflow-x: hidden;
        }
    }

    .sidebar {
        width: 100%;
        padding: 0;
        margin: 0;

        &-top-title {
            color: white;
            white-space: nowrap;
        }

        &-top-item {
            display: flex;
            align-items: center;
            padding: 15px;
            height: 56px;
            border-bottom: 1px solid #304156;

            background-color: #367fa9;
        }
    }
</style>
