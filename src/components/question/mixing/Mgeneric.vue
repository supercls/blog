<template>
    <div class= "generic">
        <div class= "gen-description">
            <p> {{itemData.bh +'、'+itemData.question}} </p>
        </div>
                <!-- @change= "$emit('change', picked)"  -->
        <div 
            class= "gen-options"
           
            v-if= "itemData.options"
            >
            <label
                v-for= "item in itemData.options"
                :key= "item.id"
                :for= "item.type+itemData.bh"
                class= "public-lable clearfix"
                >
                <input
                    type= "radio"
                    :id= "item.type+itemData.bh"
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
        </div>
        <div 
            class= "gen-options"
            @change= "$emit('change', picked)" 
            v-else
            >
            <label
                v-for= "item in options"
                :key= "item.id"
                :for= "item.type+itemData.bh"
                class= "public-lable clearfix"
                >
                <input
                    type= "radio"
                    :id= "item.type+itemData.bh"
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
        </div>
    </div>
</template>

<script>
    import '../css/option.less'
    export default {
        name: 'Mgeneric',
        props:{
            itemData: {
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
                options: []

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
                        this.options =[]
                    break;
                 }
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
            
        }
    }
</style>