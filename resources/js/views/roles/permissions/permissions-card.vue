<template>
    <el-card class="box-card">
        <template slot="header">
            <div class="title-icon-wrapper">
                <i class="fa title-icon" :class="'fa-' + icon"></i>
                <label>{{title}}</label>
            </div>
            <div style="margin-left: auto;">
                <span style="font-size: 14px;">Advanced</span>
                <el-switch v-model="showAdvanced"
                           @change="toggleAdvanced">
                </el-switch>
            </div>
        </template>
        <div class="permissions-container">
            <div class="permission-types">
                <div class="permission-type">
                    <span class="permission-action">All</span>
                    <el-switch></el-switch>
                </div>
                <div class="permission-type">
                    <span class="permission-action">Create</span>
                    <el-switch></el-switch>
                </div>
                <div class="permission-type">
                    <span class="permission-action">Read</span>
                    <el-switch></el-switch>
                </div>
                <div class="permission-type">
                    <span class="permission-action">Update</span>
                    <el-switch></el-switch>
                </div>
                <div class="permission-type">
                    <span class="permission-action">Delete</span>
                    <el-switch></el-switch>
                </div>
            </div>
        </div>
        <br v-if="showAdvanced"><br v-if="showAdvanced">
        <template v-for="(permission, index) in permissions">
            <div class="permissions-container" v-if="showAdvanced">
                <div class="permission-entity">
                    <div class="title-icon-wrapper">
                        <resource-icon class="title-icon"
                                       :resource="permission">
                        </resource-icon>
                        <label class="permission-entity-name">
                            {{permission}}
                        </label>
                    </div>
                </div>
                <div class="permission-types">
                    <div class="permission-type">
                        <span class="permission-action">All</span>
                        <el-switch></el-switch>
                    </div>
                    <permission-switch v-for="item in ['create', 'read', 'update', 'delete']"
                                       :key="item"
                                       :permission-type="item"
                                       :permission-name="permission + '.' + item"
                                       :permissions="roleCopy.permissions"
                                       :role-id="roleCopy.id"
                                       @permissions:update="roleCopy = $event">
                    </permission-switch>
                </div>
                <template v-if="permissions.length !== (index + 1)">
                    <br><br>
                </template>
            </div>
        </template>
    </el-card>
</template>

<script>
    import permissionSwitch from './permissions-switch';
    import resourceIcon from '../../../components/resource-icon';

    export default {
        components: {
            permissionSwitch,
            resourceIcon
        },
        props: {
            role: Object,
            permissions: Array,
            title: String,
            icon: String,
            advanced: Boolean,
        },
        data() {
            return {
                roleCopy: this.role,
                showAdvanced: this.advanced
            }
        },
        methods: {
            toggleAdvanced(val) {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .permissions-container {
        .permission-entity {
            margin-bottom: 10px;

            &-name {
                text-transform: capitalize;
            }
        }

        .permission-types {
            display: flex;

            .permission-type {
                margin-right: 20px;

                /deep/ .permission-action {
                    text-transform: capitalize;
                    font-size: 14px;
                }
            }
        }
    }
</style>