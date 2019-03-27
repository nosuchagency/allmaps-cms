<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-key title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('tokens.singular')})"
                                placement="top-start"
                                v-if="$auth.user().permissions.includes('tokens.update')">
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
                    <template slot="header">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-tasks title-icon"></i>
                            <label>Activity</label>
                        </div>
                    </template>
                    <el-table :data="item.actions"
                              :default-sort="{prop: 'name', order: 'ascending'}">
                        <el-table-column label="Token">
                            <template slot-scope="scope">
                                {{scope.row.causer.name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Action">
                            <template slot-scope="scope">
                                <action-icon :action="scope.row.description"></action-icon>
                                {{scope.row.description}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Resource">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.subject_type">
                                    <resource-icon :resource="scope.row.subject_type"></resource-icon>
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
                              @upsert-modal:update="updateItem"
                              @upsert-modal:remove="removeItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import upsertModal from './upsert-modal';
    import resourceIcon from '../../components/resource-icon';
    import actionIcon from '../../components/action-icon';

    export default {
        components: {
            upsertModal,
            resourceIcon,
            actionIcon
        },
        data() {
            return {
                resource: 'tokens',
                upsertModalVisible: false,
                item: null
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
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>