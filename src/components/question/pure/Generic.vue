<template>
    <div class= "generic">
        <div 
            v-for= "(plan,index) in showData"
            :key= "plan.bh"
            class= "gen-box"
            >
            <div class= "gen-description">
                <p> {{ plan.bh +'、'+plan.question }} </p>
            </div>
            <div 
                class= "gen-options"
                @change= "$emit('change', picked)"
                >
                <label
                    v-for= "item in options"
                    :key= "item.id"
                    :for= "item.type+plan.bh"
                    class= "public-lable clearfix"
                    >
                    <input
                        type= "radio"
                        :id= "item.type+plan.bh"
                        :value= "item.id"
                        v-model= "picked[index]"
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
    </div>
</template>

<script>
    import '../css/option.less'
    export default {
        name: 'Generic',
        props:{
            showData: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: Array,
                default() {
                    return []
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
                xx:'Yyfylb',
                options: []

            }
        },

        computed: {
            // picked: {
            //     get:function() {
            //         return this.value; 
            //     },
            //     set:function(value) {
            //         this.$emit('input', value);
            //     }
	        // }

        },
        created() {
           this.getOptions()
        },
        mounted() {
        },
        methods: {
            getOptions() {
                switch(this.xx) {
                    case 'ConnersP':
                    case 'ConnersT':
                        this.options = [ 
                            {id:'1',type:"num1",name:'无'},
                            {id:'2',type:"num2",name:'稍有'},
                            {id:'3',type:"num3",name:'相当多'},
                            {id:'4',type:"num4",name:'很多'},
                        ]
                    break;
                    case 'ABC':
                        this.options = [ 
                            {id:'1',type:"num1",name:'没有'},
                            {id:'2',type:"num2",name:'偶尔'},
                            {id:'3',type:"num3",name:'轻度'},
                            {id:'4',type:"num4",name:'中度'},
                            {id:'5',type:"num5",name:'重度'}
                        ]
                    break;
                    case 'RutterP':
                    case 'RutterT':
                        this.options = [ 
                            {id:'1',type:"num1",name:'从来没有'},
                            {id:'2',type:"num2",name:'轻微或有时有'},
                            {id:'3',type:"num3",name:'严重或经常有'}
                        ]
                    break;
                    case 'Scred':                 
                        this.options = [ 
                            {id:'1',type:"num1",name:'没有问题'},
                            {id:'2',type:"num2",name:'有时有'},
                            {id:'3',type:"num3",name:'经常有'}
                        ]
                    break;
                    case 'Shlb':                 
                        this.options = [ 
                            {id:'1',type:"num1",name:'是'},
                            {id:'0',type:"num2",name:'否'},
                            {id:'2',type:"num3",name:'空'}
                        ]
                    break;
                    case 'Ddz':                
                        this.options = [ 
                            {id:'1',type:"num1",name:'是'},
                            {id:'2',type:"num2",name:'否'}
                        ]
                    break;
                    case 'Zykznl':                 
                        this.options = [ 
                            {id:'1',type:"num1",name:'完全不符合'},
                            {id:'2',type:"num2",name:'比较不符合'},
                            {id:'3',type:"num3",name:'比较符合'},
                            {id:'4',type:"num4",name:'完全符合'}
                        ]
                    break;
                    case 'Gjth':
                        this.options = [ 
                            {id:'1',type:"num1",name:'从来不这样'},
                            {id:'2',type:"num2",name:'很少这样'},
                            {id:'3',type:"num3",name:'有时候'},
                            {id:'4',type:"num4",name:'常常如此'},
                            {id:'5',type:"num5",name:'总是如此'}
                        ]
                    break;
                    case 'Qzwj':
                        this.options = [ 
                            {id:'1',type:"num1",name:'从不'},
                            {id:'2',type:"num2",name:'偶尔'},
                            {id:'3',type:"num3",name:'很少'},
                            {id:'4',type:"num4",name:'有时'},
                            {id:'5',type:"num5",name:'经常'},
                            {id:'6',type:"num6",name:'总是'},
                            {id:'7',type:"num7",name:'不适用'}
                        ]
                    break; 
                    case 'Yyfylb':                
                        this.options = [ 
                            {id:'1',type:"num1",name:'是'},
                            {id:'2',type:"num2",name:'否'},
                            {id:'3',type:"num2",name:'空'}
                        ]
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