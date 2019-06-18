<template>
    <span class="activity">
        {{user}} <b>{{description}}</b> the {{type}}
        <router-link :to="getRouteParams()">{{subject.name}}</router-link>
    </span>
</template>

<script>
    export default {
        props: {
            activity: Object
        },
        methods: {
            getRouteParams() {
                switch (this.type) {
                    case 'beacon' :
                        return {name: 'beacons-show', params: {id: this.subject.id}};
                    case 'building' :
                        return {name: 'places-show', params: {id: this.subject.place_id}};
                    case 'category' :
                        return {name: 'categories-index', params: {id: this.subject.id}};
                    case 'container' :
                        return {name: 'containers-show', params: {id: this.subject.id}};
                    case 'component' :
                        return {name: 'components-index', params: {id: this.subject.id}};
                    case 'fixture' :
                        return {name: 'fixtures-index', params: {id: this.subject.id}};
                    case 'folder' :
                        return {name: 'containers-show', params: {id: this.subject.container_id}};
                    case 'menu' :
                        return {name: 'menus-show', params: {id: this.subject.id}};
                    case 'place' :
                        return {name: 'places-show', params: {id: this.subject.id}};
                    case 'poi' :
                        return {name: 'pois-index', params: {id: this.subject.id}};
                    case 'role' :
                        return {name: 'roles-show', params: {id: this.subject.id}};
                    case 'searchable' :
                        return {name: 'searchables-index', params: {id: this.subject.id}};
                    case 'skin' :
                        return {name: 'skins-index', params: {id: this.subject.id}};
                    case 'tag' :
                        return {name: 'tags-index', params: {id: this.subject.id}};
                    case 'token' :
                        return {name: 'tokens-show', params: {id: this.subject.id}};
                    case 'user' :
                        return {name: 'users-show', params: {id: this.subject.id}};
                    default :
                        return {name: 'dashboard'}
                }
            }
        },
        computed: {
            type() {
                return this.activity.subject_type;
            },
            description() {
                return this.activity.description;
            },
            subject() {
                return this.activity.subject;
            },
            user() {
                if (this.$auth.user().id === this.activity.causer.id) {
                    return 'You';
                }

                return this.activity.causer.name;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .activity {
        line-height: 1.5em;
    }
</style>
