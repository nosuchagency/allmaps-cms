<template>
    <div class="structure-toolbar"
         :class="{'is-active' : !!structure}">
        <template v-if="structure">
            <div class="structure-details">
                <el-button size="mini"
                           type="primary"
                           @click="openStructureModal()">
                    Edit
                </el-button>
                <span class="structure-name">
                    {{structure.getName()}}
                </span>
                <span class="structure-color">
                    <i class="fa fa-square"
                       :style="{color : structure.getColor(), opacity : structure.getOpacity()}">
                    </i>
                </span>
                <span class="structure-shape">
                    {{structure.getShape()}}
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
                           :disabled="!saveable"
                           :loading="saving">
                    Confirm
                </el-button>
            </div>
        </template>
        <structure-modal v-if="structureModalVisible"
                         :visible="structureModalVisible"
                         :structure="structure.structure"
                         @structure-modal:close="closeStructureModal"
                         @structure-modal:update="updateStructure"
                         @structure-modal:remove="removeStructure">
        </structure-modal>
    </div>
</template>

<script>
    import structureModal from './structure-modal';

    export default {
        components: {
            structureModal
        },
        props: {
            structure: Object
        },
        data() {
            return {
                structureModalVisible: false,
                saving: false
            }
        },
        computed: {
            saveable() {
                if (['image', 'rectangle', 'circle'].includes(this.structure.getShape())) {
                    return true;
                }

                if (this.structure.getShape() === 'polygon') {
                    return this.structure.getCoordinates()[0].length >= 2;
                }

                return this.structure.getCoordinates().length >= 2;
            }
        },
        methods: {
            updateStructure(structure) {
                this.structure.structure = structure;
                this.$emit('structure:saved')
            },
            async saveStructure() {
                this.saving = true;

                try {
                    let coordinates = this.structure.getCoordinates();
                    let markers = this.structure.getMarkers();
                    const {data} = await this.$axios.put('/structures/' + this.structure.getId(), {
                        coordinates,
                        markers
                    });
                    this.updateStructure(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    this.saving = false;
                }
            },
            cancelStructure() {
                this.$emit('structure:cancelled');
            },
            removeStructure() {
                this.closeStructureModal();
                this.$emit('structure:removed')
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