<template>
    <layout>
        <template slot="toolbar">
            <toolbar>
                <template slot="left">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push('/dashboard')">
                        {{$t('errors.401.link_text')}}
                    </el-button>
                </template>
                <template slot="middle">

                </template>
                <template slot="right">

                </template>
            </toolbar>
        </template>
        <template slot="content">
            <div class="content">
                <el-card class="box-card">
                    <h3>{{$t('errors.401.title')}}</h3>
                    <h4>{{$t('errors.401.description')}}</h4>
                </el-card>
            </div>
        </template>
    </layout>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
</style>
