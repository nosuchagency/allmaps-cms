<template>
    <file-pond ref="pond"
               label-idle="Drop image here..."
               accepted-file-types="image/jpeg, image/png"
               :server="server"
               :files="images"
               :imageResizeTargetWidth="800"
               :imageResizeTargetHeight="800"
               imageResizeMode="contain"
               @addfile="imageAdded"
               @removefile="imageRemoved">
    </file-pond>
</template>

<script>
    import vueFilePond from 'vue-filepond';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

    import FilePondPluginFileValidateType
        from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
    import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
    import FilePondPluginImageResize from 'filepond-plugin-image-resize';

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageTransform,
        FilePondPluginImageResize,
    );

    export default {
        props: {
            images: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            FilePond
        },
        data() {
            return {
                server: {
                    load: (source, load) => {
                        fetch(source).then(res => res.blob()).then(load);
                    },
                    process: null,
                    revert: null,
                    restore: null,
                    fetch: null
                }
            }
        },
        methods: {
            imageAdded() {
                let reader = new FileReader();
                reader.readAsDataURL(this.$refs.pond.getFile().file);
                reader.onload = () => this.$emit('image:added', reader.result);
                reader.onerror = () => this.$emit('image:error');
            },
            imageRemoved() {
                this.$emit('image:removed');
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ {
        .filepond--root {
            margin-bottom: 0 !important;
        }
    }
</style>
