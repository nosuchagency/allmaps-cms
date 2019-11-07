<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-archive title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('containers.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('container:update')">
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
                <el-card>
                    <div slot="header" class="clearfix">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-chart-bar title-icon"></i>
                            <label>Statistics</label>
                        </div>
                    </div>
                    <pie-chart :chart-data="pieChartData"
                               :options="options"
                               :styles="styles">
                    </pie-chart>
                </el-card>

                <folders-table v-if="item && item.folders_enabled"
                               :item="item">
                </folders-table>
                <contents-table v-else-if="item && !item.folders_enabled"
                                :folder="item.primary_folder"
                                @content-change="item.contents = $event">
                </contents-table>
                <template v-if="item">
                    <el-card>
                        <template slot="header">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-wifi title-icon"></i>
                                <label>{{$t('beacons.plural')}}</label>
                            </div>
                            <el-tooltip effect="dark"
                                        :content="$t('general.actions.add', {name : $t('beacons.singular')})"
                                        placement="top-start"
                                        style="margin-left: auto;">
                                <el-button type="primary"
                                           size="small"
                                           @click="openBeaconModal()"
                                           circle>
                                    <i class="fa fa-plus"></i>
                                </el-button>
                            </el-tooltip>
                        </template>
                        <bar-chart :chart-data="barChartData"
                                   :options="barChartOptions"
                                   :styles="styles">
                        </bar-chart>
                    </el-card>
                    <el-card v-for="beacon in item.beacons"
                             :key="beacon.id">
                        <template slot="header">
                            <div class="title-icon-wrapper">
                                <i class="fa fa-wifi title-icon"></i>
                                <label>{{beacon.name}}</label>
                            </div>
                            <el-tooltip effect="dark"
                                        :content="$t('general.actions.edit', {name : $t('beacons.singular')})"
                                        placement="top-start"
                                        style="margin-left: auto;">
                                <el-button type="primary"
                                           size="small"
                                           @click="openBeaconModal(beacon)"
                                           circle>
                                    <i class="fa fa-edit"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark"
                                        content="Add Rule"
                                        placement="top-start">
                                <el-button type="primary"
                                           size="small"
                                           @click="openRuleModal(beacon)"
                                           circle>
                                    <i class="fa fa-plus"></i>
                                </el-button>
                            </el-tooltip>
                        </template>
                        <el-table :data="beacon.rules"
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
                                                   @click="openRuleModal(beacon, scope.row)"
                                                   circle>
                                            <i class="fa fa-edit"></i>
                                        </el-button>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
<!--                    <el-card>-->
<!--                        <template slot="header">-->
<!--                            <div class="title-icon-wrapper">-->
<!--                                <i class="fa fa-archive title-icon"></i>-->
<!--                                <label>Content</label>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                        <el-table :data="item.locations"-->
<!--                                  size="small">-->
<!--                            <el-table-column label="Name"-->
<!--                                             sortable-->
<!--                                             property="name">-->
<!--                            </el-table-column>-->
<!--                            <el-table-column align="right">-->
<!--                                <template slot-scope="scope">-->
<!--                                    <el-tooltip effect="dark"-->
<!--                                                content="Detach location"-->
<!--                                                placement="top-start">-->
<!--                                        <el-button type="danger"-->
<!--                                                   size="small"-->
<!--                                                   @click="openConfirmUnlinkModal(scope.row)"-->
<!--                                                   circle>-->
<!--                                            <i class="fa fa-unlink"></i>-->
<!--                                        </el-button>-->
<!--                                    </el-tooltip>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
<!--                        </el-table>-->
<!--                    </el-card>-->
                </template>
                <confirm-dialog v-if="confirmDetachVisible"
                                :message="$t('general.confirm')"
                                @cancel="confirmDetachVisible = false"
                                @confirm="detachLocation"
                                :visible="confirmDetachVisible">
                </confirm-dialog>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @modal:close="closeUpsertModal"
                              @modal:update="updateItem"
                              @modal:remove="removeItem">
                </upsert-modal>
                <beacon-modal v-if="beaconModalVisible"
                              :visible="beaconModalVisible"
                              :item="selectedBeacon"
                              :container-id="item.id"
                              :beacons="item.beacons"
                              @beacon-modal:close="closeBeaconModal"
                              @beacon-modal:add="addBeacon"
                              @beacon-modal:update="updateBeacon"
                              @beacon-modal:remove="removeBeacon">
                </beacon-modal>
                <rule-modal v-if="ruleModalVisible"
                            :visible="ruleModalVisible"
                            :item="selectedRule"
                            :container-id="item.id"
                            :beacon-id="selectedBeacon.id"
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
    import contentsTable from './components/contents-table';
    import foldersTable from './components/folders-table';
    import beaconModal from './beacon-modal';
    import ruleModal from '../rules/upsert-modal';
    import upsertModal from './upsert-modal';
    import pieChart from 'js/components/charts/PieChart';
    import barChart from 'js/components/charts/BarChart';
    import sumBy from 'lodash/sumBy';

    export default {
        components: {
            contentsTable,
            foldersTable,
            beaconModal,
            ruleModal,
            upsertModal,
            pieChart,
            barChart
        },
        data() {
            return {
                resource: 'containers',
                beaconModalVisible: false,
                ruleModalVisible: false,
                upsertModalVisible: false,
                confirmDetachVisible: false,
                selectedBeacon: null,
                selectedRule: null,
                selectedLocation: null,
                item: null,
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
                    console.log(this.item);
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
            openBeaconModal(item = null) {
                this.selectedBeacon = item;
                this.beaconModalVisible = true;
            },
            closeBeaconModal() {
                this.beaconModalVisible = false;
            },
            openRuleModal(beacon, item = null) {
                this.selectedBeacon = beacon;
                this.selectedRule = item;
                this.ruleModalVisible = true;
            },
            closeRuleModal() {
                this.ruleModalVisible = false;
            },
            addBeacon(beacon) {
                this.item.beacons.push(beacon);
                this.closeBeaconModal();
            },
            updateBeacon(beacon) {
                let index = this.item.beacons.findIndex(({id}) => id === beacon.id);
                this.item.beacons.splice(index, 1, beacon);
                this.closeBeaconModal();
            },
            removeBeacon(beacon) {
                let index = this.item.beacons.findIndex(({id}) => id === beacon.id);
                this.item.beacons.splice(index, 1);
                this.closeBeaconModal();
            },
            addRule(data) {
                let beacon = this.item.beacons.find(({id}) => id === data.beaconId);
                beacon.rules.push(data.rule);
                this.closeRuleModal();
            },
            updateRule(data) {
                let beacon = this.item.beacons.find(({id}) => id === data.beaconId);
                let ruleIndex = beacon.rules.findIndex(({id}) => id === data.rule.id);
                beacon.rules.splice(ruleIndex, 1, data.rule);
                this.closeRuleModal();
            },
            removeRule(data) {
                let beacon = this.item.beacons.find(({id}) => id === data.beaconId);
                let ruleIndex = beacon.rules.findIndex(({id}) => id === data.rule.id);
                beacon.rules.splice(ruleIndex, 1);
                this.closeRuleModal();
            },
            openConfirmUnlinkModal(location) {
                this.selectedLocation = location;
                this.confirmDetachVisible = true;
            },
            async detachLocation() {
                try {
                    await this.$axios.post(`/${this.resource}/${this.item.id}/relationships/locations?_method=delete`, {data: [this.selectedLocation]});
                    let index = this.item.locations.findIndex(({id}) => id === this.selectedLocation.id);
                    this.item.locations.splice(index, 1);
                    this.confirmDetachVisible = false;
                    this.selectedLocation = null;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        computed: {
            options() {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'right'
                    }
                };
            },
            pieChartData() {
                return {
                    labels: ['Web', 'Image', 'Video', 'File', 'Gallery', 'Text'],
                    datasets: [
                        {
                            backgroundColor: [
                                '#41B883',
                                '#E46651',
                                '#00D8FF',
                                '#DD1B16',
                                '#e5e500',
                                '#7647a2'
                            ],
                            data: [
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'web') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'image') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'video') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'file') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'gallery') : 0,
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'text') : 0,
                            ]
                        }
                    ]
                }
            },
            barChartData() {
                return {
                    labels: this.item ? this.item.beacons.map(beacon => beacon.name) : [],
                    datasets: [
                        {
                            data: this.item ? this.item.beacons.map(beacon => beacon.hits.length) : 0,
                        }
                    ]
                };
            },
            barChartOptions() {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {display: false},
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }
                        ]
                    }
                };
            },
            styles() {
                return {
                    width: '100%',
                    height: '250px',
                    position: 'relative'
                };
            }
        },
    };
</script>

<style lang="scss" scoped>
    .capitalize {
        text-transform: capitalize;
    }
</style>
