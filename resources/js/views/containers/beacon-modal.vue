<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form>
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Beacon" name="beacon">
                        <br>
                        <fetch-items url="/beacons">
                            <el-form-item slot-scope="{items, loading}">
                                <el-select v-model="form.beacon"
                                           size="small"
                                           filterable
                                           value-key="id"
                                           placeholder="Choose Beacon">
                                    <el-option v-for="item in $lodash.differenceWith(items, beacons, (one, two) => {
                                                    return item ? (item.id !== one.id && one.id === two.id) : one.id === two.id;
                                                })"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </fetch-items>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                 <el-button v-if="item"
                            type="text"
                            size="small"
                            class="btn-remove"
                            @click="removeItem">
                    Remove
                </el-button>
                <el-button type="text"
                           size="small"
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           @click="item ? updateItem() : createItem()">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
        props: {
            visible: Boolean,
            item: Object,
            containerId: Number,
            beacons: Array
        },
        data() {
            return {
                form: {
                    beacon: this.item
                },
                currentTab: 'beacon',
                creating: false,
                updating: false,
                deleting: false
            }
        },
        methods: {
            async createItem() {
                try {
                    this.forget();
                    const beacon = await this.create();
                    this.$emit('beacon-modal:add', beacon)
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const beacon = await this.update();
                    this.$emit('beacon-modal:update', {id: this.item.id, beacon})
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('beacon-modal:remove', this.item)
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                }
            },
            create() {
                return new Promise(async (resolve, reject) => {
                    this.creating = true;

                    try {
                        const response = await this.$axios.post(this.getCreateUrl(), this.form);
                        resolve(response.data);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.creating = false;
                    }
                });
            },
            update() {
                return new Promise(async (resolve, reject) => {
                    this.updating = true;

                    try {
                        const response = await this.$axios.put(this.getUpdateUrl(), this.form);
                        resolve(response.data);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.updating = false;
                    }
                });
            },
            remove() {
                return new Promise(async (resolve, reject) => {
                    this.deleting = true;

                    try {
                        await this.$axios.delete(this.getRemoveUrl());
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.deleting = false;
                    }
                });
            },
            getCreateUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.form.beacon.id;
            },
            getUpdateUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.item.id;
            },
            getRemoveUrl() {
                return '/containers/' + this.containerId + '/beacons/' + this.item.id;
            },
            closeModal() {
                this.$emit('beacon-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

