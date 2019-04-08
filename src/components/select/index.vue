<template>
    <div>
        <div class="zd-select">
            <p @click="show=!show" :visible.sync="models"><span id="input-select" >{{modelValue}}</span>
                <b class="bottom" v-if="!show"><i class="bottom-arrow1" ></i><i class="bottom-arrow2" ></i></b>
                <b class="top" v-else><i class="top-arrow1"></i><i class="top-arrow2"></i></b></p>
            <div class="select-box"  v-show="show">
                <ul>
                    <li v-for="item in options" :key="item.value" @click="selectChange(item)">
                        <p>{{item.text}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            options:{
                type:Array,
                default:[],
            },
            models:{
                type:[String,Number,Boolean],
            }
        },
        watch:{
            models:{
                handler(val){
                    let data=this.options.find(val=>{
                        return val.value==this.models
                    })
                    this.modelValue=data.text
                },
                immediate: true
            }
        },
        data(){
            return{
                modelValue:'',
                show:false,
            }
        },
        methods:{
            selectChange(item){
                this.modelValue=item.text;
                this.$emit('update:models',item.value)
                this.$emit('changes',item.value)
                this.show=false
            }
        },
    }
</script>

<style scoped lang="less">
    .zd-select{
        position: relative;
        display: inline-block;
        p{
            font-size: 32px;
            color: #333;
        }
        .select-box{
            position: absolute;
            top: 50px;
            left: 0;
            right: -40px;
            z-index: 1;
            background: #fff;
            ul{
                border: 1px solid #DBDBDB;
                li{
                    height: 80px;
                    line-height: 80px;

                    color: #333;
                    border-bottom: 1px solid #DBDBDB;
                    &:nth-last-child(1){
                        border-bottom: none;
                    }
                    p{
                        line-height: 80px;
                        font-size: 28px;
                        padding-left: 30px;
                        padding-right: 30px;
                    }
                    &:hover{
                        background: #fff;
                    }
                }

            }
        }
    }
    .bottom{
        position:absolute;
        right:-10px;
        top:50%;
        margin-top: -10px;
    }
    .top{
        position:absolute;
        right:-10px;
        top:50%;
        margin-top: -30px;
    }
    .bottom-arrow1,.bottom-arrow2{
        width:0;
        height:0;
        display:block;
        position:absolute;
        left:0;
        top:0;
        border-bottom:20px transparent dashed;
        border-left:20px transparent dashed;
        border-right:20px transparent dashed;
        border-top:20px white solid;
        overflow:hidden;
    }
    .bottom-arrow1{
        top:2px;/*重要*/
        border-top:20px #333333 solid;
    }
    .bottom-arrow2{
        border-top:20px white solid;
    }
    .top-arrow1,.top-arrow2{
        width:0;
        height:0;
        display:block;
        position:absolute;
        left:0;
        top:0;
        border-top:20px transparent dashed;
        border-left:20px transparent dashed;
        border-right:20px transparent dashed;
        border-bottom:20px white solid;
        overflow:hidden;
    }
    .top-arrow1{
        border-bottom:20px  #333333 solid;
    }
    .top-arrow2{
        top:2px;
        border-bottom:20px white solid;
    }
</style>