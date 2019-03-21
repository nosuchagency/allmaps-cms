<template>
    <div class="fixture-select">
        <el-button size="small"
                   type="primary"
                   @click="showModal = true">
            Fixture
        </el-button>
        <portal to="modals" v-if="showModal">
            <el-dialog :visible.sync="showModal">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Fixture" name="fixture">
                        <br>
                        <fetch-items url="/fixtures">
                            <el-select v-model="fixture"
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
                               @click="createFixture"
                               :loading="busy"
                               :disabled="!fixture">
                        Add Fixture
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
                currentTab: 'fixture',
                showModal: false,
                fixture: null
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
            async createFixture() {
                this.startProcessing();

                try {
                    const {data: location} = await this.$axios.post(this.url + '/locations', {fixture_id: this.fixture.id});
                    this.$emit('fixture:add', location);
                    this.showModal = false;
                    this.fixture = null;
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
    .fixture-select {
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