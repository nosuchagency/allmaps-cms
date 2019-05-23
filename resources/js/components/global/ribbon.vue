<template>
    <el-row>
        <el-col :span="8">
            <el-row :gutter="5">
                <el-col :span="14">
                    <el-select placeholder="Bulk Actions"
                               size="small"
                               :disabled="!anySelections"
                               :value="selectedBulkAction"
                               @input="$emit('ribbon:bulk-action', $event)"
                               value-key="value">
                        <el-option v-for="item in bulkActions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-button size="small"
                               :disabled="!anySelections || !selectedBulkAction"
                               @click="$emit('ribbon:apply', selectedBulkAction)">
                        {{$t('general.actions.apply')}}
                    </el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="16">
            <el-row type="flex"
                    justify="end"
                    :gutter="5">
                <el-col :span="5" v-if="searchQueryActivated">
                    <el-input v-model="searchQuery"
                              size="small"
                              clearable
                              placeholder="Search ..."
                              @input="throttledSearch">
                    </el-input>
                </el-col>
                <el-col :span="6" v-if="categoryFilterActivated">
                    <fetch-items url="/categories">
                        <el-select v-model="selectedCategory"
                                   slot-scope="{items, loading}"
                                   size="small"
                                   clearable
                                   filterable
                                   placeholder="Choose Category"
                                   @change="$emit('ribbon:category', $event ? $event : '')">
                            <el-option v-for="item in items"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </fetch-items>
                </el-col>
                <el-col :span="10" v-if="tagsFilterActivated">
                    <fetch-items url="/tags">
                        <el-select v-model="selectedTags"
                                   slot-scope="{items, loading}"
                                   size="small"
                                   multiple
                                   filterable
                                   value-key="id"
                                   placeholder="Choose tags"
                                   @change="$emit('ribbon:tag', $event)">
                            <el-option v-for="item in items"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </fetch-items>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
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
            selectedBulkAction: {
                type: Object,
                default: null
            },
            searchQueryActivated: {
                type: Boolean,
                default: true
            },
            categoryFilterActivated: {
                type: Boolean,
                default: true
            },
            tagsFilterActivated: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                searchQuery: '',
                selectedCategory: null,
                selectedTags: []
            }
        },
        created() {
            this.throttledSearch = _.debounce(($event) => {
                this.$emit('ribbon:search', $event);
            }, 500)
        },
        computed: {
            anySelections() {
                return this.selections.length > 0;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 10px;
    }
</style>