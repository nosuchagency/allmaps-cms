<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-id-badge title-icon"></i>
                        <label>{{$t('roles.plural')}}</label>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.create', {name : $t('roles.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('roles.create')">
                        <el-button type="primary"
                                   size="small"
                                   @click="openUpsertModal()"
                                   circle>
                            <i class="fa fa-plus"></i>
                        </el-button>
                    </el-tooltip>
                </template>
            </toolbar>
        </template>
        <template slot="content">

            <div class="content">
                <ribbon @ribbon:search="setFilter('search', $event)"
                        @ribbon:bulk-action="setBulkAction"
                        @ribbon:apply="applyBulkAction"
                        :selections="selectedItems"
                        :bulk-actions="bulkActions"
                        :selected-bulk-action="selectedBulkAction"
                        :category-filter-activated="false"
                        :tags-filter-activated="false">
                </ribbon>
                <el-table :data="tableItems"
                          @row-click="$router.push({name: 'roles-show', params: {id: $event.id}})"
                          :default-sort="{prop: 'name', order: 'ascending'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                                     width="55"
                                     align="center">
                    </el-table-column>
                    <el-table-column property="name"
                                     :label="$t('roles.attributes.name')"
                                     sortable>
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
                <confirm-dialog :title="text"
                                :message="$t('general.confirm')"
                                @cancel="confirmDeleteVisible = false"
                                @confirm="bulkRemove"
                                :visible="confirmDeleteVisible">
                </confirm-dialog>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:add="addItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import upsertModal from './upsert-modal';
    import QueryParams from 'js/utils/QueryParams';

    export default {
        mixins: [multipleSelection],
        components: {
            upsertModal
        },
        data() {
            return {
                upsertModalVisible: false,
                confirmDeleteVisible: false,
                items: null,
                loading: false,
                resource: 'roles',
                params: {
                    page: 1,
                    search: ''
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
            },
            addItem(item) {
                this.$router.push('/' + this.resource + '/' + item.id);
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
        },
        computed: {
            text() {
                let name = this.selectedItems.length > 1 ? this.$t('roles.plural') : this.$t('roles.singular');

                return this.$t('general.actions.delete', {name});
            },
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
    .el-table {
        /deep/ &__row {
            cursor: pointer;
        }
    }

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