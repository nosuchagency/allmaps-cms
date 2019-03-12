<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab" @tab-click="tabClicked">
                    <el-tab-pane label="Place" name="place">
                        <br>
                        <el-form-item :label="$t('places.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('places.attributes.address')"
                                      :class="{'is-error' : has('address')}">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('places.attributes.city')"
                                              :class="{'is-error' : has('city')}">
                                    <el-input v-model="form.city"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('places.attributes.postcode')"
                                              :class="{'is-error' : has('postcode')}">
                                    <el-input v-model="form.postcode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item :label="$t('places.attributes.activated')"
                                      :class="{'is-error' : has('activated')}">
                            <el-switch v-model="form.activated"></el-switch>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Image" name="image">
                        <br>
                        <el-form-item :label="$t('places.attributes.image')"
                                      :class="{'is-error' : has('image')}">
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.image">
                            </image-upload>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('places.attributes.category')"
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
                        <el-form-item :label="$t('places.attributes.tags')"
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
                    <el-tab-pane label="Location" name="location">
                        <br>
                        <map-location-select v-if="mapInitialized"
                                             :lat="form.lat"
                                             :lng="form.lng"
                                             :interactive="true"
                                             @map:selection="setLatLng">
                        </map-location-select>
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
    import mapLocationSelect from './map-location-select';
    import imageUpload from 'js/components/image-upload';

    export default {
        mixins: [form, resource],
        components: {
            mapLocationSelect,
            imageUpload
        },
        props: {
            visible: Boolean,
            item: Object
        },
        data() {
            return {
                currentTab: 'place',
                resource: 'places',
                form: {
                    name: this.item ? this.item.name : '',
                    address: this.item ? this.item.address : '',
                    postcode: this.item ? this.item.postcode : '',
                    city: this.item ? this.item.city : '',
                    image: this.item ? this.item.image : '',
                    lat: this.item && this.item.lat ? this.item.lat : 55.663874,
                    lng: this.item && this.item.lng ? this.item.lng : 12.393955,
                    activated: this.item ? this.item.activated : false,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                },
                mapInitialized: false
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
            },
            tabClicked(tab) {
                if (tab.name === 'location' && !this.mapInitialized) {
                    this.mapInitialized = true;
                }
            },
            setLatLng(latLng) {
                this.form.lat = latLng.lat;
                this.form.lng = latLng.lng;
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
    }
</style>