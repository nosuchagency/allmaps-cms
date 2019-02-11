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
                    <poi-select></poi-select>
                    <findable-select></findable-select>
                    <beacon-select></beacon-select>
                    <el-tooltip effect="dark"
                                content="Reposition Map"
                                placement="top-start">
                        <el-button type="primary"
                                   size="small"
                                   @click="repositionMap"
                                   circle>
                            <i class="fa fa-bullseye"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark"
                                content="Toggle plan visibility"
                                placement="top-start">
                        <el-button @click="togglePlan"
                                   :type="togglePlanButtonType"
                                   size="small"
                                   icon="el-icon-picture-outline"
                                   circle>
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
                <floor-map :place="item.place"
                           :building="item.building"
                           :floor="item">
                </floor-map>
            </div>
        </template>
    </layout>
</template>

<script>
    import floorMap from './locations-map.vue';
    import Hub from '../../../events/hub';
    import {mapGetters} from 'vuex';
    import resource from 'js/mixins/resource';
    import form from 'js/mixins/form';
    import poiSelect from './poi-select';
    import findableSelect from './findable-select';
    import beaconSelect from './beacon-select';

    export default {
        mixins: [resource, form],
        components: {
            floorMap,
            poiSelect,
            findableSelect,
            beaconSelect
        },
        data() {
            return {
                item: null
            }
        },
        computed: {
            togglePlanButtonType() {
                return this.planActive ? 'primary' : 'default';
            },
            ...mapGetters('location', ['planActive'])
        },
        methods: {
            repositionMap() {
                Hub.$emit('repositionMap');
            },
            togglePlan() {
                this.$store.commit('location/setPlanActive');
            },
            getReadUrl() {
                let {placeId, buildingId, id} = this.$route.params;

                return '/places/' + placeId + '/buildings/' + buildingId + '/floors/' + id + '/locations';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .secondary-toolbar {
        transition: height 0.2s ease-in-out;
        overflow: hidden;
        width: 100%;
        height: 56px;
        background-color: #409eff;
        position: absolute;
        z-index: 801;
        display: flex;
        align-items: center;
    }

    .location-type-button {
        font-weight: bold;

        &.is-selected {
            opacity: 0.65;
        }
    }
</style>
