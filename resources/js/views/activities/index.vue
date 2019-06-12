<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-tasks title-icon"></i>
                        <label>{{$t('activities.plural')}}</label>
                    </div>
                </template>
            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <ribbon>
                    <single-filter :span="4"
                                   :offset="16"
                                   url="/users"
                                   placeholder="Filter by user"
                                   @selection="setFilter('user', $event ? $event.id : '')">
                    </single-filter>
                    <single-filter :span="4"
                                   url="/tokens"
                                   placeholder="Filter by token"
                                   @selection="setFilter('token', $event ? $event.id : '')">
                    </single-filter>
                </ribbon>
                <el-table :data="tableItems"
                          :default-sort="{prop: 'name', order: 'ascending'}"
                          @selection-change="handleSelectionChange">
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
                        <i class="fa fa-cog fa-spin loading-spinner" v-if="loading"></i>
                        <template v-else>No Results</template>
                    </template>
                </el-table>
                <div class="pagination-container"
                     v-if="items">
                    <div class="pagination-container-left">
                        <label class="pagination-label">
                            Showing {{items.data.length}} out of {{items.meta.total}}
                        </label>
                    </div>
                    <div class="pagination-container-right">
                        <el-pagination background
                                       @prev-click="setFilter('page', $event)"
                                       @next-click="setFilter('page', $event)"
                                       @current-change="setFilter('page', $event)"
                                       layout="prev, pager, next"
                                       :total="items.meta.total"
                                       :page-size="50">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import QueryParams from 'js/utils/QueryParams';

    export default {
        mixins: [multipleSelection],
        data() {
            return {
                items: null,
                loading: false,
                resource: 'activities',
                params: {
                    page: 1,
                    user: '',
                    token: '',
                }
            };
        },
        created() {
            this.getItems(this.getUrl());
        },
        watch: {
            params: {
                handler(val) {
                    this.getItems(this.getUrl());
                },
                deep: true
            }
        },
        methods: {
            setFilter(key, value) {
                this.params[key] = value;
            },
            getUrl() {
                return this.resource + '/paginated';
            },
            async getItems(url) {
                try {
                    this.loading = true;
                    const response = await this.$axios.get(url + new QueryParams(this.params));
                    this.items = response.data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        computed: {
            tableItems() {
                if (!this.items) {
                    return [];
                }

                return this.items.data;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .pagination-container {
        margin: 25px 0;
        display: flex;
        justify-content: flex-end;
        align-content: center;

        &-left {
            flex-basis: 50%;

            .pagination-label {
                font-size: 12px;
                color: #666;
            }
        }

        &-right {
            flex-basis: 50%;
            display: flex;
            justify-content: flex-end
        }
    }

    .el-pagination.is-background /deep/ .el-pager li {
        background-color: white;
    }
</style>
