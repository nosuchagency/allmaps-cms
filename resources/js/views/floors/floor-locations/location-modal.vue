<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal"
                   width="60%">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Location" name="location">
                        <br>
                        <el-form-item :label="$t('locations.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.type')"
                                      :class="{'is-error' : has('type')}">
                            <el-select v-model="form.type"
                                       :disabled="true">
                                <el-option v-for="item in ['poi', 'beacon', 'fixture']"
                                           :key="item"
                                           :label="item"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('locations.attributes.zoom_from')"
                                              :class="{'is-error' : has('zoom_from')}">
                                    <el-input v-model="form.zoom_from"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('locations.attributes.zoom_to')"
                                              :class="{'is-error' : has('zoom_to')}">
                                    <el-input v-model="form.zoom_to"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Details" name="details">
                        <br>
                        <el-form-item :label="$t('locations.attributes.title')"
                                      :class="{'is-error' : has('title')}">
                            <el-input v-model="form.title">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.subtitle')"
                                      :class="{'is-error' : has('subtitle')}">
                            <el-input v-model="form.subtitle">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.image')"
                                      :class="{'is-error' : has('image')}">
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.image">
                            </image-upload>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.description')"
                                      :class="{'is-error' : has('description')}">
                            <el-input v-model="form.description"
                                      type="textarea"
                                      :rows="3">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Contact" name="contact">
                        <br>
                        <el-form-item :label="$t('locations.attributes.contact_name')"
                                      :class="{'is-error' : has('contact_name')}">
                            <el-input v-model="form.contact_name">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.company')"
                                      :class="{'is-error' : has('company')}">
                            <el-input v-model="form.company">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.address')"
                                      :class="{'is-error' : has('address')}">
                            <el-input v-model="form.address">
                            </el-input>
                        </el-form-item>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('locations.attributes.city')"
                                              :class="{'is-error' : has('city')}">
                                    <el-input v-model="form.city"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('locations.attributes.postcode')"
                                              :class="{'is-error' : has('postcode')}">
                                    <el-input v-model="form.postcode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item :label="$t('locations.attributes.phone')"
                                      :class="{'is-error' : has('phone')}">
                            <el-input v-model="form.phone">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.email')"
                                      :class="{'is-error' : has('email')}">
                            <el-input v-model="form.email">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Search" name="search">
                        <br>
                        <el-form-item :label="$t('locations.attributes.search_activated')"
                                      :class="{'is-error' : has('search_activated')}">
                            <el-switch v-model="form.search_activated"></el-switch>
                        </el-form-item>
                        <el-form-item :label="$t('locations.attributes.search_text')"
                                      :class="{'is-error' : has('search_text')}">
                            <el-input v-model="form.search_text">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Hours" name="hours">
                        <br>
                    </el-tab-pane>
                    <el-tab-pane label="Status" name="status">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item label="Date from"
                                              :class="{'is-error' : has('publish_at')}">
                                    <el-date-picker v-model="form.publish_at"
                                                    type="date"
                                                    format="dd-MM-yyyy">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Date to"
                                              :class="{'is-error' : has('unpublish_at')}">
                                    <el-date-picker v-model="form.unpublish_at"
                                                    type="date"
                                                    format="dd-MM-yyyy">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button type="text"
                           size="small"
                           style="float: left; color: red;">
                    Delete
                </el-button>
                <el-button type="text"
                           size="small"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
                           size="small"
                           :loading="busy"
                           @click="updateItem">
                    Confirm
                </el-button>
            </span>
        </el-dialog>
    </portal>
</template>

<script>
    import form from 'js/mixins/form';
    import imageUpload from 'js/components/image-upload';

    export default {
        mixins: [form],
        components: {
            imageUpload
        },
        props: {
            visible: Boolean,
            location: Object,
            url: String
        },
        data() {
            return {
                currentTab: 'location',
                form: {
                    name: this.location.name,
                    type: this.location.type,
                    zoom_from: this.location.zoom_from,
                    zoom_to: this.location.zoom_to,
                    title: this.location.title,
                    subtitle: this.location.subtitle,
                    image: this.location.image,
                    description: this.location.description,
                    contact_name: this.location.contact_name,
                    company: this.location.company,
                    address: this.location.address,
                    city: this.location.city,
                    postcode: this.location.postcode,
                    phone: this.location.phone,
                    email: this.location.email,
                    search_activated: this.location.search_activated,
                    search_text: this.location.search_text,
                    activated_at: this.location.activated_at,
                    publish_at: this.location.publish_at,
                    unpublish_at: this.location.unpublish_at
                }
            }
        },
        methods: {
            async updateItem() {
                this.startProcessing();

                try {
                    const {data: location} = await this.$axios.put(this.url + '/locations/' + this.location.id, this.form);
                    this.$emit('location-modal:update', location);
                    this.closeModal();
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            },
            closeModal() {
                this.$emit('location-modal:close');
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