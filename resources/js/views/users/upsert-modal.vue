<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="User" name="user">
                        <br>
                        <el-form-item :label="$t('users.attributes.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('users.attributes.email')"
                                      :class="{'is-error' : has('email')}">
                            <el-input v-model="form.email">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('users.attributes.password')"
                                      :class="{'is-error' : has('password')}">
                            <el-input v-model="form.password"
                                      :placeholder="$t('users.password_placeholder')"
                                      type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('users.attributes.role')"
                                      :class="{'is-error' : has('role')}">
                            <fetch-items url="/roles">
                                <el-select slot-scope="{items, loading}"
                                           v-model="form.role"
                                           placeholder="Select">
                                    <el-option v-for="(role, index) in items"
                                               :key="index"
                                               :label="role.name"
                                               :value="role.name">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                        <el-form-item label="Invitation">
                            <el-switch v-model="form.send_invitation" label="Send invitation email"
                                         border></el-switch>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Taxonomy" name="taxonomies">
                        <br>
                        <el-form-item :label="$t('users.attributes.category')"
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
                        <el-form-item :label="$t('users.attributes.tags')"
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
                           @click="closeModal">
                    Cancel
                </el-button>
                <el-button type="primary"
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
                currentTab: 'user',
                resource: 'users',
                form: this.getForm()
            }
        },
        methods: {
            getForm() {
                return {
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    password: '',
                    role: this.item ? this.item.role : '',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                    send_invitation: false
                }
            },
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
            async fetch() {
            },
            closeModal() {
                this.$emit('upsert-modal:close');
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

        .btn-remove {
            float: left;
            color: #FF0000;

            &:hover {
                color: #990000;
            }
        }
    }
</style>