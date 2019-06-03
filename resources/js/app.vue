<template>
    <div id="app">
        <div class="app-container"
             :class="{'hide-sidebar': !sidebar.opened}">
            <template v-if="$auth.ready()">
                <side-bar v-if="$auth.check()"></side-bar>
                <background-map v-else></background-map>
                <router-view></router-view>
            </template>
        </div>
        <portal-target name="modals"></portal-target>
    </div>
</template>

<script>
    import sideBar from './layout/sidebar';
    import backgroundMap from './components/background-map';

    export default {
        components: {
            sideBar,
            backgroundMap
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
    }
</style>
