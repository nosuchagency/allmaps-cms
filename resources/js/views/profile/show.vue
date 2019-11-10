<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-user title-icon"></i>
                        <label>{{$t('profile.title')}}</label>
                    </div>
                </template>
                <template slot="middle">
                </template>
                <template slot="right">
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('users.attributes.password')})"
                                placement="top-start">
                        <el-button type="primary"
                                   size="small"
                                   @click="openPasswordModal()"
                                   circle>
                            <i class="fa fa-lock"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark"
                                :content="$t('general.actions.update', {name : $t('users.singular')})"
                                placement="top-start">
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
                <el-card>
                    <div slot="header" class="clearfix">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-file-invoice title-icon"></i>
                            <label>Content</label>
                        </div>
                    </div>
                    <el-row>
                        <el-col :span="8">
                            <label class="label">Email:</label>
                            <p class="user-email">{{item.email}}</p>
                            <label class="label">Role:</label>
                            <p class="user-role">{{item.role.name}}</p>
                            <label class="label">Locale:</label>
                            <p class="user-locale">{{item.locale || 'English'}}</p>
                            <label class="label">Description:</label>
                            <p class="user-description">{{item.description}}</p>
                        </el-col>
                        <el-col :span="8">
                            <user-location-statistics :item="item"></user-location-statistics>
                        </el-col>
                        <el-col :span="8">
                            <user-content-statistics :item="item"></user-content-statistics>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card>
                    <template slot="header">
                        <div class="title-icon-wrapper">
                            <i class="fa fa-tasks title-icon"></i>
                            <label>Activity</label>
                        </div>
                    </template>
                    <el-table :data="item.activities"
                              :default-sort="{prop: 'name', order: 'ascending'}">
                        <el-table-column label="User">
                            <template slot-scope="scope">
                                {{scope.row.causer.name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Action">
                            <template slot-scope="scope">
                                <icon :resource="scope.row.description"></icon>
                                {{scope.row.description}}
                            </template>
                        </el-table-column>
                        <el-table-column label="Resource">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.subject_type">
                                    <icon :resource="scope.row.subject_type"></icon>
                                </el-tooltip>
                                {{scope.row.subject.name}}
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
                              @modal:close="closeUpsertModal"
                              @modal:update="updateItem">
                </upsert-modal>
                <password-modal v-if="passwordModalVisible"
                                :visible="passwordModalVisible"
                                :item="item"
                                @modal:close="closePasswordModal"
                                @modal:update="updateItem">
                </password-modal>
            </div>
        </template>
    </layout>
</template>

<script>
    import upsertModal from './upsert-modal';
    import passwordModal from './password-modal';
    import userContentStatistics from './user-content-statistics';
    import userLocationStatistics from './user-location-statistics';

    export default {
        components: {
            upsertModal,
            passwordModal,
            userContentStatistics,
            userLocationStatistics
        },
        data() {
            return {
                item: null,
                upsertModalVisible: false,
                resource: 'profile',
                passwordModalVisible: false,
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    const {data} = await this.$axios.get(`/${this.resource}`);
                    this.item = data;
                } catch (error) {
                    console.log(error);
                }
            },
            updateItem(item) {
                this.item = item;
                this.$i18n.locale = item.locale;
                this.closeUpsertModal();
                this.closePasswordModal();
            },
            openUpsertModal() {
                this.upsertModalVisible = true;
            },
            closeUpsertModal() {
                this.upsertModalVisible = false;
            },
            openPasswordModal() {
                this.passwordModalVisible = true;
            },
            closePasswordModal() {
                this.passwordModalVisible = false;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
