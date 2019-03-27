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
                                v-if="$auth.user().permissions.includes('roles.update')">
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
                <permissions-card :role="item"
                                  :advanced="item.advanced_places"
                                  title="Places"
                                  icon="map-marked-alt"
                                  :permissions="['places', 'buildings', 'floors']">
                </permissions-card>
                <permissions-card :role="item"
                                  :advanced="item.advanced_content"
                                  :permissions="['containers', 'folders', 'contents']"
                                  title="Content"
                                  icon="archive">
                </permissions-card>
                <permissions-card :role="item"
                                  :advanced="item.advanced_locations"
                                  :permissions="['beacons', 'pois', 'searchables']"
                                  title="Locations"
                                  icon="map-pin">
                </permissions-card>
                <permissions-card :role="item"
                                  :advanced="item.advanced_user_management"
                                  :permissions="['users', 'roles', 'tokens']"
                                  title="User Management"
                                  icon="users-cog">
                </permissions-card>
                <permissions-card :role="item"
                                  :advanced="item.advanced_settings"
                                  :permissions="['categories', 'tags', 'map-components', 'layouts', 'templates']"
                                  title="Settings"
                                  icon="cogs">
                </permissions-card>
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
    import resource from 'js/mixins/resource';
    import upsertModal from './upsert-modal';
    import permissionsCard from "./permissions/permissions-card";

    export default {
        mixins: [resource],
        components: {
            permissionsCard,
            upsertModal
        },
        data() {
            return {
                resource: 'roles',
                upsertModalVisible: false,
                item: null
            };
        },
        methods: {
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