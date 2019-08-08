<template>
    <el-col :span="span"
            :offset="offset">
        <el-date-picker v-model="date"
                        @change="$emit('selection', $event)"
                        type="datetime"
                        size="small"
                        format="dd-MM-yyyy HH:mm"
                        value-format="dd-MM-yyyy HH:mm"
                        :placeholder="placeholder">
        </el-date-picker>
    </el-col>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Choose date'
            },
            span: {
                type: Number,
                default: 6
            },
            offset: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                date: null
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ {
        .el-date-editor {
            width: 100%;
        }
    }
</style>
