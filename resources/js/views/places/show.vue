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
                                v-if="$auth.user().hasPermissionTo('places.update')">
                        <el-button type="primary"
                                   size="small"
                                   @click="upsertModalVisible = true"
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

                <el-card>
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
                                <span style="font-size: 14px;">{{item.postcode || '-'}}</span>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <label style="font-weight: bold; color: #666; display: block; margin-bottom: 3px; font-size: 14px;">
                                    City
                                </label>
                                <span style="font-size: 14px;">{{item.city || '-'}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <map-location-select :latitude="item.latitude"
                                                 :longitude="item.longitude"
                                                 :marker-popup-content="placePopupContent">
                            </map-location-select>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card>
                    <div style="display: flex;">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-building title-icon"></i>
                            <label>{{$t('buildings.plural')}}</label>
                        </div>
                        <el-tooltip effect="dark"
                                    :content="$t('general.actions.add', {name : $t('buildings.singular')})"
                                    placement="top-start"
                                    style="margin-left: auto;"
                                    v-if="$auth.user().hasPermissionTo('buildings.create')">>
                            <el-button type="primary"
                                       size="small"
                                       @click="buildingModalVisible = true"
                                       circle>
                                <i class="fa fa-plus"></i>
                            </el-button>
                        </el-tooltip>
                    </div>
                </el-card>
                <building-card v-for="building in item.buildings"
                               :building="building"
                               :key="building.id"
                               @building-card:remove="removeBuilding"
                               @building-card:update="updateBuilding">
                </building-card>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @upsert-modal:close="upsertModalVisible = false"
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
                <building-modal v-if="buildingModalVisible"
                                :visible="buildingModalVisible"
                                :place="item"
                                @building-modal:close="buildingModalVisible = false"
                                @building-modal:add="addBuilding">
                </building-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import upsertModal from './upsert-modal';
    import buildingModal from '../buildings/upsert-modal';
    import mapLocationSelect from './map-location-select';
    import buildingCard from './building-card';

    export default {
        mixins: [multipleSelection],
        components: {
            upsertModal,
            buildingModal,
            mapLocationSelect,
            buildingCard
        },
        data() {
            return {
                upsertModalVisible: false,
                buildingModalVisible: false,
                resource: 'places',
                item: null
            };
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(`/${this.resource}/${this.$route.params.id}`);
                    this.item = data;
                } catch (error) {
                    console.log(error);
                }
            },
            updateItem(item) {
                this.item = item;
                this.upsertModalVisible = false;
            },
            removeItem() {
                this.$router.push('/' + this.resource);
            },
            addBuilding(building) {
                this.item.buildings.push(building);
                this.buildingModalVisible = false;
            },
            updateBuilding(building) {
                let index = this.item.buildings.findIndex(({id}) => id === building.id);
                this.item.buildings.splice(index, 1, building);
            },
            removeBuilding(building) {
                let index = this.item.buildings.findIndex(({id}) => id === building.id);
                this.item.buildings.splice(index, 1);
            }
        },
        computed: {
            placePopupContent() {
                return `
                <div class="place-popup">
                    <div class="place-popup-image" style="background-image : url(${this.item.image || 'http://www.tkp.ca/images/02/003/main.jpg'})"></div>
                    <div class="place-popup-details">
                        <span>${this.item.address || ''}</span>
                        <span>${this.item.postcode || ''}</span>
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
