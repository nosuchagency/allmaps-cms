<template>
    <div class="beacon-select">
        <el-button size="small"
                   type="primary"
                   @click="showModal = true">
            Beacon
        </el-button>
        <portal to="modals" v-if="showModal">
            <el-dialog :visible.sync="showModal">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Beacon" name="beacon">
                        <br>
                        <fetch-items url="/beacons">
                            <el-select v-model="beacon"
                                       slot-scope="{items, loading}"
                                       placeholder="Select"
                                       clearable
                                       filterable
                                       value-key="id"
                                       ref="select">
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
                    <el-button type="success"
                               size="small"
                               @click="createBeacon"
                               :loading="busy"
                               :disabled="!beacon">
                        Add Beacon
                    </el-button>
                </span>
            </el-dialog>
        </portal>
    </div>
</template>

<script>
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
        props: {
            url: String
        },
        data() {
            return {
                currentTab: 'beacon',
                showModal: false,
                beacon: null
            }
        },
        watch: {
            showModal(value) {
                if (value) {
                    setTimeout(() => this.$refs.select.focus(), 500);
                }
            }
        },
        methods: {
            async createBeacon() {
                this.startProcessing();

                try {
                    const {data: location} = await this.$axios.post(this.url + '/locations', {beacon_id: this.beacon.id});
                    this.$emit('beacon:add', location);
                    this.showModal = false;
                    this.beacon = null;
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                } finally {
                    this.finishProcessing()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .beacon-select {
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