<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Map Component" name="map_component">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.name')"
                                              :class="{'is-error' : form.errors.has('name')}">
                                    <el-input v-model="form.name" autofocus></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.type')"
                                              :class="{'is-error' : form.errors.has('type')}">
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
                                              :class="{'is-error' : form.errors.has('description')}">
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
                                              :class="{'is-error' : form.errors.has('shape')}">
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
                                              :class="{'is-error' : form.errors.has('curved')}"
                                              v-if="form.shape === 'polyline' || form.shape === 'polygon'">
                                    <el-switch v-model="form.curved"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.color')"
                                              v-if="form.shape !== 'image'"
                                              :class="{'is-error' : form.errors.has('color')}">
                                    <el-color-picker v-model="form.color"
                                                     :show-alpha="false"
                                                     :color-format="'hex'">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.opacity')"
                                              :class="{'is-error' : form.errors.has('opacity')}"
                                              v-if="form.shape === 'polygon' || form.shape === 'circle'  || form.shape === 'rectangle'">
                                    <el-slider v-model="opacity"
                                               :step="10"
                                               :format-tooltip="formatTooltip">
                                    </el-slider>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="form.shape === 'image'"
                                :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.width')"
                                              :class="{'is-error' : form.errors.has('width')}">
                                    <el-input v-model.number="form.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.height')"
                                              :class="{'is-error' : form.errors.has('height')}">
                                    <el-input v-model.number="form.height"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('map-components.attributes.image')"
                                              :class="{'is-error' : form.errors.has('image')}">
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
                                              :class="{'is-error' : form.errors.has('weight')}"
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
                                      :class="{'is-error' : form.errors.has('category')}">
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
                                      :class="{'is-error' : form.errors.has('tags')}">
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
                           @click="item ? update() : create()">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import Form from '../../utils/Form';
    import imageUpload from 'js/components/image-upload';

    export default {
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
                form: new Form({
                    name: this.item ? this.item.name : '',
                    type: this.item ? this.item.type : 'plan',
                    description: this.item ? this.item.description : '',
                    shape: this.item ? this.item.shape : 'polyline',
                    color: this.item ? this.item.color : '#000000',
                    weight: this.item ? this.item.weight : 2,
                    curved: this.item ? !!this.item.curved : false,
                    opacity: this.item ? this.item.opacity : 1,
                    width: this.item ? this.item.width : 0,
                    height: this.item ? this.item.height : 0,
                    image: this.item ? this.item.image : null,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                })
            }
        },
        methods: {
            create() {
                this.form.post(`/${this.resource}`)
                    .then(response => this.$emit('upsert-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('upsert-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('upsert-modal:remove', response))
                    .catch(error => console.log(error));
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
        },
        computed: {
            opacity: {
                get() {
                    return this.form.opacity * 100;
                },
                set(value) {
                    this.form.opacity = value / 100;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>