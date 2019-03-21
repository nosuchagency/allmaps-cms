<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form>
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Container" name="container">
                        <br>
                        <fetch-items url="/containers">
                            <el-form-item slot-scope="{items, loading}">
                                <el-select v-model="form.container"
                                           size="small"
                                           filterable
                                           value-key="id"
                                           placeholder="Choose Container">
                                    <el-option v-for="item in $lodash.differenceWith(items, containers, (one, two) => {
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
            beaconId: Number,
            containers: Array
        },
        data() {
            return {
                form: {
                    container: this.item
                },
                currentTab: 'container',
                creating: false,
                updating: false,
                deleting: false
            }
        },
        methods: {
            async createItem() {
                try {
                    this.forget();
                    const container = await this.create();
                    this.$emit('container-modal:add', container)
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const container = await this.update();
                    this.$emit('container-modal:update', {id: this.item.id, container})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('container-modal:remove', this.item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            create() {
                return new Promise(async (resolve, reject) => {
                    this.creating = true;

                    try {
                        const {data} = await this.$axios.post(this.getCreateUrl(), this.form);
                        resolve(data);
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
                        const {data} = await this.$axios.put(this.getUpdateUrl(), this.form);
                        resolve(data);
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
                return '/beacons/' + this.beaconId + '/containers/' + this.form.container.id;
            },
            getUpdateUrl() {
                return '/beacons/' + this.beaconId + '/containers/' + this.item.id;
            },
            getRemoveUrl() {
                return '/beacons/' + this.beaconId + '/containers/' + this.item.id;
            },
            closeModal() {
                this.$emit('container-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

