<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab" @tab-click="tabClicked">
                    <el-tab-pane label="Place" name="place">
                        <br>
                        <el-form-item :label="$t('places.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('places.attributes.address')"
                                      :class="{'is-error' : form.errors.has('address')}">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('places.attributes.city')"
                                              :class="{'is-error' : form.errors.has('city')}">
                                    <el-input v-model="form.city"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('places.attributes.postcode')"
                                              :class="{'is-error' : form.errors.has('postcode')}">
                                    <el-input v-model="form.postcode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item :label="$t('places.attributes.activated')"
                                      :class="{'is-error' : form.errors.has('activated')}">
                            <el-switch v-model="form.activated"></el-switch>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Image" name="image">
                        <br>
                        <el-form-item :label="$t('places.attributes.image')"
                                      :class="{'is-error' : form.errors.has('image')}">
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.image">
                            </image-upload>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('places.attributes.category')"
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
                        <el-form-item :label="$t('places.attributes.tags')"
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
    import mapLocationSelect from './map-location-select';
    import imageUpload from 'js/components/image-upload';

    export default {
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
                confirmDelete: false,
                form: new Form({
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
                }),
                mapInitialized: false
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

</style>