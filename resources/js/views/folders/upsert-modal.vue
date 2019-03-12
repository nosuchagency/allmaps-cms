<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Folder" name="folder">
                        <br>
                        <el-form-item :label="$t('folders.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('folders.attributes.category')"
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
                        <el-form-item :label="$t('folders.attributes.tags')"
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

    export default {
        mixins: [form, resource],
        props: {
            visible: Boolean,
            item: Object,
            containerId: Number
        },
        data() {
            return {
                currentTab: 'folder',
                resource: 'folders',
                form: {
                    name: this.item ? this.item.name : '',
                    address: this.item ? this.item.address : '',
                    postcode: this.item ? this.item.postcode : '',
                    city: this.item ? this.item.city : '',
                    lat: this.item && this.item.lat ? this.item.lat : 55.663874,
                    lng: this.item && this.item.lng ? this.item.lng : 12.393955,
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
            getReadUrl() {
                return '/containers/' + this.containerId + '/folders/' + this.item.id;
            },
            getCreateUrl() {
                return '/containers/' + this.containerId + '/folders';
            },
            getUpdateUrl() {
                return this.getReadUrl();
            },
            getRemoveUrl() {
                return this.getReadUrl();
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            },
            setupMap() {
                this.map = new L.Map('map', {
                    center: new L.LatLng(this.form.lat, this.form.lng),
                    zoom: 10
                });

                this.marker = new L.Marker({lat: this.form.lat, lng: this.form.lng}, {draggable: true})
                    .addTo(this.map)
                    .on('drag', this.markerDrag)
                    .on('dragend', this.markerDragEnd);

                L.gridLayer.googleMutant({type: 'roadmap'}).addTo(this.map);

                this.map.zoomControl.setPosition('bottomleft');

                this.map.on('click', this.setLocation);
            },
            setLocation(e) {
                this.marker.setLatLng(e.latlng);
                this.form.lat = e.latlng.lat;
                this.form.lng = e.latlng.lng;
            },
            markerDrag(e) {
                this.marker.setLatLng(e.latlng);
            },
            markerDragEnd(e) {
                let latLng = e.target.getLatLng();
                this.marker.setLatLng(latLng);
                this.form.lat = latLng.lat;
                this.form.lng = latLng.lng;
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

    #map {
        height: 300px;
        width: 100%;
        cursor: crosshair;
    }
</style>