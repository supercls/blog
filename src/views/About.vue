<template>
  <div class="about">
    <header-top heaTitle="about"></header-top>
    <h1>This is an about page</h1>
    <div class="sd" style="">
      <p>242346</p>
    </div>
  </div>
</template>
<script>
  import headerTop from '@/components/header/header.vue'
  export default {
    name:'default',
    data(){
      return{

      }
    },
    components:{
      headerTop
    },
    mounted:function(){
      console.log(process)
    }
  }
</script>
<style>
  .sd{height: 100px;width: 750px;padding-left: 30px;font-size:32px;}
</style>