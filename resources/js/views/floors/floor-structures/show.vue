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
                </template>
            </toolbar>
        </template>

        <template slot="content">
            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div v-else>
                <structure-toolbar :current-structure="currentStructure"
                                   :url="getFloorUrl()">
                </structure-toolbar>
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
    import structureToolbar from './structure-toolbar';
    import mapComponentSelect from './map-component-select';

    export default {
        mixins: [resource],
        components: {
            floorMap,
            structureToolbar,
            mapComponentSelect
        },
        data() {
            return {
                item: null,
                placeId: null,
                buildingId: null,
                floorId: null,
                mapComponentTypes: [
                    'plan',
                    'wall',
                    'room',
                    'decor'
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
            getFloorUrl() {
                return '/places/' + this.placeId + '/buildings/' + this.buildingId + '/floors/' + this.floorId;
            },
            getReadUrl() {
                ({placeId: this.placeId, buildingId: this.buildingId, id: this.floorId} = this.$route.params);
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
