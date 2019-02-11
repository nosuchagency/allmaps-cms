<template>
    <li class="sidebar-item">
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.title"
                    :disabled="sidebar.opened"
                    placement="right">
            <div class="sidebar-item-content"
                 :class="{'is-collapsed' : !sidebar.opened, 'is-active' : isActive(item), 'separated' : item.border}"
                 @click="handleParentClick">
                <i class="fa"
                   :class="'fa-' + item.icon">
                </i>
                <span v-if="sidebar.opened">{{item.title}}</span>
                <i v-if="item.children && sidebar.opened"
                   class="fa icon-arrow fa-angle-up"
                   :class="{'reversed' : collapsed}">
                </i>
            </div>
        </el-tooltip>
        <ul class="sidebar-item-children"
            v-if="item.children"
            :style="{'max-height' : height + 'px'}">
            <el-tooltip v-for="child in item.children"
                        :key="child.route"
                        class="item"
                        effect="dark"
                        :content="child.title"
                        :disabled="sidebar.opened"
                        placement="right">
                <li class="sidebar-item-child">
                    <div class="sidebar-item-content"
                         :class="{'is-collapsed' : !sidebar.opened, 'is-active' : isActive(child)}"
                         @click="handleChildClick(child)">
                        <i class="fa"
                           :class="'fa-' + child.icon"></i>
                        <span v-if="sidebar.opened">{{child.title}}</span>
                    </div>
                </li>
            </el-tooltip>
        </ul>
    </li>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        props: {
            item: Object,
            currentRoute: String
        },
        data() {
            return {
                collapsed: true,
                hasBeenInitialized: false
            };
        },
        methods: {
            isActive(item) {
                if (!item.route) {
                    return false;
                }

                if (this.currentRoute.substring(1).split('/')[0] === item.route) {
                    if (!this.hasBeenInitialized) {
                        this.collapsed = false;
                        this.hasBeenInitialized = true;
                    }
                    return true;
                }

                return false;
            },
            handleParentClick() {
                if (this.item.children && this.item.children.length > 0) {
                    this.collapsed = !this.collapsed;
                } else {
                    this.$router.push('/' + this.item.route);
                }
            },
            handleChildClick(child) {
                this.$router.push('/' + child.route);
            }
        },
        computed: {
            ...mapGetters(['sidebar']),
            height() {
                return this.collapsed ? 0 : 56 * this.item.children.length;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .sidebar-item {
        display: flex;
        justify-content: flex-start;
        white-space: nowrap;
        list-style-type: none;
        flex-wrap: wrap;

        &-content {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 56px;
            flex-basis: 100%;
            padding: 15px;
            cursor: pointer;
            color: #bfcbd9;
            overflow: hidden;

            &.is-collapsed {
                padding: 0;
                justify-content: center;
            }

            &:hover,
            &.is-active {
                background-color: #263445;
            }

            &.separated {
                border-bottom: 1px solid #243444;
            }
        }

        .sidebar-item-children {
            padding-left: 0;
            width: 100%;
            background-color: #1f2d3d;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;

            li {
                list-style-type: none;
            }

            .sidebar-item-content {
                padding-left: 35px;
                overflow: hidden;

                &.is-collapsed {
                    padding-left: 0;
                }

                &:hover,
                &.is-active {
                    background-color: #001528;
                }
            }
        }

        .icon-arrow {
            color: #909399;
            font-size: 14px;
            transition: transform 0.5s ease;

            &.reversed {
                transform: rotate(180deg);
            }
        }

        .fa {
            color: #909399;
            min-width: 10%;
            text-align: center;
        }

        span {
            margin-left: 10px;
            color: #bfcbd9;
            font-size: 14px;
            width: 85%;
        }

        &.child {
            cursor: pointer;
            background-color: #1f2d3d;
            padding-left: 45px;

            &:hover {
                background-color: #001528;
            }
        }
    }
</style>