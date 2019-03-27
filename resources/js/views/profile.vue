<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-user title-icon"></i>
                        <label>{{$t('profile.title')}}</label>
                    </div>
                </template>
            </toolbar>
        </template>
        <template slot="content">

            <div class="loading" v-if="!item">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>

            <div class="content" v-else>
                <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                        <span>{{$t('general.details')}}</span>
                    </div>
                    <el-form :model="form"
                             label-width="120px"
                             @keydown.native="form.errors.clear($event.target.name)">
                        <el-form-item :label="$t('profile.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('profile.email')"
                                      :class="{'is-error' : form.errors.has('email')}">
                            <el-input v-model="form.email">
                            </el-input>
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
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('profile.password')"
                                      :class="{'is-error' : form.errors.has('password')}">
                            <el-input v-model="form.password"
                                      :placeholder="$t('profile.password_placeholder')"
                                      type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('profile.role')"
                                      :class="{'is-error' : form.errors.has('role')}">
                            <fetch-items url="/roles">
                                <el-select slot-scope="{items, loading}"
                                           v-model="form.role"
                                           value-key="id"
                                           placeholder="Select">
                                    <el-option
                                            v-for="(role, index) in items.map(item => {return {'label' : item.name, 'value' : item}})"
                                            :key="index"
                                            :label="role.label"
                                            :value="role.value">
                                    </el-option>
                                </el-select>
                            </fetch-items>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </template>
    </layout>
</template>

<script>
    import Form from '../utils/Form';

    export default {
        data() {
            return {
                item: null,
                resource: 'profile',
                locales: [
                    {'label': 'English', 'value': 'en'},
                    {'label': 'Dansk', 'value': 'da'}
                ],
                form: this.getForm()
            }
        },
        watch: {
            'form.locale'(val) {
                this.$i18n.locale = val;
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            getForm() {
                return new Form({
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    password: '',
                    role: this.item ? this.item.role : '',
                    locale: this.item ? this.item.locale : ''
                })
            },
            fetch() {
                this.form.get(`/${this.resource}`)
                    .then(response => {
                        this.item = response;
                        this.form = this.getForm();
                    })
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}`)
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
