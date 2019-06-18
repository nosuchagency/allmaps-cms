<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Token" name="token">
                        <br>
                        <el-form-item :label="$t('tokens.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('tokens.attributes.role')"
                                      :class="{'is-error' : form.errors.has('role')}">
                            <fetch-items url="/roles">
                                <el-select slot-scope="{items, loading}"
                                           v-model="form.role"
                                           placeholder="Select"
                                           value-key="id">
                                    <el-option v-for="role in items"
                                               :key="role.id"
                                               :label="role.name"
                                               :value="role">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                        <el-form-item :label="$t('tokens.attributes.token')"
                                      v-if="item">
                            <el-input :value="form.token"
                                      ref="token"
                                      :readonly="true">
                                <el-button slot="append"
                                           @click="copyToClipboard()">Copy
                                </el-button>
                            </el-input>
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
                currentTab: 'token',
                resource: 'tokens',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    role: this.item ? this.item.role : null,
                    token: this.item ? this.item.token : ''
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
                    .then(response => this.$emit('upsert-modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('upsert-modal:close');
            },
            copyToClipboard() {
                this.$refs.token.select();
                document.execCommand('copy');
                this.$notify({title: 'Success', message: 'The token has been copied to clipboard', type: 'success'});
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
