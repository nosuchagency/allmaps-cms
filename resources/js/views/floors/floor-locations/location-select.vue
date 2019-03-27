<template>
    <div class="location-select">
        <el-button size="small"
                   type="primary"
                   @click="showModal = true">
            {{title}}
        </el-button>
        <portal to="modals" v-if="showModal">
            <el-dialog :visible.sync="showModal">
                <el-tabs v-model="currentTab">
                    <el-tab-pane :label="title" name="main">
                        <br>
                        <fetch-items :url="url">
                            <el-select v-model="location"
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
                               @click="createLocation"
                               :disabled="!location">
                        Add {{title}}
                    </el-button>
                </span>
            </el-dialog>
        </portal>
    </div>
</template>

<script>
    export default {
        props: {
            url: String,
            title: String,
            floorUrl: String,
            identifier: String
        },
        data() {
            return {
                busy: false,
                currentTab: 'main',
                showModal: false,
                location: null
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
            async createLocation() {
                this.busy = true;

                try {
                    const {data} = await this.$axios.post(this.floorUrl + '/locations', {[this.identifier]: this.location.id});
                    this.$emit('location:add', data);
                    this.showModal = false;
                    this.location = null;
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                } finally {
                    this.busy = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .location-select {
        margin-right: 7px;
    }
</style>