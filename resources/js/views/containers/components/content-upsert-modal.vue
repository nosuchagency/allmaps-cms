<template>
    <portal to="modals"
            v-if="visible">
        <el-dialog :title="type"
                   :visible="visible"
                   @close="closeModal">
            <template slot="title">
                <span class="capitalize">
                    {{type}}
                </span>
            </template>
            <content-type :item="item"
                          :type="type"
                          :form="form"
                          @sync-fields="syncFields">
            </content-type>
            <div slot="footer"
                 class="dialog-footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="remove">
                    Remove
                </el-button>
                <el-button size="small"
                           @click="closeModal()">
                    Cancel
                </el-button>
                <el-button type="success"
                           size="small"
                           @click="item ? update() : create()">
                    Confirm
                </el-button>
            </div>
        </el-dialog>
    </portal>
</template>

<script>
    import contentType from './content-type';
    import Form from '../../../utils/Form';

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
                form: new Form({})
            };
        },
        methods: {
            create() {
                this.form.post(`/containers/${this.folder.container.id}/folders/${this.folder.id}/${this.getResource()}`)
                    .then(response => this.$emit('content-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/containers/${this.folder.container.id}/folders/${this.folder.id}/${this.getResource()}`)
                    .then(response => this.$emit('content-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/containers/${this.folder.container.id}/folders/${this.folder.id}/${this.getResource()}`)
                    .then(response => this.$emit('content-modal:remove', response))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('content-modal:close');
            },
            syncFields(fields) {
                this.form = new Form(fields);
            },
            getResource() {
                let resource = '';

                switch (this.type) {
                    case 'image':
                        resource = 'images';
                        break;
                    case 'video':
                        resource = 'videos';
                        break;
                    case 'file':
                        resource = 'files';
                        break;
                    case 'gallery':
                        resource = 'galleries';
                        break;
                    case 'text':
                        resource = 'texts';
                        break;
                    case 'web':
                        resource = 'web';
                        break;
                }

                return resource + (this.item ? '/' + this.item.id : '');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .capitalize {
        text-transform: capitalize;
    }
</style>
