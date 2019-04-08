<template>
    <div class= "generic">
        <div class= "gen-description">
            <p> {{data.bh +'、'+data.question}} </p>
        </div>
        <div 
            class= "gen-options"
           
            >
            <label
                v-for= "item in options"
                :key= "item.id"
                :for= "item.type+data.bh"
                class= "public-lable clearfix"
                @change= "$emit('change', picked)"
                >
                <input
                    type= "radio"
                    :id= "item.type+data.bh"
                    :value= "item.id"
                    v-model= "picked"
                    class= "public-input"
                >   
                <div class= "public-right active fr">
                    <div class="public-ring ">
                            
                    </div>
                </div>   
                <span class= "public-span"> 
                    {{ item.name }}
                </span>     
            </label>
              <!-- v-model= "message" -->
                <!-- @input= "prompt" -->
            <div class="textarea-box">
                <textarea 
                    class="textarea"
                    cols= "40" 
                    rows= "8" 
                    name= "textarea" 
                    maxlength= "300"
                    placeholder= "请输入相关信息"
                    v-model= "message"
                    @input= "prompt" 
                ></textarea>
                <div class="tb-number">
                    <div>
                        <span>0</span>
                        <span>/</span>
                        <span>300</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import '../css/option.less'
    export default {
        name: 'Mgeneric',
        props:{
            data: {
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
            },
        },
        watch: {
            value(val) {
                this.picked = val;
            },
            picked(val) {
                this.$emit('input', val);
            }
        },
        data() {
            return {
                picked: this.value,
                xx:'Gjth',
                options: [],
                fontLength: this.value.length,
                message: this.value
            }
        },

        computed: {
        },
        created() {
           this.getOptions()

        },
        mounted() {
        },
        methods: {
            getOptions() {
                 switch(this.xx) {
                    case 'Gjth':
                    this.options = [
                        {id:'1',type:"num1",name:'无'},
                        {id:'2',type:"num2",name:'稍有'},
                        {id:'3',type:"num3",name:'相当多'},
                        {id:'4',type:"num4",name:'很多'}
                    ]
                    break;
                    case 'ADHD':
                        this.options = data.option
                    break;
                 }
            },
            prompt() {
                this.fontLength = this.value.length
                 this.$emit('input', this.message);//触发input事件，并传入新的值
            }
        }
    }
</script>

<style lang="less" scoped>
    .generic {
        width: 100%;
        .gen-box{
            margin-top: 50px;
        }
        .gen-description {
           p {
               font-size:32px;
               color: #666;
           } 
        }
        .gen-options {
            margin-top: 30px;
            border: 1px solid #d1d1d1;
            background-color: #f7f7f7;
            border-bottom: 0px solid #d1d1d1;
            border-radius: 5px;
            .textarea-box {
                position: relative;
                border:1px solid #ccc;
                border-radius: 7px;
                width: 100%;
                box-sizing: border-box;
                // background-color;
                padding: 20px 0;
                .textarea {
                    resize: none;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 30px;
                    font-size: 30px;
                    color: #333;
                    text-indent:2em;
                    
                }
                .tb-number {
                    width: 100%;
                    // position: absolute;
                    // right: 30px;
                    // bottom: 34px;
                    box-sizing: border-box;
                    padding: 0 30px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    span {
                        font-size: 30px;
                        color: #999;
                    }
                }
            }          
        }
    }
</style>