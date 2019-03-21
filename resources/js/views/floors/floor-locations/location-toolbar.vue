<template>
    <div class="location-toolbar"
         :class="{'is-active' : !!currentLocation}">
        <template v-if="currentLocation">
            <div class="location-details">
                <el-button size="mini"
                           type="primary"
                           @click="openLocationModal()">
                    Edit
                </el-button>
                <span class="location-name">
                    {{currentLocation.getName()}}
                </span>
                <span class="location-type">
                    {{currentLocation.getType()}}
                </span>
            </div>
            <div class="location-actions">
                <el-button size="mini"
                           type="text"
                           class="btn-cancel"
                           @click="cancelLocation()">
                    Cancel
                </el-button>
                <el-button size="mini"
                           type="success"
                           @click="saveLocation()"
                           :disabled="!saveable">
                    Confirm
                </el-button>
            </div>
        </template>
        <location-modal v-if="locationModalVisible"
                        :visible="locationModalVisible"
                        :location="currentLocation.location"
                        :url="url"
                        @location-modal:close="closeLocationModal"
                        @location-modal:update="updateLocation">
        </location-modal>
    </div>
</template>

<script>
    import Hub from '../../../events/hub';
    import locationModal from './location-modal';

    export default {
        components: {
            locationModal
        },
        props: {
            currentLocation: Object,
            url: String
        },
        data() {
            return {
                locationModalVisible: false
            }
        },
        computed: {
            saveable() {
                if (!this.currentLocation.isArea()) {
                    return true;
                }

                return this.currentLocation.getCoordinates()[0].length >= 2;
            }
        },
        methods: {
            updateLocation(location) {
                this.currentLocation.location = location;
            },
            saveLocation() {
                Hub.$emit('location:save');
            },
            cancelLocation() {
                Hub.$emit('location:cancel');
            },
            openLocationModal() {
                this.locationModalVisible = true;
            },
            closeLocationModal() {
                this.locationModalVisible = false;
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
        margin: 0 15px;
    }

    .location-type {
        font-size: 13px;
        font-weight: bold;
        text-transform: capitalize;
    }

    .location-details {
        color: #666;
        font-size: 14px;
        margin-left: 25px;
    }
</style>