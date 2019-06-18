<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <div class="title-icon-wrapper">
                        <i class="fa fa-tachometer-alt title-icon"></i>
                        <label>Dashboard</label>
                    </div>
                </template>
            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <el-row :gutter="25">
                    <el-col :span="12">
                        <user-activity-card></user-activity-card>
                    </el-col>
                    <el-col :span="12">
                        <users-activity-card></users-activity-card>
                    </el-col>
                </el-row>
                <el-row :gutter="25">
                    <el-col :span="12">
                        <places-statistics-card></places-statistics-card>
                    </el-col>
                    <el-col :span="12">
                        <containers-statistics-card></containers-statistics-card>
                    </el-col>
                </el-row>
            </div>
        </template>
    </layout>
</template>

<script>
    import userActivityCard from './cards/user-activity-card';
    import usersActivityCard from './cards/users-activity-card';
    import placesStatisticsCard from './cards/places-statistics-card';
    import containersStatisticsCard from './cards/containers-statistics-card';

    export default {
        components: {
            userActivityCard,
            usersActivityCard,
            placesStatisticsCard,
            containersStatisticsCard,
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ {
        a {
            color: blue;
            text-decoration: underline;

            &:hover {
                color: #0000b3;
            }
        }

        .header {
            display: flex;
            width: 100%;
            align-items: center;
        }

        .loading-container {
            display: flex;
            justify-content: center;
        }
    }
</style>
