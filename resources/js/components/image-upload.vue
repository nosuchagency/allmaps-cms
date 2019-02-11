<template>
    <div class="image-preview-container">
        <div class="image-preview"
             :style="{'background-image' : backgroundImage}"
             :class="{'dragging-over' : draggingOver}"
             @dragover="draggingOver = true"
             @dragleave="draggingOver = false"
             @dragdrop="draggingOver = false">
            <i class="fa fa-times icon-remove"
               v-if="image"
               @click="removeImage">
            </i>
            <div class="upload-description"
                 v-if="!image">
                <i class="fa fa-cloud-upload"></i>
                <span>Tilføj billede</span>
            </div>
            <input class="image-upload"
                   type="file"
                   ref="image"
                   accept="image/*"
                   @change="imageUpload()">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            image: String
        },
        data() {
            return {
                draggingOver: false
            };
        },
        computed: {
            backgroundImage() {
                return this.image ? 'url(' + this.image + ')' : null;
            }
        },
        methods: {
            imageUpload() {
                let uploadedFile = this.$refs.image.files[0];
                let reader = new FileReader();
                let self = this;
                reader.readAsDataURL(uploadedFile);
                reader.onload = function () {
                    self.$emit('image-uploaded', reader.result);
                    self.$refs.image.value = '';
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            },
            removeImage() {
                this.$emit('image-removed');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-preview-container {
        height: 200px;
        width: 200px;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 5px;
    }

    .image-upload {
        opacity: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
    }

    .image-preview {
        border: 1px dashed #bbbbbf;
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 5px;
        position: relative;

        &:hover,
        &.dragging-over {
            background-color: #eaeaef;
        }
    }

    .upload-description {
        position: absolute;
        top: calc(35%);
        width: 100%;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
    }

    .icon-remove {
        cursor: pointer;
        position: absolute;
        color: red;
        top: 3px;
        right: 5px;
        z-index: 1000;
        transition: font-size 2s;
    }
</style>
