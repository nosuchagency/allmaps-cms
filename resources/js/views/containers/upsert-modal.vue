<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Container" name="container">
                        <br>
                        <el-form-item :label="$t('containers.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('containers.attributes.description')"
                                      :class="{'is-error' : form.errors.has('description')}">
                            <el-input v-model="form.description" type="textarea">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Folders" name="folders">
                        <br>
                        <el-form-item label="Enabled"
                                      :class="{'is-error' : form.errors.has('folders_enabled')}">
                            <el-switch v-model="form.folders_enabled">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="Default Name" v-if="form.folders_enabled">
                            <el-input v-model="form.folder_name" :disabled="!!item"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Skins" name="skins">
                        <br>
                        <fetch-items url="/skins">
                            <div slot-scope="{items, loading}">
                                <el-form-item :label="$t('containers.attributes.mobile_skin')"
                                              :class="{'is-error' : form.errors.has('mobile_skin')}">
                                    <el-select v-model="form.mobile_skin"
                                               placeholder="Select"
                                               clearable
                                               value-key="id">
                                        <el-option v-for="item in items.filter(i => i.mobile === true)"
                                                   :key="item.id"
                                                   :label="item.name"
                                                   :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('containers.attributes.tablet_skin')"
                                              :class="{'is-error' : form.errors.has('tablet_skin')}">
                                    <el-select v-model="form.tablet_skin"
                                               placeholder="Select"
                                               clearable
                                               value-key="id">
                                        <el-option v-for="item in items.filter(i => i.tablet === true)"
                                                   :key="item.id"
                                                   :label="item.name"
                                                   :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('containers.attributes.desktop_skin')"
                                              :class="{'is-error' : form.errors.has('desktop_skin')}">
                                    <el-select v-model="form.desktop_skin"
                                               placeholder="Select"
                                               clearable
                                               value-key="id">
                                        <el-option v-for="item in items.filter(i => i.desktop === true)"
                                                   :key="item.id"
                                                   :label="item.name"
                                                   :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </fetch-items>
                        <br>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('containers.attributes.category')"
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
                        <el-form-item :label="$t('containers.attributes.tags')"
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

    export default {
        props: {
            visible: Boolean,
            item: Object
        },
        data() {
            return {
                currentTab: 'container',
                resource: 'containers',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    description: this.item ? this.item.description : '',
                    folders_enabled: this.item ? !!this.item.folders_enabled : false,
                    mobile_skin: this.item ? this.item.mobile_skin : null,
                    tablet_skin: this.item ? this.item.tablet_skin : null,
                    desktop_skin: this.item ? this.item.desktop_skin : null,
                    folder_name: this.item ? this.item.primary_folder.name : 'Auto generated folder',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : []
                })
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>