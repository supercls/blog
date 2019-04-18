<template>
    <div class="blog-center">
        <ul>
            <li v-for="(item,index) in list" :key="item.id">
                <p>{{item.title}}</p>
                <p>{{item.author}}</p>
                <p v-html="item.content"></p>
                <p>{{item.createTime}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {getArticle} from '@/api/user'
export default {
    name:'blog-center',
    data() {
        return {
            type:1,
            pageSize:10,
            pageCount:1,
            total:null,
            list:[]
        };
    },
    methods: {
        getArticle(){
            let params={
                pageSize: this.pageSize,
                pageCount: this.pageCount,
                type:this.type
            }
            getArticle(params).then(res=>{
                this.list=res.dtData;
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },

    },
    mounted(){
        this.getArticle()
    }
}
</script>
<style lang="less" scoped>

</style>