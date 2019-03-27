<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-map-signs title-icon"></i>
                        <label>{{$t('map-components.plural')}}</label>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.create', {name : $t('map-components.singular')})"
                                placement="top-start"
                                v-if="$auth.user().permissions.includes('map-components.create')">
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
                <ribbon @bulk-action="applyBulkAction"
                        @ribbon:search="search"
                        @ribbon:category="categoryFilter"
                        @ribbon:tag="tagsFilter"
                        :selections="selectedItems"
                        :bulk-actions="bulkActions">
                </ribbon>
                <el-table :data="tableItems"
                          :default-sort="{prop: 'name', order: 'ascending'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                                     width="55"
                                     align="center">
                    </el-table-column>
                    <el-table-column property="name"
                                     :label="$t('map-components.attributes.name')"
                                     sortable>
                    </el-table-column>
                    <el-table-column property="type"
                                     :label="$t('map-components.attributes.type')"
                                     sortable>
                    </el-table-column>
                    <el-table-column property="shape"
                                     :label="$t('map-components.attributes.shape')"
                                     sortable>
                    </el-table-column>
                    <el-table-column property="weight"
                                     :label="$t('map-components.attributes.thickness')"
                                     sortable>
                    </el-table-column>
                    <el-table-column property="color"
                                     :label="$t('map-components.attributes.color')"
                                     sortable>
                    </el-table-column>
                    <el-table-column :label="$t('containers.attributes.category')"
                                     align="center"
                                     sortable>
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
                                        :content="$t('general.actions.edit', {name : $t('map-components.singular')})"
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
                                       @prev-click="refetch"
                                       @next-click="refetch"
                                       @current-change="refetch"
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
                              :item="selectedMapComponent"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:add="addItem"
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import multipleSelection from 'js/mixins/multiple-selection';
    import upsertModal from './upsert-modal';
    import _ from 'lodash';

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
                resource: 'map-components',
                searchQuery: '',
                selectedCategory: '',
                selectedTags: [],
                selectedMapComponent: null
            };
        },
        created() {
            this.getItems(this.getUrl() + this.getRelationsParams());
        },
        methods: {
            categoryFilter(category) {
                this.selectedCategory = category;
                this.getItems(this.getUrl() + this.getRelationsParams() + this.getFilterParams());
            },
            tagsFilter(tags) {
                this.selectedTags = tags;
                this.getItems(this.getUrl() + this.getRelationsParams() + this.getFilterParams());
            },
            search: _.debounce(function (query) {
                this.searchQuery = query;
                this.getItems(this.getUrl() + this.getRelationsParams() + this.getFilterParams());
            }, 500),
            refetch(page) {
                this.getItems(this.getUrl() + this.getRelationsParams() + this.getFilterParams() + '&page=' + page);
            },
            getUrl() {
                return this.resource + '/paginated?';
            },
            getRelationsParams() {
                return 'include=tags';
            },
            getFilterParams() {
                return '&search=' + this.searchQuery + '&category=' + this.selectedCategory + '&tags=' + this.selectedTags.join(',');
            },
            async getItems(url) {
                try {
                    this.loading = true;
                    const response = await this.$axios.get(url);
                    this.items = response.data;
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
            openUpsertModal(mapComponent = null) {
                this.selectedMapComponent = mapComponent;
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
        },
        computed: {
            text() {
                let name = this.selectedItems.length > 1 ? this.$t('map-components.plural') : this.$t('map-components.singular');

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
