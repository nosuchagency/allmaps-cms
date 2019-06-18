<template>
    <el-card>
        <template slot="header">
            <div class="header">
                <span>Welcome back <b>{{$auth.user().name}}</b></span>
                <el-button type="primary"
                           size="mini"
                           style="margin-left: auto;"
                           @click="$router.push({name : 'profile'})">
                    Edit profile
                </el-button>
            </div>
        </template>
        <div style="margin-bottom: 15px;">
            This is what you worked on last - maybe a place to continue?
        </div>
        <template v-for="activity in activities">
            <activity :activity="activity"></activity>
            <br>
        </template>
    </el-card>
</template>

<script>
    import activity from './activity';

    export default {
        components: {
            activity
        },
        data() {
            return {
                events: ['created', 'updated', 'deleted']
            }
        },
        computed: {
            activities() {
                let activities = this.$auth.user().activities.filter(({description}) => this.events.includes(description));
                return activities.slice(0, 3);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
