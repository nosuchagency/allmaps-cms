<template>
    <div class="location-toolbar"
         :class="{'is-active' : !!location}">
        <template v-if="location">
            <div class="location-details">
                <span class="location-name">
                    {{location.getName()}}
                </span>
                <span class="location-type">
                    {{location.getType()}}
                </span>
                <!--<span class="component-color">-->
                <!--<i class="fa fa-square"-->
                <!--:style="{color : structure.getColor(), opacity : structure.getOpacity()}">-->
                <!--</i>-->
                <!--</span>-->
                <!--<span class="component-shape">-->
                <!--{{structure.getShape()}}-->
                <!--</span>-->
            </div>
            <div class="location-actions">
                <el-button size="mini"
                           type="danger"
                           @click="confirmDeleteVisible = true">
                    <i class="fa fa-trash-alt location-delete"
                       aria-hidden="true">
                    </i>
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="cancelLocation()">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="primary"
                           @click="saveLocation()"
                           v-if="canSave">
                    Finish
                </el-button>
            </div>
            <confirm-dialog title="Delete Location"
                            :visible="confirmDeleteVisible"
                            :message="$t('general.confirm')"
                            @cancel="confirmDeleteVisible = false"
                            @confirm="deleteLocation()">
            </confirm-dialog>
        </template>
    </div>
</template>

<script>
    import Hub from '../../../events/hub';

    export default {
        props: {
            location: Object
        },
        data() {
            return {
                confirmDeleteVisible: false
            }
        },
        computed: {
            canSave() {
                if (!this.location.isArea()) {
                    return true;
                }

                return this.location.getCoordinates()[0].length >= 2;
            }
        },
        methods: {
            saveLocation() {
                Hub.$emit('location:save');
            },
            cancelLocation() {
                Hub.$emit('location:cancel');
            },
            deleteLocation() {
                Hub.$emit('location:remove');
                this.confirmDeleteVisible = false
            }
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .location-toolbar {
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

    .location-actions {
        margin-left: auto;
        margin-right: 25px;
        display: flex;
        align-items: center;
    }

    .location-name {
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
    }

    .location-type {
        font-size: 13px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .location-delete {
        cursor: pointer;
        color: #fff;
    }

    .location-details {
        color: #666;
        font-size: 14px;
        margin-left: 25px;
    }
</style>