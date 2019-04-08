<template>
    <div>
        <div v-for="(item,index) in options" style="float: left;height: 1rem;overflow: hidden;margin-left: 15px;">
            <label class="ui-radio" :class="{'checked':model==index,'disabled':disabled}" @click="updateVal(index)">
                <input type="radio" ref="radio"  :disabled="disabled" name="radio">
            </label>
            <span class="ui-radio-span">{{item}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name:'ui-radio',
        model: {
            prop: 'model',
            event: 'change'
        },
        data(){
            return {

            }
        },
        props:{
            value:{
                type:[String,Number],
                require:true
            },
            model:{
                type:[String,Number],
                default:'2'
            },
            checked:{//是否默认选中
                type:Boolean,
                default:true
            },
            disabled:{//是否禁用
                type:Boolean,
                default:false
            },
            options:{
                type:Array,
            }
        },
        mounted:function(){//当dom渲染完成
        },
        methods:{
            updateVal:function(index){//
                this.$emit('change',index)
            }
        }
    }
</script>
<style>
    .ui-radio{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #ccc;
        position: relative;
        display: inline-block;
    }
    .checked{
        border: 1px solid #78BE40;
    }
    .ui-radio.disabled{
        border-color: #ccc;
    }
    .ui-radio::after{
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -5px 0 0 -5px;
        background-color: #78BE40;
        transition: all .5s ease;
        opacity: 0;
        transform: scale(0);
    }
    .ui-radio.disabled::after{
        background-color: #ccc;
    }
    .ui-radio.checked::after {
        opacity: 1;
        transform: scale(1);
    }
    .ui-radio input[type=radio]{
        opacity: 0;
        margin: 0;
    }
    .ui-radio-span{
        vertical-align: 0.3rem;
    }
</style>