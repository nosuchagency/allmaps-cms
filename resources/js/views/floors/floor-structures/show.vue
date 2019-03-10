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
                            <div class="map-components-container"
                                 slot-scope="{items, loading}">
                                <map-component-select v-for="type in mapComponentTypes"
                                                      :key="type"
                                                      :type="type"
                                                      :map-component-options="items.filter(item => item.type === type)"
                                                      @map-component:select="createMapStructure">
                                </map-component-select>
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
                <toolbar-edit :structure="currentStructure"></toolbar-edit>
                <floor-map :url="getFloorUrl()"
                           :lat="item.place.lat"
                           :lng="item.place.lng"
                           :structures="item.structures"
                           :current-structure="currentStructure"
                           :current-structure-copy="currentStructureCopy"
                           @structure:set="setCurrentStructure"
                           @structure-copy:set="setCurrentStructureCopy">
                </floor-map>
            </div>
        </template>
    </layout>
</template>

<script>
    import Hub from '../../../events/hub';
    import resource from 'js/mixins/resource';
    import floorMap from './floor-map.vue';
    import toolbarEdit from './toolbar-edit.vue';
    import mapComponentSelect from './map-component-select';

    export default {
        mixins: [resource],
        components: {
            floorMap,
            toolbarEdit,
            mapComponentSelect
        },
        data() {
            return {
                item: null,
                ids: null,
                mapComponentTypes: [
                    'plan',
                    'wall',
                    'room'
                ],
                currentStructure: null,
                currentStructureCopy: null
            }
        },
        methods: {
            setCurrentStructure(structure, callback = null) {
                this.currentStructure = structure;

                if (callback && typeof callback == 'function') {
                    this.$nextTick(() => callback(structure))
                }
            },
            setCurrentStructureCopy(structure, callback = null) {
                this.currentStructureCopy = structure;

                if (callback && typeof callback == 'function') {
                    this.$nextTick(() => callback(structure))
                }
            },
            async createMapStructure(mapComponent) {
                if (this.currentStructure) {
                    Hub.$emit('structure:cancel');
                }

                try {
                    let url = this.getFloorUrl() + '/structures';
                    const {data: structure} = await this.$axios.post(url, {map_component_id: mapComponent.id});
                    Hub.$emit('structure:add', structure);
                } catch (error) {
                    console.log(error);
                }
            },
            repositionMap() {
                Hub.$emit('map:reposition');
            },
            getFloorUrl() {
                return '/places/' + this.ids.placeId + '/buildings/' + this.ids.buildingId + '/floors/' + this.ids.id;
            },
            getReadUrl() {
                this.ids = this.$route.params;
                return this.getFloorUrl();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .map-components-container {
        display: flex;
        justify-content: flex-end;
    }

    .router-link-active {
        &:hover {
            color: #939393;
        }
    }
</style>
