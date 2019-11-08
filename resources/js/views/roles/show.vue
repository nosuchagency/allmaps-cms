<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-id-badge title-icon"></i>
                        <label>{{item ? item.name : ''}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('roles.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('role:update')">
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
            <div class="loading" v-if="!item || availablePermissions.length === 0">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div class="content" v-else>
                <div style="display: flex">
                    <el-button type="success"
                               size="mini"
                               style="margin-left: auto; margin-bottom: 10px;"
                               :loading="busy"
                               @click="save()">
                        Save
                    </el-button>
                </div>
                <template v-for="grouping in permissionGroupings">
                    <permissions-card :grouping="grouping"
                                      :available-permissions="availablePermissions"
                                      :permissions="item.permissions"
                                      @permission:add="addPermission"
                                      @permission:remove="removePermission">
                    </permissions-card>
                </template>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              @modal:close="closeUpsertModal"
                              @modal:update="updateItem"
                              @modal:remove="removeItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import upsertModal from './upsert-modal';
    import permissionsCard from './permissions/permissions-card';

    export default {
        components: {
            permissionsCard,
            upsertModal
        },
        data() {
            return {
                resource: 'roles',
                upsertModalVisible: false,
                item: null,
                availablePermissions: [],
                permissionGroupings: [
                    {title: 'Places', icon: 'map-marked-alt', groups: ['place', 'building', 'floor']},
                    {title: 'Content', icon: 'archive', groups: ['container', 'folder', 'content']},
                    {title: 'Locations', icon: 'map-pin', groups: ['beacon', 'poi', 'fixture']},
                    {title: 'User Management', icon: 'users-cog', groups: ['user', 'role', 'token']},
                    {
                        title: 'Settings',
                        icon: 'cog',
                        groups: ['category', 'tag', 'component', 'layout', 'template']
                    }
                ],
                busy: false
            };
        },
        created() {
            this.fetch();
            this.fetchAvailablePermissions();
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
            async fetchAvailablePermissions() {
                try {
                    const {data} = await this.$axios.get('/permissions');
                    this.availablePermissions = data;
                } catch (error) {
                    console.log(error);
                }
            },
            addPermission(permission) {
                let index = this.item.permissions.findIndex(({id}) => id === permission.id);

                if (index === -1) {
                    this.item.permissions.push(permission);
                }
            },
            removePermission(permission) {
                let index = this.item.permissions.findIndex(({id}) => id === permission.id);
                if (index !== -1) {
                    this.item.permissions.splice(index, 1);
                }
            },
            async save() {
                this.busy = true;

                try {
                    const {data} = await this.$axios.put(`/roles/${this.item.id}`, {permissions: this.item.permissions});
                    this.item = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.busy = false;
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
