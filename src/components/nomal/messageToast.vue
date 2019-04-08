<template>
    <div class="messageToast" v-show="toggleOn">
        <div class="boxA animated zoomIn" :class="{maxHeight:type==3}">
            <div class="top">
                <span>{{mtitle}}</span>
                <i class="close" @click.prevent="closeToase"></i>
            </div>
            <article v-if="type==1">
                <h3>{{arcont}}：<i></i></h3>
                <p v-for="item in conts">{{item.detail}}</p>
            </article>
            <article v-if="type==2">
                <p v-for="item in conts" class="p_1">{{item.detail}}</p>
            </article>
            <article v-if="type==3">  <!--应对长内容,后续可以继续拓展-->
                <p v-for="item in conts">{{item.detail}}</p>
            </article>
        </div>
        <div class="fixBody" @click.self="closeToase"></div>
    </div>
</template>
<script>
    export default{
        name: 'messageToast',
        data: function () {
            return {
                toggleOn:false,
                maxHeight:'maxHeight'
            }
        },
        methods: {
            closeToase: function () {    //关闭按钮
                this.toggleOn=false
                this.$emit("Onchange")
            }
        },
        props:{
            hideOn:{
              default:true
            },
            type:{
                default:1
            },
            mtitle:{
                default:'温馨提示'
            },
            content:{
                default:''
            },
            arcont:{

            },
            conts:{
                type:Array
            }
        },
        mounted: function () {
        },
        watch:{                       //监听数据变化
            hideOn: function (val,index) {
                this.toggleOn=val
                if(val){
                    document.querySelector('#app').firstElementChild.style.height='100%'
                    document.querySelector('#app').firstElementChild.style.overflow='hidden'
                }
                else{
                    document.querySelector('#app').firstElementChild.style.height='auto'
                    document.querySelector('#app').firstElementChild.style.overflow='auto'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .animated {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }
    .zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
    }
    .messageToast{
        .maxHeight{
            min-height: 50vh !important;
        }
        .boxA{
            position:fixed;
            top:25%;
            left:10%;
            right:10%;
            border-radius:8px;
            z-index:9999;
            max-height:70vh;
            min-height: 30vh;
            height: auto;
            overflow: hidden;
            background:#fff;
            .top{
                position:absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                background:#026DBB;
                color: #fff;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                height:80px;
                line-height:80px;
                text-align:center;
                span{
                    font-size: 28px;
                }
                .close {
                    background:none;
                    color: #fff;
                    border-radius: 12px;
                    line-height: 40px;
                    text-align: center;
                    height: 40px;
                    width: 40px;
                    font-size: 30px;
                    padding: 1px;
                    top: 20px;
                    right: 10px;
                    position: absolute;
                }
                /* use cross as close button */
                .close::before {
                    content: "\2716";
                }
            }
            article{
                margin:20px 10px ;
                border-bottom:1px solid #d1d1d1;
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                bottom: 0;
                height:auto;
                overflow:auto;
                h3{
                    font-size: 32px;
                    font-weight: bold;
                }
                p{
                    font-size: 28px;
                    line-height: 1.7;
                    text-indent: 2em;
                }
                .p_1{
                    font-size: 28px;
                    position: relative;
                    padding-left: 30px;
                    line-height: 1.5;
                &:before{
                     content: '';
                     position: absolute;
                     top:0.1rem;
                     left: 0;
                     width: 10px;
                     height:10px;
                     background: #ccc;
                     border-radius: 50%;
                 }
                }
                &:last-child{
                     border:none;
                 }
            }
        }
        .fixBody{
            position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;z-index:10;background:#000;opacity: 0.3;
        }

    }
</style>