<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="120px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Skin" name="skin">
                    <br>
                    <el-form-item :label="$t('skins.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('skins.attributes.file')"
                                  :class="{'is-error' : form.errors.has('file')}">
                        <input type="file" @change="onFileChange"></input>
                    </el-form-item>
                    <template v-if="item">
                        <el-form-item>
                            <a :href="`${baseUrl}/skins/${item.id}/download`" v-if="item.valid">
                                <el-button type="primary"
                                           size="mini">
                                    Download Skin
                                </el-button>
                            </a>
                            <span class="info-text-danger"
                                  v-else>
                                        The skin is not valid
                                </span>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-checkbox v-model="mobile">Mobile</el-checkbox>
                        <el-checkbox v-model="tablet">Tablet</el-checkbox>
                        <el-checkbox v-model="desktop">Desktop</el-checkbox>
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
                currentTab: 'skin',
                resource: 'skins',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    file: '',
                    mobile: this.item ? (this.item.mobile ? 1 : 0) : 0,
                    tablet: this.item ? (this.item.tablet ? 1 : 0) : 0,
                    desktop: this.item ? (this.item.desktop ? 1 : 0) : 0,
                    _method: this.item ? 'PUT' : ''
                }, {asFormData: true})
            }
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.form.file = files[0];
            },
            create() {
                this.form.post(`/${this.resource}`, {headers: {'content-type': 'multipart/form-data'}})
                    .then(response => this.$emit('modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.post(`/${this.resource}/${this.item.id}`, {headers: {'content-type': 'multipart/form-data'}})
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
        },
        computed: {
            baseUrl() {
                return this.$store.getters.baseUrl;
            },
            mobile: {
                get() {
                    return !!this.form.mobile;
                },
                set(value) {
                    this.form.mobile = value ? 1 : 0;
                }
            },
            tablet: {
                get() {
                    return !!this.form.tablet;
                },
                set(value) {
                    this.form.tablet = value ? 1 : 0;
                }
            },
            desktop: {
                get() {
                    return !!this.form.desktop;
                },
                set(value) {
                    this.form.desktop = value ? 1 : 0;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-text-danger {
        color: #FF0000;
        font-size: 12px;
        padding: 9px 0;
        font-weight: 500;
    }
</style>
