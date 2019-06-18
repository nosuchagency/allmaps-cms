<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-bars title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('menus.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('menus.update')">
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
                <drag-table :items="item.items"
                            @reorder="reorder">
                    <template slot="header">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-stream title-icon"></i>
                            <label>Menu Items</label>
                        </div>
                        <div style="margin-left: auto;">
                            <template v-for="(element, index) in menuables">
                                <el-tooltip :key="index"
                                            effect="dark"
                                            :content="'Add ' + element"
                                            placement="top-start">
                                    <el-button type="primary"
                                               size="mini"
                                               style="margin-left: 10px;"
                                               @click="openMenuItemModal(element)">
                                        <icon :resource="element"></icon>
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </div>
                    </template>
                    <template slot="table-columns">
                        <el-table-column label="Type"
                                         align="center">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.type">
                                    <el-button type="primary"
                                               size="mini"
                                               style="margin-left: 10px; cursor: default">
                                        <icon :resource="scope.row.type"></icon>
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="Title">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Menuable">
                            <template slot-scope="scope">
                                <span>{{scope.row.menuable ? scope.row.menuable.name : '-' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="100"
                                         align="center">
                            <template slot-scope="scope">
                                <el-tooltip effect="dark"
                                            content="Edit content"
                                            placement="top-start">
                                    <el-button type="primary"
                                               size="small"
                                               circle
                                               v-if="$auth.user().hasPermissionTo('menus.update')"
                                               @click="openMenuItemModal(scope.row.type, scope.row)">
                                        <i class="fa fa-edit"></i>
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </template>
                </drag-table>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @upsert-modal:close="closeUpsertModal"
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
                <menu-item-upsert-modal v-if="menuItemModalActive"
                                        :visible="menuItemModalActive"
                                        :type="menuItemType"
                                        :menu="item"
                                        :item="selectedMenuItem"
                                        @menu-item-modal:add="addMenuItem"
                                        @menu-item-modal:remove="removeMenuItem"
                                        @menu-item-modal:update="updateMenuItem"
                                        @menu-item-modal:close="closeMenuItemModal">
                </menu-item-upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import dragTable from 'js/components/drag-table';
    import upsertModal from './upsert-modal';
    import menuItemUpsertModal from '../menu-items/upsert-modal';

    export default {
        components: {
            dragTable,
            upsertModal,
            menuItemUpsertModal
        },
        data() {
            return {
                resource: 'menus',
                upsertModalVisible: false,
                item: null,
                menuables: [
                    'header',
                    'poi',
                    'location',
                    'tag',
                    'category',
                ],
                menuItemType: null,
                menuItemModalActive: false,
                selectedMenuItem: null
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
            addMenuItem(menuItem) {
                this.item.items.push(menuItem);
                this.closeMenuItemModal();
            },
            updateMenuItem(menuItem) {
                let index = this.item.items.findIndex(item => item.id === menuItem.id);
                this.item.items.splice(index, 1, menuItem);
                this.closeMenuItemModal();
            },
            removeMenuItem(menuItem) {
                let index = this.item.items.findIndex(item => item.id === menuItem.id);
                this.item.items.splice(index, 1);
                this.closeMenuItemModal();
            },
            openMenuItemModal(menuItemType, menuItem) {
                this.menuItemType = menuItemType;
                this.selectedMenuItem = menuItem;
                this.menuItemModalActive = true;
            },
            closeMenuItemModal() {
                this.menuItemType = null;
                this.menuItemModalActive = false;
                this.selectedMenuItem = null;
            },
            async reorder(items) {
                this.reordering = true;

                try {
                    await this.$axios.put('/menu-items/reorder', {items});
                } catch (error) {
                    console.log(error);
                } finally {
                    this.reordering = false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
