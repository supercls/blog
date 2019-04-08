<template>
    <div>   
        <div class= "gen-description" v-if="data.question">
            <p> {{data.question}} </p>
        </div>
        <div class="textarea-box">
            <textarea 
                class="textarea"
                cols= "40" 
                rows= "8" 
                name= "textarea" 
                maxlength= "300"
                placeholder= "请输入相关信息"
                @input= "prompt"
                v-model= "message"
            ></textarea>
            <div class="tb-number">
            <div>
                <span>{{fontLength}}</span>
                <span>/</span>
                <span>300</span>
            </div>
            </div>
        </div>
    </div>

  
</template>

<script>
    export default {
        name: '',
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
        data() {
            return {
                fontLength: this.value.length,
                message: this.value
            }
        },
        methods:{
            prompt() {
                this.fontLength = this.value.length
                 this.$emit('input', this.message);//触发input事件，并传入新的值
            }
        }
    }
</script>

<style lang="less" scoped>
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
   
</style>