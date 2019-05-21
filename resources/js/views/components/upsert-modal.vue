<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Map Component" name="component">
                        <br>
                        <el-form-item :label="$t('components.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('components.attributes.type')"
                                      :class="{'is-error' : form.errors.has('type')}">
                            <el-select v-model="form.type">
                                <el-option v-for="item in ['plan', 'wall', 'room', 'decor']"
                                           :key="item"
                                           :label="item"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('components.attributes.description')"
                                      :class="{'is-error' : form.errors.has('description')}">
                            <el-input v-model="form.description"
                                      type="textarea"
                                      :rows="3">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Visuals" name="visuals">
                        <br>
                        <el-form-item :label="$t('components.attributes.shape')"
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
                        <template v-if="form.shape !== 'image'">
                            <el-form-item :label="$t('components.attributes.stroke')"
                                          :class="{'is-error' : form.errors.has('stroke')}">
                                <el-switch v-model="form.stroke"></el-switch>
                            </el-form-item>
                            <el-form-item v-if="form.stroke">
                                <el-radio-group v-model="form.stroke_type">
                                    <el-radio label="solid">Solid</el-radio>
                                    <el-radio label="dashed">Dashed</el-radio>
                                    <el-radio label="curved">Curved</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="form.stroke"
                                          :class="{'is-error' : form.errors.has('stroke_width')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('components.attributes.stroke_width')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input-number v-model="form.stroke_width"
                                                         :min="1">
                                        </el-input-number>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item v-if="form.stroke"
                                          :class="{'is-error' : form.errors.has('stroke_color')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('components.attributes.stroke_color')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-color-picker v-model="form.stroke_color"
                                                         :show-alpha="false"
                                                         :color-format="'hex'">
                                        </el-color-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item v-if="form.stroke"
                                          :class="{'is-error' : form.errors.has('stroke_opacity')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('components.attributes.stroke_opacity')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-slider v-model="strokeOpacity"
                                                   :step="10"
                                                   :format-tooltip="formatTooltip">
                                        </el-slider>
                                    </el-col>
                                </el-row>
                                <div style="width:100%; border-top: 1px solid #dcdcdc; margin: 5px 0;"></div>
                            </el-form-item>
                        </template>
                        <template v-if="form.shape !== 'image'">
                            <el-form-item :label="$t('components.attributes.fill')"
                                          :class="{'is-error' : form.errors.has('fill')}">
                                <el-switch v-model="form.fill"></el-switch>
                            </el-form-item>
                            <el-form-item :class="{'is-error' : form.errors.has('fill_color')}"
                                          v-if="form.fill">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('components.attributes.fill_color')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-color-picker v-model="form.fill_color"
                                                         :show-alpha="false"
                                                         :color-format="'hex'">
                                        </el-color-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item :class="{'is-error' : form.errors.has('fill_opacity')}"
                                          v-if="form.fill">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('components.attributes.fill_opacity')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-slider v-model="fillOpacity"
                                                   :step="10"
                                                   :format-tooltip="formatTooltip">
                                        </el-slider>
                                    </el-col>
                                </el-row>
                                <div style="width:100%; border-top: 1px solid #dcdcdc; margin: 5px 0;"></div>
                            </el-form-item>
                        </template>
                        <template v-if="form.shape === 'image'">
                            <el-form-item :label="$t('components.attributes.image')"
                                          :class="{'is-error' : form.errors.has('image')}">
                                <image-upload @image-uploaded="setImage"
                                              @image-removed="setImage"
                                              :image="form.image">
                                </image-upload>
                            </el-form-item>
                            <el-form-item :label="$t('components.attributes.image_width')"
                                          :class="{'is-error' : form.errors.has('image_width')}">
                                <el-input-number v-model="form.image_width"
                                                 :min="0">
                                </el-input-number>
                            </el-form-item>
                            <el-form-item :label="$t('components.attributes.image_height')"
                                          :class="{'is-error' : form.errors.has('image_height')}">
                                <el-input-number v-model="form.image_height"
                                                 :min="0">
                                </el-input-number>
                            </el-form-item>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('components.attributes.category')"
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
                        <el-form-item :label="$t('components.attributes.tags')"
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
                currentTab: 'component',
                resource: 'components',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    type: this.item ? this.item.type : 'plan',
                    shape: this.item ? this.item.shape : 'polyline',
                    description: this.item ? this.item.description : '',
                    stroke: this.item ? !!this.item.stroke : true,
                    stroke_type: this.item ? this.item.stroke_type : 'solid',
                    stroke_color: this.item ? this.item.stroke_color : '#3388ff',
                    stroke_width: this.item ? this.item.stroke_width : 3,
                    stroke_opacity: this.item ? this.item.stroke_opacity : 1,
                    fill: this.item ? !!this.item.fill : true,
                    fill_color: this.item ? this.item.fill_color : '#3388ff',
                    fill_opacity: this.item ? this.item.fill_opacity : 0.2,
                    image: this.item ? this.item.image : null,
                    image_width: this.item ? this.item.image_width : 0,
                    image_height: this.item ? this.item.image_height : 0,
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
            strokeOpacity: {
                get() {
                    return this.form.stroke_opacity * 100;
                },
                set(value) {
                    this.form.stroke_opacity = value / 100;
                }
            },
            fillOpacity: {
                get() {
                    return this.form.fill_opacity * 100;
                },
                set(value) {
                    this.form.fill_opacity = value / 100;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>