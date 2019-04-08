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
                    v-for= "item in plan.options"
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
        name: 'Generics',
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
                xx:'ConnersT',
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
            console.log(this.showData)
        },
        mounted() {
        },
        methods: {

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