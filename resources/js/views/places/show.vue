<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-marked-alt title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('places.singular')})"
                                placement="top-start"
                                v-if="$auth.user().permissions.includes('places.update')">
                        <el-button type="primary"
                                   size="small"
                                   @click="openUpsertModal()"
                                   circle>
                            <i class="fa fa-edit"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </toolbar>
        </template>

        <template slot="content">

            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>

            <div class="content" v-else>

                <el-card class="box-card">
                    <template slot="header">
                        <div style="display: flex; width: 100%;">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-info-circle title-icon"></i>
                                <label>Details</label>
                            </div>
                            <el-tag size="small"
                                    style="margin-left: auto;"
                                    :type="item.activated ? 'primary' : 'danger'">
                                {{item.activated ? 'Activated' : 'Deactivated'}}
                            </el-tag>
                        </div>
                    </template>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <div style="margin-bottom: 10px;">
                                <label style="font-weight: bold; color: #666; display: block; margin-bottom: 3px; font-size: 14px;">
                                    Address
                                </label>
                                <span style="font-size: 14px;">{{item.address || '-'}}</span>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <label style="font-weight: bold; color: #666; display: block; margin-bottom: 3px; font-size: 14px;">
                                    Zip Code
                                </label>
                                <span style="font-size: 14px;">{{item.zipcode || '-'}}</span>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <label style="font-weight: bold; color: #666; display: block; margin-bottom: 3px; font-size: 14px;">
                                    City
                                </label>
                                <span style="font-size: 14px;">{{item.city || '-'}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <map-location-select :lat="item.lat"
                                                 :lng="item.lng"
                                                 :marker-popup-content="placePopupContent">
                            </map-location-select>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card class="box-card">
                    <div style="display: flex;">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-building title-icon"></i>
                            <label>{{$t('buildings.plural')}}</label>
                        </div>
                        <el-tooltip effect="dark"
                                    :content="$t('general.actions.add', {name : $t('buildings.singular')})"
                                    placement="top-start"
                                    style="margin-left: auto;"
                                    v-if="$auth.user().permissions.includes('buildings.create')">>
                            <el-button type="primary"
                                       size="small"
                                       @click="openBuildingModal()"
                                       circle>
                                <i class="fa fa-plus"></i>
                            </el-button>
                        </el-tooltip>
                    </div>
                </el-card>

                <el-card class="box-card"
                         v-for="building in item.buildings"
                         :key="building.id">
                    <template slot="header">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-building title-icon"></i>
                            <label>{{building.name}}</label>
                        </div>
                        <el-tooltip effect="dark"
                                    :content="$t('general.actions.edit', {name : $t('buildings.singular')})"
                                    placement="top-start"
                                    style="margin-left: auto;">
                            <el-button type="primary"
                                       size="small"
                                       @click="openBuildingModal(building)"
                                       circle>
                                <i class="fa fa-edit"></i>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark"
                                    content="Add Floor"
                                    placement="top-start">
                            <el-button type="primary"
                                       size="small"
                                       @click="openFloorModal(building)"
                                       circle>
                                <i class="fa fa-plus"></i>
                            </el-button>
                        </el-tooltip>
                    </template>
                    <el-table :data="building.floors"
                              size="small">
                        <el-table-column label="Name"
                                         property="name"
                                         sortable>
                        </el-table-column>
                        <el-table-column label="Level"
                                         property="level"
                                         sortable>
                        </el-table-column>
                        <el-table-column label="Beacons"
                                         align="center"
                                         sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.beacons.length}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Pois"
                                         align="center"
                                         sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.pois.length}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Findables"
                                         align="center"
                                         sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.findables.length}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot-scope="scope">
                                <el-tooltip effect="dark"
                                            :content="$t('buildings.map_plan')"
                                            placement="top-start">
                                    <el-button type="warning"
                                               size="small"
                                               icon="el-icon-picture-outline"
                                               circle
                                               v-if="$auth.user().permissions.includes('floors.read')"
                                               @click="$router.push('/places/' + item.id + '/buildings/' + building.id + '/floors/' + scope.row.id + '/plan')">
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark"
                                            content="Map Locations"
                                            placement="top-start">
                                    <el-button type="warning"
                                               size="small"
                                               circle
                                               v-if="$auth.user().permissions.includes('floors.read')"
                                               @click="$router.push('/places/' + item.id + '/buildings/' + building.id + '/floors/' + scope.row.id + '/locations')">
                                        <i class="fa fa-location-arrow"></i>
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark"
                                            content="Edit Floor"
                                            placement="top-start">
                                    <el-button type="primary"
                                               size="small"
                                               @click="openFloorModal(building, scope.row)"
                                               circle>
                                        <i class="fa fa-edit"></i>
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
                <building-modal v-if="buildingModalVisible"
                                :visible="buildingModalVisible"
                                :place-id="item.id"
                                :item="selectedBuilding"
                                @building-modal:close="closeBuildingModal"
                                @building-modal:add="addBuilding"
                                @building-modal:update="updateBuilding"
                                @building-modal:remove="removeBuilding">
                </building-modal>
                <floor-modal v-if="floorModalVisible"
                             :visible="floorModalVisible"
                             :item="selectedFloor"
                             :building-id="selectedBuilding.id"
                             :place-id="item.id"
                             @floor-modal:close="closeFloorModal"
                             @floor-modal:add="addFloor"
                             @floor-modal:update="updateFloor"
                             @floor-modal:remove="removeFloor">
                </floor-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import resource from 'js/mixins/resource';
    import upsertModal from './upsert-modal';
    import buildingModal from '../buildings/upsert-modal';
    import floorModal from '../floors/upsert-modal';
    import mapLocationSelect from './map-location-select';

    export default {
        mixins: [multipleSelection, resource],
        components: {
            upsertModal,
            buildingModal,
            floorModal,
            mapLocationSelect
        },
        data() {
            return {
                upsertModalVisible: false,
                buildingModalVisible: false,
                floorModalVisible: false,
                resource: 'places',
                item: null,
                selectedBuilding: null,
                selectedFloor: null
            };
        },
        methods: {
            updateItem(item) {
                this.item = item;
                this.closeUpsertModal();
            },
            removeItem() {
                this.$router.push('/' + this.resource);
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
            openBuildingModal(building = null) {
                this.selectedBuilding = building;
                this.buildingModalVisible = true;
            },
            closeBuildingModal() {
                this.buildingModalVisible = false;
            },
            openFloorModal(building, item = null) {
                this.selectedBuilding = building;
                this.selectedFloor = item;
                this.floorModalVisible = true;
            },
            closeFloorModal() {
                this.floorModalVisible = false;
            },
            addBuilding(building) {
                this.item.buildings.push(building);
                this.closeBuildingModal();
            },
            updateBuilding(data) {
                let index = _.findIndex(this.item.buildings, {id: data.id});
                this.item.buildings.splice(index, 1, data.building);
                this.closeBuildingModal();
            },
            removeBuilding(building) {
                let index = _.findIndex(this.item.containers, {id: building.id});
                this.item.buildings.splice(index, 1);
                this.closeBuildingModal();
            },
            addFloor(data) {
                let building = _.find(this.item.buildings, {id: data.buildingId});
                building.floors.push(data.floor);
                this.closeFloorModal();
            },
            updateFloor(data) {
                let building = _.find(this.item.buildings, {id: data.buildingId});
                let floorIndex = _.findIndex(building.floors, {id: data.floor.id});
                building.floors.splice(floorIndex, 1, data.floor);
                this.closeFloorModal();
            },
            removeFloor(data) {
                let building = _.find(this.item.buildings, {id: data.buildingId});
                let floorIndex = _.findIndex(building.floors, {id: data.floor.id});
                building.floors.splice(floorIndex, 1);
                this.closeFloorModal();
            }
        },
        computed: {
            placePopupContent() {
                return `
                <div class="place-popup">
                    <div class="place-popup-image" style="background-image : url(${this.item.image || 'http://www.tkp.ca/images/02/003/main.jpg'})"></div>
                    <div class="place-popup-details">
                        <span>${this.item.address || ''}</span>
                        <span>${this.item.zipcode || ''}</span>
                        <span>${this.item.city || ''}</span>
                    </div>
                </div>
                `;
            }
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .place-popup {
        display: flex;
        justify-content: space-between;
        min-height: 45px;

        &-image {
            flex-basis: 45%;
            background-repeat: no-repeat;
            background-size: cover;
        }

        &-details {
            flex-basis: 45%;
        }
    }
</style>
