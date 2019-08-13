<template>
    <el-form :model="fields"
             label-width="120px"
             @keydown.native="form.errors.clear($event.target.name)">
        <el-tabs v-model="currentTab">
            <el-tab-pane label="File" name="file">
                <br>
                <el-form-item label="Name"
                              :class="{'is-error' : form.errors.has('name')}">
                    <el-input v-model="fields.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="Name"
                              :class="{'is-error' : form.errors.has('name')}">
                    <input type="file"
                           ref="file"
                           @change="handleFile">
                    </input>
                </el-form-item>
                <a target="_blank"
                   :href="item.file"
                   v-if="item && item.file">
                    Download fil
                </a>
            </el-tab-pane>
            <el-tab-pane label="Taxonomy" name="taxonomies">
                <el-form-item :label="$t('places.attributes.category')"
                              :class="{'is-error' : form.errors.has('category')}">
                    <fetch-items url="/categories">
                        <el-select v-model="fields.category"
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
                <el-form-item :label="$t('beacons.attributes.tags')"
                              :class="{'is-error' : form.errors.has('tags')}">
                    <fetch-items url="/tags">
                        <el-select v-model="fields.tags"
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
</template>

<script>
    export default {
        props: {
            item: Object,
            form: Object,
            folder: Object
        },
        data() {
            return {
                fields: this.getFields(),
                currentTab: 'file',
                processingFile: false
            };
        },
        watch: {
            fields: {
                handler(fields) {
                    this.syncFields();
                },
                deep: true
            }
        },
        mounted() {
            this.fields = this.getFields();
            this.syncFields();
        },
        methods: {
            getFields() {
                return {
                    name: this.item ? this.item.name : '',
                    file: '',
                    type: 'file',
                    category: this.item ? this.item.category : '',
                    tags: this.item ? this.item.tags : [],
                    folder: this.folder
                };
            },
            syncFields() {
                this.$emit('sync-fields', this.fields);
            },
            async handleFile() {
                if (this.$refs.file.files.length === 0) {
                    return;
                }

                this.processingFile = true;

                try {
                    let payload = new FormData();
                    let file = this.$refs.file.files[0];
                    payload.append('file', file);

                    // let config = {
                    //     header: {
                    //         'Content-Type': 'multipart/form-data'
                    //     }
                    // };

                    const {data} = await this.$axios.post('/files', payload);
                    this.fields.file = data.path;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.processingFile = false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
