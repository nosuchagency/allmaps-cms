<template>
    <el-card>
        <template slot="header">
            <div class="header">
                <div class="title-icon-wrapper">
                    <i class="fa fa-map-marked-alt title-icon"></i>
                    <label>Places</label>
                </div>
                <el-tooltip effect="dark"
                            :content="$t('general.actions.create', {name : $t('places.singular')})"
                            placement="top-start"
                            v-if="$auth.user().hasPermissionTo('place:create')">
                    <el-button type="primary"
                               size="small"
                               @click="openUpsertModal()"
                               circle
                               style="margin-left: auto">
                        <i class="fa fa-plus"></i>
                    </el-button>
                </el-tooltip>
            </div>
        </template>
        <template v-if="loading">
            <div class="loading-container">
                <i class="fa fa-cog fa-spin loading-spinner"
                   v-if="loading">
                </i>
            </div>
        </template>
        <template v-else>
            <div style="margin-bottom: 15px">
                The system contains
                <router-link :to="{name : 'places-index'}"> {{placesCount}} places</router-link>
                with {{buildingsCount}} buildings and {{floorsCount}} floors.
            </div>
            <bar-chart :chart-data="barChartData"
                       :options="barChartOptions"
                       :styles="styles">
            </bar-chart>
        </template>
        <upsert-modal v-if="upsertModalVisible"
                      :visible="upsertModalVisible"
                      @modal:close="closeUpsertModal"
                      @modal:add="addItem">
        </upsert-modal>
    </el-card>
</template>

<script>
    import upsertModal from 'js/views/places/upsert-modal';
    import barChart from 'js/components/charts/BarChart';
    import sumBy from 'lodash/sumBy';

    export default {
        components: {
            upsertModal,
            barChart
        },
        data() {
            return {
                upsertModalVisible: false,
                loading: false,
                items: null
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            async getItems() {
                try {
                    this.loading = true;
                    const {data} = await this.$axios.get('/places?include=buildings,buildings.floors');
                    this.items = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            },
            addItem(item) {
                this.$router.push(`/places/${item.id}`);
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
        },
        computed: {
            placesCount() {
                return this.items.length;
            },
            buildingsCount() {
                return this.sumUp(this.items, ({buildings}) => buildings.length);
            },
            floorsCount() {
                return this.sumUp(this.items, ({buildings}) => this.sumUp(buildings, ({floors}) => floors.length));
            },
            sumUp() {
                return sumBy;
            },
            barChartData() {
                return {
                    labels: ['test', 'hest'],
                    datasets: [
                        {
                            data: [1, 2]
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
        }
    }
</script>

<style lang="scss" scoped>

</style>
