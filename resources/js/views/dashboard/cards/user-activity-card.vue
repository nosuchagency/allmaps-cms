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
        <template v-if="loading">
            <div class="loading-container">
                <i class="fa fa-cog fa-spin loading-spinner"
                   v-if="loading">
                </i>
            </div>
        </template>
        <template v-else>
            <div :class="{'has-activities' : hasActivities}">
                {{hasActivities
                ? 'This is what you worked on last - maybe a place to continue?'
                : 'You have no recent activity'}}
            </div>
            <template v-for="activity in activities">
                <activity :activity="activity"></activity>
                <br>
            </template>
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
                loading: false,
                events: ['created', 'updated', 'deleted', 'started', 'finished'],
                user: null
            }
        },
        created() {
            this.getUser();
        },
        methods: {
            async getUser() {
                try {
                    this.loading = true;
                    const {data} = await this.$axios.get('/profile');
                    this.user = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            }
        },
        computed: {
            hasActivities() {
                return this.activities.length > 0;
            },
            activities() {
                let activities = this.user.activities.filter(({description}) => this.events.includes(description));
                return activities.slice(0, 3);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .has-activities {
        margin-bottom: 15px;
    }
</style>
