<template>
    <div class="zd-wrapper">
        <p>helloy</p>
        <el-row>
  <el-button disabled>默认按钮</el-button>
  <el-button type="primary" disabled>主要按钮</el-button>
  <el-button type="success" disabled>成功按钮</el-button>
  <el-button type="info" disabled>信息按钮</el-button>
  <el-button type="warning" disabled>警告按钮</el-button>
  <el-button type="danger" disabled>危险按钮</el-button>
            <form action="http://localhost:3000/api/upload" method="post" enctype="multipart/form-data"  target="frameName">
                <input type="file" name="content"  style="display: block"/>
                <button @submit.prevent="uploads">上传</button>
                <iframe ref="frameName" src="" frameborder="0" name="frameName"></iframe>
            </form>
</el-row>
    </div>
</template>
<script>
import helloWorld from "@/components/HelloWorld";
// import {login} from "@/api/login.js"
// import { mapGetters } from 'vuex'
export default {
    name:'hello',
    data(){
        return {

        }
    },
    components:{
        helloWorld
    },
    methods:{

    },
    created(){

    },
    mounted(){
        // login(1,2).then(res=>{
        //     console.log(res)
        // })
    },
    computed:{

    },
    filters:{

    },
}
</script>
<style scoped lang="less">
    .zd-wrapper{
        margin:0 auto;
        p{
            font-size: 30px;
            height: 50px;
            text-align: center;
        }
    }
</style>