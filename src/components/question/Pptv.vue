<template>
    <div class="pptv">
         <div class= "pp-description">
            <p> {{pptvData.bh}}、根据声音选择相应的图片 </p>
        </div>
        <div class= "pp-option">
            <div 
                class= "pp-audio"
                :class= "{ ppAudioPlayer: !isStop }"
                @click= "player()"
                >
                <audio :src="'data:audio/mp3;base64,' + pptvData.cWav"  ref="audio" autoplay id= "voice"></audio>
                 <div class="wifi-symbol">
                    <div class="wifi-circle first"></div>
                    <div 
                        class= "wifi-circle second"
                        :class= "{ stopanimate: isStop }"
                    ></div>
                    <div 
                        class= "wifi-circle third" 
                        :class= "{ stopanimate: isStop }"
                    ></div>
                </div>
            </div>
            <div 
                v-if= "pptvData.cBmp" 
                class= "pp-img" 
                :style= "{backgroundImage: 'url(data:image/jpg;base64,' +  pptvData.cBmp + ')'}">
                <label
                    v-for= "( item, index ) in radioData"
                    :key= "index"
                    :for= "item.type"
                    class= "pptv-lable"
                    >
                    <input
                        type= "radio"
                        :id= "item.type"
                        :value= "item.id"
                        v-model= "pick"
                        class= "public-input"
                    >
                    <span class= "public-span active"> 
                        <div class="pp-qq">
                            <div class="pp-suss">  
                            </div>
                        </div>
                    </span>
                </label>

                <!-- <span>{{picked}}</span> -->
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pptv',
         props: {
             pptvData: {
                type: Object,
                default() {
                    return {}
                }
            },
            value: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        computed: {
            pick: {
                get:function() {
                    return this.value; 
                },
                set:function(value) {
                    this.$emit('input', value);
                }
            }
        },
        watch: {
            'pptvData': function(newData, oldData) {
               this.isStop = false;
            }
        },
        data() {
            return {
                radioData:[
                    {id:'1',type:"num1"},
                    {id:'2',type:"num2"},
                    {id:'3',type:"num3"},
                    {id:'4',type:"num4"}],
                isStop: false,   // 播放暂停的播放状态          
            }
        },
        created() {
            
        },
        mounted() {
            this.autoPlayer()
        },
        methods: {
            // 播放语音
            player () {
                let audio = this.$refs['audio']
                this.isStop = false;
                audio.play();    
                this.ended(audio)
            },

            // 监听 播放结束事件
            ended(ele) {
                ele.addEventListener('ended', () => {
                     this.isStop = true;
                },false)
            },

            //  处理自动播放
            autoPlayer () {
                this.isStop = false;
                let audio = this.$refs['audio'] 
                audio.play();    

                if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                    audio.play();
                } else {
                    //监听客户端抛出事件"WeixinJSBridgeReady"
                    if (document.addEventListener) {
                        document.addEventListener("WeixinJSBridgeReady", function(){
                            audio.play();
                        }, false);
                    } else if (document.attachEvent) {
                        document.attachEvent("WeixinJSBridgeReady", function(){
                            audio.play();
                        });
                        document.attachEvent("onWeixinJSBridgeReady", function(){
                            audio.play();
                        });
                    }
                }
                
                //voiceStatu用来记录状态,使 touchstart 事件只能触发一次有效,避免与click事件冲突
                let voiceStatu = true;
                //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
                // document.addEventListener("touchstart",function(e){
                //     if(voiceStatu){
                //         audio.play();
                //         voiceStatu = false;
                //     }
                // }, false);

                audio.click(()=>{
                    if (audio.paused) {
                        this.isStop = false
                    }else {
                        this.isStop = true
                    }
                })
            }
        }
    }

    // 处理自动播放问题

</script>

<style lang="less" scoped>
    .pptv { 
        width: 100%;
        margin-top: 50px;
        .pp-description {
            p {
               font-size:32px;
               color: #666;
           } 
        }
        .pp-option {
            width: 100%;
            // 声音播放
            .pp-audio {
                margin-top: 30px;
                background-color: #026dbb;
                height: 88px;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .wifi-symbol {
                    width: 60px;
                    height: 60px;
                    box-sizing: border-box;
                    overflow: hidden;
                    transform: rotate(135deg);
                    // background-color: red;
                    margin-left:30px;

                }
                .wifi-circle {
                    border: 2px solid #fff;
                    border-radius: 50%;
                    position: absolute;
                }

                .first {
                    width: 1px;
                    height: 1px;
                    background: #fff;
                    top: 45px;
                    left: 45px;
                }

                .second {
                    width: 32px;
                    height: 32px;
                    top: 30px;
                    left: 30px;
                    animation: fadeInOut 1s infinite 0.3s;
                    // display: none
                }

                .third {
                    width: 55px;
                    height: 55px;
                    top: 16px;
                    left: 16px;
                    animation: fadeInOut 1s infinite 0.6s;
                    // display: none
                }
                .stopanimate{
                    animation-name: none;	
                }

                @keyframes fadeInOut {
                    0% {
                        opacity: 0; /*初始状态 透明度为0*/
                    }
                    100% {
                        opacity: 1; /*结尾状态 透明度为1*/
                    }
                }
            }
            .ppAudioPlayer {
                background-color: #ebebeb;
                .wifi-circle {
                    border: 2px solid #026dbb
                }
                 .first {
                     background-color: #026dbb;
                 }
            }
            //  设置背景图
            .pp-img {
                background-size: 100% 100%; 
                margin-top: 40px;
                display:flex;
                flex-direction: row;
                flex-wrap:wrap;     
                .pptv-lable {
                    display: block;
                    width: 50%;
                    background-color: transparent; 
                    .public-input {
                        width: 0px;
                        height: 0px;
                        opacity: 0;
                        z-index: -1;
                    }
                    .public-span {
                        display: inline-block;
                        width: 325px;
                        height: 240px;
                        border-radius: 15px;
                        // border: 1px solid #214752;
                        font-size: 30px;
                        // background-color: red;
                        
                    }

                }
                .public-input:checked+.active {
                    background-color:rgba(0,0,0,.5);
                    color:#fff;
                    position: relative;
                    .pp-qq{
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                    }
                    .pp-suss{
                            width: 50px;
                            height: 50px;
                            border: 2px solid #fff;
                            background-color: #026dbb;
                            border-radius: 50%;
                            position: relative;
                        }
                        .pp-suss::before {
                            content: '';
                            position:absolute;
                            width: 20px;
                            height: 30px;
                            color: #fff;
                            border-bottom: 2px solid;
                            border-right:2px solid;
                            left: 50%;
                            top: 46%;
                            transform-origin: center;
                            transform: translate(-50%,-50%) rotate(45deg);
                        }
                }
            }
        }
    }
</style>