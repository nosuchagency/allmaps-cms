<template>
    <i class="fa" :class="'fa-' + getResource()"></i>
</template>

<script>
    export default {
        props: {
            resource: String
        },
        methods: {
            getResource() {
                switch (this.resource.toLowerCase()) {
                    case 'beacon':
                    case 'beacons':
                        return 'wifi';
                    case 'building':
                    case 'buildings':
                        return 'building';
                    case 'category':
                    case 'categories':
                        return 'cat';
                    case 'container':
                    case 'containers':
                        return 'archive';
                    case 'created' :
                        return 'plus';
                    case 'deleted' :
                        return 'trash-alt';
                    case 'findable':
                    case 'searchables':
                        return 'search-location';
                    case 'folder':
                    case 'folders':
                        return 'folder';
                    case 'header':
                    case 'headers':
                        return 'heading';
                    case 'floor':
                    case 'floors':
                        return 'grip-lines';
                    case 'import':
                    case 'imports':
                        return 'file-import';
                    case 'layout':
                    case 'layouts':
                        return 'pen-fancy';
                    case 'location' :
                    case 'locations' :
                        return 'map-pin';
                    case 'logged in' :
                        return 'sign-in-alt';
                    case 'component':
                    case 'components':
                        return 'map-signs';
                    case 'poi':
                    case 'pois':
                        return 'map-marker-alt';
                    case 'place':
                    case 'places':
                        return 'map-marked-alt';
                    case 'user':
                    case 'users':
                        return 'users';
                    case 'tag':
                    case 'tags':
                        return 'tags';
                    case 'template':
                    case 'templates':
                        return 'mail-bulk';
                    case 'token':
                    case 'tokens':
                        return 'key';
                    case 'role':
                    case 'roles':
                        return 'id-badge';
                    case 'rule':
                    case 'rules':
                        return 'gavel';
                    case 'updated' :
                        return 'edit';
                    default :
                        return 'question-circle'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
