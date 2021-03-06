<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-search-location title-icon"></i>
                        <label>{{$t('searchables.plural')}}</label>
                    </div>
                </template>
            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <ribbon>
                    <bulk-actions :bulk-actions="bulkActions"
                                  :selections="selectedItems"
                                  @apply-bulk-action="applyBulkAction">
                    </bulk-actions>
                    <search-filter :offset="14"
                                   :span="4"
                                   @search="setFilter('search', $event)">
                    </search-filter>
                </ribbon>
                <el-table :data="tableItems"
                          :default-sort="{prop: 'name', order: 'ascending'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                                     width="55"
                                     align="center">
                    </el-table-column>
                    <el-table-column property="name"
                                     :label="$t('searchables.attributes.name')"
                                     sortable>
                    </el-table-column>
                    <el-table-column property="identifier"
                                     :label="$t('searchables.attributes.identifier')"
                                     sortable>
                    </el-table-column>
                    <el-table-column align="center"
                                     label="Activated">
                        <template slot-scope="scope">
                            <plugin-activation v-if="scope.row.installed"
                                               :plugin="scope.row"
                                               @searchables:refetch="getItems(getUrl())">
                            </plugin-activation>
                            <template v-else>
                                -
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center">
                        <template slot-scope="scope">
                            <plugin-installation :plugin="scope.row"
                                                 @searchables:refetch="getItems(getUrl())">
                            </plugin-installation>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <i class="fa fa-cog fa-spin loading-spinner"
                           v-if="loading">
                        </i>
                        <template v-else>No Results</template>
                    </template>
                </el-table>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import pluginInstallation from './plugin-installation';
    import pluginActivation from './plugin-activation';

    export default {
        mixins: [multipleSelection],
        components: {
            pluginInstallation,
            pluginActivation
        },
        data() {
            return {
                items: null,
                loading: false,
                resource: 'plugins',
                params: {
                    'page[number]': 1,
                    search: ''
                }
            };
        },
        created() {
            this.getItems(this.getUrl());
        },
        methods: {
            setFilter(key, value) {
                this.params[key] = value;
            },
            getUrl() {
                return '/' + this.resource;
            },
            async getItems(url) {
                this.loading = true;
                try {
                    const {data} = await this.$axios.get(url);
                    this.items = data;
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

                if (!this.params.search) {
                    return this.items;
                }

                return this.items.filter(item => item.name.toLowerCase().includes(this.params.search.toLowerCase()))
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
