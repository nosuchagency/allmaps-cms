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
            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>
            <div class="content" v-else>
                <template v-for="permission in permissions">
                    <permissions-card :title="permission.title"
                                      :icon="permission.icon"
                                      :role="item"
                                      :permissions="item.permissions.filter(({name}) => permission.groups.includes(name.split('.')[0]))"
                                      :groups="permission.groups">
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
                showAdvancedPlaces: false,
                showAdvancedContent: false,
                showAdvancedLocations: false,
                showAdvancedUserManagement: false,
                showAdvancedSettings: false,
                permissions: [
                    {title: 'Places', icon: 'map-marked-alt', groups: ['places', 'buildings', 'floors']},
                    {title: 'Content', icon: 'archive', groups: ['containers', 'folders', 'contents']},
                    {title: 'Locations', icon: 'map-pin', groups: ['beacons', 'pois', 'fixtures']},
                    {title: 'User Management', icon: 'users-cog', groups: ['users', 'roles', 'tokens']},
                    {
                        title: 'Settings',
                        icon: 'cog',
                        groups: ['categories', 'tags', 'components', 'layouts', 'templates']
                    }
                ]
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
