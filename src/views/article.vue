<template>
    <!-- <div class="blog-center">
        <ul>
            <li v-for="(item,index) in list" :key="item.id">
                <p>{{item.title}}</p>
                <p>{{item.author}}</p>
                <p v-html="item.content"></p>
                <p>{{item.createTime}}</p>
            </li>
        </ul>
    </div> -->
	<div class="block">
	  <el-timeline>
		<el-timeline-item  v-for="(item,index) in list" :key="item.id" :timestamp="item.createTime | renderTime" placement="top">
		  <el-card >
			<div @click="junmpDetail(item)">
				<h4 >{{item.title}}</h4>
				<div>{{item.intro}}</div>
				<p>{{item.author}} 发1表于 {{item.createTime | renderTime}}</p>
			</div>
		  </el-card>
		</el-timeline-item>
	  </el-timeline>
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
		junmpDetail(item){
			console.log(item)
			localStorage.setItem(`article_${item.id}`,JSON.stringify(item))
			this.$router.push({
				path:'/Index/articleInfo/',
				query:{
					id:item.id
				}
			})
		},
    },
    mounted(){
        this.getArticle()
    },
	filters: {
	  renderTime: function (date) {
		if (!date) return ''
		var dateee = new Date(date).toJSON();
		return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  }
}
}
</script>
<style lang="less" scoped>
	.block{width: 1000px;margin: 0px auto 0;position: static;}
</style>