<template>
    <el-card>
        <template slot="header">
            <div class="title-icon-wrapper">
                <i class="fa title-icon" :class="`fa-${grouping.icon}`"></i>
                <label>{{grouping.title}}</label>
            </div>
            <div style="margin-left: auto;">
                <span style="font-size: 14px;">Advanced</span>
                <el-switch v-model="showAdvanced"></el-switch>
            </div>
        </template>
        <div class="permissions-group">
            <div class="permission">
                <span class="permission-label">All</span>
                <el-switch :value="hasAllPermissions()"
                           @change="setAllPermissions($event)">
                </el-switch>
            </div>
            <template v-for="action in actions">
                <div class="permission">
                    <span class="permission-label">{{action}}</span>
                    <el-switch :value="hasAllPermissionsByAction(action)"
                               @change="setAllPermissionsByAction(action, $event)">
                    </el-switch>
                </div>
            </template>
        </div>
        <template v-if="showAdvanced">
            <template v-for="group in grouping.groups">
                <div class="permissions-group">
                    <div class="permissions-group-title">
                        <icon :resource="group"></icon>
                        <span class="title-text">{{group}}</span>
                    </div>
                    <div class="permission">
                        <span class="permission-label">All</span>
                        <el-switch :value="hasAllPermissionsInGroup(group)"
                                   @change="setAllPermissionsInGroup(group, $event)">
                        </el-switch>
                    </div>
                    <template v-for="action in actions">
                        <div class="permission">
                            <span class="permission-label">{{action}}</span>
                            <el-switch
                                    @change="setPermission(getPermission(group + ':' + action), $event)"
                                    :value="hasPermission(getPermission(group + ':' + action))">
                            </el-switch>
                        </div>
                    </template>
                </div>
            </template>
        </template>
    </el-card>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        props: {
            grouping: Object,
            availablePermissions: Array,
            permissions: Array
        },
        data() {
            return {
                showAdvanced: !!+Cookies.get(this.grouping.title),
                actions: ['create', 'read', 'update', 'delete']
            }
        },
        watch: {
            showAdvanced(value) {
                Cookies.set(this.grouping.title, value ? 1 : 0);
            }
        },
        methods: {
            getPermission(permission) {
                return this.availablePermissions.find(({name}) => name === permission);
            },
            hasPermission(permission) {
                return this.permissions.some(({name}) => name === permission.name);
            },
            setPermission(permission, state) {
                let index = this.permissions.findIndex(({name}) => name === permission.name);

                if (state && index === -1) {
                    this.$emit('permission:add', permission);
                } else if (!state && index !== -1) {
                    this.$emit('permission:remove', permission);
                }
            },
            hasAllPermissionsInGroup(group) {
                return this.actions.every(action => this.hasPermission(this.getPermission(group + ':' + action)));
            },
            setAllPermissionsInGroup(group, state) {
                this.actions.forEach(action => this.setPermission(this.getPermission(group + ':' + action), state))
            },
            hasAllPermissionsByAction(action) {
                return this.grouping.groups.every(group => this.hasPermission(this.getPermission(group + ':' + action)));
            },
            setAllPermissionsByAction(action, state) {
                this.grouping.groups.forEach(group => this.setPermission(this.getPermission(group + ':' + action), state));
            },
            hasAllPermissions() {
                return this.grouping.groups.every(group => this.hasAllPermissionsInGroup(group));
            },
            setAllPermissions(state) {
                this.grouping.groups.forEach(group => this.setAllPermissionsInGroup(group, state));
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
