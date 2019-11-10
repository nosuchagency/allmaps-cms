<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Password" name="password">
                    <br>
                    <el-form-item :label="$t('users.attributes.password')"
                                  :class="{'is-error' : form.errors.has('password')}"
                                  type="password">
                        <el-input type="password"
                                  v-model="form.password"
                                  autofocus>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('users.attributes.password_confirmation')"
                                  :class="{'is-error' : form.errors.has('password_confirmation')}">
                        <el-input type="password"
                                  v-model="form.password_confirmation">
                        </el-input>
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
                currentTab: 'password',
                resource: 'users',
                form: new Form({
                    password: '',
                    password_confirmation: '',
                })
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

</style>
