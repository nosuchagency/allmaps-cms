<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-archive title-icon"></i>
                        <template v-if="item">
                            <router-link v-if="item"
                                         :to="{ name: 'containers-show', params: { id: item.container.id }}">
                                {{ item.container.name }}
                            </router-link>
                            <i class="fa fa-caret-right"></i>
                            <i class="fa fa-folder title-icon"></i>
                            <label>{{item.name}}</label>
                        </template>
                    </div>
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('folders.singular')})"
                                placement="top-start"
                                v-if="$auth.user().hasPermissionTo('folder:update')">
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
                              @modal:close="closeUpsertModal"
                              @modal:update="updateItem"
                              @modal:remove="removeItem">
                </upsert-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import contentsTable from '../containers/components/contents-table';
    import upsertModal from './upsert-modal';

    export default {
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
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(`/${this.resource}/${this.$route.params.id}`);
                    console.log(data);
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
                this.$router.push(`/containers/${this.$route.params.containerId}`);
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
    .router-link-active {
        &:hover {
            color: #939393;
        }
    }

    .fa-caret-right {
        margin: 0 10px;
    }
</style>
