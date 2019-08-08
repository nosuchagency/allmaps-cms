<template>
    <el-col :offset="offset"
            :span="span">
        <el-input v-model="searchQuery"
                  size="small"
                  :placeholder="placeholder"
                  @input="throttledSearch">
        </el-input>
    </el-col>
</template>

<script>
    import debounce from 'lodash/debounce';

    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Search...'
            },
            offset: {
                type: Number,
                default: 0,
            },
            span: {
                type: Number,
                default: 6
            }
        },
        data() {
            return {
                searchQuery: ''
            }
        },
        created() {
            this.throttledSearch = debounce(($event) => {
                this.$emit('search', $event);
            }, 500)
        },
    }
</script>

<style lang="scss" scoped>

</style>
