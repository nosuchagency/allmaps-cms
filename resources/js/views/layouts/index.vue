<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-pen-fancy title-icon"></i>
                        <label>{{$t('layouts.plural')}}</label>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.create', {name : $t('layouts.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('layout:create')">
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
                <ribbon>
                    <bulk-actions :bulk-actions="bulkActions"
                                  :selections="selectedItems"
                                  @apply-bulk-action="applyBulkAction">
                    </bulk-actions>
                    <search-filter :offset="4"
                                   :span="4"
                                   @search="setFilter('search', $event)">
                    </search-filter>
                    <single-filter :span="4"
                                   url="/categories"
                                   placeholder="Choose Category"
                                   @selection="setFilter('category', $event ? $event.id : '')">
                    </single-filter>
                    <multiple-filter url="/tags"
                                     placeholder="Choose Tags"
                                     @selection="setFilter('tags', $event.map(cat => cat.id).join(','))">
                    </multiple-filter>
                </ribbon>
                <el-table :data="tableItems"
                          :default-sort="{prop: 'name', order: 'ascending'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                                     width="55"
                                     align="center">
                    </el-table-column>
                    <el-table-column property="name"
                                     :label="$t('layouts.attributes.name')"
                                     sortable>
                    </el-table-column>
                    <el-table-column label="Templates"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.templates.length}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('layouts.attributes.category')"
                                     align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.category"
                                    type="primary"
                                    size="small"
                                    disable-transitions>
                                {{scope.row.category.name}}
                            </el-tag>
                            <template v-else>
                                -
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-tooltip effect="dark"
                                        :content="$t('general.actions.edit', {name : $t('layouts.singular')})"
                                        placement="top-start">
                                <el-button type="primary"
                                           size="small"
                                           @click="openUpsertModal(scope.row)"
                                           circle>
                                    <i class="fa fa-edit"></i>
                                </el-button>
                            </el-tooltip>
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
                                       @prev-click="setFilter('page[number]', $event)"
                                       @next-click="setFilter('page[number]', $event)"
                                       @current-change="setFilter('page[number]', $event)"
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
                              :item="selectedLayout"
                              @modal:close="closeUpsertModal"
                              @modal:add="addItem"
                              @modal:update="updateItem"
                              @modal:remove="removeItem">
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
                resource: 'layouts',
                selectedLayout: null,
                params: {
                    'page[number]': 1,
                    search: '',
                    category: '',
                    tags: '',
                    include: 'tags,templates'
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
                return this.resource + '/paginated?';
            },
            async getItems(url) {
                this.loading = true;
                try {
                    const {data} = await this.$axios.get(url + new QueryParams(this.params));
                    this.items = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            },
            addItem(item) {
                this.items.data.push(item);
                this.items.meta.total++;
                this.closeUpsertModal();
            },
            updateItem(item) {
                let index = this.items.data.findIndex(({id}) => id === item.id);
                this.items.data.splice(index, 1, item);
                this.closeUpsertModal();
            },
            removeItem(item) {
                let index = this.items.data.findIndex(({id}) => id === item.id);
                this.items.data.splice(index, 1);
                this.items.meta.total--;
                this.closeUpsertModal();
            },
            openUpsertModal(layout = null) {
                this.selectedLayout = layout;
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            }
        },
        computed: {
            text() {
                let name = this.selectedItems.length > 1 ? this.$t('layouts.plural') : this.$t('layouts.singular');

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
