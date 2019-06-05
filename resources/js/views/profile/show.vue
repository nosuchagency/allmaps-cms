<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-user title-icon"></i>
                        <label>{{$t('profile.title')}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('users.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('users.update')">
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
                    <div slot="header" class="clearfix">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-file-invoice title-icon"></i>
                            <label>Content</label>
                        </div>
                    </div>
                    <pie-chart :chart-data="pieChartData"
                               :options="options"
                               :styles="styles">
                    </pie-chart>
                </el-card>
                <el-card class="box-card">
                    <template slot="header">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-tasks title-icon"></i>
                            <label>Activity</label>
                        </div>
                    </template>
                    <el-table :data="item.actions"
                              :default-sort="{prop: 'name', order: 'ascending'}">
                        <el-table-column label="User">
                            <template slot-scope="scope">
                                {{scope.row.causer.name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Action">
                            <template slot-scope="scope">
                                <icon :resource="scope.row.description"></icon>
                                {{scope.row.description}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Resource">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.subject_type">
                                    <icon :resource="scope.row.subject_type"></icon>
                                </el-tooltip>
                                {{scope.row.subject_name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Time">
                            <template slot-scope="scope">
                                {{scope.row.time}} {{scope.row.date}}
                            </template>
                        </el-table-column>
                        <template slot="empty">
                            <template>No Results</template>
                        </template>
                    </el-table>
                </el-card>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:update="updateItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import upsertModal from './upsert-modal';
    import pieChart from '../../components/PieChart';
    import sumBy from 'lodash/sumBy';

    export default {
        components: {
            upsertModal,
            pieChart
        },
        data() {
            return {
                item: null,
                upsertModalVisible: false,
                resource: 'profile'
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(`/${this.resource}`);
                    this.item = data;
                } catch (error) {
                    console.log(error);
                }
            },
            updateItem(item) {
                this.item = item;
                this.$i18n.locale = item.locale;
                this.closeUpsertModal();
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            }
        },
        computed: {
            options() {
                return {
                    responsive: true,
                    maintainAspectRatio: false
                };
            },
            styles() {
                return {
                    width: '100%',
                    height: '250px',
                    position: 'relative'
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
                                this.item ? sumBy(this.item.contents, ({type}) => type === 'text') : 0
                            ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
