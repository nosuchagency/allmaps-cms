<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Floor" name="floor">
                        <br>
                        <el-form-item :label="$t('floors.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('floors.attributes.level')"
                                      :class="{'is-error' : has('level')}">
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
                           @click="removeItem">
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
                           @click="item ? updateItem() : createItem()"
                           :loading="creating || updating">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';
    import resource from 'js/mixins/resource';

    export default {
        mixins: [form, resource],
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
                form: this.getForm()
            }
        },
        methods: {
            getForm() {
                return {
                    name: this.item ? this.item.name : '',
                    level: this.item ? this.item.level : ''
                }
            },
            async createItem() {
                try {
                    this.forget();
                    const floor = await this.create();
                    this.$emit('floor-modal:add', {placeId: this.placeId, buildingId: this.buildingId, floor})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const floor = await this.update();
                    this.$emit('floor-modal:update', {placeId: this.placeId, buildingId: this.buildingId, floor})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('floor-modal:remove', {
                        placeId: this.placeId,
                        buildingId: this.buildingId,
                        floor: this.item
                    })
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async fetch() {
                if (this.id) {
                    try {
                        this.item = await this.read();
                        this.form = this.getForm();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    this.form = this.getForm();
                }
            },
            getReadUrl() {
                return '/places/' + this.placeId + '/buildings/' + this.buildingId + '/floors/' + this.item.id;
            },
            getCreateUrl() {
                return '/places/' + this.placeId + '/buildings/' + this.buildingId + '/floors';
            },
            getUpdateUrl() {
                return this.getReadUrl();
            },
            getRemoveUrl() {
                return this.getReadUrl();
            },
            closeModal() {
                this.$emit('floor-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>