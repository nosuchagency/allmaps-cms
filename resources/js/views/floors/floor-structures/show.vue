<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-marked-alt title-icon"></i>
                        <template v-if="item">
                            <router-link :to="'/places/' + placeId">
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
                                <structure-select v-for="type in structureTypes"
                                                  :key="type"
                                                  :type="type"
                                                  :floor-url="getFloorUrl()"
                                                  :components="items.filter(item => item.type === type)"
                                                  @structure:add="structureCreated">
                                </structure-select>
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
                <structure-toolbar :structure="currentStructure"
                                   @structure:saved="structureSaved"
                                   @structure:cancelled="structureCancelled"
                                   @structure:removed="structureRemoved"
                                   :url="getFloorUrl()">
                </structure-toolbar>
                <floor-map :lat="item.place.lat"
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
    import floorMap from './floor-map.vue';
    import structureToolbar from './structure-toolbar';
    import structureSelect from './structure-select';

    export default {
        components: {
            floorMap,
            structureToolbar,
            structureSelect
        },
        data() {
            return {
                item: null,
                placeId: null,
                buildingId: null,
                floorId: null,
                structureTypes: [
                    'plan',
                    'wall',
                    'room',
                    'decor'
                ],
                currentStructure: null,
                currentStructureCopy: null
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(this.getReadUrl());
                    this.item = data;
                } catch (error) {
                    console.log(error);
                }
            },
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
            structureCreated(structure) {
                Hub.$emit('structure:created', structure);
            },
            structureSaved() {
                Hub.$emit('structure:saved');
            },
            structureCancelled() {
                Hub.$emit('structure:cancelled');
            },
            structureRemoved() {
                Hub.$emit('structure:removed');
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
