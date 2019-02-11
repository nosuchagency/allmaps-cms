<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-marked-alt title-icon"></i>
                        <template v-if="item">
                            <router-link :to="'/places/' + item.place.id">
                                {{ item.place.name }}
                            </router-link>
                            <i class="fa fa-caret-right" style="margin: 0 10px;"></i>
                            <i class="fa fa-grip-lines title-icon"></i>
                            <label>{{item.name}}</label>
                        </template>
                    </div>
                </template>
                <template slot="right">
                    <template v-if="item">
                        <fetch-items url="/map-components">
                            <div class="structures-container"
                                 slot-scope="{items, loading}">
                                <structure-select v-for="type in structureTypes"
                                                  :key="type"
                                                  :type="type"
                                                  :component-options="items.filter(item => item.type === type)">
                                </structure-select>
                            </div>
                        </fetch-items>
                    </template>
                    <el-tooltip effect="dark" content="Reposition Map" placement="top-start">
                        <el-button type="primary"
                                   size="small"
                                   @click="repositionMap"
                                   circle
                                   style="width: 32px;">
                            <i class="fa fa-bullseye"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </toolbar>
        </template>

        <template slot="content">
            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div v-else>
                <toolbar-edit :floor="item"></toolbar-edit>
                <plan-map @setComponent="setComponent"
                          :place="item.place"
                          :building="item.building"
                          :floor="item">
                </plan-map>
            </div>
        </template>
    </layout>
</template>

<script>
    import planMap from './plan-map.vue';
    import Hub from '../../../events/hub';
    import toolbarEdit from './toolbar-edit.vue';
    import {mapGetters} from 'vuex';
    import resource from 'js/mixins/resource';
    import form from 'js/mixins/form';
    import structureSelect from './structure-select';

    export default {
        mixins: [resource, form],
        components: {
            planMap,
            toolbarEdit,
            structureSelect
        },
        data() {
            return {
                item: null,
                structureTypes: [
                    'plan',
                    'wall',
                    'room',
                    'fixture'
                ]
            }
        },
        computed: {
            ...mapGetters('plan', ['currentComponent'])
        },
        methods: {
            setComponent(component) {
                this.$store.commit('plan/setSelectedComponent', component.feature.properties);
            },
            repositionMap() {
                Hub.$emit('repositionMap');
            },
            getReadUrl() {
                let {placeId, buildingId, id} = this.$route.params;

                return '/places/' + placeId + '/buildings/' + buildingId + '/floors/' + id + '/plan';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .structures-container {
        display: flex;
        justify-content: flex-end;
    }

    .router-link-active {
        &:hover {
            color: #939393;
        }
    }
</style>
