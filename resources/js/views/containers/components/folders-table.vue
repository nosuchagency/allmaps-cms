<template>
    <drag-table :items="item.folders"
                @reorder="reorder"
                @row-clicked="$router.push({name: 'folders-show', params: {containerId : item.id, id: $event.id}})">
        <template slot="header">
            <div class="title-icon-wrapper">
                <i class="fa fa-folder title-icon"></i>
                <label>Folders</label>
            </div>
            <el-tooltip effect="dark"
                        content="Create new Folder"
                        placement="top-start"
                        style="margin-left: auto;"
                        v-if="$auth.user().permissions.includes('folders.create')">
                <el-button type="primary"
                           size="small"
                           @click="openFolderModal()"
                           circle>
                    <i class="fa fa-plus"></i>
                </el-button>
            </el-tooltip>
        </template>
        <template slot="table-columns">
            <el-table-column label="Name">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('beacons.attributes.category')"
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
            <folder-modal v-if="folderModalVisible"
                          :visible="folderModalVisible"
                          :item="selectedFolder"
                          :container="item"
                          @upsert-modal:close="closeFolderModal"
                          @upsert-modal:add="addFolder">
            </folder-modal>
        </template>
    </drag-table>
</template>

<script>
    import dragTable from 'js/components/drag-table.vue';
    import folderModal from '../../folders/upsert-modal';

    export default {
        props: {
            item: Object,
            name: String
        },
        data() {
            return {
                folderModalVisible: false,
                reordering: false,
                selectedFolder: null
            };
        },
        components: {
            dragTable,
            folderModal
        },
        methods: {
            addFolder(folder) {
                this.item.folders.push(folder);
                this.closeFolderModal();
            },
            openFolderModal(item = null) {
                this.selectedFolder = item;
                this.folderModalVisible = true;
            },
            closeFolderModal() {
                this.folderModalVisible = false;
            },
            async reorder(items) {
                this.reordering = true;

                try {
                    await this.$axios.put('/folders/reorder', {items});
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
    .el-table {
        /deep/ &__row {
            cursor: pointer;
        }
    }
</style>
