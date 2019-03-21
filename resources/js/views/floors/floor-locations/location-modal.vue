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
                            <el-input v-model="form.name" autofocus></el-input>
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
                            <el-input v-model="form.title"></el-input>
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
                        <div class="searchable-label">
                            <el-switch v-model="form.search_activated"></el-switch>
                            <span class="searchable-name">Internal Search</span>
                        </div>
                        <el-form-item label="Text"
                                      :class="{'is-error' : has('search_text')}">
                            <el-input v-model="form.search_text"></el-input>
                        </el-form-item>
                        <br>
                        <template v-for="searchable in form.searchables">
                            <div class="searchable-label">
                                <el-switch v-model="searchable.activated"></el-switch>
                                <span class="searchable-name">
                                    {{searchable.name}}
                                </span>
                            </div>
                            <template v-for="field in searchable.fields">
                                <el-form-item :label="field.label">
                                    <template v-if="field.type === 'text'">
                                        <el-input v-model="field.value"></el-input>
                                    </template>
                                    <template v-else-if="field.type === 'boolean'">
                                        <el-checkbox v-model="field.value"></el-checkbox>
                                    </template>
                                </el-form-item>
                            </template>
                            <br>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="Hours" name="hours">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('monday_from')}">
                                    <span slot="label" style="font-weight: bold;">Monday</span>
                                    <el-time-select v-model="form.monday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('monday_to')}">
                                    <el-time-select v-model="form.monday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('tuesday_from')}">
                                    <span slot="label" style="font-weight: bold;">Tuesday</span>
                                    <el-time-select v-model="form.tuesday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('tuesday_to')}">
                                    <el-time-select v-model="form.tuesday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('wednesday_from')}">
                                    <span slot="label" style="font-weight: bold;">Wednesday</span>
                                    <el-time-select v-model="form.wednesday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('wednesday_to')}">
                                    <el-time-select v-model="form.wednesday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('thursday_from')}">
                                    <span slot="label" style="font-weight: bold;">Thursday</span>
                                    <el-time-select v-model="form.thursday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('thursday_to')}">
                                    <el-time-select v-model="form.thursday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('friday_from')}">
                                    <span slot="label" style="font-weight: bold;">Friday</span>
                                    <el-time-select v-model="form.friday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('friday_to')}">
                                    <el-time-select v-model="form.friday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('saturday_from')}">
                                    <span slot="label" style="font-weight: bold;">Saturday</span>
                                    <el-time-select v-model="form.saturday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('saturday_to')}">
                                    <el-time-select v-model="form.saturday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('sunday_from')}">
                                    <span slot="label" style="font-weight: bold;">Sunday</span>
                                    <el-time-select v-model="form.sunday_from"
                                                    placeholder="From"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :class="{'is-error' : has('sunday_to')}">
                                    <el-time-select v-model="form.sunday_to"
                                                    placeholder="To"
                                                    :picker-options="pickerOptions">
                                    </el-time-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
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
                           class="btn-cancel"
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="success"
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
        created() {
            console.log(this.location.searchables);
        },
        data() {
            return {
                currentTab: 'location',
                pigs: [
                    {'label': 'Test1', 'active': false},
                    {'label': 'Test2', 'active': false},
                    {'label': 'Test3', 'active': false},
                ],
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
                    searchables: this.location.searchables,

                    monday_from: this.location.monday_from,
                    monday_to: this.location.monday_to,
                    tuesday_from: this.location.tuesday_from,
                    tuesday_to: this.location.tuesday_to,
                    wednesday_from: this.location.wednesday_from,
                    wednesday_to: this.location.wednesday_to,
                    thursday_from: this.location.thursday_from,
                    thursday_to: this.location.thursday_to,
                    friday_from: this.location.friday_from,
                    friday_to: this.location.friday_to,
                    saturday_from: this.location.saturday_from,
                    saturday_to: this.location.saturday_to,
                    sunday_from: this.location.sunday_from,
                    sunday_to: this.location.sunday_to,

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
        },
        computed: {
            pickerOptions() {
                return {
                    start: '00:00',
                    step: '00:05',
                    end: '23:55'
                }
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

    .searchable-label {
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-left: 120px;
    }

    .searchable-name {
        margin-left: 10px;
    }
</style>