<template>
    <modal :visible="visible"
           @modal:close="closeModal"
           width="60%">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Structure" name="structure">
                    <br>
                    <el-form-item :label="$t('structures.attributes.name')"
                                  :class="{'is-error' : form.errors.has('name')}">
                        <el-input v-model="form.name" autofocus></el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer">
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
            <el-button type="text"
                       size="small"
                       class="btn-cancel"
                       @click="closeModal">
                    Cancel
            </el-button>
            <el-button type="success"
                       size="small"
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
            structure: Object
        },
        data() {
            return {
                currentTab: 'structure',
                confirmDelete: false,
                form: new Form({
                    name: this.structure.name,
                })
            }
        },
        methods: {
            update() {
                this.form.put(`/structures/${this.structure.id}`)
                    .then(response => {
                        this.$emit('modal:update', response);
                        this.closeModal();
                    })
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/structures/${this.structure.id}`)
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
