<template>
    <div class="blog-home">
        <lay-top class="main-top"></lay-top>
        <home class="main-center"></home>
    </div>
</template>
<script>
import layTop from '@/views/mainTop'
import home from '@/views/Home'
export default {
    name:'blog-home',
    data() {
        return {
            activeIndex: '1',
        };
    },
    components:{
        layTop,
        home
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less" scoped>
    .blog-home{
        .main-top{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
			width: 100%;
			z-index: 9999;
        }
        .main-center{
			padding-top: 100px;
        }
    }
</style>