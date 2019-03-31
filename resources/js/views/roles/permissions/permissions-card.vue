<template>
    <el-card class="box-card">
        <template slot="header">
            <div class="title-icon-wrapper">
                <i class="fa title-icon" :class="`fa-${icon}`"></i>
                <label>{{title}}</label>
            </div>
            <div style="margin-left: auto;">
                <span style="font-size: 14px;">Advanced</span>
                <el-switch v-model="showAdvanced"></el-switch>
                <el-button type="success"
                           size="mini"
                           style="margin-left: 10px;"
                           :loading="form.busy"
                           @click="savePermissions(groups)">
                    Save
                </el-button>
            </div>
        </template>
        <div class="permissions-group">
            <div class="permission">
                <span class="permission-label">All</span>
                <el-switch :value="isPermissionsSet(groups)"
                           @change="togglePermissions($event, groups)">
                </el-switch>
            </div>
            <div class="permission">
                <span class="permission-label">Create</span>
                <el-switch :value="isPermissionsSet(groups, 'create')"
                           @change="togglePermissions($event, groups, 'create')">
                </el-switch>
            </div>
            <div class="permission">
                <span class="permission-label">Read</span>
                <el-switch :value="isPermissionsSet(groups, 'read')"
                           @change="togglePermissions($event, groups, 'read')">
                </el-switch>
            </div>
            <div class="permission">
                <span class="permission-label">Update</span>
                <el-switch :value="isPermissionsSet(groups, 'update')"
                           @change="togglePermissions($event, groups, 'update')">
                </el-switch>
            </div>
            <div class="permission">
                <span class="permission-label">Delete</span>
                <el-switch :value="isPermissionsSet(groups, 'delete')"
                           @change="togglePermissions($event,groups, 'delete')">
                </el-switch>
            </div>
        </div>
        <template v-if="showAdvanced">
            <template v-for="group in groups">
                <div class="permissions-group">
                    <div class="permissions-group-title">
                        <icon :resource="group"></icon>
                        <span class="title-text">{{group}}</span>
                    </div>
                    <div class="permission">
                        <span class="permission-label">All</span>
                        <el-switch :value="isPermissionsSet([group])"
                                   @change="togglePermissions($event,[group])">
                        </el-switch>
                    </div>
                    <template v-for="action in ['create', 'read', 'update', 'delete']">
                        <div class="permission">
                            <span class="permission-label">{{action}}</span>
                            <el-switch v-model="permissions[getIndex(`${group}.${action}`)].possessed">
                            </el-switch>
                        </div>
                    </template>
                </div>
            </template>
        </template>
    </el-card>
</template>

<script>
    import Form from '../../../utils/Form';

    export default {
        props: {
            title: String,
            icon: String,
            role: Object,
            groups: Array,
            permissions: Array
        },
        data() {
            return {
                showAdvanced: true,
                form: new Form({
                    name: this.role.name,
                    permissions: this.permissions.slice()
                })
            }
        },
        methods: {
            isPermissionsSet(groups = [], type = null) {
                for (let permission of this.form.permissions) {
                    let parts = permission.name.split('.');

                    if (!groups.includes(parts[0])) {
                        continue;
                    }

                    if ((type && parts[1] === type) || !type) {
                        if (!permission.possessed) {
                            return false;
                        }
                    }
                }

                return true;
            },
            togglePermissions(state, groups = [], type = null) {
                for (let permission of this.form.permissions) {
                    let parts = permission.name.split('.');

                    if (!groups.includes(parts[0])) {
                        continue;
                    }

                    if ((type && parts[1] === type) || !type) {
                        permission.possessed = state;
                    }
                }
            },
            getIndex(value) {
                return this.form.permissions.findIndex(({name}) => name === value);
            },
            savePermissions() {
                this.form.put(`/roles/${this.role.id}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .permissions-group {
        display: flex;
        margin-bottom: 25px;
        flex-wrap: wrap;

        &:last-child {
            margin-bottom: 0;
        }

        &-title {
            color: #666;
            flex: 100%;
            margin-bottom: 10px;

            .title-icon {
                margin-right: 5px;
            }

            .title-text {
                text-transform: capitalize;
            }
        }

        .permission {
            color: #666;
            margin-right: 20px;

            &-label {
                text-transform: capitalize;
                font-size: 14px;
            }
        }
    }
</style>