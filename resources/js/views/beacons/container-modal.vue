<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Container" name="container">
                    <br>
                    <fetch-items url="/containers">
                        <el-form-item slot-scope="{items, loading}">
                            <el-select v-model="form.container"
                                       size="small"
                                       filterable
                                       value-key="id"
                                       placeholder="Choose Container"
                                       ref="select">
                                <el-option v-for="item in diffWith(items, containers, (one, two) => {
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
    </modal>
</template>

<script>
    import Form from '../../utils/Form';
    import differenceWith from 'lodash/differenceWith';

    export default {
        props: {
            visible: Boolean,
            item: Object,
            beaconId: Number,
            containers: Array
        },
        data() {
            return {
                currentTab: 'container',
                confirmDelete: false,
                form: new Form({
                    container: this.item
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
                this.form.post(`/beacons/${this.beaconId}/containers/${this.form.container.id}`)
                    .then(response => this.$emit('modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/beacons/${this.beaconId}/containers/${this.item.id}`)
                    .then(response => this.$emit('modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/beacons/${this.beaconId}/containers/${this.item.id}`)
                    .then(response => this.$emit('modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close');
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

