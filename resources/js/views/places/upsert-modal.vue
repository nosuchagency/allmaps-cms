<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
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
                        <image-uploader :images="image"
                                        @image:added="form.image = $event"
                                        @image:removed="form.image = null">
                        </image-uploader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Location" name="location">
                    <br>
                    <map-location-select v-if="mapInitialized"
                                         :latitude="form.latitude"
                                         :longitude="form.longitude"
                                         :interactive="true"
                                         @map:selection="setLatLng">
                    </map-location-select>
                </el-tab-pane>
                <el-tab-pane label="Menu" name="menu">
                    <br>
                    <el-form-item :label="$t('places.attributes.menu')"
                                  :class="{'is-error' : form.errors.has('menu')}">
                        <fetch-items url="/menus">
                            <el-select v-model="form.menu"
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
            </el-tabs>
        </el-form>
        <template slot="footer">
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
        </template>
    </modal>
</template>

<script>
    import Form from '../../utils/Form';
    import mapLocationSelect from './map-location-select';
    import imageUploader from 'js/components/image-uploader';

    export default {
        components: {
            mapLocationSelect,
            imageUploader
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
                    latitude: this.item && this.item.latitude ? this.item.latitude : 55.663874,
                    longitude: this.item && this.item.longitude ? this.item.longitude : 12.393955,
                    activated: this.item ? this.item.activated : false,
                    menu: this.item ? this.item.menu : null,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                }),
                image: this.item && this.item.image ? [{source: this.item.image, options: {type: 'local'}}] : [],
                mapInitialized: false
            }
        },
        methods: {
            create() {
                this.form.post(`/${this.resource}`)
                    .then(response => this.$emit('modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close');
            },
            tabClicked(tab) {
                if (tab.name === 'location' && !this.mapInitialized) {
                    this.mapInitialized = true;
                }
            },
            setLatLng(latLng) {
                this.form.latitude = latLng.lat;
                this.form.longitude = latLng.lng;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
