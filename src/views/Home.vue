<template>
    <div class="blog-main">
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name:'blog-main',
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .25s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>