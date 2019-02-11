<template>
    <fetch-items :url="url">
        <el-select v-model="selection"
                   slot-scope="{items, loading}"
                   :placeholder="placeholder"
                   :multiple="multiple"
                   filterable
                   @change="$emit('input', $event)">
            <el-option v-for="(item, index) in items"
                       :key="index"
                       :label="item[label]"
                       :value="item[trackBy]">
            </el-option>
        </el-select>
    </fetch-items>
</template>

<script>
    export default {
        props: {
            value: {
                required: true
            },
            url: {
                type: String,
                required: true
            },
            multiple: {
                type: Boolean,
                default: true
            },
            trackBy: {
                type: String,
                default: 'id'
            },
            label: {
                type: String,
                default: 'name'
            },
            placeholder: {
                type: String
            },
        },
        data() {
            return {
                selection: this.value
            };
        }
    };
</script>

<style lang="scss" scoped>
</style>
