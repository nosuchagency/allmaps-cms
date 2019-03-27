<template>
    <portal to="modals">
        <el-dialog :visible="visible"
                   :before-close="closeModal">
            <el-form :model="form"
                     status-icon
                     label-width="120px"
                     @keydown.native="form.errors.clear($event.target.name)">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="Building" name="building">
                        <br>
                        <el-form-item :label="$t('buildings.attributes.name')"
                                      :class="{'is-error' : form.errors.has('name')}">
                            <el-input v-model="form.name" autofocus></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Image" name="image">
                        <br>
                        <el-form-item :label="$t('buildings.attributes.image')"
                                      :class="{'is-error' : form.errors.has('image')}">
                            <image-upload @image-uploaded="setImage"
                                          @image-removed="setImage"
                                          :image="form.image">
                            </image-upload>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer">
                <el-button v-if="item"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="remove">
                    Delete
                </el-button>
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
        </el-dialog>
    </portal>
</template>

<script>
    import Form from '../../utils/Form';
    import imageUpload from 'js/components/image-upload';

    export default {
        components: {
            imageUpload
        },
        props: {
            visible: Boolean,
            placeId: Number,
            item: Object
        },
        data() {
            return {
                currentTab: 'building',
                resource: 'buildings',
                form: new Form({
                    name: this.item ? this.item.name : '',
                    image: this.item ? this.item.image : '',
                })
            }
        },
        methods: {
            create() {
                this.form.post(`/places/${this.placeId}/${this.resource}`)
                    .then(response => this.$emit('building-modal:add', response))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/places/${this.placeId}/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('building-modal:update', response))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/places/${this.placeId}/${this.resource}/${this.item.id}`)
                    .then(response => this.$emit('building-modal:remove', response))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('building-modal:close');
            },
            setImage(image = null) {
                this.form.image = image;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>