<template>
    <portal to="modals">
        <el-dialog v-if="visible"
                   :visible="visible"
                   :before-close="closeModal"
                   :width="width">
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
            visible: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '50%'
            }
        },
        methods: {
            closeModal() {
                this.$emit('modal:close');
            }
        }
    }
</script>
