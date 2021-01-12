<template>
    <el-card>
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
                           @click="buildingModalVisible = true"
                           circle>
                    <i class="fa fa-edit"></i>
                </el-button>
            </el-tooltip>
            <el-tooltip effect="dark"
                        content="Add Floor"
                        placement="top-start">
                <el-button type="primary"
                           size="small"
                           @click="openFloorModal()"
                           circle>
                    <i class="fa fa-plus"></i>
                </el-button>
            </el-tooltip>
        </template>
        <el-table :data="floors"
                  size="small">
            <el-table-column label="Name"
                             property="name"
                             sortable>
            </el-table-column>
            <el-table-column label="Level"
                             property="level"
                             sortable>
            </el-table-column>
            <el-table-column label="Locations"
                             align="center"
                             sortable>
                <template slot-scope="scope">
                    <span>{{scope.row.locations.length}}</span>
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
                                   v-if="$auth.user().hasPermissionTo('floor:read')"
                                   @click="$router.push(`/places/${building.id}/buildings/${building.id}/floors/${scope.row.id}/structures`)">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark"
                                content="Map Locations"
                                placement="top-start">
                        <el-button type="warning"
                                   size="small"
                                   circle
                                   v-if="$auth.user().hasPermissionTo('floor:read')"
                                   @click="$router.push(`/places/${building.id}/buildings/${building.id}/floors/${scope.row.id}/locations`)">
                            <i class="fa fa-location-arrow"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark"
                                content="Edit Floor"
                                placement="top-start">
                        <el-button type="primary"
                                   size="small"
                                   @click="openFloorModal(scope.row)"
                                   circle>
                            <i class="fa fa-edit"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

            <div style="display: flex; margin-top: 20px;">
                        <line-chart :chart-data="chartData(floors)"
                               :options="chartOptions"
                               :styles="chartStyles">
                        </line-chart>
                    </div>



        <building-modal v-if="buildingModalVisible"
                        :visible="buildingModalVisible"
                        :item="building"
                        @modal:close="buildingModalVisible = false"
                        @modal:update="updateBuilding"
                        @modal:remove="removeBuilding">
        </building-modal>
        <floor-modal v-if="floorModalVisible"
                     :visible="floorModalVisible"
                     :item="floor"
                     :building="building"
                     @modal:close="floorModalVisible = false"
                     @modal:add="addFloor"
                     @modal:update="updateFloor"
                     @modal:remove="removeFloor">
        </floor-modal>
    </el-card>
</template>

<script>
    import floorModal from '../floors/upsert-modal';
    import buildingModal from '../buildings/upsert-modal';
    import lineChart from 'js/components/charts/LineChart';

    export default {
        components: {
            floorModal,
            buildingModal,
            lineChart
        },
        props: {
            building: Object
        },
        data() {
            return {
                floorModalVisible: false,
                buildingModalVisible: false,
                floor: null,
                floors: this.building.floors.slice(),
            }
        },
        computed: {
            chartStyles() {

                return {
                    width: '100%',
                    height: '250px',
                    position: 'relative'
                };
            },
            chartOptions() {
                return {
                   responsive: true,
                   maintainAspectRatio: false,
				title: {
					display: false,
					text: ''
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Showings'
						}
					}]
				}
			    }
            }
        },
        methods: {
            chartColors() {
                var colors = [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16',
                    '#e5e500',
                    '#7647a2'
                ];

                return colors[colors.length * Math.random() | 0]
            },
            chartData(floors) {
                var datasets = [];
                floors.forEach(floor => {
                    var chartColor = this.chartColors();

                    var dataset = {
                        label: floor.name,
					    backgroundColor: chartColor,
					    borderColor: chartColor,
                        data: [
                            Math.round(Math.random() * 1000 + 50),
                            Math.round(Math.random() * 1000 + 50),
                            Math.round(Math.random() * 1000 + 50),
                            Math.round(Math.random() * 1000 + 50),
                            Math.round(Math.random() * 1000 + 50),
                            Math.round(Math.random() * 1000 + 50)
                        ],
                        fill: false,
                    };

                    datasets.push(dataset);
                });

                return {
                    labels: ['August', 'September', 'Oktober', 'November', 'December', 'Januar'],
                    datasets: datasets
                }
            },
            updateBuilding(building) {
                this.$emit('building-card:update', building);
                this.buildingModalVisible = false;
            },
            removeBuilding(building) {
                this.$emit('building-card:remove', building)
            },
            openFloorModal(floor = null) {
                this.floor = floor;
                this.floorModalVisible = true;
            },
            addFloor(floor) {
                this.floors.push(floor);
                this.floorModalVisible = false;
            },
            updateFloor(floor) {
                let index = this.floors.findIndex(({id}) => id === floor.id);
                this.floors.splice(index, 1, floor);
                this.floorModalVisible = false;
            },
            removeFloor(floor) {
                let index = this.floors.findIndex(({id}) => id === floor.id);
                this.floors.splice(index, 1);
                this.floorModalVisible = false;
            }
        }
    }
</script>
