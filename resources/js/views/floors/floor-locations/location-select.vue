<template>
    <div class="location-select">
        <el-button size="small"
                   type="primary"
                   @click="visible = true">
            {{title}}
        </el-button>
        <portal to="modals" v-if="visible">
            <el-dialog :visible="visible"
                       @close="closeModal">
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
                                       ref="select"
                                       @input="setLocationId">
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
                               @click="visible = false">
                        Cancel
                    </el-button>
                    <el-button type="success"
                               size="small"
                               @click="create"
                               :loading="form.busy"
                               :disabled="!location">
                        Add {{title}}
                    </el-button>
                </span>
            </el-dialog>
        </portal>
    </div>
</template>

<script>
    import Form from '../../../utils/Form';

    export default {
        props: {
            url: String,
            title: String,
            floorUrl: String,
            identifier: String
        },
        data() {
            return {
                currentTab: 'main',
                visible: false,
                form: new Form({
                    [this.identifier]: this.location ? this.location.id : null
                }),
                location: null
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    setTimeout(() => this.$refs.select.focus(), 500);
                }
            }
        },
        methods: {
            setLocationId({id}) {
                this.form[this.identifier] = id;
            },
            create() {
                this.form.post(`${this.floorUrl}/locations`)
                    .then(response => {
                        this.$emit('location:add', response);
                        this.visible = false;
                        this.form[this.identifier] = null;
                        this.location = null;
                    })
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.visible = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .location-select {
        margin-right: 7px;
    }
</style>