<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-wifi title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('beacons.singular')})"
                                placement="top-start"
                                v-if="$auth.user().permissions.includes('beacons.update')">
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
                <template v-if="item">
                    <el-card class="box-card">
                        <template slot="header">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-map-marker-alt title-icon"></i>
                                <label>Location</label>
                            </div>
                        </template>
                        <simple-map v-if="item.lat && item.lng"
                                    :lat="item.lat" :lng="item.lng">
                        </simple-map>
                        <div class="no-location" v-else>
                            <label>The beacon does not have a location yet</label>
                        </div>
                    </el-card>
                </template>
                <template v-if="item">
                    <el-card class="box-card">
                        <div style="display: flex;">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-archive title-icon"></i>
                                <label>{{$t('containers.plural')}}</label>
                            </div>
                            <el-tooltip effect="dark"
                                        :content="$t('general.actions.add', {name : $t('containers.singular')})"
                                        placement="top-start"
                                        style="margin-left: auto;">
                                <el-button type="primary"
                                           size="small"
                                           @click="openContainerModal()"
                                           circle>
                                    <i class="fa fa-plus"></i>
                                </el-button>
                            </el-tooltip>
                        </div>
                    </el-card>
                    <el-card class="box-card"
                             v-for="container in item.containers"
                             :key="container.id">
                        <template slot="header">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-archive title-icon"></i>
                                <label>{{container.name}}</label>
                            </div>
                            <el-tooltip effect="dark"
                                        :content="$t('general.actions.edit', {name : $t('containers.singular')})"
                                        placement="top-start"
                                        style="margin-left: auto;">
                                <el-button type="primary"
                                           size="small"
                                           @click="openContainerModal(container)"
                                           circle>
                                    <i class="fa fa-edit"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark"
                                        content="Add Rule"
                                        placement="top-start">
                                <el-button type="primary"
                                           size="small"
                                           @click="openRuleModal(container)"
                                           circle>
                                    <i class="fa fa-plus"></i>
                                </el-button>
                            </el-tooltip>
                        </template>
                        <el-table :data="container.rules"
                                  size="small">
                            <el-table-column label="Beacon Distance"
                                             sortable>
                                <template slot-scope="scope">
                                    <span class="capitalize">{{scope.row.distance}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Weekday(s)"
                                             sortable>
                                <template slot-scope="scope">
                                    <span class="capitalize">{{scope.row.weekday}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center"
                                             label="Time Restricted">
                                <template slot-scope="scope">
                                    <i class="fa fa-check" v-if="scope.row.time_restricted"></i>
                                    <i class="fa fa-times" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column align="center"
                                             label="Date Restricted">
                                <template slot-scope="scope">
                                    <i class="fa fa-check" v-if="scope.row.date_restricted"></i>
                                    <i class="fa fa-times" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column align="right">
                                <template slot-scope="scope">
                                    <el-tooltip effect="dark"
                                                content="Edit Rule"
                                                placement="top-start">
                                        <el-button type="primary"
                                                   size="small"
                                                   @click="openRuleModal(container, scope.row)"
                                                   circle>
                                            <i class="fa fa-edit"></i>
                                        </el-button>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </template>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
                <container-modal v-if="containerModalVisible"
                                 :visible="containerModalVisible"
                                 :item="selectedContainer"
                                 :beacon-id="item.id"
                                 :containers="item.containers"
                                 @container-modal:close="closeContainerModal"
                                 @container-modal:add="addContainer"
                                 @container-modal:update="updateContainer"
                                 @container-modal:remove="removeContainer">
                </container-modal>
                <rule-modal v-if="ruleModalVisible"
                            :visible="ruleModalVisible"
                            :item="selectedRule"
                            :container-id="selectedContainer.id"
                            :beacon-id="item.id"
                            @rule-modal:close="closeRuleModal"
                            @rule-modal:add="addRule"
                            @rule-modal:update="updateRule"
                            @rule-modal:remove="removeRule">
                </rule-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import upsertModal from './upsert-modal';
    import containerModal from './container-modal';
    import ruleModal from '../rules/upsert-modal';
    import simpleMap from './simple-map';

    export default {
        components: {
            upsertModal,
            containerModal,
            ruleModal,
            simpleMap
        },
        data() {
            return {
                resource: 'beacons',
                containerModalVisible: false,
                ruleModalVisible: false,
                upsertModalVisible: false,
                selectedContainer: null,
                selectedContainerRule: null,
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
            openContainerModal(item = null) {
                this.selectedContainer = item;
                this.containerModalVisible = true;
            },
            closeContainerModal() {
                this.containerModalVisible = false;
            },
            addContainer(container) {
                this.item.containers.push(container);
                this.closeContainerModal();
            },
            updateContainer(container) {
                let index = this.item.containers.findIndex(({id}) => id === container.id);
                this.item.containers.splice(index, 1, container);
                this.closeContainerModal();
            },
            removeContainer(container) {
                let index = this.item.containers.findIndex(({id}) => id === container.id);
                this.item.containers.splice(index, 1);

                this.closeContainerModal();
            },
            openRuleModal(container, item = null) {
                this.selectedContainer = container;
                this.selectedRule = item;
                this.ruleModalVisible = true;
            },
            closeRuleModal() {
                this.ruleModalVisible = false;
            },
            addRule(data) {
                let container = this.item.containers.find(({id}) => id === data.containerId);
                container.rules.push(data.rule);
                this.closeRuleModal();
            },
            updateRule(data) {
                let container = this.item.containers.find(({id}) => id === data.containerId);
                let ruleIndex = container.rules.findIndex(({id}) => id === data.rule.id);
                container.rules.splice(ruleIndex, 1, data.rule);
                this.closeRuleModal();
            },
            removeRule(data) {
                let container = this.item.containers.find(({id}) => id === data.containerId);
                let ruleIndex = container.rules.findIndex(({id}) => id === data.rule.id);
                container.rules.splice(ruleIndex, 1);
                this.closeRuleModal();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .no-location {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
</style>