<template>
	<div class="block">
	  <div>
		  {{detail}}
	  </div>
	</div>
</template>
<script>
import {getArticle} from '@/api/user'
export default {
    name:'blog-center',
    data() {
        return {
			id:this.$route.query.id,
            detail:''
        };
    },
    methods: {
        getArticle(){
           this.detail=localStorage.getItem(`article_${this.id}`)
        },
    },
    mounted(){
        this.getArticle()
    },
}
</script>
<style lang="less" scoped>
	.block{width: 1000px;margin: 0px auto 0;position: static;}
</style>