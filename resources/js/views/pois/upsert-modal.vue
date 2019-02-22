<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Point of Interest" name="poi">
                        <br>
                        <el-form-item :label="$t('pois.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('pois.attributes.internal_name')"
                                      :class="{'is-error' : has('internal_name')}">
                            <el-input v-model="form.internal_name">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Type" name="type">
                        <br>
                        <el-form-item :label="$t('pois.attributes.type')"
                                      :class="{'is-error' : has('type')}">
                            <el-select v-model="form.type"
                                       placeholder="Select">
                                <el-option v-for="item in ['icon', 'area']"
                                           :key="item"
                                           :label="item"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('pois.attributes.color')"
                                      :class="{'is-error' : has('color')}"
                                      v-if="form.type === 'area'">
                            <el-color-picker v-model="form.color"
                                             :show-alpha="false"
                                             :color-format="'hex'">
                            </el-color-picker>
                        </el-form-item>
                        <el-form-item :label="$t('pois.attributes.image')"
                                      :class="{'is-error' : has('image')}"
                                      v-else>
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.icon">
                            </image-upload>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('pois.attributes.category')"
                                      :class="{'is-error' : has('category')}">
                            <fetch-items url="/categories">
                                <el-select v-model="form.category"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           clearable
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                        <el-form-item :label="$t('pois.attributes.tags')"
                                      :class="{'is-error' : has('tags')}">
                            <fetch-items url="/tags">
                                <el-select v-model="form.tags"
                                           slot-scope="{items, loading}"
                                           placeholder="Select"
                                           multiple
                                           value-key="id">
                                    <el-option v-for="item in items"
                                               :key="item.id"
                                               :label="item.name"
                                               :value="item">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           style="float: left; color: red;"
                           @click="removeItem">
                    Delete
                </el-button>
                <el-button type="text"
                           size="small"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
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
        props: {
            visible: Boolean,
            item: Object
        },
        components: {
            imageUpload
        },
        data() {
            return {
                currentTab: 'poi',
                resource: 'pois',
                form: this.getForm()
            }
        },
        methods: {
            getForm() {
                return {
                    name: this.item ? this.item.name : '',
                    internal_name: this.item ? this.item.internal_name : '',
                    type: this.item ? this.item.type : 'icon',
                    color: this.item ? this.item.color : '#000000',
                    icon: this.item ? this.item.icon : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                }
            },
            setImage(image = null) {
                this.form.icon = image;
            },
            async createItem() {
                try {
                    this.forget();
                    const item = await this.create();
                    this.$emit('upsert-modal:add', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async updateItem() {
                try {
                    this.forget();
                    const item = await this.update();
                    this.$emit('upsert-modal:update', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async removeItem() {
                try {
                    await this.remove();
                    this.$emit('upsert-modal:remove', this.item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            async fetch() {
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>
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