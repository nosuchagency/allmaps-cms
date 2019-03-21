<template>
    <div class="structure-toolbar"
         :class="{'is-active' : !!currentStructure}">
        <template v-if="currentStructure">
            <div class="structure-details">
                <el-button size="mini"
                           type="primary"
                           @click="openStructureModal()">
                    Edit
                </el-button>
                <span class="structure-name">
                    {{currentStructure.getName()}}
                </span>
                <span class="structure-color">
                    <i class="fa fa-square"
                       :style="{color : currentStructure.getColor(), opacity : currentStructure.getOpacity()}">
                    </i>
                </span>
                <span class="structure-shape">
                    {{currentStructure.getShape()}}
                </span>
            </div>
            <div class="structure-actions">
                <el-button size="mini"
                           type="text"
                           class="btn-cancel"
                           @click="cancelStructure()">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="success"
                           @click="saveStructure()"
                           :disabled="!saveable">
                    Confirm
                </el-button>
            </div>
        </template>
        <structure-modal v-if="structureModalVisible"
                         :visible="structureModalVisible"
                         :structure="currentStructure.structure"
                         :url="url"
                         @structure-modal:close="closeStructureModal"
                         @structure-modal:update="updateStructure">
        </structure-modal>
    </div>
</template>

<script>
    import Hub from '../../../events/hub';
    import structureModal from './structure-modal';

    export default {
        components: {
            structureModal
        },
        props: {
            currentStructure: Object,
            url: String
        },
        data() {
            return {
                structureModalVisible: false
            }
        },
        computed: {
            saveable() {
                if (['image', 'rectangle', 'circle'].includes(this.currentStructure.getShape())) {
                    return true;
                }

                if (this.currentStructure.getShape() === 'polygon') {
                    return this.currentStructure.getCoordinates()[0].length >= 2;
                }

                return this.currentStructure.getCoordinates().length >= 2;
            }
        },
        methods: {
            updateStructure(structure) {
                this.currentStructure.structure = structure;
            },
            saveStructure() {
                Hub.$emit('structure:save');
            },
            cancelStructure() {
                Hub.$emit('structure:cancel');
            },
            openStructureModal() {
                this.structureModalVisible = true;
            },
            closeStructureModal() {
                this.structureModalVisible = false;
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .structure-toolbar {
        transition: height 0.2s ease-in-out;
        overflow: hidden;
        width: 100%;
        height: 0;
        background-color: #fff;
        position: absolute;
        z-index: 801;
        display: flex;
        align-items: center;

        &.is-active {
            height: 56px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

    .structure-actions {
        margin-left: auto;
        margin-right: 25px;
        display: flex;
        align-items: center;
    }

    .structure-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 15px;
    }

    .structure-shape {
        font-size: 13px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .structure-details {
        color: #666;
        font-size: 14px;
        margin-left: 25px;
    }
</style>