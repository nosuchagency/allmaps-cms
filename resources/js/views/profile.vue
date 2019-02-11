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

            <div class="loading" v-if="!form">
                <i class="fa fa-cog fa-spin loading-spinner"></i>
            </div>

            <div class="content" v-else>
                <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                        <span>{{$t('general.details')}}</span>
                    </div>
                    <el-form :model="form"
                             label-width="120px">
                        <el-form-item :label="$t('profile.name')"
                                      :class="{'is-error' : has('name')}">
                            <el-input v-model="form.name"
                                      @change="update">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('profile.email')"
                                      :class="{'is-error' : has('email')}">
                            <el-input v-model="form.email"
                                      @change="update">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('profile.locale')"
                                      :class="{'is-error' : has('locale')}">
                            <el-select v-model="form.locale"
                                       placeholder="Select"
                                       @change="update">
                                <el-option
                                        v-for="item in locales"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('profile.password')"
                                      :class="{'is-error' : has('password')}">
                            <el-input v-model="form.password"
                                      :placeholder="$t('profile.password_placeholder')"
                                      @change="update"
                                      type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('profile.role')"
                                      :class="{'is-error' : has('role')}">
                            <fetch-items url="/roles">
                                <el-select slot-scope="{items, loading}"
                                           v-model="form.role"
                                           value-key="id"
                                           placeholder="Select"
                                           @change="update">
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
    import resource from 'js/mixins/resource';
    import form from 'js/mixins/form';

    export default {
        mixins: [resource, form],
        data() {
            return {
                locales: [
                    {'label': 'English', 'value': 'en'},
                    {'label': 'Dansk', 'value': 'da'}
                ]
            }
        },
        watch: {
            'form.locale'(val) {
                this.$i18n.locale = val;
            }
        },
        methods: {
            fetch() {
                this.getResource();
            },
            getForm() {
                return {
                    name: this.item ? this.item.name : '',
                    email: this.item ? this.item.email : '',
                    password: '',
                    role: this.item ? this.item.role : '',
                    locale: this.item ? this.item.locale : ''
                }
            },
            async getResource() {
                this.startProcessing();
                try {
                    const response = await this.$axios.get('/profile');
                    this.item = response.data;
                    this.form = this.getForm();
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            },
            async update() {
                this.startProcessing();
                try {
                    await this.$axios.put('/profile', this.form);
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
