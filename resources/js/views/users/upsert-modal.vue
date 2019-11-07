<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="User" name="user">
                    <br>
                    <el-form-item :label="$t('users.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('users.attributes.email')"
                                  :class="{'is-error' : form.errors.has('email')}">
                        <el-input v-model="form.email">
                        </el-input>
                    </el-form-item>
                    <template v-if="!item">
                        <el-form-item :label="$t('users.attributes.password')"
                                      :class="{'is-error' : form.errors.has('password')}">
                            <el-input v-model="form.password"
                                      :placeholder="item ? $t('users.password_placeholder') : ''"
                                      type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Confirm Password"
                                      :class="{'is-error' : form.errors.has('password_confirmation')}">
                            <el-input v-model="form.password_confirmation"
                                      :placeholder="item ? $t('users.password_placeholder') : ''"
                                      type="password">
                            </el-input>
                        </el-form-item>
                    </template>
                    <el-form-item :label="$t('users.attributes.role')"
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
                    <el-form-item label="Description"
                                  :class="{'is-error' : form.errors.has('description')}">
                        <el-input v-model="form.description"
                                  type="textarea"
                                  :rows="3">
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="!item"
                                  label="Send invitation">
                        <el-checkbox v-model="form.invitation"></el-checkbox>
                    </el-form-item>
                    <el-form-item v-else>
                        <el-button type="primary"
                                   size="small"
                                   @click="sendInvitation">
                            Resend invitation
                        </el-button>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Taxonomy" name="taxonomies">
                    <br>
                    <el-form-item :label="$t('users.attributes.category')"
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
                    <el-form-item :label="$t('users.attributes.tags')"
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
                currentTab: 'user',
                resource: 'users',
                confirmDelete: false,
                form: new Form(
                    this.item ? this.getUpdateFormFields() : this.getCreateFormFields()
                )
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
            sendInvitation() {
                console.log('send invitation');
            },
            closeModal() {
                this.$emit('modal:close');
            },
            getCreateFormFields() {
                return {
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    password: '',
                    password_confirmation: '',
                    role: this.item ? this.item.role : null,
                    description: this.item ? this.item.description : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                    invitation: false
                }
            },
            getUpdateFormFields() {
                return {
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    role: this.item ? this.item.role : null,
                    description: this.item ? this.item.description : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
