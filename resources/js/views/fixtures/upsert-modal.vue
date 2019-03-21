<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Fixture" name="fixture">
                        <br>
                        <el-form-item :label="$t('fixtures.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('fixtures.attributes.description')"
                                      :class="{'is-error' : has('description')}">
                            <el-input v-model="form.description"
                                      type="textarea"
                                      :rows="3">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Image" name="image">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('fixtures.attributes.width')"
                                              :class="{'is-error' : has('width')}">
                                    <el-input v-model.number="form.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('fixtures.attributes.height')"
                                              :class="{'is-error' : has('height')}">
                                    <el-input v-model.number="form.height"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('fixtures.attributes.image')"
                                              :class="{'is-error' : has('image')}">
                                    <image-upload @image-uploaded="setImage"
                                                  @image-removed="setImage"
                                                  :image="form.image">
                                    </image-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('fixtures.attributes.category')"
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
                        <el-form-item :label="$t('fixtures.attributes.tags')"
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
        props: {
            visible: Boolean,
            item: Object
        },
        components: {
            imageUpload
        },
        data() {
            return {
                currentTab: 'fixture',
                resource: 'fixtures',
                form: {
                    name: this.item ? this.item.name : '',
                    description: this.item ? this.item.description : '',
                    image: this.item ? this.item.image : '',
                    width: this.item ? this.item.width : 0,
                    height: this.item ? this.item.height : 0,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                }
            }
        },
        methods: {
            setImage(image = null) {
                this.form.image = image;
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