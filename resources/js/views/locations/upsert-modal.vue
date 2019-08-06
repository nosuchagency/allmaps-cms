<template>
    <modal :visible="visible"
           @modal:close="closeModal"
           width="60%">
        <el-form :model="form"
                 label-width="120px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Location" name="location">
                    <br>
                    <el-form-item :label="$t('locations.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.type')"
                                  :class="{'is-error' : form.errors.has('type')}">
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
                                          :class="{'is-error' : form.errors.has('zoom_from')}">
                                <el-input v-model="form.zoom_from"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('locations.attributes.zoom_to')"
                                          :class="{'is-error' : form.errors.has('zoom_to')}">
                                <el-input v-model="form.zoom_to"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Details" name="details">
                    <br>
                    <el-form-item :label="$t('locations.attributes.title')"
                                  :class="{'is-error' : form.errors.has('title')}">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.subtitle')"
                                  :class="{'is-error' : form.errors.has('subtitle')}">
                        <el-input v-model="form.subtitle">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.image')"
                                  :class="{'is-error' : form.errors.has('image')}">
                        <image-uploader :images="image"
                                        @image:added="form.image = $event"
                                        @image:removed="form.image = null">
                        </image-uploader>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.description')"
                                  :class="{'is-error' : form.errors.has('description')}">
                        <el-input v-model="form.description"
                                  type="textarea"
                                  :rows="3">
                        </el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Contact" name="contact">
                    <br>
                    <el-form-item :label="$t('locations.attributes.contact_name')"
                                  :class="{'is-error' : form.errors.has('contact_name')}">
                        <el-input v-model="form.contact_name">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.company')"
                                  :class="{'is-error' : form.errors.has('company')}">
                        <el-input v-model="form.company">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.address')"
                                  :class="{'is-error' : form.errors.has('address')}">
                        <el-input v-model="form.address">
                        </el-input>
                    </el-form-item>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :label="$t('locations.attributes.city')"
                                          :class="{'is-error' : form.errors.has('city')}">
                                <el-input v-model="form.city"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('locations.attributes.postcode')"
                                          :class="{'is-error' : form.errors.has('postcode')}">
                                <el-input v-model="form.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item :label="$t('locations.attributes.phone')"
                                  :class="{'is-error' : form.errors.has('phone')}">
                        <el-input v-model="form.phone">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('locations.attributes.email')"
                                  :class="{'is-error' : form.errors.has('email')}">
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
                                  :class="{'is-error' : form.errors.has('search_text')}">
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
                            <el-form-item :class="{'is-error' : form.errors.has('monday_from')}">
                                <span slot="label" style="font-weight: bold;">Monday</span>
                                <el-time-select v-model="form.monday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('monday_to')}">
                                <el-time-select v-model="form.monday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('tuesday_from')}">
                                <span slot="label" style="font-weight: bold;">Tuesday</span>
                                <el-time-select v-model="form.tuesday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('tuesday_to')}">
                                <el-time-select v-model="form.tuesday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('wednesday_from')}">
                                <span slot="label" style="font-weight: bold;">Wednesday</span>
                                <el-time-select v-model="form.wednesday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('wednesday_to')}">
                                <el-time-select v-model="form.wednesday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('thursday_from')}">
                                <span slot="label" style="font-weight: bold;">Thursday</span>
                                <el-time-select v-model="form.thursday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('thursday_to')}">
                                <el-time-select v-model="form.thursday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('friday_from')}">
                                <span slot="label" style="font-weight: bold;">Friday</span>
                                <el-time-select v-model="form.friday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('friday_to')}">
                                <el-time-select v-model="form.friday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('saturday_from')}">
                                <span slot="label" style="font-weight: bold;">Saturday</span>
                                <el-time-select v-model="form.saturday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('saturday_to')}">
                                <el-time-select v-model="form.saturday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('sunday_from')}">
                                <span slot="label" style="font-weight: bold;">Sunday</span>
                                <el-time-select v-model="form.sunday_from"
                                                placeholder="From"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :class="{'is-error' : form.errors.has('sunday_to')}">
                                <el-time-select v-model="form.sunday_to"
                                                placeholder="To"
                                                :picker-options="pickerOptions">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Content" name="content">
                    <br>
                    <fetch-items url="/containers">
                        <el-form-item label="Container" slot-scope="{items, loading}">
                            <el-select v-model="form.container"
                                       filterable
                                       value-key="id"
                                       placeholder="Select"
                                       ref="select">
                                <el-option v-for="item in items"
                                           :key="item.id"
                                           :label="item.name"
                                           :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </fetch-items>
                </el-tab-pane>
                <el-tab-pane label="Status" name="status">
                    <br>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item label="Date from"
                                          :class="{'is-error' : form.errors.has('publish_at')}">
                                <el-date-picker v-model="form.publish_at"
                                                type="date"
                                                format="dd-MM-yyyy"
                                                value-format="dd-MM-yyyy">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Date to"
                                          :class="{'is-error' : form.errors.has('unpublish_at')}">
                                <el-date-picker v-model="form.unpublish_at"
                                                type="date"
                                                format="dd-MM-yyyy"
                                                value-format="dd-MM-yyyy">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Taxonomy" name="taxonomies">
                    <br>
                    <el-form-item :label="$t('locations.attributes.category')"
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
                    <el-form-item :label="$t('locations.attributes.tags')"
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
            <el-button type="text"
                       size="small"
                       class="btn-cancel"
                       @click="closeModal">
                Cancel
            </el-button>
            <el-button type="success"
                       size="small"
                       @click="update">
                    Confirm
            </el-button>
        </span>
    </modal>
</template>

<script>
    import Form from '../../utils/Form';
    import imageUploader from 'js/components/image-uploader';

    export default {
        components: {
            imageUploader
        },
        props: {
            visible: Boolean,
            location: Object
        },
        data() {
            return {
                currentTab: 'location',
                confirmDelete: false,
                form: new Form({
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

                    container: this.location.container,

                    activated_at: this.location.activated_at,
                    publish_at: this.location.publish_at,
                    unpublish_at: this.location.unpublish_at,
                    category: this.location.category,
                    tags: this.location.tags,
                }),
                image: this.item && this.item.image ? [{source: this.item.image, options: {type: 'local'}}] : [],
            }
        },
        methods: {
            update() {
                this.form.put(`/locations/${this.location.id}`)
                    .then(response => {
                        this.$emit('modal:update', response);
                        this.closeModal();
                    })
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/locations/${this.location.id}`)
                    .then(response => this.$emit('modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close');
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
