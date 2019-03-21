<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Beacon" name="beacon">
                        <br>
                        <el-form-item :label="$t('beacons.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('beacons.attributes.description')"
                                      :class="{'is-error' : has('description')}">
                            <el-input v-model="form.description"
                                      type="textarea"
                                      :rows="3">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="iBeacon" name="ibeacon">
                        <br>
                        <el-row :gutter="25">
                            <el-col :span="24">
                                <el-form-item :label="$t('beacons.attributes.proximity_uuid')"
                                              :class="{'is-error' : has('proximity_uuid')}">
                                    <el-input v-model="form.proximity_uuid"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="25">
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.major')"
                                              :class="{'is-error' : has('major')}">
                                    <el-input v-model="form.major"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.minor')"
                                              :class="{'is-error' : has('minor')}">
                                    <el-input v-model="form.minor"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Eddystone" name="eddystone">
                        <br>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.eddystone_uid')"
                                              :class="{'is-error' : has('eddystone_uid')}">
                                    <el-input v-model="form.eddystone_uid"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.eddystone_url')"
                                              :class="{'is-error' : has('eddystone_url')}">
                                    <el-input v-model="form.eddystone_url"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.eddystone_tlm')"
                                              :class="{'is-error' : has('eddystone_tlm')}">
                                    <el-input v-model="form.eddystone_tlm"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="$t('beacons.attributes.eddystone_eid')"
                                              :class="{'is-error' : has('eddystone_eid')}">
                                    <el-input v-model="form.eddystone_eid"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('beacons.attributes.category')"
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
                        <el-form-item :label="$t('beacons.attributes.tags')"
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
                           class="btn-remove"
                           @click="removeItem">
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
                           @click="item ? updateItem() : createItem()"
                           :loading="creating || updating || deleting">
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
            item: Object
        },
        data() {
            return {
                currentTab: 'beacon',
                resource: 'beacons',
                form: {
                    name: this.item ? this.item.name : '',
                    description: this.item ? this.item.description : '',
                    proximity_uuid: this.item ? this.item.proximity_uuid : '',
                    major: this.item ? this.item.major : '',
                    minor: this.item ? this.item.minor : '',
                    eddystone_uid: this.item ? this.item.eddystone_uid : '',
                    eddystone_url: this.item ? this.item.eddystone_url : '',
                    eddystone_tlm: this.item ? this.item.eddystone_tlm : '',
                    eddystone_eid: this.item ? this.item.eddystone_eid : '',
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
                    this.forget();
                    const item = await this.remove();
                    this.$emit('upsert-modal:remove', item)
                } catch ({response}) {
                    if (response.data.errors) {
                        this.setErrors(response.data.errors);
                    }
                }
            },
            fetch() {
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>