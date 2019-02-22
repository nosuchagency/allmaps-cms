<template>
    <div class="poi-select">
        <el-button size="small"
                   type="primary"
                   @click="showModal = true">
            Point of Interest
        </el-button>
        <portal to="modals" v-if="showModal">
            <el-dialog :visible.sync="showModal">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Point of Interest" name="poi">
                        <br>
                        <fetch-items url="/pois">
                            <el-select v-model="poi"
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
                               @click="addPoi"
                               :loading="adding"
                               :disabled="!poi">
                        Add Poi
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
                currentTab: 'poi',
                showModal: false,
                poi: null,
                adding: false
            }
        },
        methods: {
            async addPoi() {
                try {
                    this.adding = true;
                    const {data: location} = await this.$axios.post(this.url + '/locations', {poi_id: this.poi.id});
                    this.$emit('poi:add', location);
                    this.showModal = false;
                    this.poi = null;
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
    .poi-select {
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