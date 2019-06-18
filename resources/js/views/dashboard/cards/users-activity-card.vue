<template>
    <el-card>
        <template slot="header">
            <div class="header">
                <span>Latest changes</span>
                <el-button type="primary"
                           size="mini"
                           style="margin-left: auto;"
                           @click="$router.push({name : 'activities-index'})">
                    See all changes
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
            <div style="margin-bottom: 15px;">
                <template v-if="activities.length > 0">
                    This is the latest changes in the system
                </template>
                <template v-else>
                    No activity yet
                </template>
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
                events: ['created', 'updated', 'deleted']
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            async getItems() {
                try {
                    this.loading = true;
                    const {data} = await this.$axios.get('/activities');
                    this.items = data;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.loading = false;
                }
            },
        },
        computed: {
            activities() {
                let activities = this.items.filter(({causer, description}) => causer.id !== this.userId && this.events.includes(description));
                return activities.splice(0, 10);
            },
            userId() {
                return this.$auth.user().id;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
