<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Map Component" name="map_component">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.name')"
                                              :class="{'is-error' : has('name')}">
                                    <el-input v-model="form.name" autofocus></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.type')"
                                              :class="{'is-error' : has('type')}">
                                    <el-select v-model="form.type">
                                        <el-option v-for="item in ['plan', 'wall', 'room', 'decor']"
                                                   :key="item"
                                                   :label="item"
                                                   :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item :label="$t('map-components.attributes.description')"
                                              :class="{'is-error' : has('description')}">
                                    <el-input v-model="form.description"
                                              type="textarea"
                                              :rows="3">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Visuals" name="visuals">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.shape')"
                                              :class="{'is-error' : has('shape')}">
                                    <el-select v-model="form.shape"
                                               :disabled="!!item">
                                        <el-option
                                                v-for="item in ['polyline', 'polygon', 'rectangle', 'circle', 'image']"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.curved')"
                                              :class="{'is-error' : has('curved')}"
                                              v-if="form.shape === 'polyline' || form.shape === 'polygon'">
                                    <el-switch v-model="form.curved"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.color')"
                                              v-if="form.shape !== 'image'"
                                              :class="{'is-error' : has('color')}">
                                    <el-color-picker v-model="form.color"
                                                     :show-alpha="false"
                                                     :color-format="'hex'">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.opacity')"
                                              :class="{'is-error' : has('opacity')}"
                                              v-if="form.shape === 'polygon' || form.shape === 'circle'  || form.shape === 'rectangle'">
                                    <el-slider v-model="form.opacity"
                                               :format-tooltip="formatTooltip">
                                    </el-slider>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="form.shape === 'image'"
                                :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.width')"
                                              :class="{'is-error' : has('width')}">
                                    <el-input v-model.number="form.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.height')"
                                              :class="{'is-error' : has('height')}">
                                    <el-input v-model.number="form.height"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.image')"
                                              :class="{'is-error' : has('image')}">
                                    <image-upload @image-uploaded="setImage"
                                                  @image-removed="setImage"
                                                  :image="form.image">
                                    </image-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.thickness')"
                                              :class="{'is-error' : has('weight')}"
                                              v-if="form.shape !== 'image'">
                                    <el-input-number v-model="form.weight"
                                                     :min="1"
                                                     :max="10">
                                    </el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('map-components.attributes.category')"
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
                        <el-form-item :label="$t('map-components.attributes.tags')"
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
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
                           size="small"
                           @click="item ? updateItem() : createItem()"
                           :loading="creating || updating || deleting">
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
                currentTab: 'map_component',
                resource: 'map-components',
                form: {
                    name: this.item ? this.item.name : '',
                    type: this.item ? this.item.type : 'plan',
                    description: this.item ? this.item.description : '',
                    shape: this.item ? this.item.shape : 'polyline',
                    color: this.item ? this.item.color : '#000000',
                    weight: this.item ? this.item.weight : 2,
                    curved: this.item ? !!this.item.curved : false,
                    opacity: this.item ? this.item.opacity : 100,
                    width: this.item ? this.item.width : 0,
                    height: this.item ? this.item.height : 0,
                    image: this.item ? this.item.image : null,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                }
            }
        },
        methods: {
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
                    this.forget();
                    const item = await this.remove();
                    this.$emit('upsert-modal:remove', item)
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
            },
            formatTooltip(val) {
                return val / 100;
            },
            setImage(image = null) {
                this.form.image = image;
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

        .btn-remove {
            float: left;
            color: #FF0000;

            &:hover {
                color: #990000;
            }
        }
    }
</style>