<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Point of Interest" name="poi">
                        <br>
                        <el-form-item :label="$t('pois.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('pois.attributes.description')"
                                      :class="{'is-error' : form.errors.has('description')}">
                            <el-input v-model="form.description"
                                      type="textarea"
                                      :rows="3">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Type" name="type">
                        <br>
                        <el-form-item :label="$t('pois.attributes.type')"
                                      :class="{'is-error' : form.errors.has('type')}">
                            <el-select v-model="form.type"
                                       placeholder="Select">
                                <el-option v-for="item in ['image', 'area']"
                                           :key="item"
                                           :label="item"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="form.type === 'image'"
                                      :label="$t('pois.attributes.image')"
                                      :class="{'is-error' : form.errors.has('image')}">
                            <image-uploader :images="image"
                                            @image:added="form.image = $event"
                                            @image:removed="form.image = null">
                            </image-uploader>
                        </el-form-item>
                        <template v-else>
                            <el-form-item :label="$t('pois.attributes.stroke')"
                                          :class="{'is-error' : form.errors.has('stroke')}">
                                <el-switch v-model="form.stroke"
                                           @change="strokeToggled">
                                </el-switch>
                            </el-form-item>
                            <el-form-item v-if="form.stroke">
                                <el-radio-group v-model="form.stroke_type">
                                    <el-radio label="solid">Solid</el-radio>
                                    <el-radio label="dashed">Dashed</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item v-if="form.stroke"
                                          :class="{'is-error' : form.errors.has('stroke_width')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('pois.attributes.stroke_width')}}</span>
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
                                        <span>{{$t('pois.attributes.stroke_color')}}</span>
                                    </el-col>
                                    <el-col :span="20"
                                            style="line-height: normal">
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
                                        <span>{{$t('pois.attributes.stroke_opacity')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-slider v-model="strokeOpacity"
                                                   :step="10"
                                                   :format-tooltip="formatTooltip">
                                        </el-slider>
                                    </el-col>
                                </el-row>
                                <divider></divider>
                            </el-form-item>
                            <el-form-item :label="$t('pois.attributes.fill')"
                                          :class="{'is-error' : form.errors.has('fill')}">
                                <el-switch v-model="form.fill"
                                           @change="fillToggled">
                                </el-switch>
                            </el-form-item>
                            <el-form-item v-if="form.fill"
                                          :class="{'is-error' : form.errors.has('fill_color')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('pois.attributes.fill_color')}}</span>
                                    </el-col>
                                    <el-col :span="20"
                                            style="line-height: normal">
                                        <el-color-picker v-model="form.fill_color"
                                                         :show-alpha="false"
                                                         :color-format="'hex'">
                                        </el-color-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item v-if="form.fill"
                                          :class="{'is-error' : form.errors.has('fill_opacity')}">
                                <el-row>
                                    <el-col :span="4">
                                        <span>{{$t('pois.attributes.fill_opacity')}}</span>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-slider v-model="fillOpacity"
                                                   :step="10"
                                                   :format-tooltip="formatTooltip">
                                        </el-slider>
                                    </el-col>
                                </el-row>
                                <divider></divider>
                            </el-form-item>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('pois.attributes.category')"
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
                        <el-form-item :label="$t('pois.attributes.tags')"
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
    import imageUploader from 'js/components/image-uploader';
    import divider from 'js/components/divider';

    export default {
        props: {
            visible: Boolean,
            item: Object
        },
        components: {
            imageUploader,
            divider
        },
        data() {
            return {
                currentTab: 'poi',
                resource: 'pois',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    description: this.item ? this.item.description : '',
                    type: this.item ? this.item.type : 'image',
                    stroke: this.item ? !!this.item.stroke : true,
                    stroke_type: this.item ? this.item.stroke_type : 'solid',
                    stroke_color: this.item ? this.item.stroke_color : '#3388ff',
                    stroke_width: this.item ? this.item.stroke_width : 3,
                    stroke_opacity: this.item ? this.item.stroke_opacity : 1,
                    fill: this.item ? !!this.item.fill : true,
                    fill_color: this.item ? this.item.fill_color : '#3388ff',
                    fill_opacity: this.item ? this.item.fill_opacity : 0.2,
                    image: this.item ? this.item.image : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                }),
                image: this.item && this.item.image ? [{source: this.item.image, options: {type: 'local'}}] : [],
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
                    .then(response => this.$emit('upsert-modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            },
            formatTooltip(val) {
                return val / 100;
            },
            strokeToggled(val) {
                if (!val && !this.form.fill) {
                    this.form.fill = true;
                }
            },
            fillToggled(val) {
                if (!val && !this.form.stroke) {
                    this.form.stroke = true;
                }
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
