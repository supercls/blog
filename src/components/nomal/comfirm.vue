<template>
    <transition name="fade">
    <div class="zd-comfirm" v-if="showUp">
            <div class="wrapper"  ref="wrapper">
                <div class="zd-header">
                    <p>{{title}}</p>
                </div>
                <div class="zd-content">
                    <checklist
                        v-model="checkValue"
                        :visible.sync="keycheckValue"
                        :options="checkOption">
                    </checklist>
                </div>
                <div class="zd-footer">
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel" @click="close">取消</button>
                        <button class="mint-msgbox-btn mint-msgbox-confirm" @click="finish">确定</button>
                    </div>
                </div>
            </div>
    </div>
    </transition>
</template>
<script>
    import  checklist from './checklist'
    export default {
        name: "comfirm",
        props:{
            checkOption:{
                type:Array,
            },
            keycheckValue:{
                type: String,
            },
            showUp:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default: '提示'
            }
        },
        components:{
            checklist
        },
        data(){
            return {
                checkValue:this.keycheckValue.length>0?this.keycheckValue.split(','):[],  //数据转换
                animate:this.showUp
            }
        },
        methods:{
            close(e){
                this.checkValue=this.keycheckValue.split(',');
                this.$emit('cancel')
                e.preventDefault();
            },
            finish: function (e) {
                let valString=this.checkValue;
                valString=valString.join(',');
                this.$emit('confirm',valString )
                e.preventDefault();
            },
        },
        mounted(){

        },

    }
</script>
<style scoped lang="less">
    .zd-comfirm{
        .wrapper{
            z-index: 99999;
            background: #fff;
            position: fixed;
            top: 40vh;
            left: 50%;
            transform:translate(-50%,-50%) scale(1);
            width: 85%;
            border-radius: 5px;
            transition: .3s;
            backface-visibility:hidden;
            overflow: hidden;
            height: auto;
            .zd-header{
                height: 80px;
                line-height: 80px;
                p{
                    text-align: center;
                    font-size: 32px;
                    color:#333;
                }
            }
            .zd-footer{
                border-top: 1px solid #EAEAEA;
                .mint-msgbox-btns{
                    button{
                        font-size: 32px;
                        color: #646464;
                    }
                    .mint-msgbox-confirm{
                        color: #26A2FF;
                    }
                }
            }
            .zd-content{
                padding:10px 10px 20px 10px;
                height: auto;
                max-height: 55vh;
                overflow-y:auto;
            }
        }
    }
    .animated{
        transform:translate(-50%,-50%) scale(1) !important;
        transition:transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
</style>