<template>
    <el-col :span="span">
        <el-row :gutter="5">
            <el-col :span="14">
                <el-select v-model="selectedBulkAction"
                           :placeholder="placeholder"
                           :disabled="!selections.length > 0"
                           size="small">
                    <el-option v-for="item in bulkActions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button size="small"
                           :disabled="!selections.length > 0 || !selectedBulkAction"
                           @click="$emit('apply-bulk-action', selectedBulkAction)">
                    {{$t('general.actions.apply')}}
                </el-button>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
    export default {
        props: {
            selections: {
                type: Array,
                default: () => []
            },
            bulkActions: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: 'Bulk Actions'
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
                selectedBulkAction: null
            }
        },
        watch: {
            selections(selections) {
                if (selections.length === 0) {
                    this.selectedBulkAction = null;
                }
            }
        },
    }
</script>
