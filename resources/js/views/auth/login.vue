<template>
    <div class="login-container">
        <div class="card-container">
            <el-card>
                <div class="title-container">
                    <h3 class="title">AllMaps</h3>
                </div>
                <el-form :model="form"
                         @keydown.native="form.errors.clear($event.target.name)">
                    <el-form-item :class="{'is-error' : form.errors.has('email')}">
                        <span class="svg-container">
                            <i class="fa fa-user"></i>
                        </span>
                        <el-input v-model="form.email"
                                  name="email"
                                  type="text"
                                  placeholder="email">
                        </el-input>
                        <div class="el-form-item__error"
                             v-if="form.errors.has('email')">
                            {{form.errors.get('email')}}
                        </div>
                    </el-form-item>
                    <el-form-item class="last-field"
                                  :class="{'is-error' : form.errors.has('password')}">
                        <span class="svg-container">
                            <i class="fa fa-lock"></i>
                        </span>
                        <el-input v-model="form.password"
                                  name="password"
                                  type="password"
                                  @keyup.enter.native="login"
                                  placeholder="password">
                        </el-input>
                        <div class="el-form-item__error"
                             v-if="form.errors.has('password')">
                            {{form.errors.get('password')}}
                        </div>
                    </el-form-item>
                    <div class="link-container">
                        <router-link :to="{name : 'password-forgot'}"
                                     class="link"
                                     href="#">
                            Forgot your password?
                        </router-link>
                    </div>
                    <el-button type="primary"
                               class="submit-btn"
                               @click.stop.prevent="login"
                               :loading="busy">
                        Login
                    </el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import Form from '../../utils/Form';

    export default {
        data() {
            return {
                busy: false,
                error: false,
                form: new Form({
                    email: '',
                    password: ''
                })
            };
        },
        methods: {
            login() {
                this.busy = true;

                this.error = null;

                this.$auth.login({
                    data: this.form,
                    url: 'login',
                    redirect: {name: 'containers-index'},
                    fetchUser: true,
                    error: (error) => {
                        this.error = error.response.data;
                        this.busy = false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $darkGray: #889aa4;
    $lightGray: #eee;

    .login-container {
        position: relative;
        height: 100%;
    }

    .card-container {
        position: absolute;
        z-index: 10000;
        width: 450px;
        left: calc(50% - 225px);
        top: 20%;
    }

    .el-card {
        background-color: #2d3a4b;
        border: 1px solid #2d3a4b;
    }

    /deep/ {

        .last-field {
            margin-bottom: 5px;
        }

        .submit-btn {
            width: 100%;
            margin-bottom: 25px;
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $darkGray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                font-weight: 400;
                color: $lightGray;
                margin: 0 auto 40px auto;
                text-align: center;
            }
        }

        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: $lightGray;
                height: 47px;

                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;

            &.is-error {
                border: 1px solid red;
            }
        }

        .message {
            color: #eee;
            font-size: 12px;
            margin-bottom: 22px;

            &.error {
                color: #f56c6c;
            }
        }

        .link-container {
            float: right;
            margin-bottom: 25px;

            .link {
                font-size: 12px;
                color: #eee;

                &:hover {
                    color: #ffffff;
                }
            }
        }
    }
</style>
