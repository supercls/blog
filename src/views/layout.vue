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
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        .main-center{
            position: absolute;
            top: 100px;
            left: 0px;
            right: 20%;
            bottom: 0;
            overflow-y:scroll;
        }
    }
</style>