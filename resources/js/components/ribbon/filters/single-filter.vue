<template>
    <el-col :span="span"
            :offset="offset">
        <fetch-items :url="url">
            <el-select v-model="selectedItem"
                       :placeholder="placeholder"
                       @change="$emit('selection', $event)"
                       slot-scope="{items, loading}"
                       size="small"
                       filterable
                       clearable
                       value-key="id">
                <el-option v-for="item in items"
                           :key="item.id"
                           :label="item.name"
                           :value="item">
                </el-option>
            </el-select>
        </fetch-items>
    </el-col>
</template>

<script>
    export default {
        props: {
            url: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: 'Choose item'
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
                selectedItem: null
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
