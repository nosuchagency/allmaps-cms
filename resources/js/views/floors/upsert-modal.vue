<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Floor" name="floor">
                        <br>
                        <el-form-item :label="$t('floors.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('floors.attributes.level')"
                                      :class="{'is-error' : form.errors.has('level')}">
                            <el-input v-model="form.level">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="remove">
                    Delete
                </el-button>
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

    export default {
        props: {
            visible: Boolean,
            placeId: Number,
            buildingId: Number,
            item: Object
        },
        data() {
            return {
                currentTab: 'floor',
                resource: 'floors',
                form: new Form({
                    name: this.item ? this.item.name : '',
                    level: this.item ? this.item.level : ''
                })
            }
        },
        methods: {
            create() {
                this.form.post(`/places/${this.placeId}/buildings/${this.buildingId}/${this.resource}`)
                    .then(response => this.$emit('floor-modal:add', {
                        placeId: this.placeId,
                        buildingId: this.buildingId,
                        floor: response
                    }))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/places/${this.placeId}/buildings/${this.buildingId}/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('floor-modal:update', {
                        placeId: this.placeId,
                        buildingId: this.buildingId,
                        floor: response
                    }))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/places/${this.placeId}/buildings/${this.buildingId}/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('floor-modal:remove', {
                        placeId: this.placeId,
                        buildingId: this.buildingId,
                        floor: this.item
                    }))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('floor-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>