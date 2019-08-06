<template>
    <modal :visible="visible"
           @modal:close="closeModal">
        <el-form :model="form"
                 label-width="120px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Beacon Provider" name="beacon_provider">
                    <br>
                    <el-form-item label="Name"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item label="Type"
                                  :class="{'is-error' : form.errors.has('type')}">
                        <el-select v-model="form.type"
                                   :disabled="!!item">
                            <el-option
                                    v-for="item in ['kontakt', 'estimote']"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="!item">
                        <el-form-item v-if="form.type === 'kontakt'" label="Api Key"
                                      :class="{'is-error' : form.errors.has('meta.api_key') || form.errors.has('meta')}">
                            <el-input v-model="form.meta.api_key" autofocus></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.type === 'estimote'" label="App id"
                                      :class="{'is-error' : form.errors.has('meta.app_id') || form.errors.has('meta')}">
                            <el-input v-model="form.meta.app_id" autofocus></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.type === 'estimote'" label="App token"
                                      :class="{'is-error' : form.errors.has('meta.app_token') || form.errors.has('meta')}">
                            <el-input v-model="form.meta.app_token" autofocus></el-input>
                        </el-form-item>
                    </template>
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
                currentTab: 'beacon_provider',
                resource: 'beacon-providers',
                confirmDelete: false,
                form: new Form({
                    name: this.item ? this.item.name : '',
                    type: this.item ? this.item.type : 'kontakt',
                    meta: {
                        api_key: '',
                        app_id: '',
                        app_token: ''
                    }
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
