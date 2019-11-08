<template>
    <modal :visible="visible"
           @modal:close="closeModal"
           width="60%">
        <el-form :model="form"
                 label-width="140px"
                 @keydown.native="form.errors.clear($event.target.name)">
            <el-tabs v-model="currentTab">
                <el-tab-pane label="Rule" name="rule">
                    <br>
                    <el-form-item label="Beacon Distance"
                                  :class="{'is-error' : form.errors.has('distance')}">
                        <el-select v-model="form.distance">
                            <el-option v-for="item in distances"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Weekday(s)"
                                  :class="{'is-error' : form.errors.has('weekday')}">
                        <el-select v-model="form.weekday">
                            <el-option v-for="item in weekdays"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Discovery Time"
                                  :class="{'is-error' : form.errors.has('discovery_time')}">
                        <el-input v-model="form.discovery_time" autofocus></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Time Restriction" name="time">
                    <br>
                    <el-form-item label="Enable">
                        <el-switch v-model="form.time_restricted"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="form.time_restricted"
                                  label="Time from"
                                  :class="{'is-error' : form.errors.has('time_from')}">
                        <el-time-select v-model="form.time_from"
                                        :picker-options="{
                                                        start: '00:00',
                                                        step: '00:05',
                                                        end: '23:55'
                                                     }">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item v-if="form.time_restricted"
                                  label="Time to"
                                  :class="{'is-error' : form.errors.has('time_to')}">
                        <el-time-select v-model="form.time_to"
                                        :picker-options="{
                                                        start: '00:00',
                                                        step: '00:05',
                                                        end: '23:55',
                                                        minTime: form.time_from
                                                     }">
                        </el-time-select>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="Date Restriction" name="date">
                    <br>
                    <el-form-item label="Enable">
                        <el-switch v-model="form.date_restricted"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="form.date_restricted"
                                  label="Date from"
                                  :class="{'is-error' : form.errors.has('date_from')}">
                        <el-date-picker v-model="form.date_from"
                                        type="date"
                                        format="dd-MM-yyyy"
                                        value-format="dd-MM-yyyy">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="form.date_restricted"
                                  label="Date to"
                                  :class="{'is-error' : form.errors.has('date_to')}">
                        <el-date-picker v-model="form.date_to"
                                        type="date"
                                        format="dd-MM-yyyy"
                                        value-format="dd-MM-yyyy">
                        </el-date-picker>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer">
            <template v-if="item">
                <el-button v-if="!confirmDelete"
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="confirmDelete = true">
                    Delete
                </el-button>
                <el-button v-else
                           type="text"
                           size="small"
                           class="btn-remove"
                           @click="remove">
                    Are you sure?
                </el-button>
            </template>
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
    </modal>
</template>

<script>
    import Form from '../../utils/Form';

    export default {
        props: {
            visible: Boolean,
            item: Object,
            containerId: Number,
            beaconId: Number
        },
        data() {
            return {
                currentTab: 'rule',
                confirmDelete: false,
                weekdays: [
                    {label: 'All days', 'value': 'all'},
                    {label: 'Weekdays', 'value': 'weekdays'},
                    {label: 'Weekends', 'value': 'weekends'},
                    {label: 'Monday', 'value': 'monday'},
                    {label: 'Tuesday', 'value': 'tuesday'},
                    {label: 'Wednesday', 'value': 'wednesday'},
                    {label: 'Thursday', 'value': 'thursday'},
                    {label: 'Friday', 'value': 'friday'},
                    {label: 'Saturday', 'value': 'saturday'},
                    {label: 'Sunday', 'value': 'sunday'},
                ],
                distances: [
                    {label: 'Close', 'value': 'close'},
                    {label: 'Medium', 'value': 'medium'},
                    {label: 'Far', 'value': 'far'},
                ],
                form: new Form({
                    distance: this.item ? this.item.distance : 'close',
                    weekday: this.item ? this.item.weekday : 'all',
                    discovery_time: this.item ? this.item.discovery_time : null,
                    time_from: this.item ? this.item.time_from : null,
                    time_to: this.item ? this.item.time_to : null,
                    date_from: this.item ? this.item.date_from : null,
                    date_to: this.item ? this.item.date_to : null,
                    time_restricted: this.item ? !!this.item.time_restricted : false,
                    date_restricted: this.item ? !!this.item.date_restricted : false,
                })
            }
        },
        methods: {
            create() {
                this.form.post(`/containers/${this.containerId}/beacons/${this.beaconId}/rules`)
                    .then(response => this.$emit('rule:add', {
                        rule: response,
                        containerId: this.containerId,
                        beaconId: this.beaconId
                    }))
                    .catch(error => console.log(error));
            },
            update() {
                this.form.put(`/containers/${this.containerId}/beacons/${this.beaconId}/rules/${this.item.id}`)
                    .then(response => this.$emit('rule:update', {
                        rule: response,
                        containerId: this.containerId,
                        beaconId: this.beaconId
                    }))
                    .catch(error => console.log(error));
            },
            remove() {
                this.form.delete(`/containers/${this.containerId}/beacons/${this.beaconId}/rules/${this.item.id}`)
                    .then(response => this.$emit('rule:remove', {
                        rule: this.item,
                        containerId: this.containerId,
                        beaconId: this.beaconId
                    }))
                    .catch(error => console.log(error));
            },
            closeModal() {
                this.$emit('modal:close')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-dialog {
        /deep/ .el-date-editor {
            width: 100%;
        }
    }
</style>

