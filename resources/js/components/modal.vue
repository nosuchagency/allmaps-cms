<template>
    <portal to="modals">
        <el-dialog v-if="visible"
                   :visible="visible"
                   :before-close="closeModal">
            <slot></slot>
            <template v-slot:footer>
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </portal>
</template>

<script>
    export default {
        props: {
            visible: Boolean
        },
        methods: {
            closeModal() {
                this.$emit('modal:close');
            }
        }
    }
</script>
