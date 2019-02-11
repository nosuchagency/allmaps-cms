<template>
    <div class="permission-type">
        <span class="permission-action">
            {{permissionType}}
        </span>
        <el-switch v-model="checkboxState">
        </el-switch>
    </div>
</template>

<script>
    export default {
        props: {
            permissionName: String,
            permissionType: String,
            permissions: Array,
            roleId: Number,
        },
        methods: {
            async updatePermission(state) {
                try {
                    const {data} = await this.$axios({
                        'method': this.getHttpMethod(state),
                        'url': this.getUrl()
                    });

                    this.$emit('permissions:update', data)
                } catch (error) {
                    console.log(error);
                }
            },
            getHttpMethod(value) {
                return value ? 'POST' : 'DELETE';
            },
            getUrl() {
                return '/roles/' + this.roleId + '/permissions/' + this.permissionName;
            }
        },
        computed: {
            checkboxState: {
                get() {
                    return this.permissions.includes(this.permissionName);
                },
                set(value) {
                    this.updatePermission(value);
                }
            },
        }
    }
</script>