<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Beacon" name="beacon">
                        <br>
                        <fetch-items url="/beacons">
                            <el-form-item slot-scope="{items, loading}">
                                <el-select v-model="form.beacon"
                                           size="small"
                                           filterable
                                           value-key="id"
                                           placeholder="Choose Beacon"
                                           ref="select">
                                    <el-option v-for="item in diffWith(items, beacons, (one, two) => {
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
                  <template v-if="item">
                        <el-button v-if="!confirmDelete"
                                   type="text"
                                   size="small"
                                   class="btn-remove"
                                   @click="confirmDelete = true">
                            Delete
                        </el-button>
                        <el-button v-else
                                   type="text"
                                   size="small"
                                   class="btn-remove"
                                   @click="remove">
                            Are you sure?
                        </el-button>
                  </template>
                <el-button type="text"
                           size="small"
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           :loading="form.busy"
                           @click="item ? update() : create()">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import Form from '../../utils/Form';
    import differenceWith from 'lodash/differenceWith';

    export default {
        props: {
            visible: Boolean,
            item: Object,
            containerId: Number,
            beacons: Array
        },
        data() {
            return {
                currentTab: 'beacon',
                confirmDelete: false,
                form: new Form({
                    beacon: this.item
                })
            }
        },
        mounted() {
            if (!this.item) {
                setTimeout(() => this.$refs.select.focus(), 500);
            }
        },
        methods: {
            create() {
                this.form.post(`/containers/${this.containerId}/beacons/${this.form.beacon.id}`)
                    .then(response => this.$emit('beacon-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/containers/${this.containerId}/beacons/${this.item.id}`)
                    .then(response => this.$emit('beacon-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/containers/${this.containerId}/beacons/${this.item.id}`)
                    .then(response => this.$emit('beacon-modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('beacon-modal:close');
            }
        },
        computed: {
            diffWith() {
                return differenceWith;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

