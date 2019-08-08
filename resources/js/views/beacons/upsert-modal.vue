<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="120px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Beacon" name="beacon">
                    <br>
                    <el-form-item :label="$t('beacons.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('beacons.attributes.identifier')"
                                  :class="{'is-error' : form.errors.has('identifier')}">
                        <el-input v-model="form.identifier" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('beacons.attributes.description')"
                                  :class="{'is-error' : form.errors.has('description')}">
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
                                          :class="{'is-error' :form.errors.has('proximity_uuid')}">
                                <el-input v-model="form.proximity_uuid"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item :label="$t('beacons.attributes.major')"
                                          :class="{'is-error' : form.errors.has('major')}">
                                <el-input v-model="form.major"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('beacons.attributes.minor')"
                                          :class="{'is-error' : form.errors.has('minor')}">
                                <el-input v-model="form.minor"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Eddystone" name="eddystone">
                    <br>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('beacons.attributes.namespace')"
                                          :class="{'is-error' : form.errors.has('namespace')}">
                                <el-input v-model="form.namespace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('beacons.attributes.instance_id')"
                                          :class="{'is-error' : form.errors.has('instance_id')}">
                                <el-input v-model="form.instance_id"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$t('beacons.attributes.url')"
                                          :class="{'is-error' : form.errors.has('url')}">
                                <el-input v-model="form.url"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="Taxonomy" name="taxonomies">
                    <br>
                    <el-form-item :label="$t('beacons.attributes.category')"
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
                    <el-form-item :label="$t('beacons.attributes.tags')"
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
    </modal>
</template>

<script>
    import Form from '../../utils/Form';

    export default {
        props: {
            visible: Boolean,
            item: Object
        },
        data() {
            return {
                currentTab: 'beacon',
                resource: 'beacons',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    identifier: this.item ? this.item.identifier : '',
                    description: this.item ? this.item.description : '',
                    proximity_uuid: this.item ? this.item.proximity_uuid : '',
                    major: this.item ? this.item.major : '',
                    minor: this.item ? this.item.minor : '',
                    namespace: this.item ? this.item.namespace : '',
                    instance_id: this.item ? this.item.instance_id : '',
                    url: this.item ? this.item.url : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                })
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
