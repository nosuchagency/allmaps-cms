<template>
    <div class="findable-select">
        <el-button size="small"
                   type="primary"
                   @click="showModal = true">
            Findable
        </el-button>
        <portal to="modals" v-if="showModal">
            <el-dialog :visible.sync="showModal">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Findable" name="findable">
                        <br>
                        <fetch-items url="/findables">
                            <el-select v-model="findable"
                                       slot-scope="{items, loading}"
                                       placeholder="Select"
                                       clearable
                                       filterable
                                       value-key="id">
                                <el-option v-for="item in items"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </fetch-items>
                    </el-tab-pane>
                </el-tabs>
                <span slot="footer">
                    <el-button type="text"
                               size="small"
                               @click="showModal = false">
                        Cancel
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               @click="addFindable"
                               :loading="adding"
                               :disabled="!findable">
                        Add Findable
                    </el-button>
                </span>
            </el-dialog>
        </portal>
    </div>
</template>

<script>
    export default {
        props: {
            url: String
        },
        data() {
            return {
                currentTab: 'findable',
                showModal: false,
                findable: null,
                adding: false
            }
        },
        methods: {
            async addFindable() {
                try {
                    this.adding = true;
                    const {data: location} = await this.$axios.post(this.url + '/locations', {findable_id: this.findable.id});
                    this.$emit('findable:add', location);
                    this.showModal = false;
                    this.findable = null;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.adding = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .findable-select {
        margin-right: 7px;
    }

    .el-dialog {
        /deep/ &__header {
            display: none;
        }

        /deep/ &__footer {
            padding: 20px;
            border-top: 1px solid #dfdfdf;
        }
    }
</style>