<template>
    <div class="echats-content">
        <div :id="chartId" :style="{width: '100%', height: '350px'}"></div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
              require("echarts/lib/chart/line");
              require("echarts/lib/chart/scatter");
              require("echarts/lib/component/legendScroll");
              require("echarts/lib/component/dataZoom");
              require("echarts/lib/component/tooltip");
export default {
    name: '',
    props:['options','chartId'],
    data() {
        return {

        }
    },
    methods:{
        drawLine:function(){
            let myChart =echarts.init(document.getElementById(this.chartId));
            myChart.setOption(this.options)
        }
    },
    watch:{options:{
        handler:function(newVal,oldVal){
            this.drawLine(newVal);
        },
        deep:true
     }}
}
</script>

<style lang="less" scoped>
    .Charts {
        width: 100%;
         .eCharts {
            width: 100%;
            height: 1000px
        }   
    }
   
</style>