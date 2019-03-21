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
                          :errors="errors"

                          @sync-form="form = $event">
            </content-type>
            <div slot="footer"
                 class="dialog-footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="removeItem">
                    Remove
                </el-button>
                <el-button size="small"
                           @click="closeModal()">
                    Cancel
                </el-button>
                <el-button type="success"
                           v-if="item"
                           size="small"
                           @click="submit(true)"
                           :loading="busy">
                    Confirm
                </el-button>
                <el-button type="success"
                           v-if="!item"
                           size="small"
                           @click="submit()"
                           :loading="busy">
                    Create
                </el-button>
            </div>
        </el-dialog>
    </portal>
</template>

<script>
    import contentType from './content-type';
    import form from 'js/mixins/form';

    export default {
        mixins: [form],
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
                form: null,
                errors: null
            };
        },
        methods: {
            async submit(updating = false) {
                this.startProcessing();

                try {
                    if (updating) {
                        const response = await this.$axios.put('/containers/' + this.folder.container.id + '/folders/' + this.folder.id + this.getResource(), this.form);
                        this.$emit('content-updated', response.data);
                    } else {
                        const response = await this.$axios.post('/containers/' + this.folder.container.id + '/folders/' + this.folder.id + this.getResource(), this.form);
                        this.$emit('content-created', response.data);
                    }
                    this.closeModal();
                } catch (error) {
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            },
            async removeItem() {
                this.startProcessing();

                try {
                    await this.$axios.delete('/containers/' + this.folder.container_id + '/folders/' + this.folder.id + this.getResource());
                    this.$emit('content-removed', this.item);
                    this.closeModal();
                } catch (error) {
                    console.log(error);
                    if (error.response.data.errors) {
                        this.setErrors(error.response.data.errors);
                    }
                } finally {
                    this.finishProcessing();
                }
            },
            closeModal() {
                this.$emit('close-content-modal');
            },
            getResource() {
                let resource = '';

                switch (this.type) {
                    case 'image':
                        resource = '/images';
                        break;
                    case 'video':
                        resource = '/videos';
                        break;
                    case 'file':
                        resource = '/files';
                        break;
                    case 'gallery':
                        resource = '/galleries';
                        break;
                    case 'text':
                        resource = '/texts';
                        break;
                    case 'web':
                        resource = '/web';
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
