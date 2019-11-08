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
                    <el-form-item :label="$t('users.attributes.password')"
                                  :class="{'is-error' : form.errors.has('password')}">
                        <el-input v-model="form.password"
                                  :placeholder="$t('users.password_placeholder')"
                                  type="password">
                        </el-input>
                    </el-form-item>
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
                    <el-form-item :label="$t('profile.locale')"
                                  :class="{'is-error' : form.errors.has('locale')}">
                        <el-select v-model="form.locale"
                                   placeholder="Select">
                            <el-option
                                    v-for="item in locales"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    <span class="flag-icon"
                                          :class="`flag-icon-${item.flag}`">
                                    </span>
                                {{item.label}}
                            </el-option>
                        </el-select>
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
            <el-button type="text"
                       size="small"
                       class="btn-cancel"
                       @click="closeModal">
                Cancel
            </el-button>
            <el-button type="success"
                       size="small"
                       :loading="form.busy"
                       @click="update">
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
                form: new Form({
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    password: '',
                    role: this.item ? this.item.role : null,
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                    locale: this.item ? this.item.locale : ''
                }),
                locales: [
                    {'label': 'English', 'value': 'en_GB', 'flag': 'gb'},
                    {'label': 'Dansk', 'value': 'da_DK', 'flag': 'dk'}
                ]
            }
        },
        methods: {
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('modal:update', response))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flag-icon {
        margin-right: 5px;
    }
</style>
