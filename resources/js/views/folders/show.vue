<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-archive title-icon"></i>
                        <template v-if="item">
                            <router-link v-if="item" :to="'/containers/' + item.container.id">
                                {{ item.container.name }}
                            </router-link>
                            <i class="fa fa-caret-right" style="margin: 0 10px;"></i>
                            <i class="fa fa-folder title-icon"></i>
                            <label>{{item.name}}</label>
                        </template>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('folders.singular')})"
                                placement="top-start"
                                v-if="$auth.user().permissions.includes('folders.update')">
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
                <contents-table v-if="item"
                                :folder="item"
                                :name="item.name">
                </contents-table>
                <upsert-modal v-if="upsertModalVisible"
                              :visible="upsertModalVisible"
                              :item="item"
                              :container-id="$route.params.containerId"
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
    import form from 'js/mixins/form';
    import contentsTable from '../containers/components/contents-table.vue';
    import upsertModal from './upsert-modal';

    export default {
        mixins: [resource, form],
        components: {
            contentsTable,
            upsertModal
        },
        data() {
            return {
                resource: 'folders',
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
            },
            getReadUrl() {
                return '/containers/' + this.$route.params.containerId + '/folders/' + this.$route.params.id;
            },
            getCreateUrl() {
                return '/containers/' + this.$route.params.containerId + '/folders';
            },
            getUpdateUrl() {
                return this.getReadUrl();
            },
            getRemoveUrl() {
                return this.getReadUrl();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .router-link-active {
        &:hover {
            color: #939393;
        }
    }
</style>
