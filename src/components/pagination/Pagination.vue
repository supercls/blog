<template>
    <div class= "pagination">
        <div class="pag-box">
            <button 
                class="btn"
                :disabled= "isTrue"
                :class= "{ disabledBtn: isTrue }"
                @click= "reduce()">
                上一页
            </button>
            <div class= "pag-center">
               <span class= "num1"> {{pageData.pageNum}} </span>
               <span>/</span>
               <span> {{pageData.totalPageNum}} </span>
            </div>
            <button
                class="btn"
                @click= "add()" 
                :class= "{ disabledBtn: !isSelected }">
                {{ pageData.pageNum == pageData.totalPageNum ? "完成测试": "下一页" }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        
        props: {
            pageData: {
                type: Object,
                default() {
                    return {}
                }
            },
            isSelected:{
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                isTrue: false,
                isNext: false
            }
        },
    
        mounted() {
            this.previousPage();      
        },
        methods: {
            // 判断上一页是否禁用按钮
            previousPage() {
                if(this.pageData.pageNum <= 1) {
                    this.isTrue = true
                }else {
                    this.isTrue = false
                }              
            },


            //  点击下一题 返回的事件
            add() {
                if ( this.isSelected) {
                    if (this.pageData.pageNum == this.pageData.totalPageNum) {
                        this.$emit('submit')
                    }else {
                        this.$emit('add')
                    }
                    this.previousPage()
                }
            },
            // 点击上一题 返回的事件
            reduce() {
                this.$emit('reduce')
                this.previousPage()
            },
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        width: 100%;
        .pag-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .btn {
                width: 30%;
                height: 98px;
                font-size: 36px;
                color:#026dbb;
            }
            .disabledBtn {
                 color:#666;
            }
            .pag-center{
                height: 98px;
                display: flex;
                flex-direction: row;
                align-items: center;
                span{
                    font-size: 36px;
                    color:#999; 
                }
                .num1 {
                    font-size: 36px;
                    color:#666; 
                }
            }
        }
    }
</style>