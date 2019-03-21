<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Building" name="building">
                        <br>
                        <el-form-item :label="$t('buildings.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Image" name="image">
                        <br>
                        <el-form-item :label="$t('buildings.attributes.image')"
                                      :class="{'is-error' : has('image')}">
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.image">
                            </image-upload>
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
    import imageUpload from 'js/components/image-upload';

    export default {
        mixins: [form, resource],
        components: {
            imageUpload
        },
        props: {
            visible: Boolean,
            placeId: Number,
            item: Object
        },
        data() {
            return {
                currentTab: 'building',
                resource: 'buildings',
                form: this.getForm()
            }
        },
        methods: {
            getForm() {
                return {
                    name: this.item ? this.item.name : '',
                    image: this.item ? this.item.image : '',
                }
            },
            async createItem() {
                try {
                    this.forget();
                    const item = await this.create();
                    this.$emit('building-modal:add', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const building = await this.update();
                    this.$emit('building-modal:update', {id: this.item.id, building})
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('building-modal:remove', this.item)
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
                return '/places/' + this.placeId + '/buildings/' + this.item.id;
            },
            getCreateUrl() {
                return '/places/' + this.placeId + '/buildings';
            },
            getUpdateUrl() {
                return this.getReadUrl();
            },
            getRemoveUrl() {
                return this.getReadUrl();
            },
            closeModal() {
                this.$emit('building-modal:close');
            },
            setImage(image = null) {
                this.form.image = image;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>