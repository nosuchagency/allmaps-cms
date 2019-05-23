<template>
    <portal to="modals"
            v-if="visible">
        <el-dialog :visible="visible"
                   :title="type"
                   @close="closeModal">
            <template slot="title">
                <span class="capitalize">
                    {{type}}
                </span>
            </template>
            <content-type :item="item"
                          :type="type"
                          :form="form"
                          :folder="folder"
                          @sync-fields="syncFields">
            </content-type>
            <div slot="footer"
                 class="dialog-footer">
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
                <el-button size="small"
                           @click="closeModal()">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           :loading="form.busy"
                           @click="item ? update() : create()">
                    Confirm
                </el-button>
            </div>
        </el-dialog>
    </portal>
</template>

<script>
    import contentType from './content-type';
    import Form from 'js/utils/Form';

    export default {
        props: {
            visible: Boolean,
            type: String,
            item: Object,
            folder: Object
        },
        components: {
            contentType
        },
        data() {
            return {
                resource: 'contents',
                confirmDelete: false,
                form: new Form({}),
            };
        },
        methods: {
            create() {
                this.form.post(`/${this.resource}`)
                    .then(response => this.$emit('content-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('content-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('content-modal:remove', this.item))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('content-modal:close');
            },
            syncFields(fields) {
                this.form = new Form(fields);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .capitalize {
        text-transform: capitalize;
    }
</style>
