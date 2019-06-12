<template>
    <portal to="modals"
            v-if="visible">
        <el-dialog :title="title"
                   :visible="visible"
                   width="30%"
                   :before-close="cancel">
            <span>{{message}}</span>
            <span slot="footer"
                  class="dialog-footer">
            <el-button @click="cancel"
                       size="small">
                Cancel
            </el-button>
            <el-button type="primary"
                       size="small"
                       :loading="loading"
                       @click="confirm">
                Confirm
            </el-button>
        </span>
        </el-dialog>
    </portal>
</template>

<script>
    export default {
        props: {
            title: String,
            message: String,
            visible: Boolean
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            cancel() {
                this.$emit('cancel');
            },
            confirm() {
                this.loading = true;
                this.$emit('confirm');
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
